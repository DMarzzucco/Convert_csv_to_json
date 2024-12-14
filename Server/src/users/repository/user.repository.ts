import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUsresDTO, UpdateUsersDTO } from '../dto';
import { IUserRepository } from './interface/IUserRepository.interface';

@Injectable()
export class UserRepository implements IUserRepository {

    constructor(private prisma: PrismaService) { }

    public create(data: CreateUsresDTO) {
        return this.prisma.task.create({ data: data })
    }
    public async findMany(query: string) {
        return await this.prisma.task.findMany({
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

    public async findAll() {
        return await this.prisma.task.findMany();
    }
    public async findOne(id: number) {
        return await this.prisma.task.findUnique({ where: { id: id } })
    }
    public async update (id:number, data:UpdateUsersDTO){
        return await this.prisma.task.update({where: {id:id}, data:data});
    }
    public async delete (id:number) {
        return await this.prisma.task.delete({where:{id}})
    }
    public async deleteMany(){
        return await this.prisma.task.deleteMany();
    }
}