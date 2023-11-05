import { cmp } from "./eq";
import { Some } from "./option";
import { Ok, Err } from "./result";

function unwrap<V>(v: V): V {
  return v instanceof Some || v instanceof Ok || v instanceof Err ? v.unwrap() : v;
}

export function match<V, T>(value: V, expression: (value: V) => Array<[unknown, () => T]>, defaultExp: (value: V) => T): T {

  const found = expression(unwrap(value)).find(([rhsValue]) => {
    return matchExp(value, rhsValue, (result) => result === 1);
  });

  if (Array.isArray(found)) {
    return found[1]();
  }

  return defaultExp(unwrap(value));
}


export function matchExp<T, R>(lhsValue: T, rhsValue: T, exec: (result: 1 | 0 | -1, lhs: T, rhs: T) => R): R {
  const rsl = cmp(lhsValue, rhsValue);
  
  return exec(rsl, lhsValue, rhsValue);
}