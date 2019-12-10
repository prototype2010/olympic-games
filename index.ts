import {DatabaseConnection} from './app/Database/Database';
import { CSV_FILE_PATH} from './app/config';
import {CSVParser} from "./app/utils/CSVParser";

const data = CSVParser.parse(CSV_FILE_PATH);

// console.log(data);

const DB = DatabaseConnection.getInstance();


DB.serialize(function () {
    DB.all("select name from sqlite_master where type='table'", function (err : Error, tables : any) {
        console.log(tables);
    });
});