export type Nothing = {}

export function nothing(): Nothing {
  return (function() {
    return "Nothing" as Nothing;
  })();
}

export function purge(_dirty: undefined | null | 0 | "" | {} | []): Nothing {
  return nothing()
}