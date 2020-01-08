import { chunk } from 'lodash';
import { Model } from './Model';
const chunkSize = 100;

export const resolveAllAsChunks = async (entities: Array<{ write(): Promise<Model> }>) => {
  for await (const chunkPart of chunk(entities, chunkSize)) {
    await Promise.all(chunkPart.map(entity => entity.write()));
  }
};
