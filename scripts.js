import {wordList} from './utils.js';


//node.js import
//const fileRead =require('./utils.js')
//const localList = fileRead.wordList

//cheap :/
const localList = ['brain', 'great', 'booty', 'sewer']

function wordSelector() {
  return wordList[Math.floor(Math.random() * wordList.length)].word
}

function getUserGuess() {
  //figure out how to get guess lmao
  return document.getElementById('guessBox').value
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
  console.log(target + guess)
  console.log(checkStates)
  return checkStates
}

function colourDecode(colour) {
  switch (colour) {
    case -1:
      return "lightGray";
      break;
    case 0:
      return "darkGray";
      break;
    case 1:
      return "yellow";
      break;
    case 2:
      return "green";
      break;
  }
}

function updateBoard(stateArray, guessNum) {
  let lineNum = ""
  switch (guessNum) {
    case 0:
      lineNum = "lineOne";
      break;
    case 1:
      lineNum = "lineTwo";
      break;
    case 2:
      lineNum = "lineThree";
      break;
    case 3:
      lineNum = "lineFour";
      break;
    case 4:
      lineNum = "lineFive";
      break;
    case 5:
      lineNum = "lineSix";
      break;
  }
  //set tile colour
  document.getElementById(lineNum).querySelector('.columnOne').style.backgroundColor = colourDecode(stateArray[0])
  document.getElementById(lineNum).querySelector('.columnTwo').style.backgroundColor = colourDecode(stateArray[1])
  document.getElementById(lineNum).querySelector('.columnThree').style.backgroundColor = colourDecode(stateArray[2])
  document.getElementById(lineNum).querySelector('.columnFour').style.backgroundColor = colourDecode(stateArray[3])
  document.getElementById(lineNum).querySelector('.columnFive').style.backgroundColor = colourDecode(stateArray[4])
  //set text
  document.getElementById(lineNum).querySelector('.columnOne').innerHTML = getUserGuess()[0]
  document.getElementById(lineNum).querySelector('.columnTwo').innerHTML = getUserGuess()[1]
  document.getElementById(lineNum).querySelector('.columnThree').innerHTML = getUserGuess()[2]
  document.getElementById(lineNum).querySelector('.columnFour').innerHTML = getUserGuess()[3]
  document.getElementById(lineNum).querySelector('.columnFive').innerHTML = getUserGuess()[4]
}

function userGuesses() {
  let string = getUserGuess()
  updateBoard(checkGuess(string, target), guessCount)
  guessCount++
  document.getElementById('guessBox').value = ''
  winLossCheck(string, target)
}

function winLossCheck(winCheckGuess, winCheckTarget) {
  if (guessCount < 6) {
    if (winCheckGuess == winCheckTarget) {
      winStateReached()
    }
  } else {
    if (winCheckGuess == winCheckTarget) {
      winStateReached()
    } else {
      loseStateReached()
    }
  }
}

function winStateReached() {
  document.getElementById('gameBoard').style.backgroundColor = 'green'
}

function loseStateReached() {
  document.getElementById('gameBoard').style.backgroundColor = 'red'
}


let target = wordSelector()
let guessCount = 0



document.getElementById('submitButton').addEventListener("click", userGuesses)
