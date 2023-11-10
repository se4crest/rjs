import { exp } from "./expressions";
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
  const rsl = compare(lhsValue, rhsValue);
  
  return exec(rsl, lhsValue, rhsValue);
}

export function compare<T>(lhsValue: T, rhsValue: T): 1 | 0 | -1 {
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
              const matchedTimes: number = lhsValue.reduce<number>((tot, cur, i) => tot + compare(cur, rhsValue[i]), 0);
              
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
              return compare(Array.from(lhsValue.entries()), Array.from(rhsValue.entries()));
            }
            if (lhsValue instanceof Date && rhsValue instanceof Date) {
              return compare(lhsValue.getDate(), rhsValue.getDate());
            }
          
            const lhsKeys = Object.keys(lhsValue!);
            const rhsKeys = Object.keys(rhsValue!);
      
            if (lhsKeys.length === 0 && rhsKeys.length === 0) {
              return 1;
            }

            const matchedKeysTimes = lhsKeys.reduce((tot, cur, i) => tot + compare(cur, rhsKeys[i]), 0);

            if (matchedKeysTimes !== rhsKeys.length) {
              return -1
            }

            const lhsValues = Object.values(lhsValue!);
            const rhsValues = Object.values(rhsValue!);
            
            const matchedValuesTimes: number = lhsValues.reduce((tot, cur, i) => tot + compare(cur, rhsValues[i]), 0);
            
            return matchedValuesTimes === rhsValues.length ? 1 : -1;
        }
        
      }) : 0;
    case "symbol": return typeof rhsValue === "symbol" ? shallowCmp : 0;
    case "bigint": return typeof rhsValue === "bigint" ? shallowCmp : 0;
    case "undefined": return typeof rhsValue === "undefined" ? shallowCmp : 0;
    default: return 0;
  }
}
