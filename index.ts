import {DatabaseConnection} from './app/Database/Database';
import {CSV_FILE_PATH, sanitizeConfig} from './config';
import {CSVParser} from "./app/utils/CSVParser";
import {mapToValidDBObjects} from "./app/utils";
import {resolve} from 'path';
import {Table} from "./app/types";
import {SanitizeExecutor} from "./app/utils/SanitizeExecutor";
import {writeToDB} from "./app/Database/utils";


const DB = DatabaseConnection.getInstance();


async function init() {

    const readDocument = await CSVParser.parse(resolve(__dirname,CSV_FILE_PATH));

    const sanitizedCSV =  SanitizeExecutor.sanitizeArray(readDocument, sanitizeConfig);
    const {rows, uniqueEntries} = mapToValidDBObjects(sanitizedCSV);

    const {teams,sports,games,events,athletes} = uniqueEntries;


    DB.serialize( function () {
        DB.run(`DELETE FROM ${Table.SPORTS}`);
        DB.run(`DELETE FROM ${Table.TEAMS}`);
        DB.run(`DELETE FROM ${Table.RESULTS}`);
        DB.run(`DELETE FROM ${Table.EVENTS}`);
        DB.run(`DELETE FROM ${Table.ATHLETES}`);
        DB.run(`DELETE FROM ${Table.GAMES}`);

        teams.forEach(team => {
            writeToDB(team);
        });

        sports.forEach(sport => {
            writeToDB(sport)
        });

        games.forEach(game => {
            writeToDB(game)
        });


        DB.serialize(function () {



            rows.forEach(({athlete, team}) => {

                DB.run(team.formQuery(), function () {


                    const  that = this;

                    DB.serialize(function () {
                        athlete.teamId = that.lastID;
                        console.log('$$$$$$$$',athlete.formQuery())
                        DB.run(athlete.formQuery());

                    })

                });

                // row.bindTeamId();
            });


        });



        // DB.parallelize( function () {
        //
        //
        //     rows.forEach(({athlete, team}) => {
        //
        //         console.log(team);
        //
        //         // row.bindTeamId();
        //     });

            // athletes.forEach(athlete => {
            //     DB.run(athlete.formQuery())
            // });


            // DB.all('SELECT * from sports', (err, res) => {
            //     console.log(err,res);
            // })
            // teams.forEach(team => {
            //     DB.run(team.formQuery())
            // });

        // });

        // rows.forEach(row => {
        //     row.bindTeamId();
        // });
        //
        // athletes.forEach(athlete => {
        //     DB.run(athlete.formQuery())
        // });
        //

        // DB.all('SELECT * from sports', (err, res) => {
        //     console.log(err,res);
        // })
        // teams.forEach(team => {
        //     DB.run(team.formQuery())
        // });



        // rows.forEach(row => {
        //     row.insertToDb();
        // });
    });


    DB.serialize( function () {



        DB.all('SELECT * from athletes', (err, res) => {
            console.log(err,res);
        })

    });



    console.log('DB connection closed');

}

init()
    // .then(result => DB.close())
    .catch(e => console.log(e));



