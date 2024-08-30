import { Task } from "@prisma/client"
import { CreateUsresDTO, UpdateUsersDTO } from "../dto";

export interface IUsersService {

    insertFile(data: Array<Record<string, string>>): Promise<CreateUsresDTO[]>;

    findByQuerie(query: string): Promise<Task[]>;

    findAll(): Promise<Task[]>

    findOne(id: number): Promise<Task>;

    create(data: CreateUsresDTO): Promise<CreateUsresDTO>;

    update(id: number, data: UpdateUsersDTO): Promise<UpdateUsersDTO>;

    remove(id: number): Promise<Task>;

    removeAll(): Promise<void>;
}

export interface FileProps { [key: string]: string }