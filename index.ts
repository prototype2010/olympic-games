import {DatabaseConnection} from './app/Database/Database';
import x from 'papaparse';
import { CSV_FILE_PATH} from './app/config/ConfigReader';
import {FileReader} from "./app/utils/FileReader";

const content = FileReader.read(CSV_FILE_PATH);

const {data} = x.parse(content, {
    delimiter: ",",
    newline: "\r\n",
    quoteChar: '"',
    escapeChar: '"',
    header: true,
    transformHeader: undefined,
    dynamicTyping: false,
    preview: 0,
    encoding: "",
    worker: false,
    comments: false,
    step: undefined,
    error: undefined,
    download: false,
    downloadRequestHeaders: undefined,
    skipEmptyLines: false,
    chunk: undefined,
    fastMode: undefined,
    beforeFirstChunk: undefined,
    withCredentials: undefined,
    transform: undefined,
    delimitersToGuess: [',', '\t', '|', ';', x.RECORD_SEP, x.UNIT_SEP]
});

console.log(data);



const DB = DatabaseConnection.getInstance();


DB.serialize(function () {
    DB.all("select name from sqlite_master where type='table'", function (err : Error, tables : any) {
        console.log(tables);
    });
});