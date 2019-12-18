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


const DB = DatabaseConnection.getInstance();


(async function init() {
    const readDocument = await CSVParser.parse(resolve(__dirname,CSV_FILE_PATH));

    const sanitizedCSV =  SanitizeExecutor.sanitizeArray(readDocument, sanitizeConfig);

    const {rows} = mapToValidDBObjects(sanitizedCSV);
    // const {athletes,events,games,sports,teams} = uniqueEntries;

    // console.log(athletes)




    await DB.serialize(async function () {


        // DB.get("SELECT * from teams", function(err, row) {
        //     console.log(err,row);
        // });
        //
        // DB.each('SELECT * from teams'), function (err : Error, tables : any) {
        //     console.log(err,tables);
        // };
        DB.run(`DELETE FROM ${Table.SPORTS}`)
        DB.run(`DELETE FROM ${Table.TEAMS}`)
        DB.run(`DELETE FROM ${Table.RESULTS}`)
        DB.run(`DELETE FROM ${Table.EVENTS}`)
        DB.run(`DELETE FROM ${Table.ATHLETES}`)
        DB.run(`DELETE FROM ${Table.GAMES}`)

        for (const row of rows) {
            await row.insertToDb()
        }


        //
        // rows.forEach(row => {
        //     ;
        // });

        // sports.forEach((sport) => {
        //     DB.run(sport.formQuery(),function(this: any, err : Error) {
        //
        //         if(err) {
        //             console.log(sport.formQuery());
        //
        //             console.log("ERROR" , err)
        //         }
        //
        //
        //         sport.dbID = this.lastID;
        //     });
        // });


        // olympicEvents.forEach(({team}) => {
        //    DB.run(team.formQuery(Table.TEAMS))
        // })
        //
        // DB.run(`INSERT INTO teams values (null, 'name${Math.random()}', 'NOCNAME${Math.random()}')`)
        //

        //

        //
        DB.all("SELECT name as NAME from sports"), function (err : Error, tables : any) {
            console.log(err,tables);
        };


    });



})();





