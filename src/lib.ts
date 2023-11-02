import { cmp } from "./eq";
// import { Option } from "./option";

export * from "./option";

export function reject(message: string) {
  throw new Error(message);
}
// const o1 = {
//   foo: "foo",
//   bar: "null"
// }

// const o2 = {
//   foo: "foo",
//   bar: 1
// }

const a1 =["kek", 43]
const a2 =["ek", 42]

console.log(cmp(a1, a2))