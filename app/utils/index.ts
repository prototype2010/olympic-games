import {Athlete, Event, Game, Result, Sport, Team} from "../Database/entities";
import {OlympicEvent} from "../Database/entities/OlympicEvent";
import {SanitizedCSVRecord} from "../types";

export function mapToValidDBObjects(sanitizedSCV : Array<SanitizedCSVRecord>) {

    return sanitizedSCV.map(sanitizedCSVRow => {

        return new OlympicEvent(
            new Athlete(sanitizedCSVRow),
            new Event(sanitizedCSVRow),
            new Result(sanitizedCSVRow),
            new Sport(sanitizedCSVRow),
            new Team(sanitizedCSVRow),
            new Game(sanitizedCSVRow)
        );
    })
        ;
}