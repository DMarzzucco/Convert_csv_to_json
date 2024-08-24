import { Injectable } from "@nestjs/common";
import { Readable } from "stream";
import * as csvParser from "csv-parser"

@Injectable()
export class CSVParserService {
    async parse(buffer: Buffer): Promise<Array<Record<string, string>>> {
        return new Promise<Array<Record<string, string>>>((resolve, reject) => {

            const jsonResult: Array<Record<string, string>> = []
            const CSV = Buffer.from(buffer).toString('utf-8');
            const stream = Readable.from(CSV);
            stream
                .pipe(csvParser())
                .on("data", (data) => jsonResult.push(data))
                .on("end", () => resolve(jsonResult))
                .on("error", (error) => reject(error))
        })

    }
}