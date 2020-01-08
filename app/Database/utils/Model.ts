import { IndexedObject, Nullable, Table } from '../../types';
import { DatabaseConnection } from '../Database';

export abstract class Model {
  protected _id: Nullable<number> = null;

  async insertToDB(tableName: Table, insertData: IndexedObject) {
    try {
      const [id] = await DatabaseConnection.getInstance()(tableName).insert({
        id: null,
        ...insertData,
      });

      this.id = id;
    } catch (e) {
      console.error(`Failed to insert data to ${tableName}`);
      console.error(`Insert data ${JSON.stringify(insertData)}`, e);
      console.error(`Original error`, e);
    }
  }

  get id(): Nullable<number> {
    return this._id;
  }

  set id(value: Nullable<number>) {
    this._id = value;
  }

  abstract write(): Promise<any>;
}
