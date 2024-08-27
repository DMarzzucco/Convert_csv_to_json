"use client";

import { useRouter } from "next/navigation"
import { ButtonsCard } from "./button";

export default function ListUsers({ user }: any) {
    const router = useRouter()
    return (
        <div onClick={() => { router.push(`/users/${user.id}`) }}
            className="flex flex-row justify-between items-center p-1 py-3  border border-slate-400 ">
            <div className="flex flex-col justify-start items-start">
                <h2 className="font-bold text-xl">{user.Nombre}</h2>
                <p>Departamento: <span className="font-bold">{user.Departamento}</span> </p>
                <p>age: <span className="font-bold">{user.Edad}</span> </p>
                <p>email: <span className="font-bold">{user.Email}</span></p>
            </div>
            <div className="flex justify-center items-center w-40">
                <ButtonsCard user={user} />
            </div>
        </div>
    )
}