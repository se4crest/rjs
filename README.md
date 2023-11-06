Rust-like items for TypeScript

Modules
- **/**
- **/common**

## Option\<T>

```ts
const foo: Option<string> = some("some value");
const bar: Option<string> = none();
```
## Match 

```ts
match(targetValue, (targetValueAgain) => [
   [value1, () => do some ],
   [value2, () => do some ],
   [value3, () => do some ],
], (targetValueAlsoHere) => do default some)
```

```ts
match<<Option<string>, string>(foo, (fooValue) => [
  [some(fooValue),  () => "hello"],
  [none(), () => "None wraps null to satisfy typechecker"],
], sameFooParameterForDefault => sameFooParameterForDefault)

```
## Enums

```ts
const { None, Some } = Options;

function testEnum(variant: Options) {
  variant() // call variant after to get value;
}

testEnum(None); // typechecker happy
testEnum( () => Some({a: 1}) ); // if you need to pass value to variant then wrap it in another function
testEnum( variant(Some([1, 2, 3]))); // or use variant() for the same purpose
```

### How to create Rust-like enum behavior with TypeScript
Functions are the only worth things in JavaScript for my opinion

```ts
class Options extends Function {
  static Some<T>(value: T) { return some(value) }
  static None<T>() { return none<T>() }

  static Foo() { return Options.Foo.name }
}
```
It's not perfect but more then less

## Expressions

If you need chain some code and you too lazy to type (function() { ... })() andor whatever consider expression functions

```ts
exp(() => {
  // some statements;
  // return expression if need
})


exp((six) => {

  six.unwrap() + "6";
 
}, some(6)) // exp() with Option<T> value
```

Imagine too long condition you need to reuse and also don't want to assign

```ts
ifExp((con) => {
   if (con) {
     if (con && 2 + 2 === 4) {
      // ...
     }
   }
}, [{}, Object()] === "[object Object]" || 87 < 800 && Array.isArray(Function()) || !amIhungry

```
Check some few more other expression construction that might be useful


## Result<T, E> provides way to handle error or unknown causes
  
```ts
function eq<T>(lhsValue: T, rhsValue: T): Result<EqResult<T>, boolean> {

  const rsl = match(cmp(lhsValue, rhsValue), () => [
    [1, () => true],
    [-1, () => false]
  ], () => false);
  
  return rsl ? ok({eq: rsl, lhs: lhsValue, rhs: rhsValue}) : err(rsl);
}


const result = eq("hello", "helo with typo");

result.isOk() // false
```

## Nothing it's similar to empty unit () in Rust

```ts
const getMeSomeValue: Nothing = nothing();
```
Purge function
```ts 
purge(dirty: undefined | null | 0 | "" | {} | []): Nothing
```
