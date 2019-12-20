import { SanitizedCSVRecord, Table } from '../../types';
import { Model } from '../utils/Model';

export class Event extends Model {
  private static readonly TABLE_NAME = Table.EVENTS;
  private _name: string;

  constructor({ event }: SanitizedCSVRecord) {
    super();
    this._name = event;
  }

  write() {
    return super.insertToDB(Event.TABLE_NAME, {
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
