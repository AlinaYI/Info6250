const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
// PORT=4000 node server.js (Windows version:  SET PORT=4000 && node server.js)
// lets us run on a different port from the dev server from `npm start`
const PORT = process.env.PORT || 3000;

const data = require("./data");
const sessions = require("./sessions");
const messages = require("./messages");

app.use(cookieParser());
app.use(express.static("./dist"));
app.use(express.json());

//session
app.get("/api/session", (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid): "";
  if (!sid || !user.isValidSessionId(username)) {
    res.status(401).json({ error: "auth-missing" });
    return;
  }
  res.json({ username });
});

app.post("/api/session", (req, res) => {
  const { username } = req.body;
    if (!username) {
        res.status(400).json({ error: 'required-username' });
        return;
    }
    if (username === 'dog') {
        res.status(403).json({ error: 'No username "dog"' });
        return;
    }
    if (!username.match("^[a-zA-Z0-9_\u4e00-\u9fa5]+$")) {
        res.status(403).json({ error: 'Invalid input' });
        return;
    }
    const sid = sessions.addSession(username);
    const existingUserData = user.getUserData(username);
    if (!existingUserData) {
        user.addUser(username);
    }
    res.cookie('sid', sid);
    res.json(user.getUserData(username));
});

app.delete("/api/session", (req, res) => {
  const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
    if (sid) {
        res.clearCookie('sid');
    }
    if (username) {
        sessions.deleteSession(sid);
    }
    res.json({ username });
});


messages
app.get("/api/messages", (req, res) => {
  const sid = req.cookies.sid;
  if (!sid || !sessions.isValidSessionId(sid)) {
    res.clearCookie("sid");
    res.status(401).json({ error: 'auth-missing' });
    return;
  }

  const { username } = data.sessions[sid] || {};
  const userData = sessions.findUser(username);

  if (userData.username) {
    const { messagesList } = data;
    res.json({ messagesList });
  } else {
    res.status(401).json({ error: 'auth-missing' });
  }
});


app.post("/api/messages", (req, res) => {
  const sid = req.cookies.sid;
  if (!sid || !sessions.isValidSessionId(sid)) {
    res.clearCookie("sid");
    res.status(401).json({ error: 'auth-missing' });
    return;
  }

  const { username } = data.sessions[sid] || {};
  const userData = sessions.findUser(username);
  const message = req.body.message;
  if (!userData.username || !message) {
    res.status(400).json({ error: 'required-username' });
  }
  const messagesList = messages.addMessage(username, message);
  res.json({ messagesList });
});

///users
app.get("/api/users", (req, res) => {
  const sid = req.cookies.sid;
  if (!sid || !sessions.isValidSessionId(sid)) {
    res.clearCookie("sid");
    res.status(401).json({ error: 'auth-missing' });
    return;
  }

  const { username } = data.sessions[sid] || {};
  const userData = sessions.findUser(username);

  if (userData.username) {
    const { users } = data;
    res.json({ users });
  } else {
    res.status(401).json({ error: 'auth-missing' });
  }
});



app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
