import { cmp } from "./cmp";
import { Some } from "./option";
import { Ok, Err } from "./result";

export function match<V = unknown, T = unknown>(value: V, armExpressions: (value: V) => Array<[V, () => T]>, defaultArmExp: (value: V) => T): T {

  const lhsValue = unwrap(value);
  
  const found = armExpressions(lhsValue)
    .find(([rhsValue]) => matchExp(value, rhsValue, (result) => result === 1));

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

export function armExp<V = unknown, T = unknown>(ls: V[], exp: () => T): Array<[V, () => T]> {
  return ls.map(elt => [elt, exp]);
}

export function matchExp<T, R>(lhsValue: T, rhsValue: T, exec: (result: 1 | 0 | -1, lhs: T, rhs: T) => R): R {
  const rsl = cmp(lhsValue, rhsValue);
  
  return exec(rsl, lhsValue, rhsValue);
}


function unwrap<V>(v: V): V {
  return v instanceof Some || v instanceof Ok || v instanceof Err ? v.unwrap() : v;
}
