/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/constants.js":
/*!**************************!*\
  !*** ./src/constants.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CLIENT: () => (/* binding */ CLIENT),
/* harmony export */   MESSAGES: () => (/* binding */ MESSAGES),
/* harmony export */   SERVER: () => (/* binding */ SERVER)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
// Might be SERVER_CODES and CLIENT_CODES if we had more and different constants
var SERVER = {
  AUTH_MISSING: 'auth-missing',
  AUTH_INSUFFICIENT: 'auth-insufficient',
  REQUIRED_USERNAME: 'required-username',
  REQUIRED_TASK: 'required-task'
};
var CLIENT = {
  NETWORK_ERROR: 'networkError',
  NO_SESSION: 'noSession'
};
var MESSAGES = _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, CLIENT.NETWORK_ERROR, 'Trouble connecting to the network.  Please try again'), SERVER.AUTH_INSUFFICIENT, 'Your username/password combination does not match any records, please try again.'), SERVER.REQUIRED_USERNAME, 'Please enter a valid (letters and/or numbers) username'), SERVER.REQUIRED_TASK, 'Please enter the task to do'), "default", 'Something went wrong.  Please try again');

/***/ }),

/***/ "./src/listeners.js":
/*!**************************!*\
  !*** ./src/listeners.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addAbilityToAddMessage: () => (/* binding */ addAbilityToAddMessage),
/* harmony export */   addAbilityToLogin: () => (/* binding */ addAbilityToLogin),
/* harmony export */   addAbilityToLogout: () => (/* binding */ addAbilityToLogout)
/* harmony export */ });
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services */ "./src/services.js");
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./state */ "./src/state.js");
/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./render */ "./src/render.js");



var appEl = document.querySelector("#app");
function checkForMessages() {
  (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchUsers)().then(function (users) {
    (0,_state__WEBPACK_IMPORTED_MODULE_1__.updateUsers)(users.users);
    (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])({
      state: _state__WEBPACK_IMPORTED_MODULE_1__["default"],
      appEl: appEl
    });
    (0,_state__WEBPACK_IMPORTED_MODULE_1__.waitOnMessages)();
    return (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchMessages)();
  })["catch"](function (err) {
    console.log(err);
  }).then(function (messages) {
    var messagesList = messages.messagesList;
    (0,_state__WEBPACK_IMPORTED_MODULE_1__.updateMessages)(messagesList);
    (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])({
      state: _state__WEBPACK_IMPORTED_MODULE_1__["default"],
      appEl: appEl
    });
    var scrollDiv = document.querySelector(".messages");
    scrollDiv.scrollTop = scrollDiv.scrollHeight;
    var inputEl = document.querySelector(".to-send");
    inputEl.focus();
  })["catch"](function (err) {
    console.log(err);
  });
}
function addAbilityToLogin(_ref) {
  var state = _ref.state,
    appEl = _ref.appEl;
  appEl.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!e.target.classList.contains("login-form")) {
      return;
    }
    var username = document.querySelector(".username").value;
    (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchLogin)(username).then(function (res) {
      (0,_state__WEBPACK_IMPORTED_MODULE_1__.login)(username);
      (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])({
        state: state,
        appEl: appEl
      });
      (0,_state__WEBPACK_IMPORTED_MODULE_1__.waitOnUsers)();
      (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])({
        state: state,
        appEl: appEl
      });
      return (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchUsers)();
    })["catch"](function (err) {
      (0,_state__WEBPACK_IMPORTED_MODULE_1__.setError)((err === null || err === void 0 ? void 0 : err.error) || "ERROR");
      (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])({
        state: state,
        appEl: appEl
      });
    }).then(function (users) {
      (0,_state__WEBPACK_IMPORTED_MODULE_1__.updateUsers)(users.users);
      (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])({
        state: state,
        appEl: appEl
      });
      (0,_state__WEBPACK_IMPORTED_MODULE_1__.waitOnMessages)();
      (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])({
        state: state,
        appEl: appEl
      });
      return (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchMessages)();
    })["catch"](function (err) {
      (0,_state__WEBPACK_IMPORTED_MODULE_1__.setError)((err === null || err === void 0 ? void 0 : err.error) || "ERROR");
      (0,_state__WEBPACK_IMPORTED_MODULE_1__.logout)();
    }).then(function (messages) {
      var messagesList = messages.messagesList;
      (0,_state__WEBPACK_IMPORTED_MODULE_1__.updateMessages)(messagesList);
      (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])({
        state: state,
        appEl: appEl
      });
      var inputEl = document.querySelector(".to-send");
      inputEl.focus();
      var scrollDiv = document.querySelector(".messages");
      scrollDiv.scrollTop = scrollDiv.scrollHeight;
      setInterval(checkForMessages, 5000);
    })["catch"](function (err) {
      (0,_state__WEBPACK_IMPORTED_MODULE_1__.setError)((err === null || err === void 0 ? void 0 : err.error) || "ERROR");
      (0,_state__WEBPACK_IMPORTED_MODULE_1__.logout)();
    });
  });
}
function addAbilityToLogout(_ref2) {
  var state = _ref2.state,
    appEl = _ref2.appEl;
  appEl.addEventListener("click", function (e) {
    if (!e.target.classList.contains("logout-btn")) {
      return;
    }
    (0,_state__WEBPACK_IMPORTED_MODULE_1__.logout)();
    (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])({
      state: state,
      appEl: appEl
    });
    (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchLogout)()["catch"](function (err) {
      (0,_state__WEBPACK_IMPORTED_MODULE_1__.setError)((err === null || err === void 0 ? void 0 : err.error) || "ERROR");
      (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])({
        state: state,
        appEl: appEl
      });
    });
  });
}
function addAbilityToAddMessage(_ref3) {
  var state = _ref3.state,
    appEl = _ref3.appEl;
  appEl.addEventListener("click", function (e) {
    if (!e.target.classList.contains("send-btn")) {
      return;
    }
    var message = document.querySelector(".to-send").value;
    if (message) {
      (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchAddMessage)(state.username, message).then(function (message) {
        (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])({
          state: state,
          appEl: appEl
        });
        return (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchMessages)();
      })["catch"](function (err) {
        console.log(err);
        (0,_state__WEBPACK_IMPORTED_MODULE_1__.setError)((err === null || err === void 0 ? void 0 : err.error) || "ERROR");
        (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])({
          state: state,
          appEl: appEl
        });
      }).then(function (messages) {
        var messagesList = messages.messagesList;
        (0,_state__WEBPACK_IMPORTED_MODULE_1__.updateMessages)(messagesList);
        (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])({
          state: state,
          appEl: appEl
        });
        var scrollDiv = document.querySelector(".messages");
        scrollDiv.scrollTop = scrollDiv.scrollHeight;
        var inputEl = document.querySelector(".to-send");
        inputEl.focus();
      })["catch"](function (err) {
        (0,_state__WEBPACK_IMPORTED_MODULE_1__.logout)();
        (0,_state__WEBPACK_IMPORTED_MODULE_1__.setError)((err === null || err === void 0 ? void 0 : err.error) || "ERROR");
        (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])({
          state: state,
          appEl: appEl
        });
      });
    }
  });
}

