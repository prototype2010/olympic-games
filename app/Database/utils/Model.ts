import { IndexedObject, Table } from '../../types';
import { DatabaseConnection } from '../Database';

export abstract class Model {
  private _id?: number;

  async insertToDB(tableName: Table, insertData: IndexedObject) {
    try {
      const [id] = await DatabaseConnection.getInstance()(tableName).insert({
        id: null,
        ...insertData,
      });

      this._id = id;
    } catch (e) {
      console.error(`Failed to insert data to ${tableName}`);
      console.error(`Insert data ${JSON.stringify(insertData)}`, e);
      console.error(`Original error`, e);
    }
  }

  abstract write(): Promise<any>;

  get id() {
    return this._id;
  }

  set id(value) {
    this._id = value;
  }
}
