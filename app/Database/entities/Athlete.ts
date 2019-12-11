import {Nullable, RawCSVRecord} from "../../../types";

class Athlete {

    private _fullName : string;
    private _sex : Nullable<string>;
    private _yearOfBirth : number;
    private _params  : {
        height?: number,
        weight?: number
    };
    private _teamId?: number;


    constructor(csvRow : RawCSVRecord) {
    }


    get fullName(): string {
        return this._fullName;
    }

    set fullName(value: string) {

        const noRoundBrackets = value.replace(/\(.*,.*\)/, () => '' );
        const noDoubleQuotes = noRoundBrackets.replace(/\(.*,.*\)/, () => '' );

        this._fullName = noDoubleQuotes
    }

    get sex(): Nullable<string> {
        return this._sex;
    }

    set sex(value: Nullable<string>) {

        if(!value) {
            this._sex = null;
        }
    }

    get yearOfBirth(): number {
        return this._yearOfBirth;
    }

    set yearOfBirth(value: number | string) {
        this._yearOfBirth = value;
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