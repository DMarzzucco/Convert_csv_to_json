import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { Task } from "@prisma/client"

@Injectable()
export class TaskService {

    constructor(private prisma: PrismaService) { }

    async getAllTask(): Promise<Task[]> {
        return this.prisma.task.findMany();
    }

    async getTask(id: number): Promise<Task> {
        return this.prisma.task.findUnique({ where: { id } })
    }

    async createDate(data: Task): Promise<Task> {
        return this.prisma.task.create({ data })
    }
    async update(id: number, data:Task): Promise<Task> {
        return this.prisma.task.update({ where: { id }, data })
    }
    async delete(id: number): Promise<Task> {
        return this.prisma.task.delete({ where: { id } })
    }
}