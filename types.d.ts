export type IndexedObject = {[index: string] : string}

export type Primitives = number | string | boolean

export type Specials = null | undefined

export type CSVValue = Primitives | Specials

export type Nullable<T> = T | null;

export enum Sex {
    M = 'M',
    F = 'F',
}

export interface RawCSVRecord {
    id: CSVValue,
    name: CSVValue,
    sex:  CSVValue,
    age:  CSVValue,
    height:  CSVValue,
    weight: CSVValue,
    team:  CSVValue,
    noc:  CSVValue,
    games:  CSVValue,
    year:  CSVValue,
    season:  CSVValue,
    city:  CSVValue,
    sport:  CSVValue,
    event:  CSVValue,
    medal:  CSVValue,
}

export interface RawCSVRecord {
    [index : string] : CSVValue
}