import { HashCollection } from '../Database/utils/HashCollection';
import { Model } from '../Database/utils/Model';
import { CSVPropertyDescriptor } from './PropertyDescriptor';
import { Constructor, IndexedObject } from '../types';
import { InitializationStrategyFunction } from './InitializationStrategy';
import { ObjectInitializerType } from './ObjectInitializer';

export type pickArray = (descriptors: Array<CSVPropertyDescriptor>, pickTarget: IndexedObject) => Array<any>;

export const enum OBJECT_RETURN_STRATEGY {
  GET_UNIQUE = 'GET_UNIQUE',
  GET_NEW = 'GET_NEW',
}

export class DuplicateManager<T extends Model> {
  private hashMap = new HashCollection<T>();
  private allObjects: Array<T> = [];

  constructor(
    private propertiesDescriptors: Array<CSVPropertyDescriptor>,
    private propertyPicker: pickArray,
    private initStrategy: InitializationStrategyFunction<T>,
    private objectInitializer: ObjectInitializerType<T>,
    private constructor: Constructor<T>,
    private returnStrategy: OBJECT_RETURN_STRATEGY,
  ) {}

  public register(this: DuplicateManager<T>, parsedCSVRow: IndexedObject) {
    const initProperties = this.propertyPicker(this.propertiesDescriptors, parsedCSVRow);
    const initializedObject = this.objectInitializer(this.initStrategy, this.constructor, initProperties);

    this.allObjects.push(initializedObject);
    this.hashMap.addOrGetExisting(initializedObject);

    return this.useReturnStrategy(initializedObject);
  }

  useReturnStrategy(object: T): T {
    switch (this.returnStrategy) {
      case OBJECT_RETURN_STRATEGY.GET_NEW: {
        return object;
      }
      case OBJECT_RETURN_STRATEGY.GET_UNIQUE: {
        return this.hashMap.addOrGetExisting(object);
      }
    }
  }

  public getUnique() {
    return this.hashMap.getArray();
  }

  public getAll() {
    return this.allObjects;
  }
}
