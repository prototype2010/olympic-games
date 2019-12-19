import {DatabaseConnection} from './app/Database/Database';
import {CSV_FILE_PATH, sanitizeConfig} from './config';
import {CSVParser} from "./app/utils/CSVParser";
import {mapToValidDBObjects} from "./app/utils";
import {resolve} from 'path';
import {Table} from "./app/types";
import {SanitizeExecutor} from "./app/utils/SanitizeExecutor";


const DB = DatabaseConnection.getInstance();


async function init() {

    const readDocument = await CSVParser.parse(resolve(__dirname,CSV_FILE_PATH));

    const sanitizedCSV =  SanitizeExecutor.sanitizeArray(readDocument, sanitizeConfig);
    const {rows, uniqueEntries} = mapToValidDBObjects(sanitizedCSV);

    const {teams,sports,games,events,athletes} = uniqueEntries;


    // drop tables
    for await (const tableName of Object.values(Table)) {
        await DB.raw(`DELETE FROM ${tableName}`);
    }
    console.log('Tables dropeed');

    for await (const game of games) {
        await game.write();
    }

    console.log(`${games.length} games inserted`);


    for await (const event of events) {
        await event.write();
    }

    console.log(`${events.length} events inserted`);


    for await (const team of teams) {
        await team.write();
    }

    console.log(`${teams.length} teams inserted`);

    for await (const sport of sports) {
        await sport.write();
    }

    console.log(`${sports.length} sports inserted`);

    rows.forEach(({athlete,team}) => {
        athlete.teamId = team.dbID;
    });

    console.log(`Making remap athlete -> team`);

    for await (const athlete of athletes) {
        await athlete.write();
    }

    console.log(`${athletes.length} athletes inserted`);

    for await (const olympicEvents of rows) {

        const {sport,result,game,athlete,event} = olympicEvents;

        result.gameId = game.dbID;
        result.athleteId = athlete.dbID;
        result.eventId = event.dbID;
        result.sportId = sport.dbID;

        await result.write();
    }

    console.log(`${rows.length} olympicEvents inserted`);

    DatabaseConnection.getInstance().destroy(function () {
        console.log('Connection destroyed...');
    })
}

init().catch(e => console.log(e));



