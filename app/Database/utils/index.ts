import { chunk } from 'lodash';
const chunkSize = 100;

export const resolveAllAsChunks = async (entities: Array<{ write(): Promise<any> }>) => {
  for await (const chunkPart of chunk(entities, chunkSize)) {
    await Promise.all(chunkPart.map(entity => entity.write()));
  }
};
