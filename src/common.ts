import {none, some} from "./core";

export class Options extends Function {
  static Some<T>(value: T) {return some(value)}
  static None<T>() {return none<T>()}
}

export function variant<T>(variant: T): () => T {
  return () => variant;
}