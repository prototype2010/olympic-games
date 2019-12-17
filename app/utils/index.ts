import {Athlete, Event, Game, Result, Sport, Team} from "../Database/entities";
import {OlympicEvent} from "../Database/entities/OlympicEvent";
import {Callable, SanitizedCSVRecord } from "../types";

export function makeHashKey(...args : any[]) {

    const objectToBeHashed = proceedHashFuncArguments(...args);

    return Object.entries(objectToBeHashed)
        .reduce((cumulative, current) => {

            const [key,value] = current;

            if(typeof key !== 'function' && typeof key !== 'object') {
                cumulative += `${key}=${value}#`;
            }

            return cumulative;

        },'');
}

function proceedHashFuncArguments(...args : any[]) {

    if(args.length === 1 && typeof args[0] === 'object') {
        return args[0];
    } else {
        return {...args};
    }
}

function getFromHashMap(map : Map<string,any>, instance : Callable) {

    const checkHasMap =  function (hashKeyArgs : Array<any>, ...callNewArgs : Array<any>) {

        const key = makeHashKey(hashKeyArgs);

        if(map.has(key)){
            return map.get(key);
        } else {
            const newObject = new instance(...callNewArgs);
            map.set(key, newObject);

            return newObject;
        }
    };

    checkHasMap.getMap = function () {
        return map;
    };

    return checkHasMap;
}

export function mapToValidDBObjects(sanitizedSCV : Array<SanitizedCSVRecord>) {

    const athletes = getFromHashMap(new Map(),Athlete);
    const sports = getFromHashMap(new Map(),Sport);
    const events = getFromHashMap(new Map(),Event);
    const teams = getFromHashMap(new Map(),Team);
    const games = getFromHashMap(new Map(),Game);
    // const result = getFromHashMap(new Map(),Result);

    const x =  sanitizedSCV.map(sanitizedCSVRow => {

        const {event, sport : sportName, medal, team, noc, year, city, season, id} = sanitizedCSVRow;

        // athletes(sanitizedCSVRow)

        return new OlympicEvent(
            athletes([id],sanitizedCSVRow),
            events([event],event),
            new Result(sanitizedCSVRow),
            sports([sportName],sportName),
            teams([team,noc],team,noc),
            games([year,season,city],year,season,city)
        );
    });


    console.log(athletes.getMap().size)
    console.log(sports.getMap().size)
    console.log(events.getMap().size)
    console.log(teams.getMap().size)
    console.log(games.getMap().size)
     console.log('total', x.length)


    return x;

}