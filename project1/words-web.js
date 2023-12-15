"use strict";

const wordsWeb = {
    gamePage: function (userData, words) {
      return `
          <!doctype html>
          <html>
            <head>
              <title>Words Guess</title>
              <link rel="stylesheet" href="./css/styles.css"/>
              <link rel="stylesheet" href="./css/form.css"/>
              <link rel="stylesheet" href="./css/unauthorized.css"/>
              <link rel="stylesheet" href="./css/game.css"/>
            </head>
            <body>
              <div id="game-app">
                  ${
                    !userData 
                      ?wordsWeb.getLogin() 
                      :wordsWeb.getData(userData,words)}
              </div>
            </body>
          </html>
          `;
    },

    getLogin: function () {
      return `
          <div class="login-form">
              <h1 class="login-title">Login Here to play!</h1>
              <form method="POST" action="./login">
                  <div class="input-field">
                      <input type="text" class="username" name="username" placeholder=" Type your username here!" />
                  </div>
                  <button type="submit" class="login-btn">Login</button>
              </form>
          </div>
      `;
    },

    getData: function (userData, words) {
      return `

      <nav class="user-navbar">
        <ul>
          <li>
            <div class="user-details">
              <span class="user-avatar">${userData.username
                .charAt(0)
                .toUpperCase()
                }</span>
              <span class="user-name">${
                userData.username.charAt(0).toUpperCase()+ userData.username.slice(1)
              }</span>
            </div>
          </li>
          <li>
            <form method="POST" action="./logout">
              <button class="logout-btn" type="submit">Logout</button>
            </form>
          </li>
        </ul>
      </nav>
      
      <div class="words-container">
        <header class="words-header">
          <h1 class="words-title">Words Guess</h1>
        </header>
        <div class="new-game manual-new-game">
          <form method="POST" action="./newgame">
            <button class="new-game-btn" type="submit">New Game</button>
          </form>
        </div>
      </div>
      
      
      <div class="game-rules">
        <h2 class="rules-title">Game Rules</h2>
        
        <p>The game is simple. You will be given a word to guess. </p>
        <p>You can make a guess of the word from the given list below. </p>
        <p>If you guess the word <strong>correctly</strong>, you win the game. </p>
        <p>If you guess some letters of word word <strong>correct</strong>, you will be given the number of matches. And this is a <strong>Valid </strong> guess.</p>
        <p>If you guess all letters of word <strong>incorrectly</strong>, you will be given another word to guess. And this is a <strong>Invalid </strong> guess. </p>
        <p>You can always start a new game by clicking the new game button. </p>
        <p class="rules-description">Good Luck!</p>
      </div>

      
      <div class="guess-container">
        <h2 class="guess-title">
            Select from the list below:
        </h2>
        <div class = "guess-word-container">
          <ul class="guess-word-list"> `+ 
        words.map(
          (word) => `
          <li class="guess-word">${word}</li>
          `
        ).join("") +`
          </ul>
        </div>    
        
        <div class="guess-message" id="game-status">
          <form method="POST" action="./guess">
            <input class="guess-input" type="text" name="guess" placeholder="Type your guess here!"/>
            <button class="guess-btn" type="submit">Guess</button> 
          </form>
        </div>
        
        <div class="game-status">
          <div class="game-guess-status">
            <div class="valids">
              <p>Valid Guesses: <span>${userData.validGuessCount}</span></p>
            </div>
            <div class="last-guess">
              <p>Last Guess: <span class=${
                userData.history.length
                  ? userData.history[userData.history.length - 1].match > 0
                    ? "valid"
                    : "invalid"
                  : "not-started"
              }>${
        userData.history.length
          ? userData.history[userData.history.length - 1].valid + " Guess"
          : "No Guesses Yet"
      }</span>
              </p>
            </div>
          </div>
          ${
            userData.isMatch
              ? `
                <div class="game-end">
                    <h2>Well Done, You Won!</h2>
                    <p> The chosen word was <strong>${userData.history[userData.history.length - 1].word}</strong>
                </div>
              `
              : `<div class="game-activity-status">
              <h2>History</h2>
                <ul class="activities">` +
                (
                  userData.history &&
                  userData.history.map(
                    (activity) =>
                      `<li class="activity">${
                        activity.word
                      } <span>-- matches --</span> ${
                        activity.match
                      } letters <span> -- [${
                        activity.match === userData.newWord.length
                          ? "Incorrect Guess"
                          : activity.match > 0
                          ? "Valid Guess"
                          : "Invalid Guess"
                      }]</span></li>`
                  )
                ).join("") +
                `</ul>
            </div>
      </div>
    `}</div>
  </div>
   `;
    },


    getError: function () {
      return `
      <!doctype html>
      <html>
        <head>
          <title>401 Unauthorized</title>
          <link rel="stylesheet" href="./css/styles.css"/>
          <link rel="stylesheet" href="./css/unauthorized.css"/>
        </head>
        <body>
          <div id="unauthorized-page">
              <h1 class="error-title">Unauthorized User</h1>
              <p class="error-description">The user is not authorized to Login. </p>
              <p Please try again. </p>
              <a href="/" class="home-link">Return Home</a>
          </div>
        </body>
      </html>
      `;
    },
  };
  
  module.exports = wordsWeb;