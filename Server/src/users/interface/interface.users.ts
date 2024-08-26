import { Task } from "@prisma/client"
import { createUser } from "../dto/create-user.dto";
import { updateUser } from "../dto/update-user.dto";

export interface IUsersService {

    insertFile(data: Array<Record<string, string>>): Promise<createUser[]>;

    findByQuerie(query: string): Promise<Task[]>;

    findAll(): Promise<Task[]>

    findOne(id: number): Promise<Task>;

    create(data: createUser): Promise<createUser>;

    update(id: number, data: updateUser): Promise<updateUser>;

    remove(id: number): Promise<Task>;

    removeAll(): Promise<void>;
}