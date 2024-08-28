"use client";

import UiComps from "@/components/ui/comp.ui";
import { useRouter } from "next/navigation";
import React from "react";
import { Upload } from "../api/api.response";

export default function UploadFile() {

    const err = new UiComps()

    const [file, setFile] = React.useState<File | null>(null)
    const [error, setError] = React.useState<boolean>(false)

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
        if (file.type !== "text/csv") {
            setError(true)
            const timer = setTimeout(() => { setError(false) }, 1000)
            return () => clearTimeout(timer)
        }
        const formData = new FormData()
        formData.append('file', file);
        try {
            await Upload(formData)
            router.refresh()
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
            {error && (<err.ErrorUpload />)}
        </form>
    )
}