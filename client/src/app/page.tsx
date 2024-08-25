// "use client";

// import { useEffect, useState } from "react";
import { searchProps, Users } from "@/interface/interface";
import List from "./components/form";
import { GetServerSideProps } from "next";


export const ListofUsers: GetServerSideProps = async () => {
  try {
    const response = await fetch("http://localhost:3001/task",{
      method: "GET"
    });
    if (!response.ok) {
      return {
        props: {
          users: [],
          error: true,
        },
      };
    };
    
    const users: Users[] = await response.json()
    return {
      props: {
        users,
        error: false
      }
    };
  } catch (error: any) {
    return {
      props: {
        users: [],
        error: true
      }
    }
  }
}

export default function Home({ users = [], error = false }: searchProps) {
  // const [users, setUsers] = useState<Users[]>([])
  // const [error, setError] = useState<boolean>(false)

  // useEffect(() => {

  //   const data = async () => {
  //     try {
  //       const response = await fetch("http://localhost:3001/task")
  //       if (response.status === 404) {
  //         setError(true)
  //       }
  //       const data: Users[] = await response.json()
  //       setUsers(data)
  //     } catch (error: any) {
  //       throw new Error(error.message)
  //     }
  //   }
  //   data();
  // }, [])
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* <List users={users} error={error}/> */}
      <div className="text-white">
        {error ? (
          <h1>No hay datos</h1>
        ) : (
          users.map((user) => (
            <div key={user.id}>
              <h2>{user.Nombre}</h2>
              <p>Edad: {user.Edad}</p>
              <p>Departamento: {user.Departamento}</p>
              <p>Email: {user.Email}</p>
            </div>
          ))
        )}
      </div>
    </main>

    /* <div className="bg-slate-400 pt-5 w-full px-2 my-1 rounded-lg">
      <div className="h-200 overflow-y-auto  my-2 border bg-slate-800 border-slate-400">
        {users.map(user => (
          <div key={user.id} className="flex flex-col justify-start items-start p-1  border border-slate-400 ">
            <h2 className="font-bold text-xl">{user.Nombre}</h2>
            <div className="flex flex-col justify-start items-start">
              <p>Departamento: <span className="font-bold">{user.Departamento}</span> </p>
              <p>age: <span className="font-bold">{user.Edad}</span> </p>
              <p>email: <span className="font-bold">{user.Email}</span></p>
            </div>
          </div>
        ))}
        {error && <p>tiempo expirado </p>}
      </div>
    </div> */


  );
}
