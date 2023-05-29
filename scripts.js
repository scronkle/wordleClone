//html import
// import { wordList } from "./utils.js";


//node.js import
const fileRead =require('./utils.js')
const localList = fileRead.wordList

function wordSelector() {
  return localList[Math.floor(Math.random() * localList.length)]
}

function getUserGuess() {
  //figure out how to get guess lmao
  return 'green'
}

function checkGuess(guess, target) {
  const checkStates = [0, 0, 0, 0, 0]
  for (let i = 0; i < guess.length; i++) {
    if (guess[i] == target[i]) {
      checkStates[i] = 2;
    } else if (target.includes(guess[i])) {
      checkStates[i] = 1;
    }
  }
  console.log(checkStates)
}



let target = wordSelector()

console.log(localList)
console.log('Target word is: ' + target + '. My guess is: ' + getUserGuess())
checkGuess(getUserGuess(), target)