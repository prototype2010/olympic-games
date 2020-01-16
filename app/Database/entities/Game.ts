import { GameInitParams, Season, Table } from '../../types';
import { Model } from '../utils/Model';

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

  write() {
    const { city, season, year } = this;

    return super.insertToDB<Game>(Game.TABLE_NAME, {
      city,
      year,
      season,
    });
  }
}
