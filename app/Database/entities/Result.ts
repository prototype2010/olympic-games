import {Medal, Nullable, Table, Writable} from "../../types";

export class Result implements Writable {
    private _athleteId : Nullable<number>;
    private _gameId : Nullable<number>;
    private _stortId : Nullable<number>;
    private _eventId : Nullable<number>;
    private _medal : Medal;

    constructor(medal : Medal) {
        this._athleteId = null;
        this._gameId = null;
        this._stortId = null;
        this._eventId = null;
        this._medal = medal;
    }

    formQuery (tableName : Table) {
        return ``;
    }

    get athleteId(): Nullable<number> {
        return this._athleteId;
    }

    set athleteId(value: Nullable<number>) {
        this._athleteId = value;
    }

    get gameId(): Nullable<number> {
        return this._gameId;
    }

    set gameId(value: Nullable<number>) {
        this._gameId = value;
    }

    get stortId(): Nullable<number> {
        return this._stortId;
    }

    set stortId(value: Nullable<number>) {
        this._stortId = value;
    }

    get eventId(): Nullable<number> {
        return this._eventId;
    }

    set eventId(value: Nullable<number>) {
        this._eventId = value;
    }

    get medal(): Medal {
        return this._medal;
    }

    set medal(value: Medal) {
        this._medal = value;
    }
}