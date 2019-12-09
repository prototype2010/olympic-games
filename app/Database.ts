import sqlite3, {Database} from 'sqlite3';
import {DB_FILE_PATH} from './ConfigReader';

const SQL = sqlite3.verbose();

export class DatabaseConnection {

    private static instance : Database;

    private constructor(){}

    static getInstance() {

        if(!DatabaseConnection.instance) {
            DatabaseConnection.instance = new SQL.Database(DB_FILE_PATH,  SQL.OPEN_READWRITE,(err : Error | null) => {
                if (err) {
                    console.error(err.message);
                }
                console.log('Connected to database.....');
            });
        }

        return DatabaseConnection.instance;
    }
}