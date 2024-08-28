import { Users } from "@/interface/interface"
import { listOfUsers } from "../api/api.response"
import { SearchBar, ListUsers, DownloadButton, EmptyButton } from "./ui"

export default async function InfTemplate() {
    const users = await listOfUsers()

    return (
        <div className="flex flex-col justify-center items-center pt-5 w-full px-2 my-1 rounded-lg border border-slate-400">
            <SearchBar users={users} />
            <div className="h-200 overflow-y-auto  my-2 border bg-transparent border-slate-400 rounded-lg w-full">
                {users && users.length > 0 ? (
                    users.map((user: Users) => (
                        <ListUsers user={user} key={user.id} />
                    ))) : (
                    <div className="w-full flex justify-center items-center h-full text-3xl font-bold ">
                        No data recorded.
                    </div>
                )}
            </div>
            <DownloadButton users={users} />
            <EmptyButton />
        </div>
    )
}