# Rust's items for TypeScript


## Option<T>
```ts

const foo: Option<string> = some("some value");

const bar: Option<string> = none();


match(foo, (fooParameter) => [
  [ some("baz"),  () => "returns if value is some('baz')" ],

  [ some(fooParameter.unwrapOrElse(() => "whatever")), () => "value if mathes with some('baz')"  ],
  
  [ none(), () => "None wraps null and satisfies typechecker"  ],

  [bar, () => "skipped expression"],

  [some("some value"), () => "here we go"]
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
testEnum( variant( Some([1, 2, 3]) ) ); // or use variant() for same pupose
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



ifExp((con) => {
   if (con) {
     if (con && 2 + 2 === 4) {

     }
   }

}, [{}, Object()] === "[objec Object]" || 87 < 800 && Array.isArray(Function()) 
// imagine too long condition and you don't want to reuse it
// and also not to store it in any variable


conExp(() => {
  return "return if truthy below"
}, true)
```