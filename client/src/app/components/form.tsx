"use client";

import UiComps from "@/components/ui/comp.ui";
import { createUsers, editUsers } from "../api/api.response";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export default function UserForm({ user }: any) {

    const Err = new UiComps();
    const router = useRouter()
    const params = useParams<{ id: string }>()

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            Nombre: user?.Nombre,
            Edad: user?.Edad,
            Departamento: user?.Departamento,
            Email: user?.Email,
        }
    })

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
                {...register('Nombre', { required: true })}
            />
            {errors.Nombre && <Err.ErrorImput name="Nombre" />}

            <input type="text" placeholder="Edad"
                {...register('Edad', { required: true })}
            />
            {errors.Edad && <Err.ErrorImput name="Edad" />}

            <input type="text" placeholder="Departamento"
                {...register('Departamento', { required: true })}
            />
            {errors.Departamento && <Err.ErrorImput name="Departamento" />}

            <input type="text" placeholder="Email"
                {...register('Email', { required: true })}
            />
            {errors.Email && <Err.ErrorImput name="Email" />}
            <button type="submit">
                {params.id ? 'Edit User' : 'Create User'}
            </button>
        </form>
    );
}