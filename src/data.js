import dict from "./dictionary.json";

const row1 = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"];
const row2 = ["a", "s", "d", "f", "g", "h", "j", "k", "l"];
const row3 = ["enter", "z", "x", "c", "v", "b", "n", "m", "delete"];

const list1 = [
  { name: "spelling bee", img: "/img/SpellingBee-Icon-Normalized.svg" },
  { name: "the crossword", img: "/img/Crossword-Icon-Normalized.svg" },
  { name: "the mini", img: "/img/Mini-Icon-Normalized.svg" },
  {
    name: "WordleBot: your daily wordle compainion",
    img: "/img/WordleBot-Icon-Normalized.svg",
  },
  { name: "chess", img: "/img/Chess-Icon-Normalized.svg" },
  { name: "gameplay stories" },
  { name: "more games" },
];

const list2 = [
  { name: "the new york times", img: "/img/NYT-Icon-Normalized.svg" },
  {
    name: "the new york times cooking",
    img: "/img/Cooking-Icon-Normalized.svg",
  },
  {
    name: "new york times wirecutter",
    img: "/img/Wirecutter-Icon-Normalized.svg",
  },
  { name: "the atlhletic", img: "/img/Athletic-Icon-Normalized.svg" },
];

export let fiveLetterWords = [];
let arr = [];
Object.entries(dict).forEach((obj) => {
  arr.push(obj);
});

let all = [];
arr.forEach((item) => {
  let five = item[1];
  all.push(five);
});

all.forEach((item) => {
  item.forEach((x) => {
    if (x.length === 5) {
      fiveLetterWords.push(x);
    }
  });
});

// export const fiveLetterWords = [
//   "hello",
//   "react",
//   "brown",
//   "gloat",
//   "watch",
//   "woman",
//   "world",
//   "youth",
//   "whole",
//   "white",
//   "water",
//   "avoid",
//   "catch",
//   "clear",
//   "study",
//   "thank",
//   "think",
//   "after",
//   "about",
//   "fresh",
//   "funny",
//   "minus",
//   "below",
// ];

export const rows = { row1, row2, row3 };
export const list = { list1, list2 };
