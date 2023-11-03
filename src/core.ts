
export * from "./core/expressions";
export * from "./core/match";
export * from "./core/option";

// export interface Option<T> {
//   value: T
//   unwrap(): T
//   unwrapOr<V>(v: V): V
//   unwrapOrElse<V>(exp: () => V): V
// };

// class None implements Option<any> {
//   constructor(readonly value: any = {
//     __NULL__: {}
//   }) {}

//   unwrap() {
//     return this.value;
//   }

//   unwrapOr<V>(v: V): V {
//     return v;
//   }

//   unwrapOrElse<V>(exp: () => V): V {
//     return exp()
//   }
  
// };

// class Some<T> implements Option<T> {
//   constructor(readonly value: T) {}

//   unwrap(): T {
//     return this.value;
//   }

//   unwrapOr<V>(v: V): V {
//     return v;
//   }

//   unwrapOrElse<V>(exp: () => V): V {
//     return exp()
//   }
// };


// export function some<T>(value: T): Option<T> {
//   return new Some<T>(value);
// }

// export function none<T>(): Option<T> {
//   return new None();
// }


