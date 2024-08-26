import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, BadRequestException, InternalServerErrorException, Query, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { createUser } from './dto/create-user.dto';
import { updateUser } from './dto/update-user.dto';
import { CSVParserService } from './service/csv-parser.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly csv: CSVParserService
  ) { }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException("File is required")
    }
    if (file.mimetype !== "text/csv") {
      throw new BadRequestException("File must be a CSV")
    }
    try {
      const jsonResult = await this.csv.parse(file.buffer)
      await this.usersService.insertFile(jsonResult)
      return {message:"Upload File successfully from users/upload"}
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  @Get("search")
  async searchUserbyQuerie(@Query("q") q: string) {
    if (!q) {
      throw new BadRequestException("Query params is required")
    }
    try {
      const result = await this.usersService.findByQuerie(q.toLocaleLowerCase())
      if (!result) {
        throw new NotFoundException("Not found any result")
      }
      return result
    } catch (error) { }
  }


  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Post()
  create(@Body() data: createUser) {
    return this.usersService.create(data);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: updateUser) {
    return this.usersService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @Delete()
  removeAll() {
    return this.usersService.removeAll()
  }
}
