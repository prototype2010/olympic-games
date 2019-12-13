import {Nullable, SanitizedCSVRecord} from "../../types";

class Athlete {
    private _fullName : string;
    private _sex : Nullable<string>;
    private _birthYear : Nullable<number>;
    private _params : {
        height? : number;
        weight? : number;
    };
    private _teamId: number;


    constructor(csvRecord : SanitizedCSVRecord) {

        const {fullName, sex,year,weight, height, } = csvRecord;

        this._fullName = fullName;
        this._sex = sex;
        this._birthYear = birthYear;
        this._params = {};
        this._teamId = -1;
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

    get teamId(): number {
        return this._teamId;
    }

    set teamId(value: number) {
        this._teamId = value;
    }
}