import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Prisma, Task } from "@prisma/client"
import { FileProps, IUsersService } from './interface/interface.users';
import { PrismaService } from '../prisma/prisma.service';
import { usersValidator } from './validator/users.validator';
import { CreateUsresDTO, UpdateUsersDTO } from './dto';


@Injectable()
export class UsersService implements IUsersService {

  constructor(
    private prisma: PrismaService,
    private validate: usersValidator
  ) { }

  async insertFile(data: FileProps[]): Promise<Task[]> {
    try {
      const insert = data.map(row => {
        if (!this.validate.validate(row)) {
          throw new NotFoundException(`Invalid Data: ${JSON.stringify(row)}`)
        }
        const { Nombre, Edad, Departamento, Email } = row
        return this.prisma.task.create({ data: { Nombre, Edad, Departamento, Email } })
      })
      return Promise.all(insert)
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  async findByQuerie(query: string): Promise<Task[]> {
    try {
      const result = await this.prisma.task.findMany({
        where: {
          OR: [
            { Nombre: { contains: query, mode: "insensitive" } },
            { Departamento: { contains: query, mode: "insensitive" } },
            { Email: { contains: query, mode: "insensitive" } },
            { Edad: { contains: query, mode: "insensitive" } },
          ]
        }
      })
      if (result.length === 0) {
        throw new NotFoundException("Not found")
      }
      return result
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  async findAll(): Promise<Task[]> {
    try {
      return await this.prisma.task.findMany()
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  async findOne(id: number): Promise<Task> {
    try {
      const result = await this.prisma.task.findUnique({ where: { id: id } })
      if (!result) {
        throw new NotFoundException(`User with id ${id} not found`)
      }
      return result;
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  async create(data: CreateUsresDTO): Promise<CreateUsresDTO> {
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

  async update(id: number, data: UpdateUsersDTO): Promise<UpdateUsersDTO> {
    try {
      const result = await this.prisma.task.update({ where: { id: id }, data: data })
      if (!result) {
        throw new NotFoundException(`User with id ${id} not found`)
      }
      return result
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  async remove(id: number): Promise<Task> {
    try {
      const result = await this.prisma.task.delete({ where: { id } })
      if (!result) {
        throw new NotFoundException(`User with ID ${id} not found`)
      }
      return result
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  async removeAll(): Promise<void> {
    try {
      await this.prisma.task.deleteMany()
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

}
