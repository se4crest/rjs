import { Result, err, ok } from "./result";
import { exp,} from "./expressions";
import { match } from "./match";

export function cmp<T>(lhsValue: T, rhsValue: T): 1 | 0 | -1 {
  if (typeof lhsValue !== typeof rhsValue) return 0;
  
  if (typeof lhsValue === "function" && typeof rhsValue === "function") {
    return (lhsValue as Function).name === (rhsValue as Function).name ? 1 : -1;
  }
  
    
  const shallowCmp = lhsValue === rhsValue ? 1 : -1;

  switch (typeof lhsValue) {
    case "number": return typeof rhsValue === "number" ? shallowCmp : 0;
    case "string": return  typeof rhsValue === "string" ? shallowCmp : 0;
    case "boolean": return typeof rhsValue === "boolean" ? shallowCmp : 0;
    case "object": return typeof rhsValue === "object" ? exp(() => {
      
        const lArr = Array.isArray(lhsValue);
        const rArr = Array.isArray(rhsValue);
      
        if ((!lArr && rArr) || (lArr && !rArr)) {
          return 0;
        }

        if (lArr && rArr) {

          if (lhsValue.length === rhsValue.length) {
            
            if (lhsValue.length === 0 && rhsValue.length === 0) {
              return 1;
            } else {
              const matchedTimes: number = lhsValue.reduce<number>((tot, cur, i) => tot + cmp(cur, rhsValue[i]), 0);
              
              return matchedTimes === rhsValue.length ? 1 : -1;
            }

          } else { return -1 }

        } else {
          
            if (lhsValue === null && rhsValue === null) {
              return 1;
            }

            if ((lhsValue === null && rhsValue !== null) || (lhsValue !== null && rhsValue === null)) {
              return -1;
            }

            if (lhsValue instanceof Map && rhsValue instanceof Map || lhsValue instanceof Set && rhsValue instanceof Map ) {
              return cmp(Array.from(lhsValue.entries()), Array.from(rhsValue.entries()));
            }
            if (lhsValue instanceof Date && rhsValue instanceof Date) {
              return cmp(lhsValue.getDate(), rhsValue.getDate());
            }
          
            const lhsKeys = Object.keys(lhsValue!);
            const rhsKeys = Object.keys(rhsValue!);
      
            if (lhsKeys.length === 0 && rhsKeys.length === 0) {
              return 1;
            }

            const matchedKeysTimes = lhsKeys.reduce((tot, cur, i) => tot + cmp(cur, rhsKeys[i]), 0);

            if (matchedKeysTimes !== rhsKeys.length) {
              return -1
            }

            const lhsValues = Object.values(lhsValue!);
            const rhsValues = Object.values(rhsValue!);
            
            const matchedValuesTimes: number = lhsValues.reduce((tot, cur, i) => tot + cmp(cur, rhsValues[i]), 0);
            
            return matchedValuesTimes === rhsValues.length ? 1 : -1;
        }
        
      }) : 0;
    case "symbol": return typeof rhsValue === "symbol" ? shallowCmp : 0;
    case "bigint": return typeof rhsValue === "bigint" ? shallowCmp : 0;
    default: return 0;
  }
}

export type EqResult<T> = {eq: boolean, lhs: T, rhs: T}


export function eq<T>(lhsValue: T, rhsValue: T): Result<EqResult<T>, boolean> {

  const rsl = match(cmp(lhsValue, rhsValue), () => [
    [1, () => true],
    [-1, () => false]
  ], () => false);
  
  return rsl ? ok({eq: rsl, lhs: lhsValue, rhs: lhsValue}) : err(rsl);
}



