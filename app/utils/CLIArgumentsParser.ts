import { CLIExtractorDescriptor } from '../types';
import { CSVSanitizer } from '../CSVProcessors/CSVSanitizer';

export class CLIArgumentsParser {
  static extract(CLIArguments: Array<string | number>, CLIConfig: Array<CLIExtractorDescriptor>) {
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

  private static sortByPriority(CLIConfig: Array<CLIExtractorDescriptor>) {
    return CLIConfig.sort((descriptor1, descriptor2) => descriptor1.priority - descriptor2.priority);
  }

  private static extractParamsByConfig(CLIArguments: Array<string | number>, CLIConfig: Array<CLIExtractorDescriptor>) {
    return CLIConfig.reduceRight(
      ({ CLIArguments, match }, cliConfig) => {
        const { match: foundMatch, modifiedArray } = CLIArgumentsParser.findArgumentInArray(CLIArguments, cliConfig);

        return {
          match: {
            ...match,
            ...foundMatch,
          },
          CLIArguments: modifiedArray,
        };
      },
      {
        CLIArguments: CLIArguments.slice(), // just a copy of real array
        match: {},
      },
    );
  }

  private static findArgumentInArray(CLIArguments: Array<string | number>, CLIConfig: CLIExtractorDescriptor) {
    const { extractFunction } = CLIConfig;

    const foundValue = CLIArguments.find(value => CSVSanitizer.proceedExecutableConfig(value, extractFunction));

    if (foundValue) {
      return CLIArgumentsParser.continueSearch(CLIArguments, foundValue, CLIConfig);
    } else {
      return CLIArgumentsParser.checkParamIsRequired(CLIArguments, CLIConfig);
    }
  }

  private static checkParamIsRequired(CLIArguments: Array<string | number>, CLIConfig: CLIExtractorDescriptor) {
    const { required, paramName } = CLIConfig;

    if (required) {
      throw new Error(`Required parameter not found ${paramName} in [${CLIArguments}]`);
    } else {
      return CLIArgumentsParser.continueSearch(CLIArguments, undefined, CLIConfig);
    }
  }

  private static deleteMatchFromArray(CLIArguments: Array<string | number>, foundMatch: any) {
    const matchIndex = CLIArguments.findIndex(value => {
      return value === foundMatch;
    });

    CLIArguments.splice(matchIndex, 1);

    return CLIArguments;
  }

  private static continueSearch(
    CLIArguments: Array<string | number>,
    foundMatch: any,
    CLIConfig: CLIExtractorDescriptor,
  ) {
    if (foundMatch) {
      return CLIArgumentsParser.continueWithDeletedArg(CLIArguments, foundMatch, CLIConfig);
    } else {
      return CLIArgumentsParser.continueWithKeptArg(CLIArguments);
    }
  }

  private static continueWithDeletedArg(
    CLIArguments: Array<string | number>,
    foundMatch: any,
    CLIConfig: CLIExtractorDescriptor,
  ) {
    return {
      modifiedArray: CLIArgumentsParser.deleteMatchFromArray(CLIArguments, foundMatch),
      match: { [CLIConfig.paramName]: foundMatch },
    };
  }

  private static continueWithKeptArg(CLIArguments: Array<string | number>) {
    return {
      modifiedArray: CLIArguments,
      match: {},
    };
  }
}
