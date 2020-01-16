import { Charts } from '../types';
import { SanitizerUtils } from './SanitizerUtils';
import minimist from 'minimist';

export function preproceedParserArguments(params: Array<any>, chartName: string) {
  const argsArray = params.slice();

  argsArray.splice(params.indexOf(chartName), 1);

  return argsArray;
}

export function matchedChartName<T>(chartParams: Array<string>) {
  const [chartName] = chartParams;

  return SanitizerUtils.fromEnum(chartName, [Charts]);
}

export function printHelp() {
  console.log('usage :');

  console.log('season [winter|summer] NOC medal_name [gold|silver|bronze] (in any order)');
  console.log('season [winter|summer] year medal_type [gold|silver|bronze] (in any order)');

  console.log('./stat medals summer ukr ');
  console.log('./stat medals silver UKR winter');
  console.log('./stat top-teams silver winter');
  console.log('./stat top-teams winter');
}

export function parseCLIParams() {
  return minimist(process.argv.slice(2), {
    boolean: ['help'],
  });
}

export function getTableHeadersByCharsName(chartName: Charts) {
  switch (chartName) {
    case Charts.TopTeams: {
      return ['NOC', 'Amount'];
    }

    case Charts.Medals: {
      return ['Year', 'Amount'];
    }

    default: {
      console.error(`No such chart ${chartName}`);

      return ['key', 'value'];
    }
  }
}
