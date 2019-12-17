export enum Medal {
    "NA" = "NA",
    Gold="Gold",
    Silver="Silver",
    Bronze="Bronze",
}

export enum Sex {
    M = 'M',
    F = 'F',
}

export type Primitives = number | string | boolean

export type Specials = null | undefined

export type Nullable<T> = T | null;

export interface RawCSVRecord {
    id: any,
    name: any,
    sex: any,
    age: any,
    height: any,
    weight: any,
    team: any,
    noc: any,
    games: any,
    year: any,
    season: any,
    city: any,
    sport: any,
    event: any,
    medal: any,
}

export interface SanitizedCSVRecord {
    id : Nullable<number>,
    name : string,
    sex : Nullable<Sex>,
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
    formQuery : () => string;
}


export enum Season {
    Summer = 'Summer',
    Winter = 'Winter'
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

export interface IndexedObject {
    [index: string] : any
}