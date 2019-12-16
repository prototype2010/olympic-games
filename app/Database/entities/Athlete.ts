import {Nullable, SanitizedCSVRecord, Table, Writable} from "../../types";

interface AthleteParams {
    height? : number;
    weight? : number;
}

export class Athlete  implements Writable {
    private _fullName : string;
    private _sex : Nullable<string>;
    private _birthYear : Nullable<number>;
    private _params : AthleteParams;
    private _teamId: Nullable<number>;

    constructor(csvRecord : SanitizedCSVRecord) {
        const { name, sex,year,weight, height,  } = csvRecord;

        this._fullName = name;
        this._sex = sex;
        this._birthYear = year;
        this._teamId = null;

        const params : AthleteParams = {};

        if(weight) {
            params.weight = weight;
        }

        if(height) {
            params.height = height;
        }

        this._params = params;
    }

    formQuery (tableName : Table) {
        return ``;
    }

    get fullName(): string {
        return this._fullName;
    }

    set fullName(value: string) {
        this._fullName = value;
    }

    get sex(): Nullable<string> {
        return this._sex;
    }

    set sex(value: Nullable<string>) {
        this._sex = value;
    }

    get birthYear(): Nullable<number> {
        return this._birthYear;
    }

    set birthYear(value: Nullable<number>) {
        this._birthYear = value;
    }

    get params(): { height?: number; weight?: number } {

        return this._params;
    }

    set params(value: { height?: number; weight?: number }) {
        this._params = value;
    }

    get teamId(): Nullable<number> {
        return this._teamId;
    }

    set teamId(value: Nullable<number>) {
        this._teamId = value;
    }
}