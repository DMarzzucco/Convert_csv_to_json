import React from "react";

export interface Users {
    id?: number;
    Nombre: string;
    Edad: string;
    Departamento: string;
    Email: string;
}
export interface ParamsProp { params: { id: number; } }

export interface ErrorInputProps { name: string }

export interface actions { users: any[] }
export interface UserParams {
    user: Users
}
export interface searchProps {
    users: Users[];
    error: boolean;
}
export interface LocalContextPop {
    query: string
    results: any[];
    file: File | null;
    error: boolean
    filter: Users[]
    FilterUsers: (users: Users[]) => void;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    SearchBarSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    UploadSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}
