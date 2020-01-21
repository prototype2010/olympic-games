import { CSVPropertyDescriptor } from './PropertyDescriptor';
import { IndexedObject } from '../types';

export class PropertyPicker {
  private static pick(descriptor: CSVPropertyDescriptor, pickTarget: IndexedObject) {
    return {
      [descriptor.propertyToInit]: pickTarget[descriptor.propertyToPick],
    };
  }

  private static pickArray(descriptors: Array<CSVPropertyDescriptor>, pickTarget: IndexedObject) {
    return descriptors.map(descriptor => PropertyPicker.pick(descriptor, pickTarget));
  }

  static pickAll(descriptors: Array<CSVPropertyDescriptor>, pickTarget: IndexedObject) {
    const allProps = PropertyPicker.pickArray(descriptors, pickTarget);

    return allProps.reduce((cumulative, current) => ({
      ...cumulative,
      ...current,
    }));
  }
}
