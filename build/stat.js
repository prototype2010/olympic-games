#!/usr/bin/env ts-node
'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function(resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
Object.defineProperty(exports, '__esModule', { value: true });
const CLIArgumentsParser_1 = require('./app/utils/CLIArgumentsParser');
const utils_1 = require('./app/utils');
const Statistics_1 = require('./app/Statistics/Statistics');
const Database_1 = require('./app/Database/Database');
const ChartBuilder_1 = require('./app/Chart/ChartBuilder');
const SanitizerConfig_1 = require('./app/CSVProcessors/SanitizerConfig');
const { _: noFlagParams, help } = utils_1.parseCLIParams();
(function init() {
  return __awaiter(this, void 0, void 0, function*() {
    if (help) {
      utils_1.printHelp();
    } else if (utils_1.matchedChartName(noFlagParams)) {
      const chartName = utils_1.matchedChartName(noFlagParams);
      const config = SanitizerConfig_1.getConfigByChartName(chartName);
      const cliParams = utils_1.preproceedParserArguments(noFlagParams, chartName);
      const { match } = CLIArgumentsParser_1.CLIArgumentsParser.extract(cliParams, config);
      const chartDataset = yield Statistics_1.Statistics.getDatasetByChartName(chartName, match);
      const chartHeaders = utils_1.getTableHeadersByCharsName(chartName);
      ChartBuilder_1.ChartBuilder.build({
        headers: chartHeaders,
        dbSet: chartDataset,
      });
      // console.log(chartDataset);
    } else {
      console.error('Incorrect usage');
      utils_1.printHelp();
    }
    Database_1.DatabaseConnection.getInstance().destroy(() => '');
  });
})();
//# sourceMappingURL=stat.js.map
