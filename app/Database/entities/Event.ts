import { SanitizedCSVRecord, Table } from '../../types';
import { Model } from '../utils/Model';

export class Event extends Model {
  private static readonly TABLE_NAME = Table.EVENTS;
  readonly name: string;

  constructor({ event }: SanitizedCSVRecord) {
    super();
    this.name = event;
  }

  write() {
    return super.insertToDB(Event.TABLE_NAME, {
      name: this.name,
    });
  }
}