/***/ }),

/***/ "./src/render.js":
/*!***********************!*\
  !*** ./src/render.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var render = function render(_ref) {
  var state = _ref.state,
    appEl = _ref.appEl;
  var html = "\n        <main>\n            ".concat(generateLoaderHtml(state), "\n            ").concat(generateLoginHtml(state), "\n            ").concat(generateNavHtml(state), "\n            <div class=\"messages-container\">\n              ").concat(generateUsers(state), "\n              ").concat(generateMessages(state), "\n              ").concat(generateOutgoing(state), "\n            </div>\n        </main>\n    ");
  appEl.innerHTML = html;
  function generateStatusHtml(state) {
    return "\n        <div class=\"status\">".concat(state.error, "</div>\n    ");
  }
  function generateLoaderHtml(state) {
    if (state.isMessagePending || state.isUsersPending || state.isLoginPending) {
      return "\n      div class=\"login__waiting\">Loading user...</div>\n    ";
    } else {
      return "";
    }
  }
  function generateLoginHtml(state) {
    if (state.isLoggedIn) {
      return "";
    }
    return "\n      <div class=\"login\">\n          <h1 class=\"login-title\">Login Here!</h2>\n          <form class=\"login-form\" method=\"POST\">\n              <div class=\"input-field\">\n                <input type=\"text\" class=\"username\" name=\"username\" placeholder=\" Type your username here!\" />\n              </div>\n              <button type=\"submit\" class=\"login-btn\">Login</button>\n          </form>\n          ".concat(generateStatusHtml(state), "\n      </div>\n    ");
  }
  function generateNavHtml(state) {
    if (state.isLoggedIn && !state.isMessagePending && !state.isUsersPending) {
      return "\n      <nav class=\"user-navbar\">\n      <ul>\n        <li>\n          <div class=\"user-details\">\n            <span class=\"user-avatar\">".concat(state.username.charAt(0).toUpperCase(), "</span>\n            <span class=\"user-name\">").concat(state.username.charAt(0).toUpperCase() + state.username.slice(1), "</span>\n          </div>\n        </li>\n        <li>\n          <form method=\"POST\" action=\"./logout\">\n            <button class=\"logout-btn\" type=\"submit\">Logout</button>\n          </form>\n        </li>\n      </ul>\n    </nav>");
    } else {
      return "";
    }
  }
  function generateMessages(state) {
    if (state.isLoggedIn && !state.isMessagePending && !state.isUsersPending) {
      if (Object.values(state.messages).length > 0) {
        return "\n              <ol class=\"messages\">" + Object.values(state.messages).map(function (message) {
          return "\n              <li>\n                <div class=\"message\">\n                  <span class=\"sender-avatar\">".concat(message.username.charAt(0), "</span>\n                  <div class=\"message-content\">\n                    <p class=\"message-sender\">").concat(message.username, "</p>\n                    <p class=\"message-text\">").concat(message.message, "</p>\n                  </div>\n                </div>\n              </li>\n              ");
        }).join("") + "</ol>\n            ";
      } else {
        return "\n          <div class=\"no-messages\"><h2>No Messages Here</h2></div>\n        ";
      }
    } else {
      return "";
    }
  }
  function generateOutgoing(state) {
    if (state.isLoggedIn) {
      return "\n        <div class=\"send-bottom\">\n            <form class=\"chat-send-form\">\n              <input type=\"text\" class=\"to-send\" name=\"message\" placeholder=\"Type your message\"/>\n              <button type=\"submit\" class=\"send-btn\">Send</button>\n            </form>\n        </div>\n        ";
    } else {
      return "";
    }
  }
  function generateUsers(state) {
    if (state.isLoggedIn && !state.isUsersPending) {
      return "<div class=\"users-list\">\n          <h3>All Users:</h3>\n          <ul class=\"users\">" + Object.values(state.users).map(function (user) {
        return "\n                  <li>\n                    <div class=\"user ".concat(user.online ? "active" : "", "\">\n                      <span class=\"sender\">").concat(user.username, "</span>\n                    </div>\n                  </li>\n                ");
      }).join("") + "</ul>\n        </div>";
    } else {
      return "";
    }
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (render);

/***/ }),

