import { IndexedObject } from '../types';
import { SanitizeConfig } from '../../config';

export class CSVSanitizer {
  static sanitizeArray<T>(csvRowsArray: Array<IndexedObject> = [], sanitizeConfig: SanitizeConfig) {
    return csvRowsArray.map(csvRow => CSVSanitizer.sanitizeRow<T>(csvRow, sanitizeConfig));
  }

  static sanitizeRow<T>(row: IndexedObject, sanitizeConfig: SanitizeConfig) {
    return Object.entries(row).reduce((rawCSVRow, csvRowEntry) => {
      const sanitizedEntry = CSVSanitizer.sanitizeField(csvRowEntry, sanitizeConfig);
      const [key, value] = sanitizedEntry;

      return {
        ...rawCSVRow,
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
      return [[[(rawValue: any) => rawValue], []]];
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
