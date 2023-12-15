"use strict";
/* DO NOT MODIFY EXCEPT WHERE ALLOWED */
module.exports = compare; // DO NOT MODIFY - USED FOR TESTING

function compare( word, guess ) {  // DO NOT MODIFY

/* YOU MAY MODIFY THE LINES BELOW */
/*want to guess the number, return # of common letter, regardless position& upper/lowercase
  1. convert word and guess to lowercase
  2. record frequency of each letter in word and guess
  3. compare frequency of each letter in word and guess, add the smaller one into count
*/
  let words = word.toLowerCase();
  let guesses = guess.toLowerCase();
  let count = 0;
  
  /*build frequency */
  let wordFreq = {};
  let guessFreq = {};

  /* Store the frequency of the word */
  for (let i = 0; i < words.length; i++) {
    let char = words[i];
    if (wordFreq[char]) {
      wordFreq[char]++;
    } else {
      wordFreq[char] = 1;
    }
  }

  /* Store the frequency of the guess */
  for (let i = 0; i < guesses.length; i++) {
    let char = guesses[i];
    if (guessFreq[char]) {
      guessFreq[char]++;
    } else {
      guessFreq[char] = 1;
    }
  }

  /* Compare the frequency of the word and guess */
  for (let char in wordFreq) {
    if (guessFreq[char]) {
      count += Math.min(wordFreq[char], guessFreq[char]);
    }
  }
  
  return count;

}