/***/ "./src/services.js":
/*!*************************!*\
  !*** ./src/services.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fetchAddMessage: () => (/* binding */ fetchAddMessage),
/* harmony export */   fetchLogin: () => (/* binding */ fetchLogin),
/* harmony export */   fetchLogout: () => (/* binding */ fetchLogout),
/* harmony export */   fetchMessages: () => (/* binding */ fetchMessages),
/* harmony export */   fetchSession: () => (/* binding */ fetchSession),
/* harmony export */   fetchUsers: () => (/* binding */ fetchUsers)
/* harmony export */ });
function fetchAddMessage(username, message) {
  return fetch("/api/messages", {
    method: "POST",
    headers: new Headers({
      "content-type": "application/json"
    }),
    body: JSON.stringify({
      username: username,
      message: message
    })
  })["catch"](function () {
    return Promise.reject({
      error: "networkError"
    });
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }
    return response.json()["catch"](function (error) {
      return Promise.reject({
        error: error
      });
    }).then(function (err) {
      return Promise.reject(err);
    });
  });
}
function fetchMessages() {
  return fetch("/api/messages", {
    method: "GET"
  })["catch"](function () {
    return Promise.reject({
      error: "networkError"
    });
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }
    return response.json()["catch"](function (error) {
      return Promise.reject({
        error: error
      });
    }).then(function (err) {
      return Promise.reject(err);
    });
  });
}
function fetchSession() {
  return fetch("/api/session", {
    method: "GET"
  })["catch"](function () {
    return Promise.reject({
      error: "networkError"
    });
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }
    return response.json()["catch"](function (error) {
      return Promise.reject({
        error: error
      });
    }).then(function (err) {
      return Promise.reject(err);
    });
  });
}
function fetchUsers() {
  return fetch("/api/users", {
    method: "GET"
  })["catch"](function () {
    return Promise.reject({
      error: "networkError"
    });
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }
    return response.json()["catch"](function (error) {
      return Promise.reject({
        error: error
      });
    }).then(function (err) {
      return Promise.reject(err);
    });
  });
}
function fetchLogout() {
  return fetch("/api/session", {
    method: "DELETE"
  })["catch"](function () {
    return Promise.reject({
      error: "networkError"
    });
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }
    return response.json()["catch"](function (error) {
      return Promise.reject({
        error: error
      });
    }).then(function (err) {
      return Promise.reject(err);
    });
  });
}
function fetchLogin(username) {
  return fetch("/api/session", {
    method: "POST",
    headers: new Headers({
      "content-type": "application/json"
    }),
    body: JSON.stringify({
      username: username
    })
  })["catch"](function () {
    return Promise.reject({
      error: "networkError"
    });
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }
    return response.json()["catch"](function (error) {
      return Promise.reject({
        error: error
      });
    }).then(function (err) {
      return Promise.reject(err);
    });
  });
}

