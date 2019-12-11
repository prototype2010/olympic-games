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
    id : number,
    name : string,
    sex : Nullable<string>,
    age : number,
    height: Nullable<number>,
    weight : Nullable<number>,
    team : string,
    NOC : string,
    games : string,
    year : number,
    season : string,
    city : string,
    sport :string,
    event : string,
    medal : string,
}

export enum Medal {
    NA = "N/A",
    Gold="Gold",
    Silver="Silver",
    Bronze="Bronze",
}