const uuid = require('uuid').v4;

const uuid1 = uuid();
const uuid2 = uuid();
const users = { "Amit": { username: "Amit" }, "Bao": { username: "Bao" }};
const sessions = {};


const messagesList = {
  [uuid1]: {
    username: "Amit",
    message: "You up?",
  },
  [uuid2]: {
    username: "Bao",
    message: "Yeah, still working on this INFO6250 work, but I keep getting distracted by cat videos",
  }
};

module.exports = {
  users,
  sessions,
  messagesList
}