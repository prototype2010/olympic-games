import {SanitizedCSVRecord, Table, Writable} from "../../types";

export class Sport implements Writable {
    private static readonly TABLE_NAME= Table.SPORTS;

        private _name : string;

    constructor({name} : SanitizedCSVRecord) {
        this._name = name;
    }

    formQuery () {
        const {name} = this;

        return `INSERT INTO '${Sport.TABLE_NAME}' VALUES (null,'${name}')`;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }
}