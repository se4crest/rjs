import {  match} from ".";

export * from "./core";



match([], () => [
  [{}, () => console.log("okay [ ]")],
], () => console.log("default hello"))