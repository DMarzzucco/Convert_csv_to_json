import { listOfUsers } from "../api/api.response"
import { SearchBar, DownloadButton, EmptyButton } from "./ui"
import { AuthLocalContext } from "../context/local.context"
import UploadFile from "./ui/uploadFile"

export default async function InfTemplate() {
    const users = await listOfUsers()
    return (
        <AuthLocalContext>
            <UploadFile />
            {users && users.length > 0 ? (
                <div className="flex flex-col justify-center items-center pt-5 w-full px-2 my-1 h-200">
                    <SearchBar users={users} />
                    <DownloadButton users={users} />
                    <EmptyButton users={users} />
                </div>
            ) : <div className="flex flex-col justify-center items-center pt-5 w-full px-2 my-1 rounded-lg border border-slate-400 h-200">No data records</div>}
        </AuthLocalContext>
    )
}