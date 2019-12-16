import {Athlete, Event, Game, Result, Sport, Team} from "../Database/entities";
import {OlympicEvent} from "../Database/entities/OlympicEvent";
import {Callable, IndexedObject, SanitizedCSVRecord, Season} from "../types";

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

    return function (...args : Array<any>) {

        const key = makeHashKey({...args});
        console.log("map size", instance.name,  map.size);
        if(map.has(key)){

            return map.get(key);

        } else {

            const newObject = new instance(...args);

            map.set(key, newObject);

            return newObject;
        }
    }


}

export function mapToValidDBObjects(sanitizedSCV : Array<SanitizedCSVRecord>) {

    const athletes = getFromHashMap(new Map(),Athlete);
    // const sports = getFromHashMap(new Map(),Sport);
    // const events = getFromHashMap(new Map(),Event);
    // const teams = getFromHashMap(new Map(),Team);
    // const games = getFromHashMap(new Map(),Game);
    // const result = getFromHashMap(new Map(),Result);

    const x=  sanitizedSCV.map(sanitizedCSVRow => {

        const {event, sport : sportName, medal, team, noc, year, city, season} = sanitizedCSVRow;

        athletes(sanitizedCSVRow)

        // return new OlympicEvent(
        //     athletes(sanitizedCSVRow),
        //     events(event),
        //     result(medal),
        //     sports(sportName),
        //     teams(team,noc),
        //     games(year,season,city)
        // );
    });


    console.log(athletes)
    // console.log(sports)
    // console.log(events)
    // console.log(teams)
    // console.log(games)
    // console.log(result)


    return x;

}