import { ParamsProp } from "@/interface/interface";
import UserForm from "../components/form";
import { detailsUsers } from "../api/api.response";


export default async function PageUsers({ params }: ParamsProp) {
    const user = await detailsUsers(params.id)
    return (
        <section className="flex min-h-screen flex-col items-center justify-center p-24">
            <h1 className="font-bold text-3xl">
                {params.id ? "Edit User" : "Create a New User"}
            </h1>
            <UserForm user={user} />
        </section>
    );
}