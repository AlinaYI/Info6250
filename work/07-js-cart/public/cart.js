/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/render.js":
/*!***********************!*\
  !*** ./src/render.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./state */ "./src/state.js");

var productsEl = document.querySelector(".products");
var cartEl = document.querySelector(".cartlist");
function render() {
  if (_state__WEBPACK_IMPORTED_MODULE_0__["default"].viewCart) {
    renderCart(cartEl);
  } else {
    renderEmptyCart(cartEl);
  }
  renderProducts(productsEl);
}
function renderCart(cartEl) {
  var totalCount = _state__WEBPACK_IMPORTED_MODULE_0__["default"].getTotalCount();
  var cartListHtml = totalCount ? getCartHtml() : "<p>Nothing in the cart</p>";
  cartEl.innerHTML = "<h2>Shopping Cart</h2> ".concat(cartListHtml);
}
function renderEmptyCart(cartEl) {
  cartEl.innerHTML = "";
}
function renderProducts(productsEl) {
  var listingHtml = getListingHtml();
  var viewCartBtn = getViewCartBtnHtml();
  var productsHtml = "<ul class=\"listings\">".concat(listingHtml, "</ul> ").concat(viewCartBtn);
  productsEl.innerHTML = productsHtml;
}
function getListingHtml() {
  var listings = _state__WEBPACK_IMPORTED_MODULE_0__["default"].products.map(function (product, index) {
    return "\n            <li class=\"product\">\n                <h3 class=\"product-name\" data-index=\"".concat(index, "\">").concat(product.name, "</h3>\n                <img class=\"product-img\" src=").concat(product.img, "/>\n                <p class=\"product-price\">Price: $").concat(product.price, "</p>\n                <button \n                data-index=\"").concat(index, "\" class=\"addCart\" type=\"button\">\n                Add to cart\n                </button>\n            </li>\n        ");
  }).join("");
  return listings;
}
function getViewCartBtnHtml() {
  var totalCount = _state__WEBPACK_IMPORTED_MODULE_0__["default"].getTotalCount();
  var viewCartText = totalCount ? "View Cart (".concat(totalCount, ")") : "View Cart";
  var btnText = _state__WEBPACK_IMPORTED_MODULE_0__["default"].viewCart ? "Hide Cart" : viewCartText;
  return "\n    <button type=\"button\" class=\"cartView\">".concat(btnText, "</button> ");
}
function getCartHtml() {
  var cartHtml = _state__WEBPACK_IMPORTED_MODULE_0__["default"].products.map(function (product, index) {
    var inCartClass = product.count ? "in-cart" : "not-in-cart";
    return "\n                <li class=\"cart ".concat(inCartClass, "\">\n                    <h4 class=\"cart-name\" data-index=\"").concat(index, "\">\n                    ").concat(product.name, "\n                    </h4>\n                    <img class=\"cart-img\" src=").concat(product.img, ">\n                    <div class=\"count-group\">\n                        <button \n                        data-index=\"").concat(index, "\" class=\"removeProduct\" type=\"button\">\n                        -\n                        </button>\n                        <span class=\"cart-count\">").concat(product.count, "</span>\n                        <button \n                        data-index=\"").concat(index, "\" class=\"addProduct\" type=\"button\">\n                        +\n                        </button>\n                    </div>\n                    <p>Price: $").concat(_state__WEBPACK_IMPORTED_MODULE_0__["default"].getProductPrice(index), "</p>\n                </li>\n        ");
  }).join("");
  cartHtml = "<ul class=\"carts\">".concat(cartHtml, "</ul>");
  var totalPriceHtml = "<p>Total Price: $".concat(_state__WEBPACK_IMPORTED_MODULE_0__["default"].getTotalPrice(), "</p>");
  var checkoutBtn = "<button type=\"button\" class=\"checkOut\">Checkout</button>";
  cartHtml += totalPriceHtml;
  cartHtml += checkoutBtn;
  return cartHtml;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (render);

/***/ }),

/***/ "./src/state.js":
/*!**********************!*\
  !*** ./src/state.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var state = {
  products: [{
    name: 'Fluffball',
    img: 'http://placekitten.com/150/150?image=1',
    price: 0.99,
    count: 0
  }, {
    name: 'General Mayhem',
    img: 'http://placekitten.com/150/150?image=2',
    price: 3.14,
    count: 0
  }, {
    name: 'Snowball',
    img: 'http://placekitten.com/150/150?image=3',
    price: 2.73,
    count: 0
  }],
  viewCart: false,
  getTotalCount: function getTotalCount() {
    var totalCount = 0;
    state.products.forEach(function (product) {
      totalCount += product.count;
    });
    return totalCount;
  },
  getProductPrice: function getProductPrice(index) {
    return (state.products[index].count * state.products[index].price).toFixed(2);
  },
  getTotalPrice: function getTotalPrice() {
    var totalPrice = 0;
    state.products.forEach(function (product) {
      totalPrice += product.count * product.price;
    });
    return totalPrice.toFixed(2);
  }
};
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
/*!*********************!*\
  !*** ./src/cart.js ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./state */ "./src/state.js");
/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./render */ "./src/render.js");


var appEl = document.querySelector("#app");
appEl.addEventListener("click", function (e) {
  if (e.target.classList.contains("cartView")) {
    _state__WEBPACK_IMPORTED_MODULE_0__["default"].viewCart = !_state__WEBPACK_IMPORTED_MODULE_0__["default"].viewCart;
    (0,_render__WEBPACK_IMPORTED_MODULE_1__["default"])();
    return;
  }
  if (e.target.classList.contains("addCart")) {
    var index = e.target.dataset.index;
    if (_state__WEBPACK_IMPORTED_MODULE_0__["default"].products[index].count === 0) {
      _state__WEBPACK_IMPORTED_MODULE_0__["default"].products[index].count = 1;
    } else {
      _state__WEBPACK_IMPORTED_MODULE_0__["default"].products[index].count += 1;
    }
    (0,_render__WEBPACK_IMPORTED_MODULE_1__["default"])();
    return;
  }
  if (e.target.classList.contains("addProduct")) {
    var _index = e.target.dataset.index;
    _state__WEBPACK_IMPORTED_MODULE_0__["default"].products[_index].count += 1;
    (0,_render__WEBPACK_IMPORTED_MODULE_1__["default"])();
    return;
  }
  if (e.target.classList.contains("removeProduct")) {
    var _index2 = e.target.dataset.index;
    _state__WEBPACK_IMPORTED_MODULE_0__["default"].products[_index2].count -= 1;
    (0,_render__WEBPACK_IMPORTED_MODULE_1__["default"])();
    return;
  }
  if (e.target.classList.contains("checkOut")) {
    _state__WEBPACK_IMPORTED_MODULE_0__["default"].products.forEach(function (product) {
      product.count = 0;
    });
    (0,_render__WEBPACK_IMPORTED_MODULE_1__["default"])();
    return;
  }
});
(0,_render__WEBPACK_IMPORTED_MODULE_1__["default"])();
})();

/******/ })()
;
//# sourceMappingURL=cart.js.map