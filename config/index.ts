import { Sanitizer } from '../app/utils/Sanitizer';
import { Medal, Season, Sex } from '../app/types';

export const { DB_FILE_PATH, CSV_FILE_PATH } = require('dotenv').config().parsed;

export type SanitizeConfig = typeof sanitizeConfig;

export const sanitizeConfig = {
  name: [
    [Sanitizer.sanitizeAsString, []],
    [Sanitizer.clearByRegexp, [/\(.*\)/g, /"/g]],
  ],
  sport: [[Sanitizer.sanitizeAsString, []]],
  city: [[Sanitizer.sanitizeAsString, []]],
  noc: [[Sanitizer.sanitizeAsString, []]],
  event: [[Sanitizer.sanitizeAsString, []]],
  games: [[Sanitizer.sanitizeAsString, []]],
  medal: [[Sanitizer.sanitizeFromEnum, [Medal]]],
  season: [[Sanitizer.sanitizeFromEnum, [Season]]],
  sex: [[Sanitizer.sanitizeFromEnum, [Sex]]],
  id: [[Sanitizer.parseInt, []]],
  year: [[Sanitizer.parseInt, []]],
  weight: [[Sanitizer.parseInt, []]],
  height: [[Sanitizer.parseInt, []]],
  age: [[Sanitizer.parseInt, []]],
  team: [
    [Sanitizer.sanitizeAsString, []],
    [Sanitizer.clearByRegexp, [/\d+$/g, /-$/g]],
  ],
};
