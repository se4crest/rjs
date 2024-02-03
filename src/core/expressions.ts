import { none, Option } from "./option";

export function exp<T, C>(expression: (value: Option<C>) => T, condition: Option<C> = none()) {
  return expression(condition);
}

export function condExp<T>(expression: () => T, condition: boolean) {
  if (condition) {
    return expression();
  }
}

export function valExp<V, T>(expression: (value: V) => T, value: V) {
  return expression(value);
}

export function ifExp<T>(expression: (condition: boolean) => T, condition: boolean) {
  return expression(condition);
}