/***/ }),

/***/ "./src/state.js":
/*!**********************!*\
  !*** ./src/state.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   login: () => (/* binding */ login),
/* harmony export */   logout: () => (/* binding */ logout),
/* harmony export */   setError: () => (/* binding */ setError),
/* harmony export */   setMessage: () => (/* binding */ setMessage),
/* harmony export */   updateMessages: () => (/* binding */ updateMessages),
/* harmony export */   updateUsers: () => (/* binding */ updateUsers),
/* harmony export */   waitOnLogin: () => (/* binding */ waitOnLogin),
/* harmony export */   waitOnMessages: () => (/* binding */ waitOnMessages),
/* harmony export */   waitOnUsers: () => (/* binding */ waitOnUsers)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./src/constants.js");

var state = {
  // We store these as an object because we will access by id
  messages: {},
  users: {},
  isLoggedIn: false,
  isLoginPending: true,
  isMessagePending: false,
  isUserPending: false,
  username: '',
  error: ''
};
function waitOnLogin() {
  state.isLoggedIn = false;
  state.isLoginPending = true;
  state.username = '';
  state.messages = {};
  state.error = '';
}
function login(username) {
  state.isLoggedIn = true;
  state.isLoginPending = false;
  state.username = username;
  state.error = '';
}
function logout() {
  state.isLoggedIn = false;
  state.isLoginPending = false;
  state.username = '';
  state.messages = {};
  state.error = '';
}
function waitOnMessages() {
  state.messages = {};
  state.isMessagePending = true;
  state.error = '';
}
function updateMessages(messages) {
  state.messages = messages;
  state.isMessagePending = false;
  state.error = '';
}
function waitOnUsers() {
  state.users = {};
  state.isUsersPending = true;
  state.error = '';
}
function updateUsers(users) {
  state.users = users;
  state.isUsersPending = false;
  state.error = '';
}
function setMessage() {
  state.isLoggedIn = true;
  state.error = '';
}
function setError(error) {
  console.log(error);
  if (!error) {
    state.error = '';
    return;
  }
  state.error = _constants__WEBPACK_IMPORTED_MODULE_0__.MESSAGES[error] || _constants__WEBPACK_IMPORTED_MODULE_0__.MESSAGES["default"];
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (state);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./src/constants.js");
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./state */ "./src/state.js");
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./services */ "./src/services.js");
/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./render */ "./src/render.js");
/* harmony import */ var _listeners__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./listeners */ "./src/listeners.js");






// Main code
var appEl = document.querySelector("#app");
(0,_render__WEBPACK_IMPORTED_MODULE_3__["default"])({
  state: _state__WEBPACK_IMPORTED_MODULE_1__["default"],
  appEl: appEl
});
(0,_listeners__WEBPACK_IMPORTED_MODULE_4__.addAbilityToLogin)({
  state: _state__WEBPACK_IMPORTED_MODULE_1__["default"],
  appEl: appEl
});
(0,_listeners__WEBPACK_IMPORTED_MODULE_4__.addAbilityToLogout)({
  state: _state__WEBPACK_IMPORTED_MODULE_1__["default"],
  appEl: appEl
});
(0,_listeners__WEBPACK_IMPORTED_MODULE_4__.addAbilityToAddMessage)({
  state: _state__WEBPACK_IMPORTED_MODULE_1__["default"],
  appEl: appEl
});
checkForSession();

