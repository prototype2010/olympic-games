import {DatabaseConnection} from './app/Database/Database';
import { CSV_FILE_PATH} from './app/config';
import {CSVParser} from "./app/utils/CSVParser";
import {CSVSanitizer} from './app/utils/CSVSanitizer';
import {mapToValidDBObjects} from "./app/utils";


const readDocument = CSVParser.parse(CSV_FILE_PATH);
const sanitizedCSV = CSVSanitizer.sanitizeArray(readDocument);
const olympicEvents = mapToValidDBObjects(sanitizedCSV);

const DB = DatabaseConnection.getInstance();



// console.log(olympicEvents[1].team.formQuery(Table.TEAMS))


// DB.serialize(function () {
//     DB.all("select name from sqlite_master where type='table' and name='sports'", function (err : Error, tables : any) {
//         console.log(tables);
//     });
//
//     DB.all(`INSERT INTO sports values('${Math.round(Math.random() * 10000)}','fuck you${Math.round(Math.random() * 10000)}')`), function (err : Error, tables : any) {
//         console.log(tables);
//     };
// });



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

