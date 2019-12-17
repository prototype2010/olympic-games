import {Nullable, SanitizedCSVRecord, Table, Writable} from "../../types";
import {Identifyable} from "../utils/Identifyable";

export class Sport extends Identifyable  implements Writable {
    private static readonly TABLE_NAME= Table.SPORTS;

    private _name : string;

    constructor({sport} : SanitizedCSVRecord) {
        super();
        this._name = sport;
    }

    formQuery () {
        const {name} = this;

        return `INSERT INTO ${Sport.TABLE_NAME} VALUES (null,"${name}")`;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }
}