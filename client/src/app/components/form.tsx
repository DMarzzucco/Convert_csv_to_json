import { searchProps } from "@/interface/interface";

export default function List({ users = [], error = false }: searchProps) {
    return (
        <div className="bg-slate-400 pt-5 w-full px-2 my-1 rounded-lg">
            <div className="h-200 overflow-y-auto  my-2 border bg-slate-800 border-slate-400">
                {
                // users?.length > 0 ? (
                    users.map((user) => (
                        <div key={user.id} className="flex flex-col justify-start items-start p-1  border border-slate-400 ">
                            <h2 className="font-bold text-xl">{user.Nombre}</h2>
                            <div className="flex flex-col justify-start items-start">
                                <p>Departamento: <span className="font-bold">{user.Departamento}</span> </p>
                                <p>age: <span className="font-bold">{user.Edad}</span> </p>
                                <p>email: <span className="font-bold">{user.Email}</span></p>
                            </div>
                        </div>
                    ))
                // ) : (<p>No hay usarios</p>)
                }

                {error && <p>tiempo expirado </p>}
            </div>
        </div>
    )
}