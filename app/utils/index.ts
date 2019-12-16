import {Athlete, Event, Game, Result, Sport, Team} from "../Database/entities";
import {OlympicEvent} from "../Database/entities/OlympicEvent";
import {SanitizedCSVRecord} from "../types";

export function mapToValidDBObjects(sanitizedSCV : Array<SanitizedCSVRecord>) {

    return sanitizedSCV.map(sanitizedCSVRow => {

        const {event, sport : sportName, medal, team, NOC, year, city, season} = sanitizedCSVRow;

        return new OlympicEvent(
            new Athlete(sanitizedCSVRow),
            new Event(event),
            new Result(medal),
            new Sport(sportName),
            new Team(team,NOC),
            new Game(year,season,city)
        );
    })
        ;
}