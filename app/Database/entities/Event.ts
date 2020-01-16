import { EventInitParams, Table } from '../../types';
import { Model } from '../utils/Model';

export class Event extends Model {
  private static readonly TABLE_NAME = Table.EVENTS;
  readonly name: string;

  constructor({ event }: EventInitParams) {
    super();
    this.name = event;
  }

  getKeyFields(): string[] {
    return ['name'];
  }

  public buildKey(): string {
    return super.buildKey();
  }

  write() {
    return super.insertToDB<Event>(Event.TABLE_NAME, {
      name: this.name,
    });
  }
}
