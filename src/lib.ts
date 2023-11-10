import {  match, ok } from ".";

export * from "./core";



match<any>([], () => [
  // [4, () => {}],
  // [ok(n), () => console.log("nope")],
  // [4, () => {console.log("4 number")}],
  // [() => [some(1), []], () => {console.log("hello_")} ],
  // [{k:1}, () => console.log("okay {}")],
  [{}, () => console.log("okay [ ]")],
  // [ok("hi"), () => console.log("nope")],
  // [err(n), () => console.log("Error")],
], () => console.log("default hello"))


console.log(ok("no err"))