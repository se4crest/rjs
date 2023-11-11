class MyEnum<T = unknown> {
  constructor(readonly variant?: T) {}

  static Foo(): MyEnum<string> {
    return new MyEnum(MyEnum.Foo.name);
  }

  static Bar<V>(value: V): MyEnum<V> {
    return new MyEnum(value);
  }
}