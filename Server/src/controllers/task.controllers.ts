import { Request, Response } from "express";
import { upload } from "../middleware/multer";
import { Readable } from "stream";
import csvParser from "csv-parser";

let userData: Array<Record<string, string>> = []

export const uploadFile = [upload.single('file'), async (req: Request, res: Response) => {
    const { file } = req
    if (!file) {
        console.log("el archivo es requerido")
        return res.status(400).json({ message: "file is required" })
    }
    if (file.mimetype !== "text/csv") {
        return res.status(400).json({ message: "file must be csv" })
    }
    const jsonResult: Array<Record<string, string>> = []
    try {
        const rawCSV = Buffer.from(file.buffer).toString('utf-8')
        // archivo convertido 
        await new Promise((resolve, reject) => {
            const stream = Readable.from(rawCSV)
            stream.pipe(csvParser())
                .on("data", (data) => jsonResult.push(data))
                .on("end", () => {
                    userData = jsonResult;
                    console.log("archivo transformado")
                    resolve(jsonResult)
                })
                .on("error", (error) => {
                    console.log("error en la linea 32 ", error)
                    reject(error)
                })
        })
        return res.status(200).json({ data: jsonResult, message: " el archivo se actulizo correctamente" })
    } catch (error) {
        console.log("error de servidor")
        return res.status(500).json({ message: "Server error" })
    }
}]
export const getUser = async (req: Request, res: Response) => {
    const { q } = req.query
    if (!q) {
        return res.status(400).json({ message: "Query params q is required" })
    }
    if (Array.isArray(q)) {
        return res.status(400).json({ message: "Query params q must be a string" })
    }
    const search = q.toString().toLocaleLowerCase()
    const filterData = userData.filter(row => {
        return Object
            .values(row)
            .some(value => value.toLowerCase().includes(search))
    })
    return res.status(200).json({ data: filterData })
}