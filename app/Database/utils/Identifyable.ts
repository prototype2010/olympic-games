import {Nullable} from "../../types";

export class Identifyable {
    protected _dbID: Nullable<number> = null;

    get dbID(): Nullable<number> {
        return this._dbID;
    }

    set dbID(value: Nullable<number>) {
        this._dbID = value;
    }
}