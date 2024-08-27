"use client";

import { createUsers, editUsers } from "../api/api.response";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export default function UserForm({ user }: any) {

    const { register, handleSubmit } = useForm({
        defaultValues: {
            Nombre: user?.Nombre,
            Edad: user?.Edad,
            Departamento: user?.Departamento,
            Email: user?.Email,
        }
    })
    const router = useRouter()
    const params = useParams<{ id: string }>()

    const onSubmit = handleSubmit(async (data) => {
        if (params.id) {
            await editUsers(params.id, data)
        } else {
            await createUsers(data)
        }
        router.push("/");
        router.refresh()
    })

    return (
        <form onSubmit={onSubmit} className="flex flex-col justify-center items-center p-3">

            <input type="text" placeholder="Nombre"
                {...register('Nombre')}
            />
            <input type="text" placeholder="Edad"
                {...register('Edad')}
            />
            <input type="text" placeholder="Departamento"
                {...register('Departamento')}
            />
            <input type="text" placeholder="Email"
                {...register('Email')}
            />
            <button type="submit">
                {params.id ? 'Edit User' : 'Create User'}
            </button>
        </form>
    );
}