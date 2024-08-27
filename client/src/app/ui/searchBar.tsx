"use client";

import { useState } from "react";

export default function SearchBar() {

    const [query, setQuery] = useState<string>('')
    const [results, setResults] = useState<any[]>([]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value)
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!query) {
            alert("Please enter a search query");
            return;
        }

        try {
            const res = await fetch(`http://localhost:3001/api/users/search?q=${encodeURIComponent(query)}`)
            if (res.ok) {
                const data = await res.json()
                setResults(data)
            }
        } catch (error: any) {
            throw new Error(error.message)
        }
    }
    return (
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
    )
}