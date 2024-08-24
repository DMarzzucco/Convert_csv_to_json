import { Controller, Get, Post, Put, Delete, Body, Param, NotFoundException, HttpCode, UseInterceptors, UploadedFile, BadRequestException, InternalServerErrorException, Query } from "@nestjs/common";
import { Task } from "@prisma/client"
import { TaskService } from "./task.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { Readable } from "stream";
import csvParser from "csv-parser";

@Controller("task")
export class TaskControllers {

    constructor(private readonly taskService: TaskService) { }

    @Post('upload')
    @UseInterceptors(FileInterceptor("File"))
    async uploadFile(@UploadedFile() file: Express.Multer.File) {
        if (!File) {
            throw new BadRequestException("File is required")
        }
        if (file.mimetype !== "text/csv") {
            throw new BadRequestException("File must be a CSV")
        }
        let jsonResult: Array<Record<string, string>> = []
        try {
            const CSV = Buffer.from(file.buffer).toString('utf-8')
            await new Promise((resolve, reject) => {
                const stream = Readable.from(CSV);
                stream.pipe(csvParser())
                    .on("data", (data) => jsonResult.push(data))
                    .on("end", async () => {
                        try {
                            await this.taskService.insertUserForFile(jsonResult);
                            resolve(jsonResult);
                        } catch (error) {
                            throw new InternalServerErrorException(error.message)
                        }
                    })
                    .on('error', (error) => {
                        reject(error)
                        throw new InternalServerErrorException(error.message)
                    })
            })
        } catch (error) {
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
}