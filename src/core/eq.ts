import { Result, err, ok } from "./result";
import { match } from "./match";
import { cmp } from "./cmp";

export type EqResult<T> = {eq: boolean, lhs: T, rhs: T}


export function eq<T>(lhsValue: T, rhsValue: T): Result<EqResult<T>, boolean> {

  const rsl = match(cmp(lhsValue, rhsValue), () => [
    [1, () => true],
    [-1, () => false]
  ], () => false);
  
  return rsl ? ok({eq: rsl, lhs: lhsValue, rhs: rhsValue}) : err(rsl);
}