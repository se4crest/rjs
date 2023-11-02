export interface Option<T> {
  value: T
  unwrap(): T
};

class None implements Option<any> {
  constructor(readonly value: any = {}) {}
  unwrap() {
    return this.value;
  }
};

class Some<T> implements Option<T> {
  constructor(readonly value: T) {}

  unwrap(): T {
    return this.value;
  }
};


export function some<T>(value: T): Option<T> {
  return new Some<T>(value);
}

export function none<T>(): Option<T> {
  return new None();
}