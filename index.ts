import {DatabaseConnection} from './app/Database/Database';
import {CSV_FILE_PATH, sanitizeConfig} from './config';
import {CSVParser} from "./app/utils/CSVParser";
import {CSVSanitizer} from './app/utils/CSVSanitizer';
import {mapToValidDBObjects} from "./app/utils";
import {resolve} from 'path';
import {Table} from "./app/types";
import {SanitizeExecutor} from "./app/utils/SanitizeExecutor";
import {Athlete} from "./app/Database/entities";
import {sqlite3} from "sqlite3";
import {writeToDB} from "./app/Database/utils";
import {config} from "dotenv";


const DB = DatabaseConnection.getInstance();


async function init() {

    const readDocument = await CSVParser.parse(resolve(__dirname,CSV_FILE_PATH));

    const sanitizedCSV =  SanitizeExecutor.sanitizeArray(readDocument, sanitizeConfig);
    const {rows} = mapToValidDBObjects(sanitizedCSV);

    DB.serialize(async function () {

        DB.run(`DELETE FROM ${Table.SPORTS}`)
        DB.run(`DELETE FROM ${Table.TEAMS}`)
        DB.run(`DELETE FROM ${Table.RESULTS}`)
        DB.run(`DELETE FROM ${Table.EVENTS}`)
        DB.run(`DELETE FROM ${Table.ATHLETES}`)
        DB.run(`DELETE FROM ${Table.GAMES}`)
    });


    for await (const row of rows) {
        await row.insertToDb()
    }


    DB.close();

    console.log('DB connection closed');

};

init()
    .then(result => console.log('result'))
    .catch(e => console.log(e));



