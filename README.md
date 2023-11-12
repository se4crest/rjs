Rust-like items for TypeScript

[CHANGELOG](#changelog)

Modules
- **/**
- **/common**

## Option\<T>

```ts
const foo: Option<string> = some("some value");
const bar: Option<string> = none();
```
## Match
match() executes a function depending on comparison of values

```match<V = unknown, M = unknown | unknown[], T = unknown>(value: V, armExpressions: (value: V) => Array<[(() => M[]) | M, () => T]>, defaultArmExp: (value: V) => T): T```

```ts
match(targetValue, (targetValueAgain) => [
   [value1, () => do some ],
   [value2, () => do some ],
   [value3, () => do some ],
], (targetValueAlsoHere) => do default some)
```
Or group more values in one match expression (since 0.0.8)
```ts
const result = match(purge({dirty: some(null)} as PurgeOpts), () => [
  [() => {}, () => "function"],
  [() => [ null, {}, [], nothing() ], () => "objects or purged to Nothing"],
  [{}, () => "object result"]
], () => "other type");

console.log(result); // objects or purged to Nothing
```

```ts
const result = match<<Option<string>, <Option<string>, string>(foo, (fooValue) => [
  [some(fooValue),  () => fooValue],
  [none(), () => "None wraps null to satisfy typechecker"],
], sameFooParameterForDefault => sameFooParameterForDefault)

console.log(result) // some value

```
## Branch
**branch** it's kind of **match** with the only two possible outputs - when it matches or it does not.
Consider branch function like extended version of ternary operator.<br>
```branch(value, (v) => [...values to match, () => {...possible execution}], (v) => {...default execution})```

```ts
branch(ok("foo"), (v) => ["foo", "baz", ok(v), () => console.log("baz or " + v)], (e) => err(e).expect("bar!!!"));
```
## Enums

```ts
const { None, Some } = Options;

function testEnum(variant: Options) {
  variant() // call variant after to get value;
}

testEnum(None); // typechecker is happy
testEnum( () => Some({a: 1}) ); // if you need to pass a value to variant then wrap it in another function
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

Another approach with generics. And it's a bit boilerplate.
As an option you might implement ***Enum\<T>*** to force to have public readonly field **variant** and also for clarity
```ts
class MyEnum<T = string> implements Enum<T> {
  constructor(readonly variant: T) {}

  static Foo(): MyEnum {
    return new MyEnum(MyEnum.Foo.name);
  }

  static Bar<V>(value: V): MyEnum<V> {
    return new MyEnum(value);
  }
}


function testEnumWithGeneric(value: MyEnum<Object>) {
  value.variant
}

function testEnumWithDefaultGeneric(value: MyEnum) {
  value.variant
}

testEnumWithGeneric(MyEnum.Bar(function(){}))

testEnumWithDefaultGeneric(MyEnum.Foo())
```

## Expressions

If you need chain some code and you too lazy to type ```(function() { ... })()``` and/or whatever, consider expression functions

```ts
exp(() => {
  // some statements;
  // return expression if need
})


exp((six) => {

  six.unwrap() + "6";
 
}, some(6)) // exp() with Option<T> value
```

Imagine too long condition you need to reuse and also don't want to assign to a variable

```ts
ifExp((con) => {
   if (con) {
     if (con && 2 + 2 === 4) {
      // ...
     }
   }
}, [{}, Object] === "[object Object]" || 87 < 800 && Array.isArray(Function()) || !amIhungry

```
Check some few more other expression constructions that might be useful


## Result<T, E> provides a way to handle errors and unknown causes

```
Result<T, E> {
  isOk(): boolean
  isErr(): boolean
  err(): Option<E>
  ok(): Option<T>
  expect(message: string): T | E
  expectErr(): E | T
  unwrap(): T | E
  unwrapErr(): T | E
  unwrapOr<V>(value: V): V | T
  unwrapOrElse<R>(exp:() => R): T | R
  unwrapOrDefault<D>(exp:() => D): T | E | D
}
```
  
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

## ***Nothing*** it's similar to empty unit ***()*** in Rust

```ts
const getMeSomeValue: Nothing = nothing();
```
**purge** function returns ***Nothing*** type. **error** option is true by default
```ts 
purge({dirty: Option<undefined | null>, empty: Option<0 | "" | {} | []>, error: boolean}: PurgeOpts): Nothing
```
<br>
<a id="changelog">CHANGELOG</a>

# 0.0.9 (November 11, 2023)

## branch
 - added **branch** function as shorthand version of match

#### 0.0.8 (November 10, 2023)

## cmp
 - fixed Rhs to Lhs as Lhs to Rhs
 - optimized condition flow

## match
 - multi-value arm expression with single execution

## result
 - **unwrap** always returns a value of **ok** and **err**

## purge
 - updated function API
