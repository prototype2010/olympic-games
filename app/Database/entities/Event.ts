import {Table, Writable} from "../../types";

export class Event implements Writable {
    private _name : string;

    constructor(name: string) {
        this._name = name;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    formQuery (tableName : Table) {
        return ``;
    }
}