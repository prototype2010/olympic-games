import { IndexedObject, SanitizeConfig } from '../types';
import { SanitizerUtils } from '../utils/SanitizerUtils';

export class CSVSanitizer<T> {
  private readonly sanitizeConfig?: SanitizeConfig;

  constructor(sanitizeConfig?: SanitizeConfig) {
    this.sanitizeConfig = sanitizeConfig;
  }

  public sanitizeArray(csvRowsArray: Array<IndexedObject> = []): Array<T> {
    return csvRowsArray.map(csvRow => this.sanitizeRow(csvRow));
  }

  public sanitizeRow(row: IndexedObject): T {
    const csvRowEntries = Object.entries(row);

    return csvRowEntries.reduce((sanitizedRow, csvRowEntry) => {
      const [key, value] = csvRowEntry;

      const sanitizedEntry = this.sanitizeField(key, value);

      return {
        ...sanitizedRow,
        ...sanitizedEntry,
      };
    }, {} as T);
  }

  public sanitizeField(key: string, value: any): IndexedObject {
    const executableConfig = this.readConfigByPropName(key);
    const sanitizedValue = this.proceedExecutableConfig(value, executableConfig);

    return { [key]: sanitizedValue };
  }

  private readConfigByPropName(propName: string): Array<Array<any>> {
    if (propName in this.sanitizeConfig!) {
      return this.sanitizeConfig![propName];
    } else {
      return [[SanitizerUtils.asItIs, []]];
    }
  }

  public proceedExecutableConfig(rawValue: any, executableConfig: Array<Array<any>>) {
    return executableConfig.reduce((valueToSanitize, executableConfigElement) => {
      const [executableFunction, ...args] = executableConfigElement;

      valueToSanitize = executableFunction(valueToSanitize, ...args);

      return valueToSanitize;
    }, rawValue);
  }
}
