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


const DB = DatabaseConnection.getInstance();


(async function init() {
    const readDocument = await CSVParser.parse(resolve(__dirname,CSV_FILE_PATH));

    const sanitizedCSV =  SanitizeExecutor.sanitizeArray(readDocument, sanitizeConfig);

    const {rows,uniqueEntries} = mapToValidDBObjects(sanitizedCSV);
    const {athletes,events,games,sports,teams} = uniqueEntries;

    // console.log(athletes)


    DB.serialize(function () {

        DB.run(`DELETE FROM ${Table.SPORTS}`)
        DB.run(`DELETE FROM ${Table.TEAMS}`)
        DB.run(`DELETE FROM ${Table.RESULTS}`)
        DB.run(`DELETE FROM ${Table.EVENTS}`)
        DB.run(`DELETE FROM ${Table.ATHLETES}`)
        DB.run(`DELETE FROM ${Table.GAMES}`)

        sports.forEach((sport) => {
            DB.run(sport.formQuery(),function(this: any, err : Error) {

                if(err) {
                    console.log(sport.formQuery());

                    console.log("ERROR" , err)
                }


                sport.dbID = this.lastID;
            });
        });

        teams.forEach((team) => {
            DB.run(team.formQuery(),function(this: any, err : Error) {

                if(err) {
                    console.log(team.formQuery());

                    console.log("ERROR" , err)
                }


                team.dbID = this.lastID;
            });
        });

        games.forEach((game) => {

            DB.run(game.formQuery(),function(this: any, err : Error) {

                if(err) {
                    console.log(game.formQuery());

                    console.log("ERROR" , err)
                }



                // game.dbID = this.lastID;
            });
        });

        //
        // DB.each('SELECT * from games', function(err : Error, tables : any) {
        //     console.log(err, tables);
        // });

        //

        // DB.run(`INSERT INTO sports VALUES (null,"Hermann Schreiber")`)
        //
        //



        // olympicEvents.forEach(({team}) => {
        //    DB.run(team.formQuery(Table.TEAMS))
        // })
        //
        // DB.run(`INSERT INTO teams values (null, 'name${Math.random()}', 'NOCNAME${Math.random()}')`)
        //


        DB.all('SELECT * from sports'), function (err : Error, tables : any) {
            console.log(err,tables);
        };

        // DB.all("SELECT name as NAME from sports"), function (err : Error, tables : any) {
        //     console.log(err,tables);
        // };


    });



})();





