import {Nullable, SanitizedCSVRecord, Sex, Table, WritableToDB} from "../../types";
import {Model} from "../utils/Model";

interface AthleteParams {
    height? : number;
    weight? : number;
}

export class Athlete extends Model implements WritableToDB {
    private static readonly TABLE_NAME= Table.ATHLETES;

    private _fullName : string;
    private _sex : Nullable<Sex>;
    private _birthYear : Nullable<number>;
    private _params : AthleteParams;
    private _teamId: Nullable<number>;

    constructor({ name, sex,year,weight, height,} : SanitizedCSVRecord) {
        super();
        
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

    write() {

        const {fullName, sex, teamId,params,birthYear} = this;

        return super.insertToDB(Athlete.TABLE_NAME, {
            full_name : fullName,
            sex,
            team_id : teamId,
            params : JSON.stringify(params),
            year_of_birth : birthYear,
        })
    }

    get fullName(): string {
        return this._fullName;
    }

    set fullName(value: string) {
        this._fullName = value;
    }

    get sex(): Nullable<Sex> {
        return this._sex;
    }

    set sex(value: Nullable<Sex>) {
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