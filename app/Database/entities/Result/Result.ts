import { DBSet, IndexedObject, Medal, MedalsChartParsedArgs, Table } from '../../../types';
import { Model } from '../../utils/Model';
import { DatabaseConnection } from '../../Database';

export interface ResultInitParams {
  medal: Medal;
}

export class Result extends Model {
  private static readonly TABLE_NAME = Table.RESULTS;

  private _athleteId?: number;
  private _gameId?: number;
  private _sportId?: number;
  private _eventId?: number;
  private _medal: Medal;

  constructor({ medal }: ResultInitParams) {
    super();

    this._medal = medal;
  }

  getInsertParams(): IndexedObject {
    const { athleteId, eventId, gameId, sportId, medal } = this;

    return {
      athlete_id: athleteId,
      game_id: gameId,
      sport_id: sportId,
      event_id: eventId,
      medal,
    };
  }

  write() {
    return super.insertToDB<Result>(Result.TABLE_NAME);
  }

  getKeyFields(): string[] {
    return ['athlete_id', 'game_id', 'sport_id', 'event_id', 'medal'];
  }

  public buildKey(): string {
    return super.buildKey();
  }

  static async getMedalsStatistics(matchObject: MedalsChartParsedArgs): Promise<DBSet> {
    const { medal, season, noc } = matchObject;

    return DatabaseConnection.getInstance()('teams')
      .where({ noc_name: noc })
      .join('athletes', 'teams.id', 'athletes.team_id')
      .join('results', 'athletes.id', 'results.athlete_id')
      .join('games', 'results.game_id', 'games.id')
      .join('sports', 'results.sport_id', 'sports.id')
      .where({ season })
      .whereIn('medal', medal ? [medal] : [Medal.Bronze, Medal.Gold, Medal.Silver])
      .groupBy('year')
      .orderBy('year', 'asc')
      .count('medal', { as: 'amount' })
      .select('year');
  }

  static async getAverageMedalsForTeams() {
    const db = DatabaseConnection.getInstance();

    const [medals_summary] = await db
      .with(
        'with_count',
        db('teams')
          .join('athletes', 'teams.id', 'athletes.team_id')
          .join('results', 'athletes.id', 'results.athlete_id')
          .whereNot('medal', Medal.NA)
          .count('medal', { as: 'medals_count' })
          .groupBy('team_id'),
      )
      .select('*')
      .avg('medals_count', { as: 'average_medals_per_team' })
      .from('with_count');

    const { average_medals_per_team = 0 } = medals_summary;

    return average_medals_per_team;
  }

  get athleteId() {
    return this._athleteId;
  }

  set athleteId(value) {
    this._athleteId = value;
  }

  get gameId() {
    return this._gameId;
  }

  set gameId(value) {
    this._gameId = value;
  }

  get sportId() {
    return this._sportId;
  }

  set sportId(value) {
    this._sportId = value;
  }

  get eventId() {
    return this._eventId;
  }

  set eventId(value) {
    this._eventId = value;
  }

  get medal(): Medal {
    return this._medal;
  }

  set medal(value: Medal) {
    this._medal = value;
  }
}
