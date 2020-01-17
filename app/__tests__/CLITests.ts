import 'jest';
import { CLIArgumentsParser } from '../CLIParser/CLIArgumentsParser';
import { wrapThrowable } from '../testUtils';
import { CLIExtractorConfig } from '../CLIParser/config';

const { medals, 'top-teams': topTeams } = CLIExtractorConfig;
describe('CLI parser', () => {
  describe('Medals chart', () => {
    test('season-noc-medal', () => {
      const parseResult = CLIArgumentsParser.extract(['summer', 'ukr', 'silver'], medals);

      expect(parseResult).toEqual({ match: { season: 'summer', medal: 'silver', noc: 'ukr' }, CLIArguments: [] });
    });

    test('noc-medal-season', () => {
      const parseResult = CLIArgumentsParser.extract(['USA', 'bronze', 'summer'], medals);

      expect(parseResult).toEqual({ match: { season: 'summer', medal: 'bronze', noc: 'USA' }, CLIArguments: [] });
    });

    test('season-medal-noc', () => {
      const parseResult = CLIArgumentsParser.extract(['winter', 'gold', 'UGA'], medals);

      expect(parseResult).toEqual({ match: { season: 'winter', medal: 'gold', noc: 'UGA' }, CLIArguments: [] });
    });

    test('noc-season', () => {
      const parseResult = CLIArgumentsParser.extract(['URK', 'winter'], medals);

      expect(parseResult).toEqual({ match: { season: 'winter', noc: 'URK' }, CLIArguments: [] });
    });

    test('season-noc', () => {
      const parseResult = CLIArgumentsParser.extract(['winter', 'URK'], medals);

      expect(parseResult).toEqual({ match: { season: 'winter', noc: 'URK' }, CLIArguments: [] });
    });

    test('season-medal', () => {
      expect(wrapThrowable(CLIArgumentsParser.extract, [['summer', 'silver'], medals])).toThrow();
    });

    test('medal-season', () => {
      expect(wrapThrowable(CLIArgumentsParser.extract, [['silver', 'winter'], medals])).toThrow();
    });

    test('season', () => {
      expect(wrapThrowable(CLIArgumentsParser.extract, [['winter'], medals])).toThrow();
    });
  });

  describe('Top-teams chart', () => {
    test('season-year-medal', () => {
      const parseResult = CLIArgumentsParser.extract(['summer', 2387, 'silver'], topTeams);
      expect(parseResult).toEqual({ match: { season: 'summer', medal: 'silver', year: 2387 }, CLIArguments: [] });
    });

    test('medal-year-season', () => {
      const parseResult = CLIArgumentsParser.extract(['silver', 2387, 'summer'], topTeams);
      expect(parseResult).toEqual({ match: { season: 'summer', medal: 'silver', year: 2387 }, CLIArguments: [] });
    });

    test('year-season-medal', () => {
      const parseResult = CLIArgumentsParser.extract([2387, 'summer', 'silver'], topTeams);
      expect(parseResult).toEqual({ match: { season: 'summer', medal: 'silver', year: 2387 }, CLIArguments: [] });
    });

    test('year-season', () => {
      const parseResult = CLIArgumentsParser.extract([2387, 'summer'], topTeams);
      expect(parseResult).toEqual({ match: { season: 'summer', year: 2387 }, CLIArguments: [] });
    });

    test('season-medal', () => {
      const parseResult = CLIArgumentsParser.extract(['summer', 'silver'], topTeams);
      expect(parseResult).toEqual({ match: { season: 'summer', medal: 'silver' }, CLIArguments: [] });
    });

    test('season', () => {
      const parseResult = CLIArgumentsParser.extract(['summer'], topTeams);
      expect(parseResult).toEqual({ match: { season: 'summer' }, CLIArguments: [] });
    });

    test('year-medal', () => {
      expect(wrapThrowable(CLIArgumentsParser.extract, [[2387, 'silver'], topTeams])).toThrow();
    });

    test('medal', () => {
      expect(wrapThrowable(CLIArgumentsParser.extract, [['silver'], topTeams])).toThrow();
    });
    test('year', () => {
      expect(wrapThrowable(CLIArgumentsParser.extract, [[2387], topTeams])).toThrow();
    });
  });
});
