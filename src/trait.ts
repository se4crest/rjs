export interface Boxed<T> {
  value: T;
  type: string
}

export function boxed<T>(value: T, type?: string): Boxed<T> {
  return {
    value,
    type: type || typeof value
  };
}