import {DatabaseConnection} from './app/Database/Database';
import {FileReader,CSVParser, SanitizeCSV} from './app/CSVParser/index'
import {DB_FILE_PATH, CSV_FILE_PATH} from './app/config/ConfigReader';


const content = FileReader.read(CSV_FILE_PATH);
const objects = CSVParser.parse(content);

SanitizeCSV.sanitizeRecordsArray(objects);

const DB = DatabaseConnection.getInstance();


DB.serialize(function () {
    DB.all("select name from sqlite_master where type='table'", function (err : Error, tables : any) {
        console.log(tables);
    });
});