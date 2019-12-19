import {Medal, Nullable, SanitizedCSVRecord, Table, WritableToDB} from "../../types";
import {Model} from "../utils/Model";

export class Result extends Model  implements WritableToDB {
    private static readonly TABLE_NAME= Table.RESULTS;

    private _athleteId : Nullable<number>;
    private _gameId : Nullable<number>;
    private _sportId : Nullable<number>;
    private _eventId : Nullable<number>;
    private _medal : Medal;

    constructor({medal} : SanitizedCSVRecord) {
        super();
        this._athleteId = null;
        this._gameId = null;
        this._sportId = null;
        this._eventId = null;
        this._medal = medal;
    }

   write () {

       const {athleteId,eventId,gameId,sportId,medal} = this;

        return super.insertToDB(Result.TABLE_NAME,
            {
               athlete_id :  athleteId,
                game_id : gameId,
                sport_id : sportId,
                event_id : eventId,
                medal,
            });
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

    get sportId(): Nullable<number> {
        return this._sportId;
    }

    set sportId(value: Nullable<number>) {
        this._sportId = value;
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