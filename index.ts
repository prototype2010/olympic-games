import {DatabaseConnection} from './app/Database/Database';
import { CSV_FILE_PATH} from './app/config';
import {CSVParser} from "./app/utils/CSVParser";
import {CSVSanitizer} from './app/utils/CSVSanitizer';

const document = CSVParser.parse(CSV_FILE_PATH);

const sanitizedCSV = CSVSanitizer.sanitizeArray(document);

console.log(sanitizedCSV);

const DB = DatabaseConnection.getInstance();


DB.serialize(function () {
    DB.all("select name from sqlite_master where type='table'", function (err : Error, tables : any) {
        console.log(tables);
    });
});