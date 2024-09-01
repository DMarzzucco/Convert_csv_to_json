"use client";

import React from "react";
import { Users } from "@/interface/interface";
import { useLocalContext } from "@/app/context/local.context";
import ListUsers from "./listUsers";

export const SearchBar: React.FC<{ users: Users[] }> = ({ users }) => {
    const { SearchBarSubmit, handleInputChange, query, filter, FilterUsers } = useLocalContext()
    React.useEffect(() => { FilterUsers(users) }, [FilterUsers, query, users]);
    return (
        <div>
            <form onSubmit={SearchBarSubmit} className="w-full flex justify-center items-center">
                <input onChange={handleInputChange} value={query} id="search" type="search" placeholder="Search Data" className="w-full" />
            </form>
            <div className="h-200 w-500 overflow-y-auto my-2 border bg-transparent border-slate-400 rounded-lg ">
                {filter.length > 0 ? (filter.map((user) => (<ListUsers user={user} key={user.id} />))) : (
                    <div className=" h-full flex justify-center items-center text-3xl font-bold ">
                        No data recorded.
                    </div>
                )}
            </div>
        </div>
    )
}