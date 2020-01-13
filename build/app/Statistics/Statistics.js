'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function(resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
Object.defineProperty(exports, '__esModule', { value: true });
const types_1 = require('../types');
const Database_1 = require('../Database/Database');
class Statistics {
  static getDatasetByChartName(chartName, matchObject) {
    switch (chartName) {
      case types_1.Charts.Medals: {
        return Statistics.getMedalsStatistics(matchObject);
      }
      case types_1.Charts.TopTeams: {
        return Statistics.getTopTeamsStatistics(matchObject);
      }
      default: {
        throw new Error(
          `No such chart name ${chartName}. Available charts [${Object.values(types_1.Charts).join(' | ')}]`,
        );
      }
    }
  }
  static getMedalsStatistics(matchObject) {
    return __awaiter(this, void 0, void 0, function*() {
      const { medal, season, noc } = matchObject;
      //Show bar chart with amount of medals for the certain team specified by
      // NOC name (case insensitive), season and certain medal name (gold, silver, bronze).
      // NOC name and season are required. If medal name is not present, all medals should be counted.
      // Sort result by year in chronological order.
      // If there is no medals for this year - show 0 (blank bar), but all years must be present.
      return Database_1.DatabaseConnection.getInstance()('teams')
        .where({ noc_name: noc })
        .join('athletes', 'teams.id', 'athletes.team_id')
        .join('results', 'athletes.id', 'results.athlete_id')
        .join('games', 'results.game_id', 'games.id')
        .join('sports', 'results.sport_id', 'sports.id')
        .where({ season })
        .whereIn('medal', medal ? [medal] : [types_1.Medal.Bronze, types_1.Medal.Gold, types_1.Medal.Silver])
        .groupBy('year')
        .orderBy('year', 'asc')
        .count('medal', { as: 'amount' })
        .select('year');
    });
  }
  static getTopTeamsStatistics(matchObject) {
    return __awaiter(this, void 0, void 0, function*() {
      const { medal, season, year } = matchObject;
      const db = Database_1.DatabaseConnection.getInstance();
      const currentYear = new Date().getFullYear();
      //Show amount of medals per team for the certain year, season and medal type ordered by amount.
      // Most awarded teams must be on the top. Season is required.
      //
      // If year is not specified take results for all time.
      // If medal type is not specified take results for all types.
      // Show resulting chart only for those teams, that have more than average result: if average amount for all teams is 200 - show only teams with more than 200 medals.
      const [medals_summary] = yield Database_1.DatabaseConnection.getInstance()
        .with(
          'with_count',
          db('teams')
            .join('athletes', 'teams.id', 'athletes.team_id')
            .join('results', 'athletes.id', 'results.athlete_id')
            .whereNot('medal', types_1.Medal.NA)
            .count('medal', { as: 'medals_count' })
            .groupBy('team_id'),
        )
        .select('*')
        .avg('medals_count', { as: 'average_medals_per_team' })
        .from('with_count');
      const { average_medals_per_team = 0 } = medals_summary;
      return db('teams')
        .join('athletes', 'teams.id', 'athletes.team_id')
        .join('results', 'athletes.id', 'results.athlete_id')
        .join('games', 'results.game_id', 'games.id')
        .whereIn('medal', medal ? [medal] : [types_1.Medal.Bronze, types_1.Medal.Gold, types_1.Medal.Silver])
        .where('games.season', season)
        .where(function() {
          if (year) {
            this.where('games.year', year);
          } else {
            this.whereBetween('games.year', [0, currentYear]);
          }
        })
        .select('noc_name', Database_1.DatabaseConnection.getInstance().raw('COUNT(team_id) as amount'))
        .groupBy('team_id')
        .orderBy('amount', 'desc')
        .having('amount', '>', average_medals_per_team);
    });
  }
}
exports.Statistics = Statistics;
//# sourceMappingURL=Statistics.js.map
