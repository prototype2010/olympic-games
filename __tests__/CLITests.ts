import 'jest';
import { CLIArgumentsParser } from '../app/CLIParser/CLIArgumentsParser';
import { wrapThrowable } from '../app/testUtils';
import { CLIExtractorConfig } from '../app/CLIParser/config';

const { medals, 'top-teams': topTeams } = CLIExtractorConfig;
describe('CLI parser', () => {
  describe('CLIArgumentsParser.extract Medals chart (positive)', () => {
    test('All arguments season-noc-medal', () => {
      const parseResult = CLIArgumentsParser.extract(['summer', 'ukr', 'silver'], medals);

      expect(parseResult).toEqual({ match: { season: 'summer', medal: 'silver', noc: 'ukr' }, CLIArguments: [] });
    });

    test('All arguments different order noc-medal-season', () => {
      const parseResult = CLIArgumentsParser.extract(['USA', 'bronze', 'summer'], medals);

      expect(parseResult).toEqual({ match: { season: 'summer', medal: 'bronze', noc: 'USA' }, CLIArguments: [] });
    });

    test('All arguments different order season-medal-noc', () => {
      const parseResult = CLIArgumentsParser.extract(['winter', 'gold', 'UGA'], medals);

      expect(parseResult).toEqual({ match: { season: 'winter', medal: 'gold', noc: 'UGA' }, CLIArguments: [] });
    });

    test('Required argument + season (non required) noc-season', () => {
      const parseResult = CLIArgumentsParser.extract(['URK', 'winter'], medals);

      expect(parseResult).toEqual({ match: { season: 'winter', noc: 'URK' }, CLIArguments: [] });
    });

    test('Required argument + season (non required) different order season-noc', () => {
      const parseResult = CLIArgumentsParser.extract(['winter', 'URK'], medals);

      expect(parseResult).toEqual({ match: { season: 'winter', noc: 'URK' }, CLIArguments: [] });
    });
  });
  describe('CLIArgumentsParser.extract Medals chart (negative)', () => {
    test('Required argument NOC  missed season-medal', () => {
      expect(wrapThrowable(CLIArgumentsParser.extract, [['summer', 'silver'], medals])).toThrow();
    });

    test('Required argument NOC  missed different order medal-season', () => {
      expect(wrapThrowable(CLIArgumentsParser.extract, [['silver', 'winter'], medals])).toThrow();
    });

    test('Required argument NOC  missed season', () => {
      expect(wrapThrowable(CLIArgumentsParser.extract, [['winter'], medals])).toThrow();
    });
  });

  describe('CLIArgumentsParser.extract top-teams chart (positive)', () => {
    test('All required and additional arguments', () => {
      const parseResult = CLIArgumentsParser.extract(['summer', 2387, 'silver'], topTeams);
      expect(parseResult).toEqual({ match: { season: 'summer', medal: 'silver', year: 2387 }, CLIArguments: [] });
    });

    test('All required and additional arguments different order medal-year-season', () => {
      const parseResult = CLIArgumentsParser.extract(['silver', 2387, 'summer'], topTeams);
      expect(parseResult).toEqual({ match: { season: 'summer', medal: 'silver', year: 2387 }, CLIArguments: [] });
    });

    test('All required and additional arguments different order year-season-medal', () => {
      const parseResult = CLIArgumentsParser.extract([2387, 'summer', 'silver'], topTeams);
      expect(parseResult).toEqual({ match: { season: 'summer', medal: 'silver', year: 2387 }, CLIArguments: [] });
    });

    test('Required + year year-season', () => {
      const parseResult = CLIArgumentsParser.extract([2387, 'summer'], topTeams);
      expect(parseResult).toEqual({ match: { season: 'summer', year: 2387 }, CLIArguments: [] });
    });

    test('Required + year different order year-season', () => {
      const parseResult = CLIArgumentsParser.extract(['summer', 'silver'], topTeams);
      expect(parseResult).toEqual({ match: { season: 'summer', medal: 'silver' }, CLIArguments: [] });
    });

    test('Just requied argument - season', () => {
      const parseResult = CLIArgumentsParser.extract(['summer'], topTeams);
      expect(parseResult).toEqual({ match: { season: 'summer' }, CLIArguments: [] });
    });
  });

  describe('CLIArgumentsParser.extract top-teams chart (negative)', () => {
    test('No required argument year-medal', () => {
      expect(wrapThrowable(CLIArgumentsParser.extract, [[2387, 'silver'], topTeams])).toThrow();
    });

    test('No required argument medal', () => {
      expect(wrapThrowable(CLIArgumentsParser.extract, [['silver'], topTeams])).toThrow();
    });
    test('No required argument year', () => {
      expect(wrapThrowable(CLIArgumentsParser.extract, [[2387], topTeams])).toThrow();
    });
  });
});
