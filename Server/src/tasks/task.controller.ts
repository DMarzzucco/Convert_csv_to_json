import { Controller, Get, Post, Put, Delete, Body, Param } from "@nestjs/common";
import { Task } from "@prisma/client"
import { TaskService } from "./task.service";

@Controller("task")
export class TaskControllers {

    constructor(private readonly taskService: TaskService) { }

    @Get()
    async getAll() {
        return this.taskService.getAllTask()
    }
    @Get(":id")
    async getOne(@Param("id") id: string) {
        return this.taskService.getTask(Number(id))
    }
    @Post()
    async create(@Body() data: Task) {
        return this.taskService.createDate(data)
    }
    @Put(":id")
    async update(@Param("id") id:string, @Body() data:Task) {
        return this.taskService.update(Number(id), data)
    }
    @Delete(":id")
    async delete (@Param("id") id:string){
        return this.taskService.delete(Number(id))
    }
}