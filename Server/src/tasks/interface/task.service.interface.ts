import { Task } from "@prisma/client"

export interface ITaskService {

    insertUserForFile(data: Array<Record<string, string>>): Promise<Task[]>;

    SearchUser(query: string): Promise<Task[]>;

    getAllTask(): Promise<Task[]>

    getTask(id: number): Promise<Task>;

    createDate(data: Task): Promise<Task>;

    update(id: number, data: Task): Promise<Task>;

    delete(id: number): Promise<Task>;

    delete_all(): Promise<void>;
}