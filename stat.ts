#!/usr/bin/env ts-node

import minimist = require('minimist');
import { Sanitizer } from './app/utils/Sanitizer';
import { Charts, CLIExctractorDescriptor, Medal, Season } from './app/types';
import { CLIArgumentsParser } from './app/utils/CLIArgumentsParser';

const { _: noFlagParams, help } = parseCLIParams();

export const CLIExtractorConfig: { [index: string]: Array<CLIExctractorDescriptor> } = {
  'top-teams': [
    {
      priority: 1,
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
      required: true,
      extractFunction: [[Sanitizer.sanitizeAsString, []]],
      paramName: 'noc',
    },
  ],

  medals: [
    {
      priority: 1,
      required: true,
      extractFunction: [[Sanitizer.sanitizeFromEnum, [Season]]],
      paramName: 'season',
    },
    {
      priority: 0,
      required: false,
      extractFunction: [[Sanitizer.parseInt, []]],
      paramName: 'year',
    },
    {
      priority: 0,
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

  if (chartName) {
    console.log(noFlagParams);
    console.log(CLIArgumentsParser.extract(noFlagParams, CLIExtractorConfig[chartName]));
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

function matchedChartName<T>(chartParams: Array<string>) {
  const [chartName] = chartParams;

  return Sanitizer.sanitizeFromEnum(chartName, [Charts]);
}

function printHelp() {
  console.log('usage :');
  console.log('./stat --help');
}

function parseCLIParams() {
  return minimist(process.argv.slice(2), {
    boolean: ['help'],
    alias: {
      medal: ['bronze', 'gold', 'silver'],
      season: ['summer', 'winter'],
    },
  });
}

//Params: season [winter|summer] NOC medal_name [gold|silver|bronze] (in any order).
//Params: season [winter|summer] year medal_type [gold|silver|bronze] (in any order).
