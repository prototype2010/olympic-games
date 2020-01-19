import { IndexedObject, Table } from '../../types';
import { Model } from '../utils/Model';

export interface SportInitParams {
  sport: string;
}

export class Sport extends Model {
  private static readonly TABLE_NAME = Table.SPORTS;

  readonly name: string;

  constructor({ sport }: SportInitParams) {
    super();
    this.name = sport;
  }

  getKeyFields(): string[] {
    return ['name'];
  }

  public buildKey(): string {
    return super.buildKey();
  }

  getInsertParams(): IndexedObject {
    return {
      name: this.name,
    };
  }

  write() {
    return super.insertToDB<Sport>(Sport.TABLE_NAME);
  }
}
