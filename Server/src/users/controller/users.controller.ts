import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, BadRequestException, InternalServerErrorException, Query, NotFoundException, Res } from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CSVParserService } from '../service/csv-parser.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateUsresDTO, UpdateUsersDTO } from '../dto';
import { Response } from 'express';
import { IUsersService } from '../service/interface/IUserService.interface';

@Controller('users')
export class UsersController {

  constructor(
    private readonly usersService: IUsersService,
    private readonly csv: CSVParserService
  ) { }

  /**
   * Download CSV
   * @param res 
   */
  @ApiTags("Download CSV")
  @ApiOperation({ summary: "Download all users data as a CSV file" })
  @ApiResponse({ status: 200, description: 'CSV file downloaded successfully' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @Get("download")
  async downloadCSV(@Res() res: Response) {
    try {
      const data = await this.usersService.findAll();
      const field = await this.csv.downloadFile(data)

      res.header("Content-Type", "text/csv")
      res.header("Content-Disposition", "attachment; filename=Userdata.csv")
      res.send(field)
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }
  /**
   * Upload a CSV to Date Base
   * @param file 
   * @returns 
   */
  @ApiTags("Upload CSV")
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: "Upload a CSV file with user data" })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: "CSV file to upload",
    required: true,
    schema: {
      type: 'object',
      properties: {
        file: {
          type: "string",
          format: "binary",
          description: "The CSV file to upload"
        }
      }
    }
  })
  @ApiResponse({ status: 201, description: "File upload successfully" })
  @ApiResponse({ status: 404, description: "Missing file" })
  @ApiResponse({ status: 400, description: "Invalid file type" })
  @ApiResponse({ status: 500, description: "Internal server error" })
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new NotFoundException("File is required")
    }
    if (file.mimetype !== "text/csv") {
      throw new BadRequestException("File must be a CSV")
    }
    try {
      const jsonResult = await this.csv.parse(file.buffer)
      await this.usersService.insertFile(jsonResult)
      return { message: "Upload File successfully from users/upload" }
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  /**
   * Search data under a Query params
   * @param q 
   * @returns 
   */
  @ApiTags("Get Data")
  @Get("search")
  @ApiOperation({ summary: "Search users by query params" })
  @ApiQuery({
    name: "q",
    required: true,
    description: "Search query",
    type: String
  })
  @ApiResponse({ status: 200, description: "Show date" })
  @ApiResponse({ status: 400, description: "Query params is required" })
  @ApiResponse({ status: 500, description: "Internal server error" })
  async searchUserbyQuery(@Query("q") q: string) {
    if (!q) {
      throw new BadRequestException("Query params is required")
    }
    try {
      return await this.usersService.findByQuerie(q.toLocaleLowerCase())
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  /**
   * Show all data
   * @returns 
   */
  @ApiTags("Get Data")
  @Get()
  @ApiOperation({ summary: "Get all data from data base" })
  @ApiResponse({ status: 200, description: "Show the list of alls users" })
  @ApiResponse({ status: 500, description: "Internal Server Error" })
  findAll() {
    return this.usersService.findAll();
  }
  /**
   * Search users by Id
   * @param id 
   * @returns 
   */
  @ApiTags("Get Data")
  @Get(':id')
  @ApiOperation({ summary: "Get a users by his ID" })
  @ApiParam({
    name: "id",
    description: "User id",
    type: Number
  })
  @ApiResponse({ status: 200, description: "Find user" })
  @ApiResponse({ status: 404, description: "Not foun user" })
  @ApiResponse({ status: 500, description: "Interanl server error" })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(Number(id));
  }
  /**
   * Create a new Users
   * @param data 
   * @returns 
   */
  @ApiTags("Create new User")
  @Post()
  @ApiOperation({ summary: "Create a new users" })
  @ApiBody({
    description: "Data to create a new user",
    type: CreateUsresDTO
  })
  @ApiResponse({ status: 201, description: "User create successfully" })
  @ApiResponse({ status: 400, description: "Invalid date" })
  @ApiResponse({ status: 409, description: "Repeated Name" })
  @ApiResponse({ status: 500, description: "Internal Error Server" })
  create(@Body() data: CreateUsresDTO) {
    return this.usersService.create(data);
  }
  /**
   * Update an existing users
   * @param id 
   * @param data 
   * @returns 
   */
  @ApiTags("Update")
  @Patch(':id')
  @ApiOperation({ summary: "Update an existing user" })
  @ApiParam({
    name: "id",
    description: "User id",
    type: Number
  })
  @ApiBody({
    description: "Data to update a user",
    type: UpdateUsersDTO
  })
  @ApiResponse({ status: 200, description: 'User updated successfully' })
  @ApiResponse({ status: 400, description: 'Invalid user data' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  update(@Param('id') id: string, @Body() data: UpdateUsersDTO) {
    return this.usersService.update(Number(id), data);
  }
  /**
   * Delete a users by Id
   * @param id 
   * @returns 
   */
  @ApiTags("Delete")
  @Delete(':id')
  @ApiOperation({ summary: "Delete a user by his ID" })
  @ApiParam({
    name: "id",
    description: "User id",
    type: Number
  })
  @ApiResponse({ status: 204, description: 'User deleted successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  remove(@Param('id') id: string) {
    return this.usersService.remove(Number(id));
  }
  /**
   * Delete a data in data_base
   * @returns 
   */
  @ApiTags("Delete")
  @Delete()
  @ApiOperation({ summary: "Delete All Users in data base" })
  @ApiResponse({ status: 204, description: "All users deleted successfully" })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  removeAll() {
    return this.usersService.removeAll()
  }
}
