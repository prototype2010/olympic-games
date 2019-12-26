import { IndexedObject, Nullable } from '../types';

export class Sanitizer {
  static asString(value: any) {
    const sanitized = typeof value === 'string' ? value : String(value);

    return sanitized.replace(/"/g, () => "'");
  }

  static parseInt(value: any) {
    const parsed = Number.parseInt(<string>value);

    if (!Number.isNaN(parsed) && Number.isFinite(parsed)) {
      return parsed;
    } else {
      return null;
    }
  }

  static fromEnum(value: any, enumArray: Array<IndexedObject>): Nullable<string> {
    const [enumObject] = enumArray;

    const foundValue = Object.values(enumObject).find(enumValue => {
      return enumValue.toLowerCase() === String(value).toLowerCase();
    });

    if (foundValue) {
      return foundValue;
    } else {
      return null;
    }
  }

  static clearByRegexp(value: string, regexps: RegExp[]) {
    return regexps.reduce((cumulative, current) => {
      cumulative = cumulative.replace(current, () => '');

      return cumulative;
    }, value);
  }
}
