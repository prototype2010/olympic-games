import {DatabaseConnection} from './app/Database/Database';
import { CSV_FILE_PATH} from './app/config';
import {CSVParser} from "./app/utils/CSVParser";
import {CSVSanitizer} from './app/utils/CSVSanitizer';
import {mapToValidDBObjects} from "./app/utils";
import {resolve} from 'path';
import {Table} from "./app/types";


const DB = DatabaseConnection.getInstance();


(async function init() {
    const readDocument = await CSVParser.parse(resolve(__dirname,CSV_FILE_PATH));

    const sanitizedCSV =  CSVSanitizer.sanitizeArray(readDocument);
    const olympicEvents = mapToValidDBObjects(sanitizedCSV);



})();



DB.serialize(function () {

    // olympicEvents.forEach(({team}) => {
    //    DB.run(team.formQuery(Table.TEAMS))
    // })
    //
    // DB.run(`INSERT INTO teams values (null, 'name${Math.random()}', 'NOCNAME${Math.random()}')`)
    //
    // DB.each('SELECT * from teams', function(err : Error, tables : any) {
    //     console.log(err, tables);
    // });

    // DB.all('SELECT name from teams'), function (err : Error, tables : any) {
    //     console.log(err,tables);
    // };

    // DB.all("SELECT name as NAME from sports"), function (err : Error, tables : any) {
    //     console.log(err,tables);
    // };


});



// DB.serialize(function () {

    // DB.run('insert into sports values (1,"fuck you")');

    // DB.each('SELECT name from sports', function(err : Error, tables : any) {
    //     console.log(err, tables);
    // });
    //
    // DB.all("SELECT name as NAME from sports"), function (err : Error, tables : any) {
    //     console.log(err,tables);
    // };
// });

