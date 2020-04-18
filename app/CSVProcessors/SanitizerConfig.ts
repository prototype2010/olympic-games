import { SanitizerUtils } from '../utils/SanitizerUtils';
import { Medal, SanitizeConfig, Season, Sex } from '../types';

export const sanitizeConfig: SanitizeConfig = {
  name: [
    [SanitizerUtils.asString, []],
    [SanitizerUtils.clearByRegexp, [/\(.*\)/g, /"/g]],
  ],
  sport: [[SanitizerUtils.asString, []]],
  city: [[SanitizerUtils.asString, []]],
  noc: [[SanitizerUtils.asString, []]],
  event: [[SanitizerUtils.asString, []]],
  games: [[SanitizerUtils.asString, []]],
  medal: [[SanitizerUtils.fromEnum, [Medal]]],
  season: [[SanitizerUtils.fromEnum, [Season]]],
  sex: [[SanitizerUtils.fromEnum, [Sex]]],
  id: [[SanitizerUtils.parseNullableToInt, []]],
  year: [[SanitizerUtils.parseNullableToInt, []]],
  weight: [[SanitizerUtils.parseNullableToInt, []]],
  height: [[SanitizerUtils.parseNullableToInt, []]],
  age: [[SanitizerUtils.parseNullableToInt, []]],
  team: [
    [SanitizerUtils.asString, []],
    [SanitizerUtils.clearByRegexp, [/\d+$/g, /-$/g]],
  ],
};
