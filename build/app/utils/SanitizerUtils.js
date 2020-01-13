'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
class SanitizerUtils {
  static asString(value) {
    const sanitized = typeof value === 'string' ? value : String(value);
    return sanitized.replace(/"/g, "'");
  }
  static parseNullableToInt(value) {
    const parsed = Number.parseInt(value);
    if (!Number.isNaN(parsed) && Number.isFinite(parsed)) {
      return parsed;
    } else {
      return null;
    }
  }
  static fromEnum(value, enumArray) {
    const [enumObject] = enumArray;
    const foundValue = Object.values(enumObject).find(enumValue => {
      return enumValue.toLowerCase() === String(value).toLowerCase();
    });
    if (foundValue) {
      return foundValue;
    }
  }
  static clearByRegexp(value, regexps) {
    return regexps.reduce((cumulative, current) => {
      cumulative = cumulative.replace(current, () => '');
      return cumulative;
    }, value);
  }
  static asItIs(rawValue) {
    return rawValue;
  }
}
exports.SanitizerUtils = SanitizerUtils;
//# sourceMappingURL=SanitizerUtils.js.map
