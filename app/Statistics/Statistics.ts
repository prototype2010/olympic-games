import { Charts, IndexedObject, Medal, MedalsChartParsedArgs, TopTeamsChartParsedArgs } from '../types';
import { DatabaseConnection } from '../Database/Database';
import { getMedalsSummaryFromDBSet, prepareEnumValueForQuery } from './utils';

export class Statistics {
  static getDatasetByChartName(chartName: Charts, matchObject: IndexedObject) {
    switch (chartName) {
      case Charts.Medals: {
        return Statistics.getMedalsStatistics(matchObject as MedalsChartParsedArgs);
      }

      case Charts.TopTeams: {
        return Statistics.getTopTeamsStatistics(matchObject as TopTeamsChartParsedArgs);
      }

      default: {
        throw new Error(`No such chart name ${chartName}. Available charts [${Object.values(Charts).join(' | ')}]`);
      }
    }
  }

  static async getMedalsStatistics(matchObject: MedalsChartParsedArgs) {
    const { medal, season, noc } = matchObject;

    //Show bar chart with amount of medals for the certain team specified by
    // NOC name (case insensitive), season and certain medal name (gold, silver, bronze).
    // NOC name and season are required. If medal name is not present, all medals should be counted.
    // Sort result by year in chronological order.
    // If there is no medals for this year - show 0 (blank bar), but all years must be present.

    const medalsSummary = await DatabaseConnection.getInstance()('teams')
      .where({ noc_name: noc })
      .join('athletes', 'teams.id', 'athletes.team_id')
      .join('results', 'athletes.id', 'results.athlete_id')
      .join('games', 'results.game_id', 'games.id')
      .join('sports', 'results.sport_id', 'sports.id')
      .where({ season })
      .whereIn('medal', prepareEnumValueForQuery(medal, Object.values(Medal)))
      .orderBy('year', 'asc')
      .select('year', 'medal');

    return getMedalsSummaryFromDBSet('year', medalsSummary);
  }

  static async getTopTeamsStatistics(matchObject: TopTeamsChartParsedArgs) {
    const { medal, season, year } = matchObject;

    const medalsSummary = await DatabaseConnection.getInstance()('teams');

    //Show amount of medals per team for the certain year, season and medal type ordered by amount.
    // Most awarded teams must be on the top. Season is required.
    //
    // If year is not specified take results for all time.
    // If medal type is not specified take results for all types.
    // Show resulting chart only for those teams, that have more than average result: if average amount for all teams is 200 - show only teams with more than 200 medals.
  }
}
