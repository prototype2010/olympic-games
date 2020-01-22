import { IndexedObject, Medal, Table } from '../../../types';
import { Model } from '../../utils/Model';

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
