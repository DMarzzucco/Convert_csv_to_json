import express, { Request, Response } from "express"
import cors from "cors"
import multer from "multer";
import csvToJson from "convert-csv-to-json"

const app = express();
const port = process.env.PORT ?? 3000

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

let userData: Array<Record<string, string>> = []

app.use(cors())

app.post("/api/files", upload.single('file'), async (req: Request, res: Response) => {
    // extraer el archivo
    const { file } = req
    // validar si tenemos el archivo
    if (!file) {
        console.log("el archivo no fue encontrado")
        return res.status(500).json({ message: "File is Required" })
    }
    // validar el csv
    if (file.mimetype !== "text/csv") {
        console.log('el archivo no es un csv')
        return res.status(500).json({ message: "File must be a CSV" })
    }
    let json: Array<Record<string, string>> = []
    try {
        // transformar el archivo a un buffer to string
        const rawCSV = Buffer.from(file.buffer).toString('utf8')
        console.log(rawCSV)
        // tramsform string to json
        json = csvToJson.csvStringToJson(rawCSV)
    } catch (error) {
        console.log("Error al parsear el archivo")
        return res.status(500).json({ message: "Error parsing the file" })
    }
    // guardarlo en json a una base de datos
    userData = json
    // retorn con un estado 200
    console.log("el archivo se cargo correctamente")
    return res.status(200).json({ data: json, message: "el archivo se cargo correctamente" })
})

app.get("/api/user", async (req: Request, res: Response) => {
    // extraer el queryy params 'q' de la respuesta
    const { q } = req.query
    // validad el quey params si existe
    if (!q) {
        return res.status(500).json({ message: "Query Params 'q' is required" })
    }
    if (Array.isArray(q)) {
        return res.status(500).json({ message: "Query param 'q' must be a string" })
    }
    // filtrar el dato de  base de datos o memoria con el query params
    const search = q.toString().toLowerCase()
    const filterData = userData.filter(row => {
        return Object
            .values(row)
            .some(value => value.toLowerCase().includes(search))
    })
    // retornar un estado 2000 con el filtri de datos
    return res.status(200).json({ data: filterData })
})

app.listen(port, () => {
    console.log(`Server listen ${port}`)
})