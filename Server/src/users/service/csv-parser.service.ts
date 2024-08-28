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

    async downloadFile(data: any[]): Promise<string> {
        if (data.length === 0) {
            return "";
        }
        const header = Object.keys(data[0]);
        const rows = data.map(row => header.map(field => JSON.stringify(row[field], this.replacer)).join(','));
        return [header.join(","), ...rows].join('\r\n');
    }
    private replacer(key: string, value: any) {
        return value === null ? "" : value;
    }

}