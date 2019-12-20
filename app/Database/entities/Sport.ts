import { SanitizedCSVRecord, Table } from '../../types';
import { Model } from '../utils/Model';

export class Sport extends Model {
  private static readonly TABLE_NAME = Table.SPORTS;

  private _name: string;

  constructor({ sport }: SanitizedCSVRecord) {
    super();
    this._name = sport;
  }

  write() {
    return super.insertToDB(Sport.TABLE_NAME, {
      name: this.name,
    });
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }
}
