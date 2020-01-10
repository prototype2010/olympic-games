import { IndexedObject } from '../types';

export class SanitizerUtils {
  static asString(value: any) {
    const sanitized = typeof value === 'string' ? value : String(value);

    return sanitized.replace(/"/g, "'");
  }

  static parseNullableToInt(value: any) {
    const parsed = Number.parseInt(<string>value);

    if (!Number.isNaN(parsed) && Number.isFinite(parsed)) {
      return parsed;
    } else {
      return null;
    }
  }

  static fromEnum(value: any, enumArray: Array<IndexedObject>): string | undefined {
    const [enumObject] = enumArray;

    const foundValue = Object.values(enumObject).find(enumValue => {
      return enumValue.toLowerCase() === String(value).toLowerCase();
    });

    if (foundValue) {
      return foundValue;
    }
  }

  static clearByRegexp(value: string, regexps: RegExp[]) {
    return regexps.reduce((cumulative, current) => {
      cumulative = cumulative.replace(current, () => '');

      return cumulative;
    }, value);
  }

  static asItIs(rawValue: any) {
    return rawValue;
  }
}
