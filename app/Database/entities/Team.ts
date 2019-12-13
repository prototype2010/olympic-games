import {Table, Writable} from "../../types";

export class Team  implements Writable {
    private _name : string;
    private _NOCName : string;

    constructor(name: string, NOCName: string) {
        this._name = name;
        this._NOCName = NOCName;
    }

    formQuery (tableName : Table) {
        return ``;
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