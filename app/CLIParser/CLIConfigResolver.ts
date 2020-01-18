import { Charts, IndexedObject } from '../types';
import { CLIExtractorConfig, resultTableConfig } from './config';

import { SanitizerUtils } from '../utils/SanitizerUtils';
import { printHelp } from './helpers';

export class CLIConfigResolver {
  public static init<T extends Charts>(cliArguments: Array<string>, validScriptNames: IndexedObject) {
    const [invalidatedScriptName, ...scriptArguments] = cliArguments;
    const validatedScriptName = SanitizerUtils.fromEnum(invalidatedScriptName, [validScriptNames]) as T;

    if (validatedScriptName) {
      return {
        scriptName: validatedScriptName,
        scriptArguments: [...scriptArguments],
        chartTableHeader: resultTableConfig[validatedScriptName],
        extractArgumentsRules: CLIExtractorConfig[validatedScriptName],
      };
    } else {
      printHelp();
      throw new Error(`No such script found ${invalidatedScriptName}`);
    }
  }
}
