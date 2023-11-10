
import { cmp } from "..";
import { Some,  } from "./option";
import { Ok, Err,  } from "./result";

function unwrap<V>(v: V): V {
  return v instanceof Some || v instanceof Ok || v instanceof Err ? v.unwrap() : v;
}

export function match<V = unknown, M = unknown | unknown[], T = unknown>(value: V, armExp: (value: V) => Array<[(() => M[]) | M, () => T]>, defaultArmExp: (value: V) => T): T {

  const lhsValue = unwrap(value);
  
  const found = armExp(lhsValue)
  .map(([m, x]) => typeof m === "function" ? (m as () => M[])().map(m => [m, x]) : [[m, x]])
  .flatMap(arm => arm)
  .find(([rhsValue]) => {
    return matchExp(value, rhsValue as M | V , (result) => result === 1)
  });

  if (Array.isArray(found)) {
    return (found[1] as () => T)();
  }

  return defaultArmExp(unwrap(value));
}


export function matchExp<T, R>(lhsValue: T, rhsValue: T, exec: (result: 1 | 0 | -1, lhs: T, rhs: T) => R): R {
  const rsl = cmp(lhsValue, rhsValue);
  
  return exec(rsl, lhsValue, rhsValue);
}