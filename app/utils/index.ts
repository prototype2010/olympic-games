import {Athlete, Event, Game, Result, Sport, Team} from "../Database/entities";
import {OlympicEvent} from "../Database/utils/OlympicEvent";
import {Callable, SanitizedCSVRecord} from "../types";


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

function getFromHashMap<T>(map : Map<string,any>, instance : Callable) {

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
        return [...map.values()] as Array<T>;
    };

    return checkHasMap;
}

export function mapToValidDBObjects(sanitizedSCV : Array<SanitizedCSVRecord>) {

    const athletes = getFromHashMap<Athlete>(new Map(),Athlete);
    const sports = getFromHashMap<Sport>(new Map(),Sport);
    const events = getFromHashMap<Event>(new Map(),Event);
    const teams = getFromHashMap<Team>(new Map(),Team);
    const games = getFromHashMap<Game>(new Map(),Game);

    const rows : Array<OlympicEvent> =  sanitizedSCV.map(sanitizedCSVRow => {

        const {event, sport, noc, year, city, season, id} = sanitizedCSVRow;

        return new OlympicEvent(
            athletes([id],sanitizedCSVRow),
            events([event],sanitizedCSVRow),
            new Result(sanitizedCSVRow),
            sports([sport],sanitizedCSVRow),
            teams([noc],sanitizedCSVRow),
            games([year,season,city],sanitizedCSVRow)
        );
    });

    return {
        rows,
        uniqueEntries : {
            athletes : athletes.getMap(),
            sports : sports.getMap(),
            events : events.getMap(),
            teams : teams.getMap(),
            games : games.getMap(),
        }
    };
}