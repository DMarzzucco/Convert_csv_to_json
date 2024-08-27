export interface Users {
    id?: number;
    Nombre: string;
    Edad: string;
    Departamento: string;
    Email: string;
}
export interface ParamsProp { params: { id: number; } }

export interface UserParams{
    user:Users
}
export interface searchProps {
    users: Users[];
    error: boolean;
}