/////////////////////
function checkForMessages() {
  (0,_services__WEBPACK_IMPORTED_MODULE_2__.fetchUsers)().then(function (users) {
    (0,_state__WEBPACK_IMPORTED_MODULE_1__.updateUsers)(users.users);
    (0,_render__WEBPACK_IMPORTED_MODULE_3__["default"])({
      state: _state__WEBPACK_IMPORTED_MODULE_1__["default"],
      appEl: appEl
    });
    return (0,_services__WEBPACK_IMPORTED_MODULE_2__.fetchMessages)();
  })["catch"](function (err) {
    console.log(err);
  }).then(function (messages) {
    var messagesList = messages.messagesList;
    (0,_state__WEBPACK_IMPORTED_MODULE_1__.updateMessages)(messagesList);
    (0,_render__WEBPACK_IMPORTED_MODULE_3__["default"])({
      state: _state__WEBPACK_IMPORTED_MODULE_1__["default"],
      appEl: appEl
    });
    var scrollDiv = document.querySelector(".messages");
    scrollDiv.scrollTop = scrollDiv.scrollHeight;
    var inputEl = document.querySelector(".to-send");
    inputEl.focus();
  })["catch"](function (err) {
    console.log(err);
  });
}
function checkForSession() {
  (0,_services__WEBPACK_IMPORTED_MODULE_2__.fetchSession)().then(function (session) {
    (0,_state__WEBPACK_IMPORTED_MODULE_1__.login)(session.userData.username);
    (0,_render__WEBPACK_IMPORTED_MODULE_3__["default"])({
      state: _state__WEBPACK_IMPORTED_MODULE_1__["default"],
      appEl: appEl
    });
    (0,_state__WEBPACK_IMPORTED_MODULE_1__.waitOnUsers)();
    (0,_render__WEBPACK_IMPORTED_MODULE_3__["default"])({
      state: _state__WEBPACK_IMPORTED_MODULE_1__["default"],
      appEl: appEl
    });
    return (0,_services__WEBPACK_IMPORTED_MODULE_2__.fetchUsers)();
  })["catch"](function (err) {
    if ((err === null || err === void 0 ? void 0 : err.error) === _constants__WEBPACK_IMPORTED_MODULE_0__.SERVER.AUTH_MISSING) {
      return Promise.reject({
        error: _constants__WEBPACK_IMPORTED_MODULE_0__.CLIENT.NO_SESSION
      });
    }
    return Promise.reject(err);
  }).then(function (users) {
    (0,_state__WEBPACK_IMPORTED_MODULE_1__.updateUsers)(users.users);
    (0,_render__WEBPACK_IMPORTED_MODULE_3__["default"])({
      state: _state__WEBPACK_IMPORTED_MODULE_1__["default"],
      appEl: appEl
    });
    (0,_state__WEBPACK_IMPORTED_MODULE_1__.waitOnMessages)();
    (0,_render__WEBPACK_IMPORTED_MODULE_3__["default"])({
      state: _state__WEBPACK_IMPORTED_MODULE_1__["default"],
      appEl: appEl
    });
    return (0,_services__WEBPACK_IMPORTED_MODULE_2__.fetchMessages)();
  })["catch"](function (err) {
    (0,_state__WEBPACK_IMPORTED_MODULE_1__.logout)();
    (0,_render__WEBPACK_IMPORTED_MODULE_3__["default"])({
      state: _state__WEBPACK_IMPORTED_MODULE_1__["default"],
      appEl: appEl
    });
  }).then(function (messages) {
    var messagesList = messages.messagesList;
    (0,_state__WEBPACK_IMPORTED_MODULE_1__.updateMessages)(messagesList);
    (0,_render__WEBPACK_IMPORTED_MODULE_3__["default"])({
      state: _state__WEBPACK_IMPORTED_MODULE_1__["default"],
      appEl: appEl
    });
    var scrollDiv = document.querySelector(".messages");
    scrollDiv.scrollTop = scrollDiv.scrollHeight;
    var inputEl = document.querySelector(".to-send");
    inputEl.focus();
    setInterval(checkForMessages, 5000);
  })["catch"](function (err) {
    if ((err === null || err === void 0 ? void 0 : err.error) == _constants__WEBPACK_IMPORTED_MODULE_0__.CLIENT.NO_SESSION) {
      (0,_state__WEBPACK_IMPORTED_MODULE_1__.logout)();
      (0,_render__WEBPACK_IMPORTED_MODULE_3__["default"])({
        state: _state__WEBPACK_IMPORTED_MODULE_1__["default"],
        appEl: appEl
      });
      return;
    }
  });
}
})();

/******/ })()
;
//# sourceMappingURL=main.js.map