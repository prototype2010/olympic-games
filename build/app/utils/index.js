'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const types_1 = require('../types');
const SanitizerUtils_1 = require('./SanitizerUtils');
const minimist_1 = __importDefault(require('minimist'));
function makeHashKey(...args) {
  const objectToBeHashed = proceedHashFuncArguments(...args);
  return Object.entries(objectToBeHashed).reduce((cumulative, current) => {
    const [key, value] = current;
    if (typeof key !== 'function' && typeof key !== 'object') {
      cumulative += `${key}=${value}#`;
    }
    return cumulative;
  }, '');
}
exports.makeHashKey = makeHashKey;
function proceedHashFuncArguments(...args) {
  if (args.length === 1 && typeof args[0] === 'object') {
    return args[0];
  } else {
    return Object.assign({}, args);
  }
}
function getFromHashMap(map, callableClass) {
  const createIfNotExist = function(hashKeyArgs, ...callNewArgs) {
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
    return [...map.values()];
  };
  return createIfNotExist;
}
exports.getFromHashMap = getFromHashMap;
function preproceedParserArguments(params, chartName) {
  const argsArray = params.slice();
  argsArray.splice(params.indexOf(chartName), 1);
  return argsArray;
}
exports.preproceedParserArguments = preproceedParserArguments;
function matchedChartName(chartParams) {
  const [chartName] = chartParams;
  return SanitizerUtils_1.SanitizerUtils.fromEnum(chartName, [types_1.Charts]);
}
exports.matchedChartName = matchedChartName;
function printHelp() {
  console.log('usage :');
  console.log('season [winter|summer] NOC medal_name [gold|silver|bronze] (in any order)');
  console.log('season [winter|summer] year medal_type [gold|silver|bronze] (in any order)');
  console.log('./stat medals summer ukr ');
  console.log('./stat medals silver UKR winter');
  console.log('./stat top-teams silver winter');
  console.log('./stat top-teams winter');
}
exports.printHelp = printHelp;
function parseCLIParams() {
  return minimist_1.default(process.argv.slice(2), {
    boolean: ['help'],
  });
}
exports.parseCLIParams = parseCLIParams;
function getTableHeadersByCharsName(chartName) {
  switch (chartName) {
    case types_1.Charts.TopTeams: {
      return ['NOC', 'Amount'];
    }
    case types_1.Charts.Medals: {
      return ['Year', 'Amount'];
    }
    default: {
      console.error(`No such chart ${chartName}`);
      return ['key', 'value'];
    }
  }
}
exports.getTableHeadersByCharsName = getTableHeadersByCharsName;
//# sourceMappingURL=index.js.map
