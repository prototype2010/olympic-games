import { SanitizedCSVRecord, Table, Writable} from "../../types";
import {Identifyable} from "../utils/Identifyable";

export class Team  extends Identifyable  implements Writable {
    private static readonly TABLE_NAME= Table.TEAMS;

    private _name : string;
    private _NOCName : string;

    constructor({team, noc} : SanitizedCSVRecord) {
        super();
        this._name = team;
        this._NOCName = noc;
    }

    formQuery () {
        const {name,NOCName} = this;

        return `INSERT INTO "${Team.TABLE_NAME}" VALUES (null,"${name}","${NOCName}")`;
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