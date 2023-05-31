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
  //return document.getElementById('guessBox').value
  return guessString.join('')
}

function checkGuess(guess, target) {
  const checkStates = [0, 0, 0, 0, 0]
  const checkGuessArray = guess.toLowerCase()
  for (let i = 0; i < checkGuessArray.length; i++) {
    if (checkGuessArray[i] == target[i]) {
      checkStates[i] = 2;
    } else if (target.includes(checkGuessArray[i])) {
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
  document.getElementById(lineNum).querySelector('.columnOne').innerHTML = getUserGuess()[0].toUpperCase()
  document.getElementById(lineNum).querySelector('.columnTwo').innerHTML = getUserGuess()[1].toUpperCase()
  document.getElementById(lineNum).querySelector('.columnThree').innerHTML = getUserGuess()[2].toUpperCase()
  document.getElementById(lineNum).querySelector('.columnFour').innerHTML = getUserGuess()[3].toUpperCase()
  document.getElementById(lineNum).querySelector('.columnFive').innerHTML = getUserGuess()[4].toUpperCase()
}

function guessValidity(string) {
  if (string.length == 5) {
    if (wordList.some(e => e.word == string)) {
      return true
    } else {
      return 'Not in word list :('
    }
  } else {
    return '5 letters only!'
  }
}

function userGuesses() {
  if (guessValidity(getUserGuess().toLowerCase()) == true) {
    let string = getUserGuess()
    updateBoard(checkGuess(string, target), guessCount)
    guessCount++
    winLossCheck(string, target)
    guessString = []
} else {
  window.alert('Must enter valid word. ' + guessValidity(getUserGuess()))
}
}

function winLossCheck(winCheckGuess, winCheckTarget) {
  if (guessCount < 6) {
    if (winCheckGuess.toLowerCase() == winCheckTarget) {
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

function stageUpdateBoard(array) {
  let targetRow = ''
  let targetColumn = '.columnOne'
  switch (guessCount) {
    case 0:
      targetRow = "lineOne";
      break;
    case 1:
      targetRow = "lineTwo";
      break;
    case 2:
      targetRow = 'lineThree'
      break;
    case 3: 
      targetRow = 'lineFour'
      break;
    case 4:
      targetRow = "lineFive";
      break;
    case 5:
      targetRow = "lineSix";
      break;
  }
  switch (guessString.length) {
    case 1:
      targetColumn = ".columnOne";
      break;
    case 2:
      targetColumn = ".columnTwo";
      break;
    case 3:
      targetColumn = ".columnThree";
      break;
    case 4:
      targetColumn = ".columnFour";
      break;
    case 5:
      targetColumn = ".columnFive";
      break;
  }

  //update tile
  document.getElementById(targetRow).querySelector(targetColumn).innerHTML = guessString[guessString.length - 1]
}

function keyPress() {
  let keyChar = this.innerHTML
  if (guessString.length < 5) {
    guessString.push(keyChar)
    stageUpdateBoard(guessString)
  }
  //remove later
  console.log(guessString)
}

function createKey(key, row) {
  let newKey = document.createElement('p')
  newKey.classList.add('key')
  document.getElementById(row).appendChild(newKey)
  newKey.innerHTML = key.toUpperCase()
  newKey.addEventListener('click', keyPress)
}

function buildKeyboard() {
  //making latters
  const keysRowOne = 'qwertyuiop'
  const keysRowTwo = 'asdfghjkl'
  const keysRowThree = 'zxcvbnm'
  for (let i = 0; i < keysRowOne.length; i++) {
    createKey(keysRowOne[i], 'keyboardRowOne')
  }
  for (let i = 0; i < keysRowTwo.length; i++) {
    createKey(keysRowTwo[i], 'keyboardRowTwo')
  }
  for (let i = 0; i < keysRowThree.length; i++) {
    createKey(keysRowThree[i], 'keyboardRowThree')
  }
  //make backspace
  let backspace = document.createElement('p')
  backspace.classList.add('key')
  backspace.innerHTML = '<-'
  document.getElementById('keyboardRowOne').appendChild(backspace)
  backspace.addEventListener('click', backspacePress)
  //make enter
  let enter = document.createElement('p')
  enter.classList.add('key')
  enter.id = 'submitButton'
  enter.innerHTML = 'ENTER'
  document.getElementById('keyboardRowOne').appendChild(enter)
  enter.addEventListener('click', enterPress)
}

function backspacePress() {
  guessString.pop()
  let backspaceTarget = 0
  let targetRow = 0
  switch (guessString.length + 1) {
    case 1:
      backspaceTarget = ".columnOne";
      break;
    case 2:
      backspaceTarget = ".columnTwo";
      break;
    case 3:
      backspaceTarget = ".columnThree";
      break;
    case 4:
      backspaceTarget = ".columnFour";
      break;
    case 5:
      backspaceTarget = ".columnFive";
      break;
  }
  switch (guessCount) {
    case 0:
      targetRow = "lineOne";
      break;
    case 1:
      targetRow = "lineTwo";
      break;
    case 2:
      targetRow = 'lineThree'
      break;
    case 3: 
      targetRow = 'lineFour'
      break;
    case 4:
      targetRow = "lineFive";
      break;
    case 5:
      targetRow = "lineSix";
      break;
  }
  document.getElementById(targetRow).querySelector(backspaceTarget).innerHTML = ""
}

function enterPress() {
  console.log('NO! :(')
  userGuesses()
}

function winStateReached() {
  document.getElementById('gameBoard').style.backgroundColor = 'green'
  document.getElementById('submitButton').removeEventListener('click', enterPress)
}

function loseStateReached() {
  document.getElementById('gameBoard').style.backgroundColor = 'red'
  document.getElementById('submitButton').removeEventListener('click', enterPress)
}

let target = wordSelector()
let guessCount = 0
let guessString = []

function initialise() {
  let target = wordSelector()
  let guessCount = 0
  buildKeyboard()
}


initialise()