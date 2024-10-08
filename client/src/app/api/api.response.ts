import { Users } from "@/interface/interface";

const server = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001/api";

export async function downloadField() {
    const res = await fetch(`${server}/users/download`, {
        method: "GET",
        headers: {
            'Content-Type': 'text/csv'
        }
    })
    if (!res.ok) {
        throw new Error(`error in respons-api-download ${Error}`)
    }
    return await res.blob();

}
export async function Upload(data: FormData) {
    const res = await fetch(`${server}/users/upload`, {
        method: "POST",
        body: data
    })
    if (!res.ok) {
        const err: any = Error;
        throw new Error(err.message)
    }
    await res.json()
}
export async function Querysearch(query: string) {
    const res = await fetch(`${server}/users/search?q=${encodeURIComponent(query)}`)
    if (!res.ok) {
        const error: any = Error
        throw new Error(`Error en search bar ${error.message}`)
    }
    return await res.json()
}

export async function createUsers(data: any) {
    const res = await fetch(`${server}/users`, {
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
    const data = await fetch(`${server}/users`, { cache: "no-store" })
    return await data.json()
}

export async function detailsUsers(id: number) {
    const data = await fetch(`${server}/users/${id}`, { cache: "no-store" })
    return await data.json()
}

export async function editUsers(id: string, data: Users) {
    const res = await fetch(`${server}/users/${id}`, {
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
    const data = await fetch(`${server}/users`, { method: 'DELETE' })
    return data
}

export async function deleteUser(id: Number) {
    const res = await fetch(`${server}/users/${id}`, { method: 'DELETE' })
    return await res.json();
}