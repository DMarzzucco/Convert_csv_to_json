import { Controller, Get, Post, Put, Delete, Body, Param, NotFoundException, HttpCode, UseInterceptors, UploadedFile, BadRequestException, InternalServerErrorException, Query } from "@nestjs/common";
import { Task } from "@prisma/client"
import { TaskService } from "./task.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { CSVParserService } from "./service/csv-parser.service";

@Controller("task")
export class TaskControllers {

    constructor(
        private readonly taskService: TaskService,
        private readonly csvParser:CSVParserService
    ) { }

    @Post('upload')
    @UseInterceptors(FileInterceptor("file"))
    async uploadFile(@UploadedFile() file: Express.Multer.File) {
        if (!file) {
            throw new BadRequestException("File is required")
        }
        if (file.mimetype !== "text/csv") {
            throw new BadRequestException("File must be a CSV")
        }
        try {
            const jsonResult = await this.csvParser.parse(file.buffer)
            await this.taskService.insertUserForFile(jsonResult)
            return { message: `File porcessed and data inserted successfully` };
        } catch (error) {
            console.log(error.message, "error linea 46")
            throw new InternalServerErrorException(error.message)
        }
    }

    @Get("search")
    async getUserforQ(@Query("q") q: string) {
        if (!q) {
            throw new BadRequestException("Query params is required")
        }
        try {
            const result = await this.taskService.SearchUser(q.toLowerCase());
            if (!result) {
                throw new NotFoundException(`Not foundit`)
            }
            return result
        } catch (error) {
            throw new InternalServerErrorException(error.message)
        }
    }


    @Get()
    async getAll() {
        return this.taskService.getAllTask()
    }
    @Get(":id")
    async getOne(@Param("id") id: string) {
        const users = this.taskService.getTask(Number(id))
        if (!users) {
            throw new NotFoundException(`User not found`)
        }
        return users
    }
    @Post()
    @HttpCode(201)
    async create(@Body() data: Task) {
        return this.taskService.createDate(data)
    }
    @Put(":id")
    async update(@Param("id") id: string, @Body() data: Task) {
        const users = await this.taskService.update(Number(id), data)
        if (!users) {
            throw new NotFoundException(`User not found`)
        }
        return users;
    }
    @Delete(":id")
    @HttpCode(204)
    async delete(@Param("id") id: string) {
        try {
            return this.taskService.delete(Number(id))
        } catch (error) {
            throw new NotFoundException(error.message)
        }
    }

    @Delete()
    @HttpCode(204)
    async deleteAll() {
        return this.taskService.delete_all()
    }
}