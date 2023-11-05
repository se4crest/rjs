Rust's items for TypeScript


## Option\<T>

```ts
const foo: Option<string> = some("some value");

const bar: Option<string> = none();

```
## Match 

```ts
match(targetValue, (targetValueAgain) => [ // returns array with match expression entries 
   [value1, () => do some ],
   [value2, () => do some ],
   [value3, () => do some ],
 ], (targetValueAlsoHere) => do default some )
```

```ts
match<<Option<T>, string>(foo, (fooParameter) => [
  [ some("baz"),  () => "returns if value is some('baz')" ],
  
  [ some("some value"), () => "here we go" ],

  [ some(fooParameter.unwrapOrElse(() => "whatever")), () => "need to return string in any cases if generic type not exposed"  ],
  
  [ none(), () => "None wraps null and satisfies typechecker"  ],

  [bar, () => "skipped expression"],

], sameFooParameterForDefault => sameFooParameterForDefault.unwrap())

```
## if you want to force typescript don't check generic in Option\<T>
```ts
function testEnum(variant: Options) {
  variant() // call variant after to get value;
}

const { None, Some } = Options;

testEnum(None); // typechecker happy
testEnum( () => Some({a: 1}) ); // need to use another function to pass values to variant
testEnum( variant( Some([1, 2, 3]) ) ); // or use variant() for the same purpose
```



### How to cook a weak version of Rust's enums with TypeScript
### Functions are the only worth things in JavaScript for my opinion


```ts
class Options extends Function {
  static Some<T>(value: T) { return some(value) }
  static None<T>() { return none<T>() }

  static Foo() { return Options.Foo.name } // If you need to store a string you don't care we may assign variant function name
}
```

## Expressions

If you need chain some code and you too lazy to type (function() { ... })() and if you don't care about this context
you may consider expression with arrow function  

```ts
exp(() => {
  // some statements;
  // return expression if need
})


exp((six) => {

  const str66 = six.unwrap() + "6";
 
}, some(6)) // exp() with Option<T> value



ifExp((con) => {  // imagine too long condition you need to reuse it and also don't want to store it in any variable
   if (con) {
     if (con && 2 + 2 === 4) {

     }
   }

}, [{}, Object()] === "[objec Object]" || 87 < 800 && Array.isArray(Function()) 


conExp(() => {
  return "return if truthy below"
}, true)
```