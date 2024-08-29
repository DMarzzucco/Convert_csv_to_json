"use client";

import React, { useContext } from "react";
import { Querysearch, Upload } from "../api/api.response";
import { LocalContextPop, Users } from "@/interface/interface";
import { useRouter } from "next/navigation";


export const LocalContext = React.createContext<LocalContextPop | undefined>(undefined)

export const useLocalContext = () => {
    const context = useContext(LocalContext);
    if (!context) {
        const error: any = Error
        throw new Error(error.message)
    }
    return context
}

export const AuthLocalContext: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const router = useRouter();

    const [query, setQuery] = React.useState<string>('')
    const [file, setFile] = React.useState<File | null>(null)
    const [error, setError] = React.useState<boolean>(false)

    const [results, setResults] = React.useState<any[]>([]);
    const [users, setUsers] = React.useState<Users[]>([])

    const [filter, setFilter] = React.useState<Users[]>(users)

    const FilterUsers = (users: Users[]) => {
        if (query) {
            const filterData = users.filter((user) =>
                user.Nombre.toLowerCase().includes(query.toLowerCase()) ||
                user.Departamento.toLowerCase().includes(query.toLowerCase()) ||
                user.Email.toLowerCase().includes(query.toLowerCase())
            )
            setFilter(filterData)
        }else {
            setFilter(users)
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.type === "file" && e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0])
        }
        if (e.target.type === "search") {
            setQuery(e.target.value)
        }
    }

    const SearchBarSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const data = await Querysearch(query)
            setResults(data)
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    const UploadSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault()

        if (file?.type !== "text/csv") {
            setError(true)
            const timer = setTimeout(() => { setError(false) }, 1000)
            return () => clearTimeout(timer)
        }
        const data = new FormData()
        data.append('file', file);
        try {
            await Upload(data)
            router.refresh()
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    return (
        <LocalContext.Provider value={{ query, results, handleInputChange, SearchBarSubmit, file, error, UploadSubmit, filter, FilterUsers }}>
            {children}
        </LocalContext.Provider>
    )
}