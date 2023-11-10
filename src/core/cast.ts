import { cmp } from "./cmp";
import { err } from "./result";
import { exp } from "./expressions";
import { Option, none } from "./option";
import { match } from "./match";

export type Nothing = {}

export function nothing(): Nothing {
  return (function() {
    return "Nothing" as Nothing;
  })();
}

export type PurgeOpts = {
  dirty: Option<undefined | null>
  empty: Option<0 | "" | {} | []>
  error: boolean
}

export function purge({dirty = none(), empty = none(), error = true}: PurgeOpts): Nothing {
  const d = dirty.unwrap();
  const e = empty.unwrap();

  return !d && !(typeof d === "string" || typeof d === "number") || ((e !== undefined || e !== null) && (e === "" || e === 0 || cmp(e, {}) === 1 || cmp(e, []) === 1)) ?
  nothing() : exp(() => {

    if (error) {
      const output = err(match<Option<undefined | null> | Option<0 | "" | {} | []>>(none<Option<undefined | null> | Option<0 | "" | {} | []>>(), () => [
        [dirty, () => e],
        [empty, () => d]
      ], () => `${d}, ${e}`)).expect("Purged not dirty or not empty value");
  
      console.log(output);
    }

    return nothing();
  })
}