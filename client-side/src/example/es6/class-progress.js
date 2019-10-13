/**
 * es5的继承
 */
function Food () {
  this.type = 'food'
}
Food.prototype.getType = function() {
  return this.type
}
function Vegetables (name) {
  this.name = name
}
Vegetables.prototype = new Food()
const tomato = new Vegetables('tomato')
console.log(tomato.getType())

// es6中类的继承 使用关键字extends
class Parent {
  constructor (name) {
    this.name = name
  }
  getName () {
    return this.name
  }
  static getNames () {
    return this.name
  }
}
class Child extends Parent {
  constructor(name, age) {
    super(name) // 超集
    this.age = age
  }
}
const c = new Child('lison', 22)
console.log(c)
console.log(c.getName())
console.log(c instanceof Child) // true 表明c是Child的实例
console.log(c instanceof Parent) // true 
console.log(Child.getNames()) // Child

// super作为函数 代表父类的构造函数
// super作为对象
//   在普通方法中 指向父类的原型对象
//   在静态方法中  指向父类
// 在普通方法中
class A {
  constructor () {
    this.type = 'a'
  }
  getName() {
    return this.type
  }
  print() {
    console.log('print: ' + this.type)
  }
}
A.getType = () => {
  return 'is A'
}
class B extends A {
  constructor() {
    super()
    console.log('constructor: ' + super.getName()) // constructor: a
  }
  getAName() {
    console.log('getAName:' + super.getName()) // getAName:a
  }
  static getAType() {
    console.log('getAType:' + super.getType()) // getAType:is A
  }
  childPrint() {
    super.print() // 此时super代表父类
  }
}
const b = new B()
b.getAName()
B.getAType()
b.childPrint()

// prototype
// __proto__
// 子类的__proto__指向父类本身
// 子类的prototype属性的__proto__指向父类的prototype属性
// 实例的__proto__属性的__proto__指向父类实例的__proto__

// 继承内置对象
class CustomArray extends Array {
  constructor(...args) {
    super(...args)
  }
}
const arr = new CustomArray(3)
arr.fill('+')
console.log(arr)
