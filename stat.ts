#!/usr/bin/env ts-node
import { Charts } from './app/types';
import { CLIArgumentsParser } from './app/utils/CLIArgumentsParser';
import { matchedChartName, parseCLIParams, preproceedParserArguments, printHelp } from './app/utils';
import { getConfigByChartName } from './config';
import { Statistics } from './app/Statistics/Statistics';
import { DatabaseConnection } from './app/Database/Database';

const { _: noFlagParams, help } = parseCLIParams();

(async function init() {
  if (help) {
    printHelp();
  } else if (matchedChartName(noFlagParams)) {
    const chartName = matchedChartName(noFlagParams) as Charts;
    const config = getConfigByChartName(chartName);
    const cliParams = preproceedParserArguments(noFlagParams, chartName);
    const { match } = CLIArgumentsParser.extract(cliParams, config);

    console.log('match', match);

    const chartDataset = await Statistics.getDatasetByChartName(chartName, match);

    console.log(chartDataset);
    console.log();
  } else {
    console.error('Incorrect usage');
    printHelp();
  }

  DatabaseConnection.getInstance().destroy(() => '');
})();
