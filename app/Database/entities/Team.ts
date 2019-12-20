import {SanitizedCSVRecord, Table, Writable} from "../../types";

export class Team  implements Writable {
    private static readonly TABLE_NAME= Table.TEAMS;

        private _name : string;
    private _NOCName : string;

    constructor({name, noc} : SanitizedCSVRecord) {
        this._name = name;
        this._NOCName = noc;
    }

    formQuery (tableName : Table) {
        return `INSERT INTO ${tableName} VALUES ()`;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get NOCName(): string {
        return this._NOCName;
    }

    set NOCName(value: string) {
        this._NOCName = value;
    }
}