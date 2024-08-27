"use client";

import { useRouter } from "next/navigation";
import React from "react";

export default function UploadFile() {

    const [file, setFile] = React.useState<File | null>(null)

    const router = useRouter()

    const HandleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0])
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!file) {
            alert("Please select a file")
            return;
        }
        const formData = new FormData()
        formData.append('file', file);
        try {
            const res = await fetch("http://localhost:3001/api/users/upload", {
                method: "POST",
                body: formData
            })
            if (res.ok) {
                await res.json()
                router.refresh()
                // alert(data.message)
            }
        } catch (error: any) {
            alert(`Error: ${(error as Error).message}`)
        }
    }
    return (
        <form onSubmit={handleSubmit} className="flex flex-col justify-center items-start ">
            <label htmlFor="file">Upload File</label>
            <input
                onChange={HandleInput}
                type="file"
                name="file"
                accept=".csv"
            />
            {file && (
                <button type="submit" className="hover:bg-slate-300 hover:text-slate-700">
                    Deploy
                </button>
            )}
        </form>
    )
}