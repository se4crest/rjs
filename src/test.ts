import { none, some, Option } from "./lib";

export function test(value: Option<string>) {

  const s = some(value);

  const n = none();


  console.log(typeof s === typeof n);
}