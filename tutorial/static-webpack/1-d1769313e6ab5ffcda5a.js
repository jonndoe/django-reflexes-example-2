(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[1],{

/***/ "./blog/javascript/all_reflexes.js":
/*!*****************************************!*\
  !*** ./blog/javascript/all_reflexes.js ***!
  \*****************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var stimulus__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! stimulus */ \"./node_modules/stimulus/index.js\");\n/* harmony import */ var stimulus_reflex__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! stimulus_reflex */ \"./node_modules/stimulus_reflex/javascript/stimulus_reflex.js\");\n/* harmony import */ var sockpuppet_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! sockpuppet-js */ \"./node_modules/sockpuppet-js/javascript/stimulus-websocket/index.js\");\n/* harmony import */ var cable_ready__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! cable_ready */ \"./node_modules/cable_ready/javascript/cable_ready.js\");\n/* harmony import */ var debounced__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! debounced */ \"./node_modules/debounced/src/index.js\");\n/* harmony import */ var _controllers_examplereflex_with_js_controller__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./controllers/examplereflex_with_js_controller */ \"./blog/javascript/controllers/examplereflex_with_js_controller.js\");\n/* harmony import */ var _controllers_chat_controller__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./controllers/chat_controller */ \"./blog/javascript/controllers/chat_controller.js\");\n/* harmony import */ var _controllers_signup_controller__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./controllers/signup_controller */ \"./blog/javascript/controllers/signup_controller.js\");\n/* harmony import */ var _controllers_blog_search_controller__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./controllers/blog_search_controller */ \"./blog/javascript/controllers/blog_search_controller.js\");\n/* harmony import */ var _controllers_post_comment_controller__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./controllers/post_comment_controller */ \"./blog/javascript/controllers/post_comment_controller.js\");\n\n\n\n\n\n\n\n\n\n\n\n\n\ndebounced__WEBPACK_IMPORTED_MODULE_4__[\"default\"].initialize()\n\nconst application = stimulus__WEBPACK_IMPORTED_MODULE_0__[\"Application\"].start()\nconst ssl = location.protocol !== 'https:' ? '' : 's';\nconst consumer = new sockpuppet_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"](`ws${ssl}://${location.hostname}:${location.port}/ws/sockpuppet-sync`)\n\n\napplication.register(\"examplereflex_with_js\", _controllers_examplereflex_with_js_controller__WEBPACK_IMPORTED_MODULE_5__[\"default\"])\napplication.register(\"chat\", _controllers_chat_controller__WEBPACK_IMPORTED_MODULE_6__[\"default\"])\napplication.register(\"signup\", _controllers_signup_controller__WEBPACK_IMPORTED_MODULE_7__[\"default\"])\napplication.register(\"blog_search\", _controllers_blog_search_controller__WEBPACK_IMPORTED_MODULE_8__[\"default\"])\napplication.register(\"post_comment\", _controllers_post_comment_controller__WEBPACK_IMPORTED_MODULE_9__[\"default\"])\n\nstimulus_reflex__WEBPACK_IMPORTED_MODULE_1__[\"default\"].initialize(application, { consumer, debug: true })\n\n\n//# sourceURL=webpack:///./blog/javascript/all_reflexes.js?");

/***/ }),

/***/ "./blog/javascript/controllers/application_controller.js":
/*!***************************************************************!*\
  !*** ./blog/javascript/controllers/application_controller.js ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var turbolinks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! turbolinks */ \"./node_modules/turbolinks/dist/turbolinks.js\");\n/* harmony import */ var turbolinks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(turbolinks__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var stimulus__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! stimulus */ \"./node_modules/stimulus/index.js\");\n/* harmony import */ var stimulus_reflex__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! stimulus_reflex */ \"./node_modules/stimulus_reflex/javascript/stimulus_reflex.js\");\n\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (class extends stimulus__WEBPACK_IMPORTED_MODULE_1__[\"Controller\"] {\n  connect () {\n    stimulus_reflex__WEBPACK_IMPORTED_MODULE_2__[\"default\"].register(this)\n  }\n\n  beforeReflex (element, reflex) {\n    console.log(\"beforeReflex\")\n    document\n      .querySelectorAll('[data-activity-indicator]')\n      .forEach(el => (el.hidden = false))\n  }\n\n  reflexError (element, reflex, error) {\n    alert(`Error invoking a Reflex! ${error}`)\n  }\n\n  reload () {\n    turbolinks__WEBPACK_IMPORTED_MODULE_0___default.a.visit(location.href)\n  }\n});\n\n//# sourceURL=webpack:///./blog/javascript/controllers/application_controller.js?");

/***/ }),

/***/ "./blog/javascript/controllers/blog_search_controller.js":
/*!***************************************************************!*\
  !*** ./blog/javascript/controllers/blog_search_controller.js ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _application_controller__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./application_controller */ \"./blog/javascript/controllers/application_controller.js\");\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (class extends _application_controller__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n\n//  static targets = \n    static get targets () {\n     return ['query', 'activity', 'count', 'list']\n    }\n\n  beforePerform (element, reflex) {\n      console.log(\"beforePerform\")\n    this.activityTarget.hidden = false\n    this.countTarget.hidden = true\n  }\n\n  perform (event) {\n    console.log(\"perfom\")\n    event.preventDefault()\n    this.stimulate('BlogSearchReflex#perform', this.queryTarget.value)\n  }\n});\n\n\n//# sourceURL=webpack:///./blog/javascript/controllers/blog_search_controller.js?");

