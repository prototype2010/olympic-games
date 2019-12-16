import {Athlete, Event, Game, Result, Sport, Team} from "../Database/entities";

export enum Medal {
    NA = "N/A",
    Gold="Gold",
    Silver="Silver",
    Bronze="Bronze",
}

export interface IndexedObject {
    [index : string] : CSVValue
}

export type Primitives = number | string | boolean

export type Specials = null | undefined

export type CSVValue = Primitives | Specials

export type Nullable<T> = T | null;

export interface RawCSVRecord {
    id: CSVValue,
    name: CSVValue,
    sex: CSVValue,
    age: CSVValue,
    height: CSVValue,
    weight: CSVValue,
    team: CSVValue,
    noc: CSVValue,
    games: CSVValue,
    year: CSVValue,
    season: CSVValue,
    city: CSVValue,
    sport: CSVValue,
    event: CSVValue,
    medal: CSVValue,
}

export interface SanitizedCSVRecord {
    id : Nullable<number>,
    name : string,
    sex : Nullable<string>,
    age : Nullable<number>,
    height: Nullable<number>,
    weight : Nullable<number>,
    team : string,
    noc : string,
    games : string,
    year : Nullable<number>,
    season : Nullable<Season>,
    city : string,
    sport :string,
    event : string,
    medal : Medal,
}

export interface Writable {
    formQuery : (tableName : Table) => string;
}

export enum Season {
    SUMMER = 'summer',
    WINTER = 'winter'
}

export enum Table {
    GAMES = 'games',
    RESULTS = 'results',
    TEAMS = 'teams',
    SPORTS = 'sports',
    EVENTS = 'events',
    ATHLETES = 'athletes',
}

export interface Callable {
    new (...args : any[]) : any
}