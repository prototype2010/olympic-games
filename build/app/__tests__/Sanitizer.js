'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const SanitizerUtils_1 = require('../utils/SanitizerUtils');
const CSVSanitizer_1 = require('../CSVProcessors/CSVSanitizer');
const types_1 = require('../types');
describe('CSV sanitizer', () => {
  test('Regexp sanitizer sanitizes correctly', () => {
    const sanitizeConfig = {
      name: [[SanitizerUtils_1.SanitizerUtils.clearByRegexp, [/\(.*\)/g, /"/g]]],
    };
    const sanitizedRow = CSVSanitizer_1.CSVSanitizer.sanitizeRow(
      { name: 'Boris (sneaky russian) The Blade' },
      sanitizeConfig,
    );
    expect(sanitizedRow).toEqual({ name: 'Boris  The Blade' });
  });
  test('Number sanitizer sanitizes correctly', () => {
    const sanitizeConfig = {
      value: [[SanitizerUtils_1.SanitizerUtils.parseNullableToInt, []]],
    };
    const sanitizedRow = CSVSanitizer_1.CSVSanitizer.sanitizeRow({ value: '1935' }, sanitizeConfig);
    expect(sanitizedRow).toEqual({ value: 1935 });
  });
  test('Enum sanitizer sanitizes correctly (negative)', () => {
    const sanitizeConfig = {
      value: [[SanitizerUtils_1.SanitizerUtils.fromEnum, [types_1.Medal]]],
    };
    const sanitizedRow = CSVSanitizer_1.CSVSanitizer.sanitizeRow({ value: 'Mud' }, sanitizeConfig);
    expect(sanitizedRow).toEqual({ value: undefined });
  });
  test('Enum sanitizer sanitizes correctly', () => {
    const sanitizeConfig = {
      value: [[SanitizerUtils_1.SanitizerUtils.fromEnum, [types_1.Medal]]],
    };
    const sanitizedRow = CSVSanitizer_1.CSVSanitizer.sanitizeRow({ value: 'gold' }, sanitizeConfig);
    expect(sanitizedRow).toEqual({ value: types_1.Medal.Gold });
  });
  test('Absent  value  sanitizes correctly', () => {
    const sanitizeConfig = {
      value: [[SanitizerUtils_1.SanitizerUtils.fromEnum, [types_1.Medal]]],
    };
    const sanitizedRow = CSVSanitizer_1.CSVSanitizer.sanitizeArray([{ nonExistantValue: 'gold' }], sanitizeConfig);
    expect(sanitizedRow).toEqual([{ nonExistantValue: 'gold' }]);
  });
  test('Valid object  sanitizes correctly', () => {
    const sanitizeConfig = {
      sex: [[SanitizerUtils_1.SanitizerUtils.fromEnum, [types_1.Sex]]],
      team: [
        [SanitizerUtils_1.SanitizerUtils.asString, []],
        [SanitizerUtils_1.SanitizerUtils.clearByRegexp, [/\d+$/g, /-$/g, /\(.*\)/g, /"/g]],
      ],
    };
    const sanitizedRow = CSVSanitizer_1.CSVSanitizer.sanitizeArray(
      [{ sex: 'm', team: 'Black (Pirates) Flag-777' }],
      sanitizeConfig,
    );
    expect(sanitizedRow).toEqual([{ sex: types_1.Sex.M, team: 'Black  Flag' }]);
  });
});
//# sourceMappingURL=Sanitizer.js.map
