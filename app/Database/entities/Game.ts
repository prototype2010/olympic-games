import { IndexedObject, Season, Table } from '../../types';
import { Model } from '../utils/Model';

export interface GameInitParams {
  year?: number;
  season?: Season;
  city: string;
}

export class Game extends Model {
  private static readonly TABLE_NAME = Table.GAMES;

  private year?: number;
  private season?: Season;
  private city: string;

  constructor({ city, year, season }: GameInitParams) {
    super();
    this.year = year;
    this.season = season;
    this.city = city;
  }

  getKeyFields(): string[] {
    return ['year', 'season', 'city'];
  }

  public buildKey(): string {
    return super.buildKey();
  }

  getInsertParams(): IndexedObject {
    const { city, season, year } = this;

    return {
      city,
      year,
      season,
    };
  }

  write() {
    return super.insertToDB<Game>(Game.TABLE_NAME);
  }
}
