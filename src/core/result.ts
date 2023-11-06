import { Nothing, nothing } from "../core";
import { Option, none, some,} from "./option";

export interface Result<T, E> {
  isOk(): boolean
  isErr(): boolean
  err(): Option<E>
  ok(): Option<T>
  expect(message: string): T | never
  expectErr(): E | never
  unwrap(): T | E
  unwrapErr(): T | E
  unwrapOr<V>(value: V): V | T
  unwrapOrElse<R>(exp:() => R): T | R
  unwrapOrDefault<D>(exp:() => D): T | E | D
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

  expect(message: string): never {
    throw new Error(message);
  }

  expectErr(): E {
    return this.error.value as E;
  }

  unwrap(): never {
    throw new Error(`Unwarp Error: ${this.error.value}`);
  }

  unwrapErr(): E {
    return this.error.value as E;
  }

  unwrapOr<V>(value: V): V {
    return value;
  }

  unwrapOrElse<R>(exp:() => R): R {
    return exp();
  }

  unwrapOrDefault<D>(exp:() => D): D {
    return exp();
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

  expect(_message: string): T {
    return this.unwrap()
  }

  expectErr(): never {
    throw new Error("Expect Err: it's okay");
  }

  unwrap(): T {
    return this.okay.value as T;
  }

  unwrapErr(): never {
    throw new Error("Unwrap Err: unwrap error when it's okay");
  }

  unwrapOr<V>(_value: V): T {
    return this.unwrap();
  }

  unwrapOrElse<R>(_exp:() => R): T {
    return this.unwrap();
  }

  unwrapOrDefault<D>(_exp:() => D): T {
    return this.unwrap();
  }
};

export function ok<T, E>(value: T): Result<T, E> {
  return new Ok<T, E>(value);
}

export function err<T, E>(error: E): Result<T, E> {
  return new Err<T, E>(error);
}