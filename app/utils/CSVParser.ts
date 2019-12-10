import PAPAPARSE from "papaparse";
import {FileReader} from "./FileReader";
import {PARSE_OPTIONS} from "../config";

export class CSVParser {

    static parse(filePath: string) {

        const fileContent = FileReader.read(filePath);

        const {data, errors} =  PAPAPARSE.parse(fileContent, PARSE_OPTIONS as Object);

        if(errors) {
            console.error(errors);
        }

        return data;
    }
}