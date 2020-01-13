'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const CSVSanitizer_1 = require('../CSVProcessors/CSVSanitizer');
class CLIArgumentsParser {
  static extract(CLIArguments, CLIConfig) {
    try {
      const descriptorsByPriority = CLIArgumentsParser.sortByPriority(CLIConfig);
      return CLIArgumentsParser.extractParamsByConfig(CLIArguments, descriptorsByPriority);
    } catch (e) {
      throw new Error(
        `${e.message}. Error occurred during extract params from ${CLIArguments} by config ${JSON.stringify(
          CLIConfig,
        )}`,
      );
    }
  }
  static sortByPriority(CLIConfig) {
    return CLIConfig.sort((descriptor1, descriptor2) => descriptor1.priority - descriptor2.priority);
  }
  static extractParamsByConfig(CLIArguments, CLIConfig) {
    return CLIConfig.reduceRight(
      ({ CLIArguments, match }, cliConfig) => {
        const { match: foundMatch, modifiedArray } = CLIArgumentsParser.findArgumentInArray(CLIArguments, cliConfig);
        return {
          match: Object.assign(Object.assign({}, match), foundMatch),
          CLIArguments: modifiedArray,
        };
      },
      {
        CLIArguments: CLIArguments.slice(),
        match: {},
      },
    );
  }
  static findArgumentInArray(CLIArguments, CLIConfig) {
    const { extractFunction } = CLIConfig;
    const foundValue = CLIArguments.find(value =>
      CSVSanitizer_1.CSVSanitizer.proceedExecutableConfig(value, extractFunction),
    );
    if (foundValue) {
      return CLIArgumentsParser.continueSearch(CLIArguments, foundValue, CLIConfig);
    } else {
      return CLIArgumentsParser.checkParamIsRequired(CLIArguments, CLIConfig);
    }
  }
  static checkParamIsRequired(CLIArguments, CLIConfig) {
    const { required, paramName } = CLIConfig;
    if (required) {
      throw new Error(`Required parameter not found ${paramName} in [${CLIArguments}]`);
    } else {
      return CLIArgumentsParser.continueSearch(CLIArguments, undefined, CLIConfig);
    }
  }
  static deleteMatchFromArray(CLIArguments, foundMatch) {
    const matchIndex = CLIArguments.findIndex(value => {
      return value === foundMatch;
    });
    CLIArguments.splice(matchIndex, 1);
    return CLIArguments;
  }
  static continueSearch(CLIArguments, foundMatch, CLIConfig) {
    if (foundMatch) {
      return CLIArgumentsParser.continueWithDeletedArg(CLIArguments, foundMatch, CLIConfig);
    } else {
      return CLIArgumentsParser.continueWithKeptArg(CLIArguments);
    }
  }
  static continueWithDeletedArg(CLIArguments, foundMatch, CLIConfig) {
    return {
      modifiedArray: CLIArgumentsParser.deleteMatchFromArray(CLIArguments, foundMatch),
      match: { [CLIConfig.paramName]: foundMatch },
    };
  }
  static continueWithKeptArg(CLIArguments) {
    return {
      modifiedArray: CLIArguments,
      match: {},
    };
  }
}
exports.CLIArgumentsParser = CLIArgumentsParser;
//# sourceMappingURL=CLIArgumentsParser.js.map
