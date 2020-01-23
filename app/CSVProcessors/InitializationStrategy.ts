import { Constructor } from '../types';

export type InitializationStrategyFunction<T> = (constructor: Constructor<T>, args: Array<any>) => T;

export class InitializationStrategy {
  public static asObject<T>(constructor: Constructor<T>, args: Array<any>) {
    const reducedArguments = args.reduce((cumulative, current) => ({
      ...cumulative,
      ...current,
    }));

    return new constructor(reducedArguments) as T;
  }

  public static asArray<T>(constructor: Constructor<T>, args: Array<any>) {
    return new constructor(...args);
  }
}
