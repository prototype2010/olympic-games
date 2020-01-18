export enum Medal {
  'NA' = 'NA',
  Gold = 'gold',
  Silver = 'silver',
  Bronze = 'bronze',
}

export enum Sex {
  M = 'M',
  F = 'F',
}

export interface RawCSVRecord {
  id: any;
  name: any;
  sex: any;
  age: any;
  height: any;
  weight: any;
  team: any;
  noc: any;
  games: any;
  year: any;
  season: any;
  city: any;
  sport: any;
  event: any;
  medal: any;
}

export interface SanitizedOlympiadEventRecord {
  id?: number;
  name: string;
  sex?: Sex;
  age?: number;
  height?: number;
  weight?: number;
  team: string;
  noc: string;
  games: string;
  year?: number;
  season?: Season;
  city: string;
  sport: string;
  event: string;
  medal: Medal;
}

export enum Season {
  Summer = 'summer',
  Winter = 'winter',
}

export enum Table {
  GAMES = 'games',
  RESULTS = 'results',
  TEAMS = 'teams',
  SPORTS = 'sports',
  EVENTS = 'events',
  ATHLETES = 'athletes',
}

export interface Callable<T> {
  new (...args: any[]): T;
}

export interface IndexedObject {
  [index: string]: any;
}

export enum Charts {
  Medals = 'medals',
  TopTeams = 'top-teams',
}

export interface CLIExtractorDescriptor {
  priority: number;
  required: boolean;
  extractFunction: any;
  paramName: string;
}

export interface ChartConfigs {
  'top-teams': Array<CLIExtractorDescriptor>;
  medals: Array<CLIExtractorDescriptor>;
}

export interface MedalsChartParsedArgs {
  medal?: Medal;
  season: Season;
  noc: string;
}

export interface TopTeamsChartParsedArgs {
  medal?: Medal;
  season: Season;
  year?: number;
}

export interface SanitizeConfig {
  [key: string]: Array<[Function, Array<Record<string, any> | RegExp>]>;
}

export type DBSet = Array<{ [index: string]: string | number; amount: number }>;
