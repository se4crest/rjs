import { Nothing, nothing } from "../core";
import { Option, none, some,} from "./option";

export interface Result<T, E> {
  isOk(): boolean
  isErr(): boolean
  err(): Option<E>
  ok(): Option<T>
  unwrap(): T | E
};

export class Err<T, E> implements Result<T, E> {
  error: { value: E | Nothing, result: boolean } = {
    value: nothing(),
    result: false
  }

  constructor(value: E) {
    this.error.value = value;
  }

  isErr(): boolean {
    return !this.error.result;
  }

  isOk(): boolean {
    return this.error.result;
  }

  err(): Option<E> {
    return some(this.unwrap());
  }
  
  ok<T>(): Option<T> {
    return none();
  }

  unwrap(): E {
    return this.error.value as E;
  }

  unwrapOr<V>(value: V): V {
    return value;
  }
};

export class Ok<T, E> implements Result<T, E> {
  okay: { value: T | Nothing, result: boolean } = {
    value: nothing(),
    result: true
  }

  constructor(value: T) {
    this.okay.value = value;
  }

  isOk(): boolean {
    return this.okay.result;
  }

  isErr(): boolean {
    return !this.isOk();
  }

  

  err<E>(): Option<E> {
    return none();
  }

  ok(): Option<T> {
    return some(this.unwrap());
  }

  unwrap(): T {
    return this.okay.value as T;
  }

  unwrapOr(): T {
    return this.unwrap();
  }
};

export function ok<T, E>(value: T): Result<T, E> {
  return new Ok<T, E>(value);
}

export function err<T, E>(error: E): Result<T, E> {
  return new Err<T, E>(error);
}