import { ChartConfigs, Charts, Medal, Season } from '../types';
import { SanitizerUtils } from '../utils/SanitizerUtils';

export const resultTableConfig = {
  [Charts.TopTeams]: ['NOC', 'Amount'],
  [Charts.Medals]: ['Year', 'Amount'],
};

export const CLIExtractorConfig: ChartConfigs = {
  [Charts.TopTeams]: [
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

  [Charts.Medals]: [
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
