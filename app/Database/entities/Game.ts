import { Nullable, SanitizedCSVRecord, Season, Table } from '../../types';
import { Model } from '../utils/Model';

export class Game extends Model {
  private static readonly TABLE_NAME = Table.GAMES;

  private _year: Nullable<number>;
  private _season: Nullable<Season>;
  private _city: string;

  constructor({ city, year, season }: SanitizedCSVRecord) {
    super();
    this._year = year;
    this._season = season;
    this._city = city;
  }

  write() {
    const { city, season, year } = this;

    return super.insertToDB(Game.TABLE_NAME, {
      city,
      year,
      season,
    });
  }

  get year(): Nullable<number> {
    return this._year;
  }

  set year(value: Nullable<number>) {
    this._year = value;
  }

  get season(): Nullable<Season> {
    return this._season;
  }

  set season(value: Nullable<Season>) {
    this._season = value;
  }

  get city(): string {
    return this._city;
  }

  set city(value: string) {
    this._city = value;
  }
}
