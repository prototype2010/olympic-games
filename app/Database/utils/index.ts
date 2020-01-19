import { chunk } from 'lodash';
import { Model } from './Model';
import { IndexedObject, Table } from '../../types';
import { DatabaseConnection } from '../Database';
export const CHUNK_SIZE = 100;

export const resolveAllAsChunks = async (entities: Array<Model>) => {
  for await (const chunkPart of chunk(entities, CHUNK_SIZE)) {
    await Promise.all(chunkPart.map(entity => entity.write()));
  }
};

export const dropTables = async () => {
  for await (const tableName of Object.values(Table)) {
    await DatabaseConnection.getInstance().raw(`DELETE FROM ${tableName}`);
  }
};

type mapFunctionCallback<T> = (value: T, index: number) => IndexedObject;

export const insertValues = async <T>(
  tableName: Table,
  entitiesToInsert: Array<T>,
  mapCallBack: mapFunctionCallback<T>,
) => {
  for await (const rowsChunk of chunk(entitiesToInsert, CHUNK_SIZE)) {
    await DatabaseConnection.getInstance()(tableName).insert(rowsChunk.map(mapCallBack));
  }
};
