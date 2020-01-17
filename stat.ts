#!/usr/bin/env ts-node
import { Charts, DBSet } from './app/types';
import { Statistics } from './app/Statistics/Statistics';
import { DatabaseConnection } from './app/Database/Database';
import { ChartBuilder } from './app/Chart/ChartBuilder';
import { getCLIParams, printHelp } from './app/CLIParser/helpers';
import { CLIConfigResolver } from './app/CLIParser/CLIConfigResolver';
import { CLIArgumentsParser } from './app/CLIParser/CLIArgumentsParser';

const { _: cliArguments, help } = getCLIParams();

(async function init(): Promise<void> {
  if (help) {
    printHelp();
  } else {
    const resolvedCLIConfigs = CLIConfigResolver.init<Charts>(cliArguments, [Charts.Medals, Charts.TopTeams]);

    const { scriptName, scriptArguments, chartTableHeader, extractArgumentsRules } = resolvedCLIConfigs;

    const { match } = CLIArgumentsParser.extract(scriptArguments, extractArgumentsRules);

    const chartDataset: DBSet = await Statistics.getDatasetByChartName(scriptName, match);

    ChartBuilder.build({
      headers: chartTableHeader,
      dbSet: chartDataset,
    });
  }

  DatabaseConnection.getInstance().destroy(() => '');
})();
