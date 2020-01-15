import { IndexedObject } from '../types';
import { SanitizeConfig } from './SanitizerConfig';
import { SanitizerUtils } from '../utils/SanitizerUtils';

export class CSVSanitizer {
  static sanitizeArray<T>(csvRowsArray: Array<IndexedObject> = [], sanitizeConfig: SanitizeConfig) {
    return csvRowsArray.map(csvRow => CSVSanitizer.sanitizeRow<T>(csvRow, sanitizeConfig));
  }

  static sanitizeRow<T>(row: IndexedObject, sanitizeConfig: SanitizeConfig) {
    return Object.entries(row).reduce((sanitizedRow, csvRowEntry) => {
      const sanitizedEntry = CSVSanitizer.sanitizeField(csvRowEntry, sanitizeConfig);
      const [key, value] = sanitizedEntry;

      return {
        ...sanitizedRow,
        [key]: value,
      };
    }, {} as T);
  }

  static sanitizeField(parsedCSVEntry: [string, any], sanitizeConfig: SanitizeConfig) {
    const [key, value] = parsedCSVEntry;
    const executableConfig = CSVSanitizer.readConfigByPropName(key, sanitizeConfig);
    const sanitizedValue = CSVSanitizer.proceedExecutableConfig(value, executableConfig);

    return [key, sanitizedValue];
  }

  static readConfigByPropName(propName: string, sanitizeConfig: IndexedObject): Array<Array<any>> {
    if (propName in sanitizeConfig) {
      return sanitizeConfig[propName];
    } else {
      return [[SanitizerUtils.asItIs, []]];
    }
  }

  static proceedExecutableConfig(rawValue: any, executableConfig: Array<Array<any>>) {
    return executableConfig.reduce((valueToSanitize, executableConfigElement) => {
      const [executableFunction, ...args] = executableConfigElement;

      valueToSanitize = executableFunction(valueToSanitize, ...args);

      return valueToSanitize;
    }, rawValue);
  }
}
