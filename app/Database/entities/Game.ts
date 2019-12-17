import {Nullable, SanitizedCSVRecord, Season, Table, Writable} from "../../types";
import {Identifyable} from "../utils/Identifyable";

export class Game extends Identifyable  implements Writable {
    private static readonly TABLE_NAME= Table.GAMES;

    private _year : Nullable<number>;
    private _season : Nullable<Season>;
    private _city: string;

    constructor({ city, year, season,} : SanitizedCSVRecord) {
        super();
        this._year = year;
        this._season = season;
        this._city = city;
    }

    formQuery () {
        const {year, season, city} = this;

        return `INSERT INTO "${Game.TABLE_NAME}" VALUES (null,${year},"${season}","${city}")`;
    }

    get year(): Nullable<number> {
        return this._year;
    }

    set year(value: Nullable<number>) {
        this._year = value;
    }

    get season(): Nullable<Season> {
        return this._season;
    }

    set season(value: Nullable<Season>) {
        this._season = value;
    }

    get city(): string {
        return this._city;
    }

    set city(value: string) {
        this._city = value;
    }

}