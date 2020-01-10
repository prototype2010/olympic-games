import { IndexedObject, Nullable, Table } from '../../types';
import { DatabaseConnection } from '../Database';

export abstract class Model {
  protected _dbID: Nullable<number> = null;

  async insertToDB(tableName: Table, insertData: IndexedObject) {
    try {
      const [id] = await DatabaseConnection.getInstance()(tableName).insert({
        id: null,
        ...insertData,
      });

      this.dbID = id;
    } catch (e) {
      console.error(`Failed to insert data to ${tableName}`);
      console.error(`Insert data ${JSON.stringify(insertData)}`, e);
      console.error(`Original error`, e);
    }
  }

  get dbID(): Nullable<number> {
    return this._dbID;
  }

  set dbID(value: Nullable<number>) {
    this._dbID = value;
  }

  abstract write(): Promise<any>;
}
