import { cmp } from "./cmp";
import { Some } from "./option";
import { Ok, Err } from "./result";

export function match<V, T>(value: V, armExp: (value: V | ReturnType<typeof unwrap>) => Array<[V, () => T]>, defaultArmExp: (value: V | ReturnType<typeof unwrap>) => T): T {

  const lhsValue = unwrap(value);
  
  const found = armExp(lhsValue)
    .find(([rhsValue]) => matchExp(value, rhsValue, (result) => result === 1));

  if (Array.isArray(found)) {
    return found[1]();
  }

  return defaultArmExp(lhsValue);
}


export function branch<V, B, T>(value: V, exp: (value: V | ReturnType<typeof unwrap>) => [...B[], () => T], defaultExp: (value: V | ReturnType<typeof unwrap>) => T) {
  const lhsValue = unwrap(value);
  const match = exp(unwrap(lhsValue));

  const result = match.filter((rhsValue, i, arr) => i !== arr.length - 1 && matchExp(value, rhsValue as B | V , (result) => result === 1));

  return result.length > 0 ? (match.at(-1) as () => T)() : defaultExp(lhsValue);
} 

export function matchGroup<V, T>(ls: V[], exp: () => T): Array<[V, () => T]> {
  return ls.map(elt => [elt, exp]);
}

export function matchExp<T, R>(lhsValue: T, rhsValue: T, exec: (result: 1 | 0 | -1, lhs: T, rhs: T) => R): R {
  const rsl = cmp(lhsValue, rhsValue);
  
  return exec(rsl, lhsValue, rhsValue);
}


function unwrap<V>(v: V): V {
  return v instanceof Some || v instanceof Ok || v instanceof Err ? v.unwrap() : v;
}
