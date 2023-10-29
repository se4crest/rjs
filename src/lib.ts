// import {test} from "./test"

export interface Option<T> {
  value?: T
};

class None implements Option<null> {};

class Some<T> implements Option<T> {
  constructor(readonly value: T) {}
};


export function some<T>(value: T) {
  return new Some<T>(value);
}

export function none() {
  return new None();
}