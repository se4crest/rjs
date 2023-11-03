import {none, some} from "./core/option";

export class Options extends Function {
  static Some<T>(value: T) {return some(value)}
  static None<T>() {return none<T>()}
}

export function variant<T>(variant: T): () => T {
  return () => variant;
}


export class Value<T> {
  value: T;
  type: string
  
  constructor(value: T, type: string) {

    if (type === "") {
      this.type = typeof value;
    }

    this.value = value;
    this.type = type;
  }

  as<T>(value: Value<T>) {
    this.type = value.type;
  }

  static impl<T>(value: T, type: string = "") {
    return new Value(value, type);
  }
}