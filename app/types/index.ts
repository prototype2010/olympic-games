import {Athlete, Event, Game, Result, Sport, Team} from "../Database/entities";

export enum Medal {
    NA = "N/A",
    Gold="Gold",
    Silver="Silver",
    Bronze="Bronze",
}

export type Primitives = number | string | boolean

export type Specials = null | undefined

export type CSVValue = Primitives | Specials

export type Nullable<T> = T | null;

export interface RawCSVRecord {
    ID: CSVValue,
    Name: CSVValue,
    Sex: CSVValue,
    Age: CSVValue,
    Height: CSVValue,
    Weight: CSVValue,
    Team: CSVValue,
    NOC: CSVValue,
    Games: CSVValue,
    Year: CSVValue,
    Season: CSVValue,
    City: CSVValue,
    Sport: CSVValue,
    Event: CSVValue,
    Medal: CSVValue,
}

export interface SanitizedCSVRecord {
    id : Nullable<number>,
    name : string,
    sex : Nullable<string>,
    age : Nullable<number>,
    height: Nullable<number>,
    weight : Nullable<number>,
    team : string,
    NOC : string,
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