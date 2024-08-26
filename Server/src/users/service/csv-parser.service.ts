import { Injectable } from "@nestjs/common";
import { Readable } from "stream";
import * as csvParser from "csv-parser"
import { FileProps } from "../interface/interface.users";

@Injectable()
export class CSVParserService {
    async parse(buffer: Buffer): Promise<FileProps[]> {
        return new Promise<FileProps[]>((resolve, rejects) => {

            const json: FileProps[] = []
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