export interface Users {
    id: number;
    Nombre: string;
    Edad: string;
    Departamento: string;
    Email: string;
}
export interface searchProps {
    users: Users[];
    error: boolean;
}