import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { Task } from "@prisma/client"

export interface DateUsers {
    Nombre: String;
    Edad: string;
    Departamento: string;
    Email: string
}

@Injectable()
export class TaskService {

    constructor(private prisma: PrismaService) { }

    async insertUserForFile(data: Array<Record<string, string>>): Promise<Task[]> {
        const insert = data.map(row => {
            const { Nombre, Edad, Departamento, Email } = row;
            if (!Nombre || !Edad || !Departamento || !Email) {
                throw new NotFoundException(`Invalid Data: ${JSON.stringify(row)}`)
            }
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
        return this.prisma.task.findMany();
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
}