/***/ }),

/***/ "./blog/javascript/controllers/chat_controller.js":
/*!********************************************************!*\
  !*** ./blog/javascript/controllers/chat_controller.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _rails_ujs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @rails/ujs */ \"./node_modules/@rails/ujs/lib/assets/compiled/rails-ujs.js\");\n/* harmony import */ var _rails_ujs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_rails_ujs__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var lodash_es__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash-es */ \"./node_modules/lodash-es/lodash.js\");\n/* harmony import */ var _application_controller__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./application_controller */ \"./blog/javascript/controllers/application_controller.js\");\n\n\n\n\nlet lastMessageId\nconst reload = controller => {\n  controller.stimulate('ChatReflex#reload')\n}\nconst debouncedReload = Object(lodash_es__WEBPACK_IMPORTED_MODULE_1__[\"debounce\"])(reload, 100)\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (class extends _application_controller__WEBPACK_IMPORTED_MODULE_2__[\"default\"] {\n  static get targets () {\n     return ['list', 'input']\n  }\n\n  connect () {\n    super.connect()\n    this.scroll(100)\n  }\n\n  post (event) {\n    console.log(\"post\");\n    _rails_ujs__WEBPACK_IMPORTED_MODULE_0___default.a.stopEverything(event)\n    lastMessageId = Math.random()\n    this.stimulate(\n      'ChatReflex#post',\n      this.element.dataset.color,\n      this.inputTarget.value,\n      lastMessageId\n    )\n  }\n\n  afterPost () {\n    this.inputTarget.value = ''\n    this.inputTarget.focus()\n    this.scroll(1)\n  }\n\n  scroll (delay = 10) {\n    const lists = document.querySelectorAll('[data-target=\"chat.list\"]')\n    setTimeout(() => {\n      lists.forEach(e => (e.scrollTop = e.scrollHeight))\n    }, delay)\n  }\n\n  reload (event) {\n    if (!event.detail) return\n    const { messageId } = event.detail\n    if (messageId === lastMessageId) return\n    debouncedReload(this)\n  }\n});\n\n//# sourceURL=webpack:///./blog/javascript/controllers/chat_controller.js?");

/***/ }),

/***/ "./blog/javascript/controllers/examplereflex_with_js_controller.js":
/*!*************************************************************************!*\
  !*** ./blog/javascript/controllers/examplereflex_with_js_controller.js ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var stimulus__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! stimulus */ \"./node_modules/stimulus/index.js\");\n/* harmony import */ var stimulus_reflex__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! stimulus_reflex */ \"./node_modules/stimulus_reflex/javascript/stimulus_reflex.js\");\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (class extends stimulus__WEBPACK_IMPORTED_MODULE_0__[\"Controller\"] {\n  connect() {\n    stimulus_reflex__WEBPACK_IMPORTED_MODULE_1__[\"default\"].register(this)\n  }\n\n  increment(event) {\n    console.log('increment')\n    event.preventDefault()\n    this.stimulate('examplereflex_with_jsReflex#increment', 1)\n  }\n});\n\n\n//# sourceURL=webpack:///./blog/javascript/controllers/examplereflex_with_js_controller.js?");

/***/ }),

/***/ "./blog/javascript/controllers/post_comment_controller.js":
/*!****************************************************************!*\
  !*** ./blog/javascript/controllers/post_comment_controller.js ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var stimulus__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! stimulus */ \"./node_modules/stimulus/index.js\");\n/* harmony import */ var stimulus_reflex__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! stimulus_reflex */ \"./node_modules/stimulus_reflex/javascript/stimulus_reflex.js\");\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (class extends stimulus__WEBPACK_IMPORTED_MODULE_0__[\"Controller\"] {\n  connect() {\n    stimulus_reflex__WEBPACK_IMPORTED_MODULE_1__[\"default\"].register(this)\n  }\n\n  increment(event) {\n    console.log('increment')\n    event.preventDefault()\n    this.stimulate('post_commentReflex#increment', 1)\n  }\n\n  post(event) {\n    console.log('comment posted')\n    event.preventDefault()\n    this.stimulate('post_commentReflex#post', 'default comment')\n  }\n\n});\n\n\n//# sourceURL=webpack:///./blog/javascript/controllers/post_comment_controller.js?");

/***/ }),

/***/ "./blog/javascript/controllers/signup_controller.js":
/*!**********************************************************!*\
  !*** ./blog/javascript/controllers/signup_controller.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var stimulus__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! stimulus */ \"./node_modules/stimulus/index.js\");\n/* harmony import */ var stimulus_reflex__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! stimulus_reflex */ \"./node_modules/stimulus_reflex/javascript/stimulus_reflex.js\");\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (class extends stimulus__WEBPACK_IMPORTED_MODULE_0__[\"Controller\"] {\n  connect() {\n    stimulus_reflex__WEBPACK_IMPORTED_MODULE_1__[\"default\"].register(this)\n  }\n\n  increment(event) {\n    console.log('increment')\n    event.preventDefault()\n    this.stimulate('signupReflex#increment', 1)\n  }\n});\n\n\n//# sourceURL=webpack:///./blog/javascript/controllers/signup_controller.js?");

/***/ })

}]);