import {Entity} from "../../types";
import {DatabaseConnection} from "../Database";

export const writeToDB = (entity : Entity) =>  {

    if(entity.dbID) {
        return;
    }

    const DBQuery = entity.formQuery();


    DatabaseConnection.getInstance()
        .run(DBQuery,function (this: any, err : Error) {

            if(err) {
                console.error(`Error ocurred for query ${DBQuery}, ${err}`)
            } else {
                entity.dbID = this.lastID;
            }
        });
};