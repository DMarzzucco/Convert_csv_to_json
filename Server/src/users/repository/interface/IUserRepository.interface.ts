import { CreateUsresDTO, UpdateUsersDTO } from "src/users/dto";

export interface IUserRepository {
    create(data:CreateUsresDTO);

    findMany (query:string);

    findAll ();

    findOne(id:number);

    update(id:number, data:UpdateUsersDTO);

    delete(id:number);
    
    deleteMany();
}