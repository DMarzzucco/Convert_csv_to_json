"use client";

import React, { useState } from "react";
import { Querysearch } from "../../api/api.response";
import { actions } from "@/interface/interface";

export const SearchBar: React.FC<actions> = ({ users }) => {

    const [query, setQuery] = useState<string>('')
    const [results, setResults] = useState<any[]>([]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value)
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const data = await Querysearch(query)
            setResults(data)
        } catch (error: any) {
            throw new Error(error.message)
        }
    }
    return (users && users.length > 0 ? (
        <div>
            <form onSubmit={handleSubmit} className="w-full flex justify-center items-center">
                <input
                    onChange={handleInputChange}
                    value={query}
                    id="search"
                    type="search"
                    placeholder="Search Data"
                    className="w-full"
                />
                <button type="submit" className="w-auto">Search</button>
            </form>
            <div>
                {results.length > 0 ? (
                    <ul>
                        {results.map((result) => (
                            <li key={result.id}>
                                <p><strong>Nombre:</strong> {result.Nombre}</p>
                                <p><strong>Edad:</strong> {result.Edad}</p>
                                <p><strong>Departamento:</strong> {result.Departamento}</p>
                                <p><strong>Email:</strong> {result.Email}</p>
                            </li>
                        ))}
                    </ul>
                ) : null}
            </div>
        </div>
    ) : null)
}