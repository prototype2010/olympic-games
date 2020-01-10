#!/usr/bin/env ts-node
import { Charts, DBSet } from './app/types';
import { CLIArgumentsParser } from './app/utils/CLIArgumentsParser';
import {
  getTableHeadersByCharsName,
  matchedChartName,
  parseCLIParams,
  preproceedParserArguments,
  printHelp,
} from './app/utils';
import { Statistics } from './app/Statistics/Statistics';
import { DatabaseConnection } from './app/Database/Database';
import { ChartBuilder } from './app/Chart/ChartBuilder';
import { getConfigByChartName } from './app/CSVProcessors/SanitizerConfig';

const { _: noFlagParams, help } = parseCLIParams();

(async function init() {
  if (help) {
    printHelp();
  } else if (matchedChartName(noFlagParams)) {
    const chartName = matchedChartName(noFlagParams) as Charts;
    const config = getConfigByChartName(chartName);
    const cliParams = preproceedParserArguments(noFlagParams, chartName);
    const { match } = CLIArgumentsParser.extract(cliParams, config);

    const chartDataset: DBSet = await Statistics.getDatasetByChartName(chartName, match);
    const chartHeaders = getTableHeadersByCharsName(chartName);

    ChartBuilder.build({
      headers: chartHeaders,
      dbSet: chartDataset,
    });

    // console.log(chartDataset);
  } else {
    console.error('Incorrect usage');
    printHelp();
  }

  DatabaseConnection.getInstance().destroy(() => '');
})();
