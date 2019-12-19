import {chunk} from 'lodash';
import {Entity} from "../../types";
const chunkSize = 20;

export const resolveAllAsChunks = async (entities : Array<Entity>) => {
    for await (const chunkPart of chunk(entities,chunkSize)) {
       await Promise.all(chunkPart.map(entity => entity.write()));
    }
};