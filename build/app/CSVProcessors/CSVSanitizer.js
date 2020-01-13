'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const SanitizerUtils_1 = require('../utils/SanitizerUtils');
class CSVSanitizer {
  static sanitizeArray(csvRowsArray = [], sanitizeConfig) {
    return csvRowsArray.map(csvRow => CSVSanitizer.sanitizeRow(csvRow, sanitizeConfig));
  }
  static sanitizeRow(row, sanitizeConfig) {
    return Object.entries(row).reduce((rawCSVRow, csvRowEntry) => {
      const sanitizedEntry = CSVSanitizer.sanitizeField(csvRowEntry, sanitizeConfig);
      const [key, value] = sanitizedEntry;
      return Object.assign(Object.assign({}, rawCSVRow), { [key]: value });
    }, {});
  }
  static sanitizeField(parsedCSVEntry, sanitizeConfig) {
    const [key, value] = parsedCSVEntry;
    const executableConfig = CSVSanitizer.readConfigByPropName(key, sanitizeConfig);
    const sanitizedValue = CSVSanitizer.proceedExecutableConfig(value, executableConfig);
    return [key, sanitizedValue];
  }
  static readConfigByPropName(propName, sanitizeConfig) {
    if (propName in sanitizeConfig) {
      return sanitizeConfig[propName];
    } else {
      return [[SanitizerUtils_1.SanitizerUtils.asItIs, []]];
    }
  }
  static proceedExecutableConfig(rawValue, executableConfig) {
    return executableConfig.reduce((valueToSanitize, executableConfigElement) => {
      const [executableFunction, ...args] = executableConfigElement;
      valueToSanitize = executableFunction(valueToSanitize, ...args);
      return valueToSanitize;
    }, rawValue);
  }
}
exports.CSVSanitizer = CSVSanitizer;
//# sourceMappingURL=CSVSanitizer.js.map
