import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, BadRequestException, InternalServerErrorException, Query, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { createUser } from './dto/create-user.dto';
import { updateUser } from './dto/update-user.dto';
import { CSVParserService } from './service/csv-parser.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags("Users Ops")
@Controller('users')
export class UsersController {

  constructor(
    private readonly usersService: UsersService,
    private readonly csv: CSVParserService
  ) { }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: "Upload a CSV file with user data" })
  @ApiBody({
    description: "CSV file to upload",
    type: "multipart/form-data",
    required: true
  })
  @ApiResponse({ status: 200, description: "File upload successfully" })
  @ApiResponse({ status: 404, description: "Missing file" })
  @ApiResponse({ status: 400, description: "Invalid fily type" })
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

  @Get("search")
  @ApiOperation({ summary: "Search users by query" })
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

  @Get()
  @ApiOperation({ summary: "Get all data from data base" })
  @ApiResponse({ status: 200, description: "Show the list of alls users" })
  @ApiResponse({ status: 500, description: "Internal Server Error" })
  findAll() {
    return this.usersService.findAll();
  }

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

  @Post()
  @ApiOperation({summary:"Create a new users"})
  @ApiResponse({status:200, description:"User create"})
  @ApiResponse({status:400, description:"Invalid date"})
  @ApiResponse({status:409, description:"Repeated Name"})
  @ApiResponse({status:500, description:"Internal Error Server"})
  create(@Body() data: createUser) {
    return this.usersService.create(data);
  }

  @Patch(':id')
  @ApiOperation({summary:"Update an existing user"})
  @ApiParam({
    name:"id",
    description:"User id",
    type:Number
  })
  @ApiResponse({ status: 200, description: 'User updated successfully' })
  @ApiResponse({ status: 400, description: 'Invalid user data' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  update(@Param('id') id: string, @Body() data: updateUser) {
    return this.usersService.update(Number(id), data);
  }

  @Delete(':id')
  @ApiOperation({summary:"Delete a user by his ID"})
  @ApiParam({
    name:"id",
    description:"User id",
    type:Number
  })
  @ApiResponse({ status: 204, description: 'User updated successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })  
  remove(@Param('id') id: string) {
    return this.usersService.remove(Number(id));
  }

  @Delete()
  @ApiOperation({summary:"Delete All Users in data base"})
  @ApiResponse({status:204, description:"All users deleted successfully"})
  @ApiResponse({ status: 500, description: 'Internal server error' })  
  removeAll() {
    return this.usersService.removeAll()
  }
}
