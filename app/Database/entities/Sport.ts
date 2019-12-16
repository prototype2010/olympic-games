import {Table, Writable} from "../../types";

export class Sport implements Writable {
    private _name : string;

    constructor(name: string) {
        this._name = name;
    }

    formQuery (tableName : Table) {
        return `INSERT `;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }
}