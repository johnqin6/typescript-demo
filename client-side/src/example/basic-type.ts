/**
 * 基础类型
 * typescript -> javascript  https://www.tslang.cn/play/index.html 此网址可查看转换结果
 * 1. 布尔类型 可直接定义并赋值, 也可先定义再赋值, 赋其他类型的会提示错误
 *   - 例子：let bool: boolean = false
 * 2. 数值类型 二进制，八进制，十六进制都可
 *   - 例子：let num: number = 123
 * 3. 字符串类型
 *   - 例子：let str: string = 'abc'
 * 4. 数组类型 [1, 2, 3] 数组类型有多种写法
 *   - 写法1：arr1: number[] = [5]
 *   - 写法2：let arr2: Array<number> = [1, 2, 3]
 *   - 写法3：let arr3: (string | number)[] = [1, 'a']
 *   - 写法4：let arr4: Array<number | string> = [1, 'a']
 * 5. 元组类型 需要满足两点
 *   - 数组长度限定，
 *   - 数组项类型顺序限定, 只要有一个不符合就提示错误
 *   - 例子：let tuple: [string, number, boolean] = ['a', 1, false]
 * 6. 枚举类型 特点：
 *   - 1. 用enum定义 
 *   - 2. 形似对象 
 *   - 3. 一般大写 
 *   - 4. 序号自动累加，默认从0开始 也可自定义序号
 *   - 5. 也可用序号获取属性值
 *   - 示例：enum Roles {
              SUPER_ADMIN,
              ADMIN,
              USER
            }
 * 7. any类型 
 *    - 可赋值为任何类型的值 例子：let value: any = 1
 *    - 用any标识数组，数组项可为任何类型 const arr5: any[] = [1, 'a']
 * 8. void类型 空类型--> 什么类型都不是，void类型可赋值undefined
 * 9. null 和 undefined
 * 10. never类型 永远不存在的值， 两种情况: 1. 抛错， 2. 死循环 
 *   -  never类型的值可以赋值给其他任意类型，但never的值不能为其他类型的值
 * 11. 类型断言 有点像类型转换，可以将某个值强行设置我们想设置的类型
 */

// 1. 布尔类型
// let bool: boolean = false // 可直接定义并赋值
let bool: boolean // 也可先定义再赋值
bool = true
// bool = 123 赋其他类型的会提示错误

// 2. 数值类型
let num: number = 123
// num = 'abc' -> x
num = 0b1111011 // 二进制 123
num = 0o173 // 八进制
num = 0x7b // 十六进制

// 3. 字符串类型
let str: string = 'abc'
str = `数值是${num}`
console.log(str)

// 4. 数组类型 [1, 2, 3]
// 写法1
let arr1: number[] = [5]
// arr1 = ['name'] x
// 写法2
let arr2: Array<number> = [1, 2, 3]
// 写法3 [1, 'a']
let arr3: (string | number)[] = [1, 'a']
let arr4: Array<number | string> = [1, 'a']

// 5. 元组类型 数组长度限定，数组项类型顺序限定, 只要有一个不符合就提示错误
let tuple: [string, number, boolean] = ['a', 1, false]
// 如该例子 tuple的长度只能为3,且每一项的数据类型必须对应

// 6. 枚举类型 特点：1. 用enum定义 2. 形似对象 3. 一般大写 4. 序号自动累加，默认从0开始 也可自定义序号
// 5. 也可用序号获取属性值
enum Roles {
  SUPER_ADMIN,
  ADMIN,
  USER
}
enum Fname {
  TOM = 1,
  JOHN = 8,
  ANLY
}
console.log(Roles.SUPER_ADMIN, Fname.TOM) // 0 , 1
console.log(Roles.ADMIN, Fname.JOHN) // 1 , 8
console.log(Roles.USER, Fname.ANLY) // 2 , 9
console.log(Roles[2], Fname[9]) // USER , ANLY
// if (roles === Roles.SUPER_ADMIN) {} // 可用于验证后台返回的数值标识的数据

// 7. any类型 可赋值为任何类型的值
let value: any = 1
value = 'abc'
value = false
const arr5: any[] = [1, 'a'] // 用any标识数组，数组项可为任何类型

// 8. void类型 空类型--> 什么类型都不是 
const consoleText = (text: string): void => {
  console.log(text) // 未指定返回值，使用void标识
}
consoleText('abc')
let v: void = undefined // void类型可赋值undefined
// v = null // "strictNullChecks": true, 需将tsconfig.json的该项设置为false

// 9. null 和 undefined
let u: undefined = undefined
let n: null = null

// 9. never类型 永远不存在的值， 两种情况: 1. 抛错， 2. 死循环 
// never类型的值可以赋值给其他任意类型，但never的值不能为其他类型的值
const errorFunc = (message: string): never => {
  throw new Error(message)
}
const infiniteFunc = (): never => {
  while(true) {}
}

// 10. object 对象类型
let obj = {
  name: 'john'
}
console.log(obj)
function getObject(obj: object): void {
  console.log(obj, 11)
}
getObject(obj)

// 类型断言 有点像类型转换，可以将某个值强行设置我们想设置的类型
const getLength = (target: string | number): number => {
  if ((<string>target).length || (target as string).length === 0) {
    return (<string>target).length // // jsx语法只能使用(target as string)方式
  } else {
    return target.toString().length
  }
}
getLength('123')
getLength(123)
console.log(getLength(123))
