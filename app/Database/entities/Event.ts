import {Nullable, SanitizedCSVRecord, Table, Writable} from "../../types";
import {Identifyable} from "../utils/Identifyable";

export class Event extends Identifyable  implements Writable {
    private static readonly TABLE_NAME=  Table.EVENTS;
    private _name : string;

    constructor({name} : SanitizedCSVRecord) {
        super();
        this._name = name;
    }

    formQuery () {
        const {name} = this;

        return `INSERT INTO "${Event.TABLE_NAME}" VALUES (null,"${name}")`;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }
}