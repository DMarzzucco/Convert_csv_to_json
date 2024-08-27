import { Users } from "@/interface/interface";
import { listOfUsers } from "./api/api.response";
import { Button } from "./ui/button";
import { ListUsers } from "./ui";
import UploadFile from "./ui/uploadFile";
import SearchBar from "./ui/searchBar";

export const dynamic = "force-dynamic"

export default async function Home() {

  const users = await listOfUsers()

  return (
    <section className="flex min-h-screen flex-col items-center justify-between p-24 w-full">

      <UploadFile/>

      <div className="flex flex-col justify-center items-center pt-5 w-full px-2 my-1 rounded-lg border border-slate-400">
        <SearchBar/>
        <div className="h-200 overflow-y-auto  my-2 border bg-transparent border-slate-400 rounded-lg w-full">
          {users.map((user: Users) => (<ListUsers user={user} key={user.id} />))}
        </div>
        <Button />
      </div>

    </section>
  );
}
