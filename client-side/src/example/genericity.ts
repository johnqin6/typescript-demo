/**
 * 泛型
 */

// 不用泛型
function identity(arg: number): number {
  return arg;
}
// 使用any类型
function identity1(arg: any): any {
  return arg;
}

// 定义泛型(类型变量)函数
// 我们给identity添加了类型变量T。 T帮助我们捕获用户传入的类型（比如：number），
// 之后我们就可以使用这个类型。 之后我们再次使用了 T当做返回值类型
function identity2<T>(arg: T): T {
  return arg;
}
// 使用泛型函数
// 第一种方法
let output = identity2<string>("myString");
// 第二种方法 类型推论 最常用
let output1 = identity2(2)
console.log(output1)

// 数组
function loggingIdentity<T>(arg: T[]): T[] {
  console.log(arg.length)
  return arg;
}
// 也可以这样设置
// function loggingIdentity<T>(arg: Array<T>): Array<T> {
//   console.log(arg.length);  // Array has a .length, so no more error
//   return arg;
// }
console.log(loggingIdentity([1, 'aa']))


// 泛型类型
// 泛型函数
function identity3<T>(arg: T): T {
  return arg;
}
let myIdentity3: <T>(arg: T) => T = identity3

// 使用不同的泛型参数名，只要在数量上和使用方式上能对应上就可以。
function identity4<T>(arg: T): T {
  return arg;
}
let myIdentity4: <U>(arg: U) => U = identity4;

//使用带有调用签名的对象字面量来定义泛型函数：
function identity5<T>(arg: T): T {
  return arg;
}
let myIdentity5: {<T>(arg: T): T} = identity5

// 泛型接口
interface GenericIdentityFn {
  <T>(arg: T): T;
}
function identity6<T>(arg: T): T {
  return arg;
}
let myIdentity6: GenericIdentityFn = identity6;

// 把泛型参数当作整个接口的一个参数
interface GenericIdentityFn7<T> {
  (arg: T): T;
}
function identity7<T>(arg: T): T {
  return arg;
}
let myIdentity7: GenericIdentityFn7<number> = identity7;

// 泛类型
// class GenericNumber<T> {
//   zeroValue: T;
//   add: (x: T, y: T) => T;
// }
// let myGenericNumber = new GenericNumber<number>();
// myGenericNumber.zeroValue = 0;
// myGenericNumber.add = function(x, y) { return x + y; };

// 泛型约束
interface Lengthwise {
  length: number
}
function loggingIdentity2<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);
  return arg;
}
// loggingIdentity2(3) // x
loggingIdentity2({ length: 10, value: 3 })

// 在泛型约束中使用类型参数
// function getProperty(obj: T, key: K){
//   return obj[key];
// }
// let x = { a: 1, b: 2, c: 3};
// getProperty(x, 'a')
// getProperty(x, 'm')

// 在泛型里使用类类型
function create<T>(c: {new(): T; }): T {
  return new c();
}

class BeeKeeper {
  hasMask: boolean = false;
}
class ZooKeeper {
  nametag: string = '';
}
class Animal {
  numLegs: number = 0;
}
class Bee extends Animal {
  keeper: BeeKeeper;
}
class Lion extends Animal {
  keeper: ZooKeeper;
}
function createInstance<A extends Animal>(c: new () => A): A {
  return new c();
}
createInstance(Lion).keeper.nametag;  // typechecks!
createInstance(Bee).keeper.hasMask;   // typechecks!
