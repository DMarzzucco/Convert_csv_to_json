"use client"

import { useRouter } from "next/navigation"
import { deleteAll, deleteUser } from "../api/api.response"
import { UserParams } from "@/interface/interface"


export const Button: React.FC = () => {
    const router = useRouter()
    const handleSubmit = async () => {
        await deleteAll();
        router.refresh()
    }
    return (<button className="bg-red-600" onClick={handleSubmit}>Empty List</button>)
}

export const ButtonsCard: React.FC<UserParams> = ({ user }: any) => {
    const router = useRouter()

    const HandledeleteUser = async (id: any) => {
        await deleteUser(id)
        router.push("/")
        router.refresh()
    }
    return (
        <div className="flex flex-row justify-center items-center w-full">
            <button onClick={(e) => {
                e.stopPropagation()
                HandledeleteUser(user.id)
            }} className="bg-red-500">
                Delete
            </button>
            <button
                onClick={(e) => {
                    e.stopPropagation()
                    router.push(`/users/${user.id}/edit`)
                }}
            >
                Edit
            </button>
        </div>
    )
}