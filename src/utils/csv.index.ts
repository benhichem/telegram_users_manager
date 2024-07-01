import { json2csv } from "json-2-csv";
import { CsvFile } from "../types";

import fs from "node:fs";

export default class Csv implements CsvFile {
    constructor(private PathToFile: string) { }
    /**
     *
     *
     * @template T
     * @return {*}  {Array<T>}
     * @memberof Csv
     */
    read<T>(): Array<T> {
        let data = fs.readFileSync(this.PathToFile).toString().split('\n')
        const headers = data[0].split(',')
        let results: Array<any> = []
        data.map((line, index) => {
            if (index !== 0) {
                let obj: any = {}
                // TODO:Please think of a verfification to check if the line is not empty
                line.split(',').map((item, index) => {
                    obj[headers[index]]  = item
                })
                results.push(obj)
            }
        })
        return results as Array<T>
    }
    /**
     *
     *
     * @template T
     * @param {Array<T>} L
     * @memberof Csv
     */
    write<T extends Record<string, any>>(L: Array<T>): void {
        const CsvFormat = json2csv(L, {})
        fs.writeFileSync(this.PathToFile, CsvFormat)
    }
    /**
     *
     *
     * @template T
     * @param {number} ID
     * @param {T} item
     * @return {*}  {T}
     * @memberof Csv
     */
    update<T>(ID: number, item: T): T {
        throw new Error("Method not implemented.");
    }
    /**
     *
     *
     * @template T
     * @param {Array<T>} L1
     * @param {Array<T>} L2
     * @return {*}  {Array<T>}
     * @memberof Csv
     */
    cross_sections<T>(L1: Array<T>, L2: Array<T>): Array<T> {
        throw new Error("Method not implemented.");
    }
}


new Csv('./output.csv').read()