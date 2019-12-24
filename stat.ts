#!/usr/bin/env ts-node
import { Charts } from './app/types';
import { CLIArgumentsParser } from './app/utils/CLIArgumentsParser';
import { matchedChartName, parseCLIParams, preproceedParserArguments, printHelp } from './app/utils';
import { getConfigByChartName } from './config';

const { _: noFlagParams, help } = parseCLIParams();

if (help) {
  printHelp();
} else if (matchedChartName(noFlagParams)) {
  const chartName = matchedChartName(noFlagParams) as Charts;
  const config = getConfigByChartName(chartName);
  const cliParams = preproceedParserArguments(noFlagParams, chartName);

  console.log(cliParams);
  console.log(CLIArgumentsParser.extract(cliParams, config));
} else {
  console.error('Incorrect usage');
  printHelp();
}
