import { IndexedObject } from '../types';
import { ExtractionDescriptor } from './ExtractionDescriptor';

export class BulkObjectExtractor<T> {
  static extractRow(descriptor: ExtractionDescriptor, sourceObject: IndexedObject) {
    return descriptor.extract(sourceObject);
  }

  static extract<T>(extractorDescriptors: Array<ExtractionDescriptor>, source: Array<IndexedObject>) {
    return source.map(sourceRowObject => {
      return extractorDescriptors.reduce((cumulative, descriptor) => {
        return {
          ...cumulative,
          ...BulkObjectExtractor.extractRow(descriptor, sourceRowObject),
        };
      }, {} as T);
    });
  }
}
