import {SanitizedCSVRecord, Table, Writable} from "../../types";

export class Event implements Writable {
    private static readonly TABLE_NAME=  Table.EVENTS;
    private _name : string;

    constructor({name} : SanitizedCSVRecord) {
        this._name = name;
    }

    formQuery () {
        const {name} = this;

        return `INSERT INTO '${Event.TABLE_NAME}' VALUES (null,'${name}')`;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }
}