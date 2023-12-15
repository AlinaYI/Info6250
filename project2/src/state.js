import { MESSAGES } from './constants';

const state = {
  // We store these as an object because we will access by id
  messages: {},
  users:{},
  isLoggedIn: false,
  isLoginPending: true,
  isMessagePending: false,
  isUserPending: false,
  username: '',
  error: '',
};

export function waitOnLogin() {
  state.isLoggedIn = false;
  state.isLoginPending = true;
  state.username = '';
  state.messages = {};
  state.error = '';
}

export function login(username) {
  state.isLoggedIn = true;
  state.isLoginPending = false;
  state.username = username;
  state.error = '';
}

export function logout() {
  state.isLoggedIn = false;
  state.isLoginPending = false;
  state.username = '';
  state.messages = {};
  state.error = '';
}

export function waitOnMessages() {
  state.messages = {};
  state.isMessagePending = true;
  state.error = '';
}

export function updateMessages(messages) {
  state.messages = messages;
  state.isMessagePending = false;
  state.error = '';
}

export function waitOnUsers() {
    state.users = {};
    state.isUsersPending = true;
    state.error = '';
  }

export function updateUsers(users) {
  state.users = users;
  state.isUsersPending = false;
  state.error = '';
}

export function setMessage(){
    state.isLoggedIn = true;
    state.error = '';
}

export function setError(error) {
  console.log(error);
  if(!error) {
    state.error = '';
    return;
  }
  state.error = MESSAGES[error] || MESSAGES.default;
}

export default state;

