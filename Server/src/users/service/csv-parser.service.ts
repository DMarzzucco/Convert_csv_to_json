import { Injectable } from "@nestjs/common";
import { Readable } from "stream";
import * as csvParser from "csv-parser"

@Injectable()
export class CSVParserService {
    async parse(buffer: Buffer): Promise<Array<Record<string, string>>> {
        return new Promise<Array<Record<string, string>>>((resolve, rejects) => {

            const json: Array<Record<string, string>> = []
            const CSV = Buffer.from(buffer).toString('utf-8');
            const stream = Readable.from(CSV);
            stream
                .pipe(csvParser())
                .on("data", (data) => json.push(data))
                .on("end", () => resolve(json))
                .on("error", (error) => rejects(error))
        })
    }
}