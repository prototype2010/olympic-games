import { IndexedObject, Medal, Table, TopTeamsChartParsedArgs } from '../../../types';
import { Model } from '../../utils/Model';
import * as Knex from 'knex';
import { DatabaseConnection } from '../../Database';

export interface TeamInitParams {
  team: string;
  noc: string;
}

export class Team extends Model {
  private static readonly TABLE_NAME = Table.TEAMS;

  readonly name: string;
  readonly NOCName: string;

  constructor({ team, noc }: TeamInitParams) {
    super();
    this.name = team;
    this.NOCName = noc;
  }

  getKeyFields(): string[] {
    return ['NOCName'];
  }

  public buildKey(): string {
    return super.buildKey();
  }

  getInsertParams(): IndexedObject {
    const { name, NOCName } = this;

    return {
      name,
      noc_name: NOCName,
    };
  }

  write() {
    return super.insertToDB<Team>(Team.TABLE_NAME);
  }

  static async getTopTeams(matchObject: TopTeamsChartParsedArgs, medalsAverage: number) {
    const { medal, season, year } = matchObject;

    const currentYear = new Date().getFullYear();

    return DatabaseConnection.getInstance()('teams')
      .join('athletes', 'teams.id', 'athletes.team_id')
      .join('results', 'athletes.id', 'results.athlete_id')
      .join('games', 'results.game_id', 'games.id')
      .whereIn('medal', medal ? [medal] : [Medal.Bronze, Medal.Gold, Medal.Silver])
      .where('games.season', season)
      .where(function(this: Knex) {
        if (year) {
          this.where('games.year', year);
        } else {
          this.whereBetween('games.year', [0, currentYear]);
        }
      })
      .select('noc_name', DatabaseConnection.getInstance().raw('COUNT(team_id) as amount'))
      .groupBy('team_id')
      .orderBy('amount', 'desc')
      .having('amount', '>', medalsAverage);
  }
}
