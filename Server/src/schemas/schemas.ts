import fs from "fs"
import path from "path"
import { BsDate } from "../db/db";

export const ejSchemas = async () => {
    const schemaPath = path.join(__dirname, "sql", "../../sql/db.sql");
    const schema = fs.readFileSync(schemaPath, 'utf8');
    try {
        const res = await BsDate.query(schema)
        return res;
    } catch (error) {
        throw new Error(`${error}`)
    }
}