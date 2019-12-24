#!/usr/bin/env ts-node

import minimist = require('minimist');
import { Sanitizer } from './app/utils/Sanitizer';
import { Charts, CLIExctractorDescriptor, Medal, Season } from './app/types';
import { CLIArgumentsParser } from './app/utils/CLIArgumentsParser';

const { _: noFlagParams, help } = parseCLIParams();

export const CLIExtractorConfig: { [index: string]: Array<CLIExctractorDescriptor> } = {
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

if (help) {
  printHelp();
} else if (matchedChartName(noFlagParams)) {
  const chartName = matchedChartName(noFlagParams) as Charts;
  const cliParams = preproceedParserArguments(noFlagParams, chartName);

  if (chartName) {
    console.log(cliParams);
    console.log(CLIArgumentsParser.extract(cliParams, CLIExtractorConfig[chartName]));
  }

  switch (chartName) {
    case Charts.Medals: {
      break;
    }

    case Charts.TopTeams: {
      break;
    }

    default: {
      console.error(`No such chartname found ${chartName}`);
      printHelp();
    }
  }
} else {
  console.error('Incorrect usage');
  printHelp();
}

function preproceedParserArguments(params: Array<any>, chartName: string) {
  const argsArray = params.slice();

  argsArray.splice(params.indexOf(chartName), 1);

  return argsArray;
}

function matchedChartName<T>(chartParams: Array<string>) {
  const [chartName] = chartParams;

  return Sanitizer.sanitizeFromEnum(chartName, [Charts]);
}

function printHelp() {
  console.log('usage :');

  console.log('season [winter|summer] NOC medal_name [gold|silver|bronze] (in any order)');
  console.log('season [winter|summer] year medal_type [gold|silver|bronze] (in any order)');

  console.log('./stat medals summer ukr ');
  console.log('./stat medals silver UKR winter');
  console.log('./stat top-teams silver winter');
  console.log('./stat top-teams winter');
}

function parseCLIParams() {
  return minimist(process.argv.slice(2), {
    boolean: ['help'],
  });
}
