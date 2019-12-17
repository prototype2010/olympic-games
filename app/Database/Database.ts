import sqlite3 from 'sqlite3';
import {DB_FILE_PATH} from '../../config'

const SQL = sqlite3.verbose();

export class DatabaseConnection {

    private static instance = new SQL.Database(DB_FILE_PATH,  SQL.OPEN_READWRITE,(err : Error | null) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Connected to database.....');
    });

    private constructor(){}

    static getInstance() {
        return DatabaseConnection.instance;
    }
}

