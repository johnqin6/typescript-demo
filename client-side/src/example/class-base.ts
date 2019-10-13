/**
 * typescript中的类
 */
class Point2 {
  public x: number
  public y: number
  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }
  public getPosition() {
    return {
      x: this.x,
      y: this.y
    }
  }
}
const point3 = new Point2(2, 5)
console.log(point3)

// typrscript中的继承
class Parent {
  public name: string
  constructor(name: string) {
    this.name = name
  }
}
class Child extends Parent {
  constructor(name: string) {
    super(name)
  }
}

// public 公共

// private 私有的 不能被类的外部访问
// protected 受保护 protected成员在派生类中仍然可以访问
class A {
  private age: number
  constructor(age: number) {
    this.age = age
  }
  protected getAge() {
    return this.age
  }
}
const ab = new A(10)
console.log(ab)
// console.log(ab.age) // x
// console.log(A.age) // x
class B extends A {
  constructor(age: number) {
    super(age)
    // console.log(super.age) // x
    console.log(super.getAge()) // 10
  }
}
const b = new B(10)

// readonly 修饰符 只读属性必须在声明时或构造函数里被初始化
class UserInfo {
  public readonly name: string
  constructor(name: string) {
    this.name = name
  }
}
const userInfo = new UserInfo('john')
console.log(userInfo.name)

class C {
  constructor(public name: string) {

  }
}
const c1 = new C('tom')
console.log(c1.name)

// 静态属性
class Animate {
  constructor() {}
  private static age: number = 18
  public static getAge() {
    return Animate.age
  }
}
const dog = new Animate()

// k可选参数
class Info {
  public name: string
  public age?: number
  constructor(name: string, age?:number, public sex?: string) {
    this.name = name
    this.age = age
  }
}
const info1 = new Info('tom')
console.log(info1)
const info2 = new Info('tom', 18)

// 存取器
let passcode = 'secret passcode'
class Employee {
  private _fullname: string = '';
  get fullName(): string {
    return this._fullname
  }
  set fullName(newName: string) {
    if (passcode && passcode == "secret passcode") {
      this._fullname = newName
    } else {
      console.log("Error: Unauthorized update of employee!");
    }
  }
}
let employee = new Employee();
employee.fullName = "Bob Smith";
if (employee.fullName) {
  console.log(employee.fullName);
}

// abstract关键字 定义抽象类 抽象类做为其它派生类的基类使用。 它们一般不会直接被实例化。
abstract class People {
  constructor(public name: string) {}
  public abstract printName(): void
  public abstract _age: number
  abstract get insideName(): string
  abstract set insideName(value: string)
}
// const peple = new People() // x
class Man extends People {
  constructor(name: string) {
    super(name)
    this.name = name
  }
  public printName() {
    console.log(this.name)
  }
  public _age: number = 18
  public insideName: string = ''
}
const m = new Man('john')
m.printName()

class Good {
  constructor(public name: string) {}
}
let good: Good = new Good('good')
class Good1 {
  constructor(public name: string) {}
}
good = new Good1('good1')

// 定义类的接口
interface FoodInterface {
  type: string
}
// implements 类实现接口
class FoodClass implements FoodInterface {
  public type: string = ''
}

// 接口继承类
class Greeter {
  protected name: string = ''
}
interface I extends Greeter {}
class G extends Greeter implements I {
  public name: string = ''
}

// 泛型
const created = <T>(c: new () => T): T => {
  return new c()
}
class CInfo {
  public age: number
  constructor() {
    this.age = 18
  }
}
console.log(created<CInfo>(CInfo).age)
