import { detailsUsers } from "@/app/api/api.response"
import { ButtonsCard } from "@/app/ui/button";

export default async function UsersDetails({ params }:any) {
    const users = await detailsUsers(params.id);
    return (
        <section className=" flex flex-col pt-5 justify-center items-center h-screen">
            <div className="flex flex-col justify-center">
                <div className="pt-9 mt-7">
                    <h1 className="font-bold text-6xl">{users.Nombre}</h1>
                </div>
                <div className="detailsCard">
                    <h2>Edad</h2>
                    <span className="font-semibold text-xl">{users.Edad}</span>
                </div>
                <div className="detailsCard">
                    <h2 className="text-xl">Departamento</h2>
                    <p>{users.Departamento}</p>
                </div>
                <div className="detailsCard">
                    <h2>Email</h2>
                    <span>{users.Email}</span>
                </div>
            </div>
            <ButtonsCard user={users}/>
        </section>
    )
}