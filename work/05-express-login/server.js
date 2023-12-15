const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const PORT = 3000;

const data = require("./data"); // "data" holds all the non-web logic for managing users/messages
const dataWeb = require("./data-web"); // "data-web" holds the templates for the generated HTML
const validhelpers = require("./Is_valid");

app.use(express.static("./public"));
app.use(cookieParser());

//check if user is logged in
app.get("/", (req, res) => {
  
  const sid = req.cookies.sid;
  if (sid && !validhelpers.isValidSessionId(sid)) {
    res.clearCookie("sid");
    res.status(401).send(dataWeb.getError());
    return;
  }

  const { username } = data.sessions[sid] || {};
  const userData = validhelpers.findUser(username);

  res.send(dataWeb.indexPage(data, userData));
  return;
});

//ensure user is logged in and username is valid,not empty
app.post("/login", express.urlencoded({ extended: false }), (req, res) => {
  const { username } = req.body;
  if (username) {
    const formattedUname = username.trim().toLowerCase();
    const validUser = validhelpers.validateUserName(formattedUname);

    if (!validUser) {
      res.status(401).send(dataWeb.getError());
      return;
    }

    const sessionId = validhelpers.createSession(formattedUname);
    validhelpers.createUser(formattedUname);
    res.cookie("sid", sessionId);
    res.redirect("/");
  } else {
    res.status(401).send(dataWeb.getError());
  }
});

app.post("/message", express.urlencoded({ extended: false }), (req, res) => {
  const { message } = req.body;
  if (message) {
    const sid = req.cookies.sid;
    const { username } = data.sessions[sid];
    validhelpers.updateMessage(username, message);
    res.redirect("/");
  } else {
    res.redirect("/");
  }
});

app.post("/logout", express.urlencoded({ extended: false }), (req, res) => {
  const sid = req.cookies.sid;
  delete data.sessions[sid];
  res.clearCookie("sid");
  res.redirect("/");
});

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));