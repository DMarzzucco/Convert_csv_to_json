import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { Task } from "@prisma/client"
import { ITaskService } from "./interface/task.service.interface";
import { TaskValidator } from "./validator/task.validator";

@Injectable()
export class TaskService implements ITaskService {

    constructor(
        private prisma: PrismaService,
        private validate: TaskValidator
    ) { }

    async insertUserForFile(data: Array<Record<string, string>>): Promise<Task[]> {
        const insert = data.map(row => {
            if (!this.validate.validate(row)) {
                throw new NotFoundException(`Invalid Data: ${JSON.stringify(row)}`)
            }
            const { Nombre, Edad, Departamento, Email } = row;
            return this.prisma.task.create({ data: { Nombre, Edad, Departamento, Email } })
        })
        return Promise.all(insert)
    }

    async SearchUser(query: string) {
        return this.prisma.task.findMany({
            where: {
                OR: [
                    { Nombre: { contains: query, mode: "insensitive" } },
                    { Departamento: { contains: query, mode: "insensitive" } },
                    { Email: { contains: query, mode: "insensitive" } },
                    { Edad: { contains: query, mode: "insensitive" } },
                ]
            }
        })
    }
    async getAllTask(): Promise<Task[]> {
        const data = await this.prisma.task.findMany();
        if (data.length === 0){
            throw new NotFoundException('Not data')
        }
        return data;
    }

    async getTask(id: number): Promise<Task> {
        const result = await this.prisma.task.findUnique({ where: { id } })
        if (!result) {
            throw new NotFoundException(`User with id ${id} not found`)
        }
        return result;
    }

    async createDate(data: Task): Promise<Task> {
        return this.prisma.task.create({ data })
    }
    async update(id: number, data: Task): Promise<Task> {
        const result = await this.prisma.task.update({ where: { id }, data })
        if (!result) {
            throw new NotFoundException(`User with ID ${id} not found`)
        }
        return result;
    }
    async delete(id: number): Promise<Task> {
        const result = await this.prisma.task.delete({ where: { id } })
        if (!result) {
            throw new NotFoundException(`User with ID ${id} not found`)
        }
        return result
    }
    async delete_all(): Promise<void> {
        await this.prisma.task.deleteMany()
    }
}