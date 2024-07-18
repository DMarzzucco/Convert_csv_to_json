import { Request, Response } from "express";
import { upload } from "../middleware/multer";
import { Readable } from "stream";
import csvParser from "csv-parser";
import { BsDate } from "../db/db";


export const uploadFile = [upload.single('file'), async (req: Request, res: Response) => {
    const { file } = req
    if (!file) {
        console.log("el archivo es requerido")
        return res.status(400).json({ message: "file is required" })
    }
    if (file.mimetype !== "text/csv") {
        return res.status(400).json({ message: "file must be csv" })
    }
    let jsonResult: Array<Record<string, string>> = []
    try {
        const rawCSV = Buffer.from(file.buffer).toString('utf-8')
        // archivo convertido 
        await new Promise((resolve, reject) => {
            const stream = Readable.from(rawCSV)
            stream.pipe(csvParser())
                .on("data", (data) => jsonResult.push(data))
                .on("end", async () => {
                    const insertProm = jsonResult.map(row => {
                        const { Nombre, Edad, Departamento, Email } = row
                        if (!Nombre || !Edad || !Departamento || !Email) {
                            return Promise.reject(new Error(`Datos invalidos: ${JSON.stringify(row)}`))
                        }
                        const insertQ = `INSERT INTO convert_table (nombre, edad, departamento, email) VALUES ($1, $2, $3, $4)`;

                        return BsDate.query(insertQ, [Nombre, parseInt(Edad), Departamento, Email])
                    })
                    try {
                        await Promise.all(insertProm);
                        resolve(jsonResult)
                        return res.status(200).json({ data: jsonResult, message: `File upload and save it ` })
                    } catch (error) {
                        if (error instanceof Error) {
                            return res.status(500).json({ message: `Error saving data to Database, ${error.message}` })
                        }
                        return res.status(500).json({ message: "Error saving data:" })
                    }
                })
                .on("error", (error) => {
                    console.log(`${error}`)
                    reject(error)
                    return res.status(500).json({ message: "Error parsing the file" })
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
    const searchQ = `
    SELECT * FROM convert_table
     WHERE 
          LOWER("nombre") LIKE $1
          OR LOWER("departamento") LIKE $1
          OR LOWER("email") LIKE $1
     `;
    try {
        const result = await BsDate.query(searchQ, [`%${search}%`])
        return res.status(200).json({ data: result.rows })
    } catch (error) {
        return res.status(500).json({ message: `Error fetching data from database:${error}` })
    }
}

export const putUsers = async (req: Request, res: Response) => {
    const { nombre, edad, departamento, email } = req.body;
    try {
        const date = await BsDate.query(' INSERT INTO convert_table (nombre, edad, departamento, email) VALUES ($1,$2,$3,$4)', [nombre, edad, departamento, email])
        console.log('usuario creado')
        return res.status(200).json({ message: ` user ${date} was made` })
    } catch (error) {
        return res.status(500).json({ message: `Server ${error}` })
    }
}