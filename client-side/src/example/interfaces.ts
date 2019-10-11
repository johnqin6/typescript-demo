/**
 * TypeScript的核心原则之一是对值所具有的结构进行类型检查。 它有时被称做“鸭式辨型法”或“结构性子类型化”。
 * 接口 作用：为这些类型命名和为你的代码或第三方代码定义契约
 */
// 通过一个简单示例来观察接口是如何工作的
// function printLabel (labelledObj: { label: string }) {
//   console.log(labelledObj.label)
// }

let myObj = { size: 10, label: "Size 10 Object"}
printLabel(myObj)

// 1. 定义接口 类型检查器不会去检查属性的顺序，只要相应的属性存在并且类型也是对的就可以
interface LabelledValue {
  label: string
}
function printLabel (labelledObj: LabelledValue) {
  console.log(labelledObj.label)
}
printLabel(myObj)

/**
 * 2. 定义可选属性的接口 
 *   好处：1. 可以对可能存在的属性进行预定义，2. 可以捕获引用了不存在的属性时的错误
 */
interface SquareConfig {
  color?: string;
  width?: number;
}
function createSquare(config: SquareConfig) : { color: string; area: number } {
  let newSquare = { color: 'white', area: 100 };
  if (config.color) {
    newSquare.color = config.color;
  }
  if (config.width) {
    newSquare.area = config.width;
  }
  return newSquare
}
console.log(createSquare({color: "black"}))

// 3. 只读属性: 一旦定义就不能修改
interface Point {
  readonly x: number;
  readonly y: number
}
let p1: Point = {x: 10, y: 20 };
// p1.x = 5; // error

// 数组只读类型 ReadonlyArray<T>
let a: number[] = [1, 2, 3, 4];
let ro: ReadonlyArray<number> = a;
// ro[0] = 12; // error
// ro.push(5) // error
// ro.length = 100; // error
// a = ro; // error

// 使用类型断言可以重写只读数组
a = ro as number[];

// 4. 额外的属性检查
interface SquareConfig1 {
  color?: string;
  width?: number;
}
function createSquare1(config: SquareConfig1) : { color: string; area: number } {
  let newSquare = { color: 'white', area: 100 };
  if (config.color) {
    newSquare.color = config.color;
  }
  if (config.width) {
    newSquare.area = config.width;
  }
  return newSquare
}
// 如果一个对象字面量存在任何“目标类型”不包含的属性时，你会得到一个错误
// error: 'colour' not expected in type 'SquareConfig' 
// console.log(createSquare1({colour: "black", width: 100 }))
// 解决方法1：类型断言
console.log(createSquare1({colour: "black", width: 100 } as SquareConfig1))
// 解决方法2： 添加一个字符串索引签名
interface SquareConfig1 {
  color?: string;
  width?: number;
  [propName: string]: any
}
console.log(createSquare1({colour: "black", width: 100 }))

// 5. 函数类型
interface SearchFunc {
  (source: string, subString: string): boolean;
}
let mySearch: SearchFunc;
// 函数类型的类型检查来说，函数的参数名不需要与接口里定义的名字相匹配
// mySearch = function(src: string, sub: string) {
//   let result = src.search(sub);
//   return result > -1
// }
// 可以不指定参数类型，typeScript的类型系统会推断出参数类型
mySearch = function(src, sub) {
  let result = src.search(sub);
  return result > -1;
}

// 6. 可索引的类型
interface StringArray {
  [index: number]: string;
}
let myArray: StringArray = ['a', 'b']
// TypeScript支持两种索引签名：字符串和数字。 可以同时使用两种类型的索引，
// 但是数字索引的返回值必须是字符串索引返回值类型的子类型。 
// 这是因为当使用 number来索引时，JavaScript会将它转换成string然后再去索引对象。
// class Animal {
//   name: string;
// }
// class Dog extends Animal {
//   breed: string;
// }
// 错误：使用数值型的字符串索引，有时会得到完全不同的Animal!
// interface NotOkay {
//   [x: number]: Animal;
//   [x: string]: Dog;
// }

// 将索引签名设置为只读, 防止给索引赋值
interface ReadonlyStringArray {
  readonly [index: number]: string;
}
let myArray1: ReadonlyStringArray = ["Alice", "Bob"];
// myArray1[2] = "Mallory"; // error!

// 7. 类类型
// interface ClockInterface {
//   currentTime: Date;
//   setTime(d: Date);
// }
// // 接口描述了类的公共部分，而不是公共和私有两部分。
// class Clock implements ClockInterface {
//   currentTime: Date;
//   setTime(d: Date) {
//     this.currentTime = d;
//   }
//   constructor(h: number, m: number) { }
// }

// 类静态部分与实例部分的区别
interface ClockConstructor {
  new (hour: number, minute: number): ClockInterface;
}
interface ClockInterface {
  // tick();
}

function createClock(ctor: ClockConstructor, hour: number, minute: number): ClockInterface {
  return new ctor(hour, minute);
}

class DigitalClock implements ClockInterface {
  constructor(h: number, m: number) { }
  tick() {
    console.log("beep beep");
  }
}
class AnalogClock implements ClockInterface {
  constructor(h: number, m: number) { }
  tick() {
    console.log("tick tock");
  }
}

let digital = createClock(DigitalClock, 12, 17);
let analog = createClock(AnalogClock, 7, 32);

// 8. 继承接口
interface Shape {
  color: string;
}
// interface Square extends Shape {
//   sideLength: number;
// }
// 一个接口可以继承多个接口，创建出多个接口的合成接口
interface PenStroke {
  penWidth: number;
}
interface Square extends Shape, PenStroke {
  sideLength: number;
}
let square = <Square>{};
square.color = "blue";
square.sideLength = 10;
square.penWidth = 5.0;


// 9. 混合类型
interface Counter {
  (start: number): string;
  interval: number;
  reset(): void;
}
function getCounter(): Counter {
  let counter = <Counter>function (start: number) {};
  counter.interval = 123;
  counter.reset = function () {};
  return counter;
}
let c = getCounter();
c(10);
c.reset();
c.interval = 5.0;

// 10. 接口继承类
class Control {
  private state: any;
}
interface SelectableControl extends Control {
  select(): void;
}
class Button extends Control implements SelectableControl {
  select() {}
}
class TextBox extends Control {
  select() {}
}
// 错误：“Image”类型缺少“state”属性。
// class Image implements SelectableControl {
//   select() { }
// }
// class Location {}
