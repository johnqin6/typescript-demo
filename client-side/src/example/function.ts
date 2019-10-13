/**
 * 函数
 */

// 命名函数
// function add (x, y) {
//   return x + y;
// }

// 匿名函数
// let myAdd = function(x, y) { return x + y };

// 为函数定义类型
function add(x: number, y: number): number {
  return x + y;
}
let myAdd = function(x: number, y:number): number { return x + y };
add (1, 2)

// 书写完整函数类型
let myAdd1: (baseValue: number, increment: number) => number = 
function(x: number, y: number): number { return x + y };

console.log(myAdd1(2, 3))

// 推断类型，如果你在赋值语句的一边指定了类型但是另一边没有类型的话，TypeScript编译器会自动识别出类型
let myAdd2: (baseValue: number, increment: number) => number = function(x, y) { return x + y };

// 可选参数和默认参数 TypeScript里的每个函数参数都是必须的。
function buildName(firstName: string, lastName: string) {
  return firstName + " " + lastName;
}

// let result1 = buildName("bob") // x
// let result2 = buildName("Bob", "Adams", "Sr."); x
let result3 = buildName("Bob", "Adams");   

// 可选参数  可选参数必须跟在必须参数后面 可选参数类型可省略，会共享参数的参数类型
function setName(firstName: string, lastName?: string) {
  if (lastName) {
    return firstName + " " + lastName
  } else {
    return firstName
  }
}

let result1 = setName("bob") // x
// let result2 = setName("Bob", "Adams", "Sr."); //x
let result4 = setName("Bob", "Adams");   

// 函数参数默认值 不必一定放在参数最后，默认值参数类型可省略，会共享参数的参数类型
function buildName2(firstName: string, lastName = "Smith") {
  return firstName + " " + lastName
}
let res1 = buildName2('Bob') // "Bob Smith"
let res2 = buildName2('Bob', undefined) // "Bob Smith"
// buildName2("Bob", "Adams", "Sr.") // x
buildName2("Bob", "Adams") // "Bob Adams"

// 不必一定放在参数最后 可用undefained替代默认值的位置
function buildName3(firstName = "Will", lastName: string) {
  return firstName + " " + lastName
}
// buildName3('Bob') // x
buildName3(undefined, "Adams") // "Will Adams"

// 剩余参数
function buildName4(firstName: string, ...restOfName: string[]) {
  return firstName + " " + restOfName.join(" ");
}
console.log(buildName4("Joseph", "Samuel", "Lucas", "MacKinzie")); // "Joseph Samuel Lucas MacKinzie"

// typescript中的this
interface Card {
  suit: string;
  card: number;
}
interface Deck {
  suits: string[];
  cards: number[];
  createCardPicker(this: Deck): () => Card;
}
let deck: Deck = {
  suits: ["hearts", "spades", "clubs", "diamonds"],
  cards: Array(52),
  // NOTE: The function now explicitly specifies that its callee must be of type Deck
  createCardPicker: function(this: Deck) {
      return () => {
          let pickedCard = Math.floor(Math.random() * 52);
          let pickedSuit = Math.floor(pickedCard / 13);

          return {suit: this.suits[pickedSuit], card: pickedCard % 13};
      }
  }
}

let cardPicker = deck.createCardPicker();
let pickedCard = cardPicker();

console.log("card: " + pickedCard.card + " of " + pickedCard.suit);

// this参数在回调函数里
interface UIElement {
  addClickListener(onclick: (this: void, e: Event) => void): void;
}
class Handler {
  info: string = 'hello';
  onClickGood(this: void, e: Event) {
      // can't use this here because it's of type void!
      console.log('clicked!');
  }
}
let h = new Handler();
// UIElement.addClickListener(h.onClickGood);


// 重载
let suits = ["hearts", "spades", "clubs", "diamonds"];

function pickCard(x: {suit: string; card: number; }[]): number;
function pickCard(x: number): {suit: string; card: number; };
function pickCard(x: any): any {
    // Check to see if we're working with an object/array
    // if so, they gave us the deck and we'll pick the card
    if (typeof x == "object") {
        let pickedCard = Math.floor(Math.random() * x.length);
        return pickedCard;
    }
    // Otherwise just let them pick the card
    else if (typeof x == "number") {
        let pickedSuit = Math.floor(x / 13);
        return { suit: suits[pickedSuit], card: x % 13 };
    }
}

let myDeck = [{ suit: "diamonds", card: 2 }, { suit: "spades", card: 10 }, { suit: "hearts", card: 4 }];
let pickedCard1 = myDeck[pickCard(myDeck)];
console.log("card: " + pickedCard1.card + " of " + pickedCard1.suit);

let pickedCard2 = pickCard(15);
console.log("card: " + pickedCard2.card + " of " + pickedCard2.suit);
