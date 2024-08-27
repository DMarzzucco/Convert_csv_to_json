import { Users } from "@/interface/interface";


// export async function ResUploadFile() {
//     const formData = new FormData();
//     formData.append('file', file);

//     const res = await fetch("http://localhost:3001/api/users/upload",{
//         method:'POST',
//         body:FormData
//     })
// }
export async function createUsers(data: any) {
    const res = await fetch("http://localhost:3001/api/users", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    const ret = await res.json()
    console.log(ret)
}

export async function listOfUsers() {
    const data = await fetch("http://localhost:3001/api/users", {
        cache: "no-store"
    })
    return await data.json()
}

export async function detailsUsers(id:number) {
    const data = await fetch(`http://localhost:3001/api/users/${id}`, {
        cache: "no-store"
    })
    return await data.json()
}


export async function editUsers(id:string,data: Users) {
    const res = await fetch(`http://localhost:3001/api/users/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    const ret = await res.json()
    console.log(ret)
}

export async function deleteAll() {
    const data = await fetch("http://localhost:3001/api/users", {
        method: 'DELETE'
    })
    return data

}

export async function deleteUser(id: Number) {
    const res = await fetch(`http://localhost:3001/api/users/${id}`, {
        method: 'DELETE'
    })
    return await res.json();
}