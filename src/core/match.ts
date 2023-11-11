import { cmp } from "./cmp";
import { Some } from "./option";
import { Ok, Err } from "./result";

export function match<V = unknown, M = unknown | unknown[], T = unknown>(value: V, armExpressions: (value: V) => Array<[(() => M[]) | M, () => T]>, defaultArmExp: (value: V) => T): T {

  const lhsValue = unwrap(value);
  
  const found = armExpressions(lhsValue)
    .map(([m, x]) => typeof m === "function" && Array.isArray((m as () => M[])()) ? (m as () => M[])().map(m => [m, x]) : [[m, x]])
    .flatMap(arm => arm)  
    .find(([rhsValue]) => matchExp(value, rhsValue as M | V , (result) => result === 1));

  if (Array.isArray(found)) {
    return (found[1] as () => T)();
  }

  return defaultArmExp(lhsValue);
}


export function branch<V = unknown, B = unknown, T = unknown>(value: V, expression: (value: V) => [...B[], () => T], defaultExpression: (value: V) => T) {
  const lhsValue = unwrap(value);
  const match = expression(unwrap(lhsValue));

  const result = match.filter((rhsValue, i, arr) => i !== arr.length - 1 && matchExp(value, rhsValue as B | V , (result) => result === 1));

  return result.length > 0 ? (match.at(-1) as () => T)() : defaultExpression(lhsValue);
} 


export function matchExp<T, R>(lhsValue: T, rhsValue: T, exec: (result: 1 | 0 | -1, lhs: T, rhs: T) => R): R {
  const rsl = cmp(lhsValue, rhsValue);
  
  return exec(rsl, lhsValue, rhsValue);
}


function unwrap<V>(v: V): V {
  return v instanceof Some || v instanceof Ok || v instanceof Err ? v.unwrap() : v;
}
