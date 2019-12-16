import {Nullable, Season} from "../../types";

export class Game {
    private _year : Nullable<number>;
    private _season : Nullable<Season>;
    private _city: string;

    constructor(year: Nullable<number>, season: Nullable<Season>, city: string) {
        this._year = year;
        this._season = season;
        this._city = city;
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