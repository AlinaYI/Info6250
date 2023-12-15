"use strict";
const { players } = require("./words-data");

const updateGame = (username, guess) => {
  const playerDetails = getPlayer(username);
  const historyWords = playerDetails.history.map((h) => h.word);
  
  if (!historyWords.includes(guess.toLowerCase())) {
    const history = createHistory(playerDetails.newWord, guess);
    if (
      history.match === playerDetails.newWord.length &&
      playerDetails.newWord.toLowerCase() === history.word.toLowerCase()
    ) {
      playerDetails.isMatch = true;
    }
    if (history.match > 0) {
      playerDetails.validGuessCount += 1;
    }
    playerDetails.history.push(history);
  }
};

const creatWord = (words) => {
  const newWord = getRandomWord(words);
  return newWord;
};

const getRandomWord = (words) => {
  return words[Math.floor(Math.random() * words.length)];
};

const getPlayer = (username) => {
  if (players[username]) {
    return players[username];
  }
};

const compare = (new_word, guess) => {
  let match = 0;
  const givenWord = new_word.toLowerCase().split("");
  const guessedWord = guess.toLowerCase().split("");

  guessedWord.forEach((letter) => {
    if (givenWord.includes(letter)) {
      match++;
      givenWord.splice(givenWord.indexOf(letter), 1);
    }
  });
  return match;
};

const findStatus = (match, guess, new_word) =>{
  if(match === new_word.length && guess.toLowerCase() !== new_word.toLowerCase()){
    return "Incorrect"
  }
  else if(match === new_word.length && guess.toLowerCase() === new_word.toLowerCase()){
    return "Correct"
  }
  else if(match>0){
    return "Valid"
  }
  else{
    return "Invalid"
  }
}

const createHistory = (new_word, guess) => {
  const match = compare(new_word, guess);
  const valid = findStatus(match, guess, new_word);
  return {
    word: `${guess}`,
    match,
    valid,
  };
};

const gameHelpers = {
  creatWord,
  getPlayer,
  updateGame,
};

module.exports = gameHelpers;