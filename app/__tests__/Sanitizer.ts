import { SanitizerUtils } from '../utils/SanitizerUtils';
import { SanitizeConfig } from '../CSVProcessors/SanitizerConfig';
import { CSVSanitizer } from '../CSVProcessors/CSVSanitizer';
import { Medal, Sex } from '../types';

describe('CSV sanitizer', () => {
  test('Regexp sanitizer sanitizes correctly', () => {
    const sanitizeConfig: SanitizeConfig = {
      name: [[SanitizerUtils.clearByRegexp, [/\(.*\)/g, /"/g]]],
    };

    const sanitizedRow = CSVSanitizer.sanitizeRow({ name: 'Boris (sneaky russian) The Blade' }, sanitizeConfig);

    expect(sanitizedRow).toEqual({ name: 'Boris  The Blade' });
  });

  test('Number sanitizer sanitizes correctly', () => {
    const sanitizeConfig: SanitizeConfig = {
      value: [[SanitizerUtils.parseNullableToInt, []]],
    };

    const sanitizedRow = CSVSanitizer.sanitizeRow({ value: '1935' }, sanitizeConfig);

    expect(sanitizedRow).toEqual({ value: 1935 });
  });

  test('Enum sanitizer sanitizes correctly (negative)', () => {
    const sanitizeConfig: SanitizeConfig = {
      value: [[SanitizerUtils.fromEnum, [Medal]]],
    };

    const sanitizedRow = CSVSanitizer.sanitizeRow({ value: 'Mud' }, sanitizeConfig);

    expect(sanitizedRow).toEqual({ value: undefined });
  });
  test('Enum sanitizer sanitizes correctly', () => {
    const sanitizeConfig: SanitizeConfig = {
      value: [[SanitizerUtils.fromEnum, [Medal]]],
    };

    const sanitizedRow = CSVSanitizer.sanitizeRow({ value: 'gold' }, sanitizeConfig);

    expect(sanitizedRow).toEqual({ value: Medal.Gold });
  });

  test('Absent  value  sanitizes correctly', () => {
    const sanitizeConfig: SanitizeConfig = {
      value: [[SanitizerUtils.fromEnum, [Medal]]],
    };

    const sanitizedRow = CSVSanitizer.sanitizeArray([{ nonExistantValue: 'gold' }], sanitizeConfig);

    expect(sanitizedRow).toEqual([{ nonExistantValue: 'gold' }]);
  });

  test('Valid object  sanitizes correctly', () => {
    const sanitizeConfig: SanitizeConfig = {
      sex: [[SanitizerUtils.fromEnum, [Sex]]],
      team: [
        [SanitizerUtils.asString, []],
        [SanitizerUtils.clearByRegexp, [/\d+$/g, /-$/g, /\(.*\)/g, /"/g]],
      ],
    };

    const sanitizedRow = CSVSanitizer.sanitizeArray([{ sex: 'm', team: 'Black (Pirates) Flag-777' }], sanitizeConfig);

    expect(sanitizedRow).toEqual([{ sex: Sex.M, team: 'Black  Flag' }]);
  });
});
