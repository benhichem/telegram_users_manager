import { json2csv } from "json-2-csv";
import { CsvFile } from "../types";

import fs from "node:fs";

export default class Csv implements CsvFile {
    constructor(private PathToFile:string){}
    read<T>(): Array<T> {
        throw new Error("Method not implemented.");
    }
    write<T extends Record<string, any>>(L: Array<T>): void {
        const CsvFormat = json2csv(L, {})
        fs.writeFileSync(this.PathToFile,CsvFormat)
    }
    update<T>(ID: number, item: T): T {
        throw new Error("Method not implemented.");
    }
    cross_sections<T>(L1: Array<T>, L2: Array<T>): Array<T> {
        throw new Error("Method not implemented.");
    }
}
