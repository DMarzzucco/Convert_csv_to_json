import { ErrorInputProps } from "@/interface/interface";
import React from "react";

export default class UiComps {

    ErrorImput: React.FC<ErrorInputProps> = ({ name }) => {
        return (
            <div className=" bg-red-500  border border-red-800 rounded-lg flex items-center justify-center w-full my-2">
                <span className="text-xs font-semibold p-1 text-slate-100">
                    The file {name} is required
                </span>
            </div>
        )
    }
    ErrorUpload: React.FC = () => {
        return (
            <div className=" bg-red-500  border border-red-800 rounded-lg flex items-center justify-center w-full my-2">
                <span className="text-xl font-semibold p-1 text-slate-100">
                    The file must be of type .csv
                </span>
            </div>
        )
    }
}