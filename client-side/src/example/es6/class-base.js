/**
 * es5 中的类
 */
function Point1 (x, y) {
  this.x = x;
  this.y = y;
}
Point1.prototype.getPostion = function () {
  return {
    x: this.x,
    y: this.y
  }
}
var p2 = new Point1(2, 3)
console.log(p2)
console.log(p2.getPostion())

/**
 * es6中的类
 */
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  getPostion() {
    return {
      x: this.x,
      y: this.y
    }
  }
}
const p1 = new Point(2, 3)
console.log(p1)
console.log(p1.hasOwnProperty('x')) // true 表明自身就有该属性
console.log(p1.hasOwnProperty('getPostion')) // false
console.log(p1.__proto__.hasOwnProperty('getPostion')) // true 表明该函数在该类的原型上

var info = {
  _age: 18,
  set age (newVal) { // 存值器
    if (newVal > 18) {
      console.log('你已经成年了')
    } else {
      console.log('你还是小青年')
    }
    this._age = newVal
  },
  get age () {
    console.log('你的年龄是：' + this._age)
    return this._age
  }
}
console.log(info._age)
info.age = 17;

// es6
class Info {
  constructor(age) {
    this._age = age
  }
  set age(newVal) { // 存值器
    console.log('您的年龄是：' + newVal)
    this._age = newVal
  }
  get age() {
    return this._age
  }
}
const infos = new Info(18)
infos.age = 17
console.log(infos.age)

// es6中两种定义方式
// 1. 命名式
class Name {
  constructor() {}
}
// 2. 匿名类
const Anonymous = class {
  constructor() {}
}

// 类的静态方法 特点：1. 无法被类的实例继承 2. 只能类本身调用
class Animate {
  constructor(name, color) {
    this.name = name
    this.color = color
  }
  getName() {
    return this.name
  }
  static getClassName () {
    return Animate.name
  }
}
const dog = new Animate('小狗', '白色')
console.log(dog.getName())
console.log(Animate.getClassName())
// console.log(dog.getClassName()) // x

// 实现静态属性，es6中并没有类的静态属性，但可以用另外的方法实现
class Cat {
  constructor() {
    this.x = 0
  }
}
Cat.y = 2
const cat = new Cat()
console.log(cat.x)
console.log(cat.y) // undefined

// 私有方法 es6还未提供, 其他方式模拟实现
// 方式1 命名上区别， 
class Dog {
  fun1 () {} // 公有方法
  _fun2 () {} // 私有方法 但外部还是可以调用
}
// 方式2 将私有方法移出模块
function bar(baz) {
  return this.snaf = baz
}
class Widget {
  foo (baz) {
    bar.call(this, baz)
  }
}
// 方式3 利用symbol值的唯一性
const bar1 = Symbol('bar1')
const snaf = Symbol('snaf');
export default class myClass {
  // 公用方法
  foo (baz) {
    this[bar1][baz]
  }
  // 私有方法
  [bar1](baz) {
    return this[snaf] = baz
  }
}

// 私有属性 现在只是es6的提案，还没实现

// target 调用会显示类本身
class Cart {
  constructor() {
    console.log(new.target)
  }
}
const cart = new Cart()

