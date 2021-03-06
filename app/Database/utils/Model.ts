import { IndexedObject, Table } from '../../types';
import { DatabaseConnection } from '../Database';
import { pick } from 'lodash';

export abstract class Model {
  private _id?: number;

  async insertToDB<T>(tableName: Table): Promise<T> {
    const insertParams = this.getInsertParams();

    try {
      const [id] = await DatabaseConnection.getInstance()(tableName).insert({
        id: insertParams.id || null,
        ...insertParams,
      });

      this._id = id;

      return (this as any) as T;
    } catch (e) {
      console.error(`Failed to insert data to ${tableName}`);
      console.error(`Insert data ${JSON.stringify(insertParams)}`, e);
      console.error(`Original error`, e);

      return (this as any) as T;
    }
  }

  abstract write(): Promise<Model>;

  public buildKey(): string {
    const pickedObject = pick(this, this.getKeyFields());
    const entries = Object.entries(pickedObject);

    const keyValuePairs: Array<string> = entries.map(([key, value]) => `${key}-${value}`);

    return keyValuePairs.join('#');
  }

  abstract getInsertParams(): IndexedObject;

  abstract getKeyFields(): string[];

  get id(): number | undefined {
    return this._id;
  }

  set id(value) {
    this._id = value;
  }
}
