/**
 * 枚举 enum
 */
const test = 5
enum Status {
  Uploading,
  Success = 3,
  Failed = test
}
console.log(Status.Uploading)
console.log(Status.Success)
console.log(Status.Failed)

// 反向映射（数字枚举）
enum Enum {
  A
}
let aa = Enum.A
let nameOfA = Enum[aa]; // "A"

// 字符串枚举
enum Message {
  Error = 'Sorry, error',
  Success = 'Hoho, success',
  Failed = Error
}
console.log(Message.Failed)

// 联合枚举与枚举成员的类型
enum Animals {
  Dog = 1,
  Cat = 2
}
interface Dog {
  type: Animals.Dog
}

// const 枚举
const enum Animals1 {
  A = 1,
  B = A * 2
}
console.log(Animals1.A)
