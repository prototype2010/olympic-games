import { IndexedObject } from '../types';
import { Model } from '../Database/utils/Model';

export type creatorFunction = (sanitizedCSVRow: IndexedObject) => Model;

export class ExtractionDescriptor {
  constructor(private creatorFunction: creatorFunction, private fieldName: string) {}

  extract(extractTarget: IndexedObject) {
    return {
      [this.fieldName]: this.creatorFunction(extractTarget),
    };
  }
}
