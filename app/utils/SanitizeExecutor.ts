import { IndexedObject } from '../types';
import { SanitizeConfig } from '../../config';

export class SanitizeExecutor {
  static sanitizeArray<T>(csvRowsArray: Array<IndexedObject> = [], sanitizeConfig: SanitizeConfig) {
    return csvRowsArray.map(csvRow => {
      return Object.entries(csvRow).reduce((cumulative, current) => {
        const [key, value] = current;

        const executableConfig = SanitizeExecutor.readConfigByPropName(key, sanitizeConfig);

        return {
          ...cumulative,
          [key]: SanitizeExecutor.proceedExecutableConfig(value, executableConfig!),
        };
      }, {} as T);
    });
  }

  static readConfigByPropName(propName: string, sanitizeConfig: IndexedObject): Array<Array<any>> | undefined {
    if (propName in sanitizeConfig) {
      return sanitizeConfig[propName];
    } else {
      console.error(`There are no rules for ${propName} in ${sanitizeConfig}`);
    }
  }

  static proceedExecutableConfig(value: any, executableConfig: Array<Array<any>>) {
    return executableConfig.reduce((cumulative, current) => {
      const [executableFunction, ...args] = current;

      cumulative = executableFunction(cumulative, ...args);

      return cumulative;
    }, value);
  }
}
