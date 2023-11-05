import { eq } from "./core";


export * from "./core";
export * from "./common";

console.log(eq("text", "text2").isErr())