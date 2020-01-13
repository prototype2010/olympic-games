'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
require('jest');
const utils_1 = require('../utils');
const entities_1 = require('../Database/entities');
const types_1 = require('../types');
const CSVRowsMapper_1 = require('../CSVProcessors/CSVRowsMapper');
const SanitizerConfig_1 = require('../CSVProcessors/SanitizerConfig');
const CSVSanitizer_1 = require('../CSVProcessors/CSVSanitizer');
const parsedCSVForMapper_1 = __importDefault(require('../testUtils/testData/csv/parsedCSVForMapper'));
const correctlyMappedCSV_1 = __importDefault(require('../testUtils/testData/csv/correctlyMappedCSV'));
describe('Verify parsed csv correctly maps to unique objects', () => {
  test('Hash map function should keep original objects', () => {
    const athletes = utils_1.getFromHashMap(new Map(), entities_1.Athlete);
    athletes([1], { height: 199, name: 'Boris', sex: types_1.Sex.M, weight: 99, year: 35 });
    athletes([1], { height: 199, name: 'Boris', sex: types_1.Sex.M, weight: 99, year: 35 });
    expect(athletes.getArray().length).toEqual(1);
  });
  test('Hash map adds original objects', () => {
    const athletes = utils_1.getFromHashMap(new Map(), entities_1.Athlete);
    athletes([1], { height: 199, name: 'Boris', sex: types_1.Sex.M, year: 35, weight: 99 });
    athletes([2], { height: 199, name: 'Arkady', sex: types_1.Sex.M, year: 35, weight: 99 });
    expect(athletes.getArray().length).toEqual(2);
  });
  test('HashMap contains all objects', () => {
    const athletes = utils_1.getFromHashMap(new Map(), entities_1.Athlete);
    const athleteParams1 = { name: 'Boris', sex: types_1.Sex.M, year: 35, weight: 99, height: 35 };
    const athleteParams2 = { name: 'Georgiy', sex: types_1.Sex.M, year: 35, weight: 99, height: 35 };
    athletes([1], athleteParams1);
    athletes([2], athleteParams2);
    expect(athletes.getArray()).toEqual([
      new entities_1.Athlete(athleteParams1),
      new entities_1.Athlete(athleteParams2),
    ]);
  });
  test('Verify rows mapper creates correct unique objects', () => {
    const sanitizedCSV = CSVSanitizer_1.CSVSanitizer.sanitizeArray(
      parsedCSVForMapper_1.default,
      SanitizerConfig_1.sanitizeConfig,
    );
    const { uniqueEntries } = CSVRowsMapper_1.mapToValidDBObjects(sanitizedCSV);
    expect(uniqueEntries).toEqual(correctlyMappedCSV_1.default);
  });
});
//# sourceMappingURL=CSVRowsMapper.js.map
