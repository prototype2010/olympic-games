import { SanitizedCSVRecord, Table } from '../../types';
import { Model } from '../utils/Model';

export class Sport extends Model {
  private static readonly TABLE_NAME = Table.SPORTS;

  readonly name: string;

  constructor({ sport }: SanitizedCSVRecord) {
    super();
    this.name = sport;
  }

  write() {
    return super.insertToDB(Sport.TABLE_NAME, {
      name: this.name,
    });
  }
}
