import {DatabaseConnection} from './app/Database/Database';
import { CSV_FILE_PATH} from './app/config';
import {CSVParser} from "./app/utils/CSVParser";
import {CSVSanitizer} from './app/utils/CSVSanitizer';
import {SanitizedCSVRecord} from "./app/types";
import {Athlete,Sport,Team,Result,Event,Game} from "./app/Database/entities";
import {OlympicEvent} from "./app/Database/entities/OlympicEvent";

//
// const document = CSVParser.parse(CSV_FILE_PATH);
// const sanitizedCSV = CSVSanitizer.sanitizeArray(document);
// const olympicEvents = mapToValidDBObjects(sanitizedCSV);

const DB = DatabaseConnection.getInstance();

// DB.serialize(function () {
//     DB.all("select name from sqlite_master where type='table' and name='sports'", function (err : Error, tables : any) {
//         console.log(tables);
//     });
//
//     DB.all(`INSERT INTO sports values('${Math.round(Math.random() * 10000)}','fuck you${Math.round(Math.random() * 10000)}')`), function (err : Error, tables : any) {
//         console.log(tables);
//     };
//
// });



DB.serialize(function () {

    DB.run('CREATE TABLE lorem (info TEXT)');

    DB.each('SELECT * from sports', function(err : Error, tables : any) {
        console.log(tables);
    });

    // DB.all("SELECT name as NAME from sports"), function (err : Error, tables : any) {
    //     console.log(err,tables);
    // };
});




function mapToValidDBObjects(sanitizedSCV : Array<SanitizedCSVRecord>) {

    return [

        sanitizedSCV.map(sanitizedCSVRow => {

            const {event, sport : sportName, medal, team, NOC, year, city, season} = sanitizedCSVRow;

            return new OlympicEvent(
                new Athlete(sanitizedCSVRow),
                new Event(event),
                new Result(medal),
                new Sport(sportName),
                new Team(team,NOC),
                new Game(year,season,city)
            );
        })
    ];
}