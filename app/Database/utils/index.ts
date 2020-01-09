import { chunk } from 'lodash';
import { Model } from './Model';
import { Table } from '../../types';
import { DatabaseConnection } from '../Database';
const chunkSize = 100;

export const resolveAllAsChunks = async (entities: Array<{ write(): Promise<Model> }>) => {
  for await (const chunkPart of chunk(entities, chunkSize)) {
    const insertResult = await Promise.all(chunkPart.map(entity => entity.write()));
    return insertResult;
  }
};

export const dropTables = async () => {
  for await (const tableName of Object.values(Table)) {
    await DatabaseConnection.getInstance().raw(`DELETE FROM ${tableName}`);
  }
};
