"use strict";
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const PORT = 3000;

const game = require("./words-data"); // "words" holds all the non-web logic for managing users/messages
const wordsWeb = require("./words-web"); // "words-web" holds the templates for the generated HTML
const validhelpers = require("./Is-valid"); // check the validity of the username
const gamehelpers = require("./game"); //create the word to be guessed

app.use(express.static("./public"));
app.use(cookieParser());

//this game has 2 pages, one for login and one for the game
//the login page is the index page, the game page is the game page
//if the user is not logged in, they are redirected to the login page
//if the user is logged in, they are redirected to the game page

//check if user is logged in
app.get("/", (req, res) => {
  
  const sid = req.cookies.sid;
  if (sid && !validhelpers.isValidSessionId(sid)) {
    res.clearCookie("sid");
    res.status(401).send(wordsWeb.getError());
    return;
  }

  const { username } = game.sessions[sid] || {};
  const gamedata = validhelpers.findUser(username);

  //if no more words are available, the game is over,start a new game
  if (gamedata && gamedata.newWord ==="") {
    gamedata.newWord = gamehelpers.creatWord(
      gamedata.availableWords
    );
    console.log(
      `New game: \nThe chosen word is ${gamedata.newWord} || user : ${gamedata.username}`
    );
  }else if(gamedata){
    console.log(
      `Continuing: \nThe chosen word is ${gamedata.newWord} || user : ${gamedata.username}`
    );
  }

  res.send(wordsWeb.gamePage(gamedata, gamedata?.availableWords));
  return;
});


//ensure user is logged in and username is valid,not empty
app.post("/login", express.urlencoded({ extended: false }), (req, res) => {
  const { username } = req.body;
  if (username) {
    const formattedUname = username.trim().toLowerCase();
    const validUser = validhelpers.validateUserName(formattedUname);

    if (!validUser) {
      res.status(401).send(wordsWeb.getError());
      return;
    }

    const sessionId = validhelpers.createSession(formattedUname);
    validhelpers.createUser(formattedUname);
    res.cookie("sid", sessionId);
    res.redirect("/");
  } else {
    res.status(401).send(wordsWeb.getError());
  }
});

app.post("/guess", express.urlencoded({ extended: false }), (req, res) => {
  const { guess } = req.body;
  
  if (guess) {
    const sid = req.cookies.sid;
    const { username } = game.sessions[sid];

    let gameuser = gamehelpers.getPlayer(username);
    
    //if the user has not guessed the word yet, update the game
    if(!gameuser.ismatch){
      gamehelpers.updateGame(username, guess, gameuser.availableWords);
      gameuser.availableWords = gameuser.availableWords.filter(
        (word) => word.toLowerCase() !== guess.toLowerCase()
      );
    }

    gameuser = gamehelpers.getPlayer(username);
    res.redirect("/#game-status");

  } else {
    res.redirect("/#game-status");
  }
});


// new game starts when the user clicks the new game button
// the user is redirected to the login page, and the game is reset
app.post("/newgame", (req, res) => {
  const sid = req.cookies.sid;
  
  if (sid && !validhelpers.isValidSessionId(sid)) {
    res.clearCookie("sid");
    res.status(401).send(wordsWeb.getError());
    return;
  }

  const { username } = game.sessions[sid] || {};

  delete game.players[username];
  validhelpers.createUser(username);
  res.redirect("/");
});

app.post("/logout", express.urlencoded({ extended: false }), (req, res) => {
  const sid = req.cookies.sid;
  delete game.sessions[sid];
  res.clearCookie("sid");
  res.redirect("/");
});

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));