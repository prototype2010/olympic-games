import {chunk} from 'lodash';
import { WritableToDB} from "../../types";
const chunkSize = 100;

export const resolveAllAsChunks = async (entities : Array<WritableToDB>) => {
    for await (const chunkPart of chunk(entities,chunkSize)) {
       await Promise.all(chunkPart.map(entity => entity.write()));
    }
};