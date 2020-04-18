import { InitializationStrategyFunction } from './InitializationStrategy';
import { Constructor } from '../types';

export type ObjectInitializerType<T> = (
  initStrategy: InitializationStrategyFunction<T>,
  constructor: Constructor<T>,
  args: Array<any>,
) => T;

export class ObjectInitializer {
  static initialize<T>(initStrategy: InitializationStrategyFunction<T>, constructor: Constructor<T>, args: Array<any>) {
    return initStrategy(constructor, args);
  }
}
