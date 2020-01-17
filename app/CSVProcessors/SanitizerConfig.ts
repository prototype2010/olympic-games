import { SanitizerUtils } from '../utils/SanitizerUtils';
import { ChartConfigs, Charts, Medal, SanitizeConfig, Season, Sex } from '../types';
import { printHelp } from '../utils';

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

export const CLIExtractorConfig: ChartConfigs = {
  'top-teams': [
    {
      priority: 2,
      required: true,
      extractFunction: [[SanitizerUtils.fromEnum, [Season]]],
      paramName: 'season',
    },
    {
      priority: 1,
      required: false,
      extractFunction: [[SanitizerUtils.fromEnum, [Medal]]],
      paramName: 'medal',
    },
    {
      priority: 0,
      required: false,
      extractFunction: [[SanitizerUtils.parseNullableToInt, []]],
      paramName: 'year',
    },
  ],

  medals: [
    {
      priority: 2,
      required: true,
      extractFunction: [[SanitizerUtils.fromEnum, [Season]]],
      paramName: 'season',
    },
    {
      priority: 0,
      required: true,
      extractFunction: [[SanitizerUtils.asString, []]],
      paramName: 'noc',
    },
    {
      priority: 1,
      required: false,
      extractFunction: [[SanitizerUtils.fromEnum, [Medal]]],
      paramName: 'medal',
    },
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
