import { nothing } from ".."

function Enum<T extends {new(...args: any[]): {}}>(baseClass: T, context: ClassDecoratorContext) {
  return class extends baseClass {
    variantValue = variant(nothing())

    constructor(...args: any[]) {
      super(...args);

    }
  }
   
}

function variant(value: any ) {

}

@Enum
class Optional<T> {

  Some(_v: T) {}
}

const opt = new Optional<string>().Some("foo")


function test(vart: Optional<string>) {

}