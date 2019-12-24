import { CLIExctractorDescriptor } from '../types';
import { SanitizeExecutor } from './SanitizeExecutor';

export class CLIArgumentsParser {
  static extract(CLIArguments: Array<string>, CLIConfig: Array<CLIExctractorDescriptor>) {
    try {
      const descriptorsByPriority = CLIArgumentsParser.sortByPriority(CLIConfig);

      return CLIArgumentsParser.extractParamsByConfig(CLIArguments, descriptorsByPriority);
    } catch (e) {
      console.error(e, e.message);
      console.error(`Error occurred during extract params from ${CLIArguments} by config ${JSON.stringify(CLIConfig)}`);
    }
  }

  static sortByPriority(CLIConfig: Array<CLIExctractorDescriptor>) {
    return CLIConfig.sort((descriptor1, descriptor2) => descriptor1.priority - descriptor2.priority);
  }

  static extractParamsByConfig(CLIArguments: Array<string>, CLIConfig: Array<CLIExctractorDescriptor>) {
    return CLIConfig.reduceRight(
      (cumulative, cliConfig) => {
        const { match: foundMatch, modifiedArray } = CLIArgumentsParser.findArgumentInArray(
          cumulative.arguments,
          cliConfig,
        );

        return {
          match: {
            ...cumulative.match,
            ...foundMatch,
          },
          arguments: modifiedArray,
        };
      },
      {
        arguments: CLIArguments,
        match: {},
      },
    );
  }

  static findArgumentInArray(CLIArguments: Array<string>, CLIConfig: CLIExctractorDescriptor) {
    const { extractFunction } = CLIConfig;

    const foundValue = CLIArguments.find(value => SanitizeExecutor.proceedExecutableConfig(value, extractFunction));

    if (foundValue) {
      return CLIArgumentsParser.continueSearch(CLIArguments, foundValue, CLIConfig);
    } else {
      return CLIArgumentsParser.checkParamIsRequired(CLIArguments, CLIConfig);
    }
  }

  static checkParamIsRequired(CLIArguments: Array<string>, CLIConfig: CLIExctractorDescriptor) {
    const { required, paramName } = CLIConfig;

    if (required) {
      throw new Error(`Required parameter not found ${paramName} in ${CLIArguments}`);
    } else {
      return CLIArgumentsParser.continueSearch(CLIArguments, undefined, CLIConfig);
    }
  }

  static deleteMatchFromArray(CLIArguments: Array<string>, foundMatch: any) {
    const matchIndex = CLIArguments.findIndex(value => {
      return value === foundMatch;
    });

    CLIArguments.splice(matchIndex, 1);

    return CLIArguments;
  }

  static continueSearch(CLIArguments: Array<string>, foundMatch: any, CLIConfig: CLIExctractorDescriptor) {
    if (foundMatch) {
      return CLIArgumentsParser.continueWithDeletedArg(CLIArguments, foundMatch, CLIConfig);
    } else {
      return CLIArgumentsParser.continueWithKeptArg(CLIArguments);
    }
  }

  static continueWithDeletedArg(CLIArguments: Array<string>, foundMatch: any, CLIConfig: CLIExctractorDescriptor) {
    return {
      modifiedArray: CLIArgumentsParser.deleteMatchFromArray(CLIArguments, foundMatch),
      match: { [CLIConfig.paramName]: foundMatch },
    };
  }

  static continueWithKeptArg(CLIArguments: Array<string>) {
    return {
      modifiedArray: CLIArguments,
      match: {},
    };
  }
}
