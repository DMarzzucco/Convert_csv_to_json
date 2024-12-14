import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Prisma, Task } from "@prisma/client"
import { FileProps} from '../interface/interface.users';
import { usersValidator } from '../validator/users.validator';
import { CreateUsresDTO, UpdateUsersDTO } from '../dto';
import { IUsersService } from './interface/IUserService.interface';
import { IUserRepository } from '../repository/interface/IUserRepository.interface';


@Injectable()
export class UsersService implements IUsersService {

  constructor(
    private  repository: IUserRepository,
    private validate: usersValidator
  ) { }

  async insertFile(data: FileProps[]): Promise<Task[]> {
    try {
      const insert = data.map(row => {
        if (!this.validate.validate(row)) {
          throw new NotFoundException(`Invalid Data: ${JSON.stringify(row)}`)
        }
        const { Nombre, Edad, Departamento, Email } = row
        return this.repository.create({ Nombre, Edad, Departamento, Email } )
      })
      return Promise.all(insert)
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  async findByQuerie(query: string): Promise<Task[]> {
    try {
      const result = await this.repository.findMany(query);
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
      return await this.repository.findAll();
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  async findOne(id: number): Promise<Task> {
    try {
      const result = await this.repository.findOne(id);
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
      const result = await this.repository.create(data);
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
      const result = await this.repository.update(id, data);
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
      const result = await this.repository.delete(id);
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
      await this.repository.deleteMany();
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

}
