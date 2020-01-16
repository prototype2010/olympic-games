import { Model } from './Model';

export class HashCollection<T extends Model> {
  private map = new Map<string, T>();

  public addOrGetExisting(object: T): T {
    const key = object.buildKey();

    if (!this.map.has(key)) {
      this.map.set(key, object);

      return object;
    } else {
      return this.map.get(key)!;
    }
  }

  public getArray(): Array<T> {
    return [...this.map.values()];
  }
}
