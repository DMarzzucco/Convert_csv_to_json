import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { createUser } from './dto/create-user.dto';
import { updateUser } from './dto/update-user.dto';
import { Prisma, Task } from "@prisma/client"
import { IUsersService } from './interface/interface.users';
import { PrismaService } from 'src/prisma/prisma.service';
import { usersValidator } from './validator/users.validator';


@Injectable()
export class UsersService implements IUsersService {

  constructor(
    private prisma: PrismaService,
    private validate: usersValidator
  ) { }

  async insertFile(data: Array<Record<string, string>>): Promise<Task[]> {
    const insert = data.map(row => {
      if (!this.validate.validate(row)) {
        throw new NotFoundException(`Invalid Data: ${JSON.stringify(row)}`)
      }
      const { Nombre, Edad, Departamento, Email } = row
      return this.prisma.task.create({ data: { Nombre, Edad, Departamento, Email } })
    })
    return Promise.all(insert)
  }

  async findByQuerie(query: string): Promise<Task[]> {
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
  async findAll(): Promise<Task[]> {
    return await this.prisma.task.findMany()
  }

  async findOne(id: number): Promise<Task> {
    const result = await this.prisma.task.findUnique({ where: { id: id } })
    if (!result) {
      throw new NotFoundException(`User with id ${id} not found`)
    }
    return result;
  }

  async create(data: createUser): Promise<createUser> {
    try {
      const result = await this.prisma.task.create({ data: data });
      return result;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          throw new ConflictException(`User with name ${data.Nombre} alrady exits`)
        }
      }
      throw new InternalServerErrorException(error.message)
    }
  }

  async update(id: number, data: updateUser): Promise<updateUser> {
    const result = await this.prisma.task.update({ where: { id: id }, data: data })
    if (!result) {
      throw new NotFoundException(`User with id ${id} not found`)
    }
    return result
  }

  async remove(id: number): Promise<Task> {
    const result = await this.prisma.task.delete({ where: { id } })
    if (!result) {
      throw new NotFoundException(`User with ID ${id} not found`)
    }
    return result
  }

  async removeAll(): Promise<void> {
    await this.prisma.task.deleteMany()
  }

}
