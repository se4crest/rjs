import {  match} from ".";

export * from "./core";



match(null, () => [
  [null, () => console.log("okay [ ]")],
], () => console.log("default hello"))