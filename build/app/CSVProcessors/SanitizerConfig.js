'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const SanitizerUtils_1 = require('../utils/SanitizerUtils');
const types_1 = require('../types');
const utils_1 = require('../utils');
exports.sanitizeConfig = {
  name: [
    [SanitizerUtils_1.SanitizerUtils.asString, []],
    [SanitizerUtils_1.SanitizerUtils.clearByRegexp, [/\(.*\)/g, /"/g]],
  ],
  sport: [[SanitizerUtils_1.SanitizerUtils.asString, []]],
  city: [[SanitizerUtils_1.SanitizerUtils.asString, []]],
  noc: [[SanitizerUtils_1.SanitizerUtils.asString, []]],
  event: [[SanitizerUtils_1.SanitizerUtils.asString, []]],
  games: [[SanitizerUtils_1.SanitizerUtils.asString, []]],
  medal: [[SanitizerUtils_1.SanitizerUtils.fromEnum, [types_1.Medal]]],
  season: [[SanitizerUtils_1.SanitizerUtils.fromEnum, [types_1.Season]]],
  sex: [[SanitizerUtils_1.SanitizerUtils.fromEnum, [types_1.Sex]]],
  id: [[SanitizerUtils_1.SanitizerUtils.parseNullableToInt, []]],
  year: [[SanitizerUtils_1.SanitizerUtils.parseNullableToInt, []]],
  weight: [[SanitizerUtils_1.SanitizerUtils.parseNullableToInt, []]],
  height: [[SanitizerUtils_1.SanitizerUtils.parseNullableToInt, []]],
  age: [[SanitizerUtils_1.SanitizerUtils.parseNullableToInt, []]],
  team: [
    [SanitizerUtils_1.SanitizerUtils.asString, []],
    [SanitizerUtils_1.SanitizerUtils.clearByRegexp, [/\d+$/g, /-$/g]],
  ],
};
function getConfigByChartName(chartName) {
  if (exports.CLIExtractorConfig[chartName]) {
    return exports.CLIExtractorConfig[chartName];
  } else {
    utils_1.printHelp();
    throw new Error(`No such chartname found ${chartName}`);
  }
}
exports.getConfigByChartName = getConfigByChartName;
exports.CLIExtractorConfig = {
  'top-teams': [
    {
      priority: 2,
      required: true,
      extractFunction: [[SanitizerUtils_1.SanitizerUtils.fromEnum, [types_1.Season]]],
      paramName: 'season',
    },
    {
      priority: 1,
      required: false,
      extractFunction: [[SanitizerUtils_1.SanitizerUtils.fromEnum, [types_1.Medal]]],
      paramName: 'medal',
    },
    {
      priority: 0,
      required: false,
      extractFunction: [[SanitizerUtils_1.SanitizerUtils.parseNullableToInt, []]],
      paramName: 'year',
    },
  ],
  medals: [
    {
      priority: 2,
      required: true,
      extractFunction: [[SanitizerUtils_1.SanitizerUtils.fromEnum, [types_1.Season]]],
      paramName: 'season',
    },
    {
      priority: 0,
      required: true,
      extractFunction: [[SanitizerUtils_1.SanitizerUtils.asString, []]],
      paramName: 'noc',
    },
    {
      priority: 1,
      required: false,
      extractFunction: [[SanitizerUtils_1.SanitizerUtils.fromEnum, [types_1.Medal]]],
      paramName: 'medal',
    },
  ],
};
//# sourceMappingURL=SanitizerConfig.js.map
