import { Callable, Charts, SanitizedCSVRecord } from '../types';
import { SanitizerUtils } from './SanitizerUtils';
import minimist from 'minimist';
import { Model } from '../Database/utils/Model';

export function makeHashKey(...args: any[]) {
  const objectToBeHashed = proceedHashFuncArguments(...args);

  return Object.entries(objectToBeHashed).reduce((cumulative, current) => {
    const [key, value] = current;

    if (typeof key !== 'function' && typeof key !== 'object') {
      cumulative += `${key}=${value}#`;
    }

    return cumulative;
  }, '');
}

function proceedHashFuncArguments(...args: any[]) {
  if (args.length === 1 && typeof args[0] === 'object') {
    return args[0];
  } else {
    return { ...args };
  }
}

export function getFromHashMap<T extends Model>(map: Map<string, any>, callableClass: Callable<Model>) {
  const createIfNotExist = function(hashKeyArgs: Array<any>, ...callNewArgs: Array<any>) {
    const key = makeHashKey(hashKeyArgs);

    if (map.has(key)) {
      return map.get(key);
    } else {
      const instance = new callableClass(...callNewArgs);
      map.set(key, instance);

      return instance;
    }
  };

  createIfNotExist.getArray = function() {
    return [...map.values()] as Array<T>;
  };

  return createIfNotExist;
}

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
