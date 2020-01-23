import { Charts, DBSet, IndexedObject, MedalsChartParsedArgs, TopTeamsChartParsedArgs } from '../types';

import { Result, Team } from '../Database/entities';

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

  static async getMedalsStatistics(matchObject: MedalsChartParsedArgs): Promise<DBSet> {
    return Result.getMedalsStatistics(matchObject);
  }

  static async getTopTeamsStatistics(matchObject: TopTeamsChartParsedArgs): Promise<DBSet> {
    const medalsAverage = await Result.getAverageMedalsForTeams();

    return Team.getTopTeams(matchObject, medalsAverage);
  }
}
