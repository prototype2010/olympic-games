import { chunk } from 'lodash';
import { Model } from './Model';
import { Table } from '../../types';
import { DatabaseConnection } from '../Database';
export const CHUNK_SIZE = 100;

export const resolveAllAsChunks = async (entities: Array<{ write(): Promise<Model> }>) => {
  for await (const chunkPart of chunk(entities, CHUNK_SIZE)) {
    await Promise.all(chunkPart.map(entity => entity.write()));
  }
};

export const dropTables = async () => {
  for await (const tableName of Object.values(Table)) {
    await DatabaseConnection.getInstance().raw(`DELETE FROM ${tableName}`);
  }
};
