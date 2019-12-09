import {readFileSync} from 'fs';
import {camelCase, zipObject} from 'lodash';
import {Runtime} from "inspector";
import ObjectPreview = module
import {type} from "os";

export class FileReader {

    static read(filePath:string) {
        try {
            return FileReader.getFileContent(filePath);
        } catch (e) {
            console.error(`Failed to parse CSV file by path ${filePath}`,e)
        }
    }

    private static getFileContent(filePath: string) {
        return readFileSync(filePath,'utf8');
    }
}

export class CSVParser {

    static parse(data : string | undefined) : Array<RawRawCSVRecord> {

        if(!data) {
            console.warn(`There is no data to parse, ${data}`);

            return;
        }

        const linesArray = CSVParser.separateByNewSring(data);
        const headers = CSVParser.extractHeaders(linesArray);
        const rows = CSVParser.extractData(linesArray);

        return CSVParser.mapHeadesToData(headers,rows);
    }

    static extractHeaders(linesArray : Array<string> = []) {
        const headers : string = linesArray[0];
        const headersArray :Array<string> = headers.split(',');

        return headersArray.map(header => camelCase(header));
    }

    static extractData(linesArray : Array<string> = []) {
        const recordsLines = linesArray.slice(1,linesArray.length -1);

        return recordsLines.map(recordsLine => recordsLine.split(','));
    }

    static mapHeadesToData(headers : Array<string>, rows : Array<Array<string>>) {

        return rows.map(row => {
            return zipObject(headers,row)
        });
    }

    static separateByNewSring(data : string) : Array<string> {
        return data.split('\r\n')
    }
}


type IndexedObject = {[index: string] : string}
type Primitive = number | string
type Nullable<T> = T | null;

enum Sex {
    M = 'M',
    F = 'F',
}

interface RawRawCSVRecord {
    id: Nullable<Primitive>,
    name: string,
    sex:  Nullable<Sex>,
    age:  string,
    height:  Nullable<Primitive>,
    weight: Nullable<Primitive>,
    team:  string,
    noc:  string,
    games:  string,
    year:  string,
    season:  string,
    city:  string,
    sport:  string,
    event:  string,
    medal:  string,
}



export class SanitizeCSV {

    static sanitizeRecordsArray(records : Array<RawRawCSVRecord>) {

        const {sanitize,isValid} = this;
        const validRecordsArray : Array<RawRawCSVRecord> = [];

        for(const record of records) {

            if(isValid(record)) {
                validRecordsArray.push(sanitize(record))
            }
        }

        return validRecordsArray;

    }

    static sanitize(record : RawRawCSVRecord) {

        const {saniziteName,saniziteParams, saniziteId} = this;

        return [saniziteParams, saniziteName, saniziteId]
            .reduce((cumulativeValue, current) => {

                return current(cumulativeValue);
            },record)
    }

    static isValid(record : RawRawCSVRecord) {
        return record && typeof record === 'object' && Object.keys(record).length > 0;
    }

    static saniziteId(record : RawRawCSVRecord) {
        const {parseInt} = this;
        const {id} = record;

        record.id = parseInt(id);

        return record;
    }

    static saniziteParams(record : RawRawCSVRecord) {

        const {parseInt} = this;
        const {height, weight} = record;


            record.height = parseInt(height);
            record.weight = parseInt(weight);

        return record;
    }

    static parseInt(value : Nullable<Primitive>) : Nullable<number> {

        const parsed = Number.parseInt(value as string);

        if(value && Number.isFinite(parsed)  && !Number.isNaN(parsed)) {
            return parsed;
        } else {
            return null;
        }
    }

    static saniziteName (record : RawRawCSVRecord) {

        return record;
    }

    static replaceAll(value : string,...args : Array<string>) {

        return args.map(stringToReplace => {

        })

    }


}

