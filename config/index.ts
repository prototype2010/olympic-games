import { Sanitizer } from '../app/utils/Sanitizer';
import { Charts, CLIExctractorDescriptor, Medal, Season, Sex } from '../app/types';
import { printHelp } from '../app/utils';

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

export function getConfigByChartName(chartName: Charts) {
  if (CLIExtractorConfig[chartName]) {
    return CLIExtractorConfig[chartName];
  } else {
    printHelp();

    throw new Error(`No such chartname found ${chartName}`);
  }
}

const CLIExtractorConfig: { [index: string]: Array<CLIExctractorDescriptor> } = {
  'top-teams': [
    {
      priority: 2,
      required: true,
      extractFunction: [[Sanitizer.sanitizeFromEnum, [Season]]],
      paramName: 'season',
    },
    {
      priority: 1,
      required: false,
      extractFunction: [[Sanitizer.sanitizeFromEnum, [Medal]]],
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
      extractFunction: [[Sanitizer.sanitizeFromEnum, [Season]]],
      paramName: 'season',
    },
    {
      priority: 0,
      required: false,
      extractFunction: [[Sanitizer.sanitizeAsString, []]],
      paramName: 'noc',
    },
    {
      priority: 1,
      required: false,
      extractFunction: [[Sanitizer.sanitizeFromEnum, [Medal]]],
      paramName: 'medal',
    },
  ],
};
