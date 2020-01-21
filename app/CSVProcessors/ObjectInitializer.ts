import { InitializationStrategyFunction } from './InitializationStrategy';
import { Constructor } from './CSVRowsMapper';

export class ObjectInitializer {
  static initialize<T>(initStrategy: InitializationStrategyFunction<T>, constructor: Constructor<T>, args: Array<any>) {
    return initStrategy(constructor, args);
  }
}
