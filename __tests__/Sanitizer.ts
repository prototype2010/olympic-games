import { SanitizerUtils } from '../app/utils/SanitizerUtils';
import { CSVSanitizer } from '../app/CSVProcessors/CSVSanitizer';
import { Medal, Sex } from '../app/types';

describe('CSV sanitizer', () => {
  test('Regexp sanitizer sanitizes correctly', () => {
    const sanitizer = new CSVSanitizer({
      name: [[SanitizerUtils.clearByRegexp, [/\(.*\)/g, /"/g]]],
    });

    const sanitizedRow = sanitizer.sanitizeRow({ name: 'Boris (sneaky russian) The Blade' });

    expect(sanitizedRow).toEqual({ name: 'Boris  The Blade' });
  });

  test('Number sanitizer sanitizes correctly', () => {
    const sanitizer = new CSVSanitizer({
      value: [[SanitizerUtils.parseNullableToInt, []]],
    });

    const sanitizedRow = sanitizer.sanitizeRow({ value: '1935' });

    expect(sanitizedRow).toEqual({ value: 1935 });
  });

  test('Enum sanitizer sanitizes correctly (negative)', () => {
    const sanitizer = new CSVSanitizer({
      value: [[SanitizerUtils.fromEnum, [Medal]]],
    });

    const sanitizedRow = sanitizer.sanitizeRow({ value: 'Mud' });

    expect(sanitizedRow).toEqual({ value: undefined });
  });
  test('Enum sanitizer sanitizes correctly', () => {
    const sanitizer = new CSVSanitizer({
      value: [[SanitizerUtils.fromEnum, [Medal]]],
    });

    const sanitizedRow = sanitizer.sanitizeRow({ value: 'gold' });

    expect(sanitizedRow).toEqual({ value: Medal.Gold });
  });

  test('Absent  value  sanitizes correctly', () => {
    const sanitizer = new CSVSanitizer({
      value: [[SanitizerUtils.fromEnum, [Medal]]],
    });

    const sanitizedRow = sanitizer.sanitizeArray([{ nonExistantValue: 'gold' }]);

    expect(sanitizedRow).toEqual([{ nonExistantValue: 'gold' }]);
  });

  test('Valid object  sanitizes correctly', () => {
    const sanitizer = new CSVSanitizer({
      sex: [[SanitizerUtils.fromEnum, [Sex]]],
      team: [
        [SanitizerUtils.asString, []],
        [SanitizerUtils.clearByRegexp, [/\d+$/g, /-$/g, /\(.*\)/g, /"/g]],
      ],
    });

    const sanitizedRow = sanitizer.sanitizeArray([{ sex: 'm', team: 'Black (Pirates) Flag-777' }]);

    expect(sanitizedRow).toEqual([{ sex: Sex.M, team: 'Black  Flag' }]);
  });
});
