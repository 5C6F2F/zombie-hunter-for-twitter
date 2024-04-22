export interface HideUserIdSet<T extends string> extends Set<T> {
  toStorage(): string;
  fromStorage(value: string): this;
}

export class HideUserIdSet<T extends string> implements HideUserIdSet<T> {
  private set: Set<T>;

  constructor() {
    this.set = new Set<T>();
  }

  toStorage(): string {
    let result = "";
    for (const id of this.set) {
      result += id;
      result += " ";
    }
    return result.slice(0, -1);
  }

  fromStorage(value: string): this {
    for (const id of value.split(" ")) {
      this.set.add(id as T);
    }
    return this;
  }

  add(value: T): this {
    this.set.add(value);
    return this;
  }

  has(value: T): boolean {
    return this.set.has(value);
  }
}
