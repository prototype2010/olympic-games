const  {DatabaseConnection} = require('./app/Database');


const DB = DatabaseConnection.getInstance();


DB.serialize(function () {
    DB.all("select name from sqlite_master where type='table'", function (err : Error, tables : any) {
        console.log(tables);
    });
});