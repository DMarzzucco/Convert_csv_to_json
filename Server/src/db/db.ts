import { Pool } from "pg";

export const BsDate = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: "convert",
    password: "5599",
    port: 5432
})