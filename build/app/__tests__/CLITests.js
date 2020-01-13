'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
require('jest');
const CLIArgumentsParser_1 = require('../utils/CLIArgumentsParser');
const SanitizerConfig_1 = require('../CSVProcessors/SanitizerConfig');
const testUtils_1 = require('../testUtils');
const { medals, 'top-teams': topTeams } = SanitizerConfig_1.CLIExtractorConfig;
describe('CLI parser', () => {
  describe('Medals chart', () => {
    test('season-noc-medal', () => {
      const parseResult = CLIArgumentsParser_1.CLIArgumentsParser.extract(['summer', 'ukr', 'silver'], medals);
      expect(parseResult).toEqual({ match: { season: 'summer', medal: 'silver', noc: 'ukr' }, CLIArguments: [] });
    });
    test('noc-medal-season', () => {
      const parseResult = CLIArgumentsParser_1.CLIArgumentsParser.extract(['USA', 'bronze', 'summer'], medals);
      expect(parseResult).toEqual({ match: { season: 'summer', medal: 'bronze', noc: 'USA' }, CLIArguments: [] });
    });
    test('season-medal-noc', () => {
      const parseResult = CLIArgumentsParser_1.CLIArgumentsParser.extract(['winter', 'gold', 'UGA'], medals);
      expect(parseResult).toEqual({ match: { season: 'winter', medal: 'gold', noc: 'UGA' }, CLIArguments: [] });
    });
    test('noc-season', () => {
      const parseResult = CLIArgumentsParser_1.CLIArgumentsParser.extract(['URK', 'winter'], medals);
      expect(parseResult).toEqual({ match: { season: 'winter', noc: 'URK' }, CLIArguments: [] });
    });
    test('season-noc', () => {
      const parseResult = CLIArgumentsParser_1.CLIArgumentsParser.extract(['winter', 'URK'], medals);
      expect(parseResult).toEqual({ match: { season: 'winter', noc: 'URK' }, CLIArguments: [] });
    });
    test('season-medal', () => {
      expect(
        testUtils_1.wrapThrowable(CLIArgumentsParser_1.CLIArgumentsParser.extract, [['summer', 'silver'], medals]),
      ).toThrow();
    });
    test('medal-season', () => {
      expect(
        testUtils_1.wrapThrowable(CLIArgumentsParser_1.CLIArgumentsParser.extract, [['silver', 'winter'], medals]),
      ).toThrow();
    });
    test('season', () => {
      expect(
        testUtils_1.wrapThrowable(CLIArgumentsParser_1.CLIArgumentsParser.extract, [['winter'], medals]),
      ).toThrow();
    });
  });
  describe('Top-teams chart', () => {
    test('season-year-medal', () => {
      const parseResult = CLIArgumentsParser_1.CLIArgumentsParser.extract(['summer', 2387, 'silver'], topTeams);
      expect(parseResult).toEqual({ match: { season: 'summer', medal: 'silver', year: 2387 }, CLIArguments: [] });
    });
    test('medal-year-season', () => {
      const parseResult = CLIArgumentsParser_1.CLIArgumentsParser.extract(['silver', 2387, 'summer'], topTeams);
      expect(parseResult).toEqual({ match: { season: 'summer', medal: 'silver', year: 2387 }, CLIArguments: [] });
    });
    test('year-season-medal', () => {
      const parseResult = CLIArgumentsParser_1.CLIArgumentsParser.extract([2387, 'summer', 'silver'], topTeams);
      expect(parseResult).toEqual({ match: { season: 'summer', medal: 'silver', year: 2387 }, CLIArguments: [] });
    });
    test('year-season', () => {
      const parseResult = CLIArgumentsParser_1.CLIArgumentsParser.extract([2387, 'summer'], topTeams);
      expect(parseResult).toEqual({ match: { season: 'summer', year: 2387 }, CLIArguments: [] });
    });
    test('season-medal', () => {
      const parseResult = CLIArgumentsParser_1.CLIArgumentsParser.extract(['summer', 'silver'], topTeams);
      expect(parseResult).toEqual({ match: { season: 'summer', medal: 'silver' }, CLIArguments: [] });
    });
    test('season', () => {
      const parseResult = CLIArgumentsParser_1.CLIArgumentsParser.extract(['summer'], topTeams);
      expect(parseResult).toEqual({ match: { season: 'summer' }, CLIArguments: [] });
    });
    test('year-medal', () => {
      expect(
        testUtils_1.wrapThrowable(CLIArgumentsParser_1.CLIArgumentsParser.extract, [[2387, 'silver'], topTeams]),
      ).toThrow();
    });
    test('medal', () => {
      expect(
        testUtils_1.wrapThrowable(CLIArgumentsParser_1.CLIArgumentsParser.extract, [['silver'], topTeams]),
      ).toThrow();
    });
    test('year', () => {
      expect(testUtils_1.wrapThrowable(CLIArgumentsParser_1.CLIArgumentsParser.extract, [[2387], topTeams])).toThrow();
    });
  });
});
//# sourceMappingURL=CLITests.js.map
