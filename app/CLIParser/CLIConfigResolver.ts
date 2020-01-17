import { Charts } from '../types';
import { CLIExtractorConfig, resultTableConfig } from './config';

import { SanitizerUtils } from '../utils/SanitizerUtils';
import { printHelp } from './helpers';

export class CLIConfigResolver {
  public static init<T extends Charts>(cliArguments: Array<string>, validScriptNames: Array<string>) {
    const [invalidatedScriptName, ...scriptArguments] = cliArguments;
    const scriptName = CLIConfigResolver.containsValidScriptName(invalidatedScriptName, validScriptNames) as T;

    if (scriptName) {
      return {
        scriptName,
        scriptArguments: [...scriptArguments],
        chartTableHeader: resultTableConfig[scriptName],
        extractArgumentsRules: CLIExtractorConfig[scriptName],
      };
    } else {
      printHelp();
      throw new Error(`No such script found ${invalidatedScriptName}`);
    }
  }

  public static containsValidScriptName(
    invalidatedScriptName: string,
    validScriptNames: Array<string>,
  ): string | undefined {
    return SanitizerUtils.fromEnum(invalidatedScriptName, [validScriptNames]);
  }
}
