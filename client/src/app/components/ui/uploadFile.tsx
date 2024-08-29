"use client";

import UiComps from "@/components/ui/comp.ui";
import React from "react";
import { useLocalContext } from "@/app/context/local.context";

export default function UploadFile() {

    const err = new UiComps()

    const { UploadSubmit, handleInputChange, file, error } = useLocalContext()

    return (
        <form onSubmit={UploadSubmit} className="flex flex-col justify-center items-start ">
            <label htmlFor="file">Upload File</label>
            <input
                onChange={handleInputChange}
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