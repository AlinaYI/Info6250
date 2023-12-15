function countCharacterFrequency(str) {
    return str.split('').reduce((freq, char) => {
      freq[char] = (freq[char] || 0) + 1;
      return freq;
    }, {});
  }
  
  function compareWords(word, guess) {
    if (!word || !guess) {
      return 0;
    }
  
    const lowerCaseWord = word.toLowerCase();
    const lowerCaseGuess = guess.toLowerCase();
    
    const wordFreq = countCharacterFrequency(lowerCaseWord);
    const guessFreq = countCharacterFrequency(lowerCaseGuess);
  
    return Object.keys(wordFreq).reduce((count, char) => {
      return count + Math.min(wordFreq[char], guessFreq[char] || 0);
    }, 0);
  }
  
  export default compareWords;
  