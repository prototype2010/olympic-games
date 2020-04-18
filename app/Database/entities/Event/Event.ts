import { IndexedObject, Table } from '../../../types';
import { Model } from '../../utils/Model';

export interface EventInitParams {
  event: string;
}

export class Event extends Model {
  private static readonly TABLE_NAME = Table.EVENTS;
  readonly name: string;

  constructor({ event }: EventInitParams) {
    super();
    this.name = event;
  }

  getInsertParams(): IndexedObject {
    return {
      name: this.name,
    };
  }

  getKeyFields(): string[] {
    return ['name'];
  }

  public buildKey(): string {
    return super.buildKey();
  }

  write() {
    return super.insertToDB<Event>(Event.TABLE_NAME);
  }
}
