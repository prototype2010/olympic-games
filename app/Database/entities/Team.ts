import { SanitizedCSVRecord, Table, WritableToDB} from "../../types";
import {Model} from "../utils/Model";

export class Team  extends Model  implements WritableToDB {
    private static readonly TABLE_NAME= Table.TEAMS;

    private _name : string;
    private _NOCName : string;


    constructor({team, noc} : SanitizedCSVRecord) {
        super();
        this._name = team;
        this._NOCName = noc;
    }

    write () {
        const {name, NOCName } = this;

        return super.insertToDB(Team.TABLE_NAME, {
            name,
            noc_name : NOCName,
        });
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