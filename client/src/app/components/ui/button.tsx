"use client"

import { useRouter } from "next/navigation"
import { deleteAll, deleteUser, downloadField } from "../../api/api.response"
import { actions, UserParams } from "@/interface/interface"



export const EmptyButton: React.FC = () => {
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

export const DownloadButton: React.FC<actions> = ({ users }: any) => {

    const handleDownload = async () => {
        try {
            const data = await downloadField();
            const url = window.URL.createObjectURL(data)
            const a = document.createElement("a");
            a.href = url;
            a.download = "Userdata.csv";
            document.body.appendChild(a);
            a.click();
            a.remove();
        } catch (error: any) {
            throw new Error(`Error in button download ${error.messsage}`)
        }
    }
    return (users && users.length > 0 ? (
        <button onClick={handleDownload}>
            Download CSV
        </button>
    ) : null)
}