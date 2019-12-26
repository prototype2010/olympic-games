import { Sanitizer } from '../app/utils/Sanitizer';
import { ChartConfigs, Charts, CLIExtractorDescriptor, IndexedObject, Medal, Season, Sex } from '../app/types';
import { printHelp } from '../app/utils';

export const { DB_FILE_PATH, CSV_FILE_PATH } = require('dotenv').config().parsed;

export type SanitizeConfig = typeof sanitizeConfig;

export const sanitizeConfig = {
  name: [
    [Sanitizer.asString, []],
    [Sanitizer.clearByRegexp, [/\(.*\)/g, /"/g]],
  ],
  sport: [[Sanitizer.asString, []]],
  city: [[Sanitizer.asString, []]],
  noc: [[Sanitizer.asString, []]],
  event: [[Sanitizer.asString, []]],
  games: [[Sanitizer.asString, []]],
  medal: [[Sanitizer.fromEnum, [Medal]]],
  season: [[Sanitizer.fromEnum, [Season]]],
  sex: [[Sanitizer.fromEnum, [Sex]]],
  id: [[Sanitizer.parseInt, []]],
  year: [[Sanitizer.parseInt, []]],
  weight: [[Sanitizer.parseInt, []]],
  height: [[Sanitizer.parseInt, []]],
  age: [[Sanitizer.parseInt, []]],
  team: [
    [Sanitizer.asString, []],
    [Sanitizer.clearByRegexp, [/\d+$/g, /-$/g]],
  ],
};

export function getConfigByChartName(chartName: Charts) {
  if (CLIExtractorConfig[chartName]) {
    return CLIExtractorConfig[chartName];
  } else {
    printHelp();

    throw new Error(`No such chartname found ${chartName}`);
  }
}

export const CLIExtractorConfig: ChartConfigs = {
  'top-teams': [
    {
      priority: 2,
      required: true,
      extractFunction: [[Sanitizer.fromEnum, [Season]]],
      paramName: 'season',
    },
    {
      priority: 1,
      required: false,
      extractFunction: [[Sanitizer.fromEnum, [Medal]]],
      paramName: 'medal',
    },
    {
      priority: 0,
      required: false,
      extractFunction: [[Sanitizer.parseInt, []]],
      paramName: 'year',
    },
  ],

  medals: [
    {
      priority: 2,
      required: true,
      extractFunction: [[Sanitizer.fromEnum, [Season]]],
      paramName: 'season',
    },
    {
      priority: 0,
      required: true,
      extractFunction: [[Sanitizer.asString, []]],
      paramName: 'noc',
    },
    {
      priority: 1,
      required: false,
      extractFunction: [[Sanitizer.fromEnum, [Medal]]],
      paramName: 'medal',
    },
  ],
};
