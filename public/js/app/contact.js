/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 16);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports) {

module.exports = React;

/***/ }),

/***/ 1:
/***/ (function(module, exports) {

module.exports = ReactDOM;

/***/ }),

/***/ 16:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = __webpack_require__(0);
var ReactDOM = __webpack_require__(1);

var Warp = function (_React$Component) {
    _inherits(Warp, _React$Component);

    function Warp() {
        _classCallCheck(this, Warp);

        return _possibleConstructorReturn(this, (Warp.__proto__ || Object.getPrototypeOf(Warp)).apply(this, arguments));
    }

    _createClass(Warp, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                { className: 'wrap' },
                React.createElement(
                    'div',
                    { className: 'wrap_title' },
                    '\u8054\u7CFB\u6211\u4EEC'
                ),
                React.createElement(Infor, null)
            );
        }
    }]);

    return Warp;
}(React.Component);

;

var Infor = function (_React$Component2) {
    _inherits(Infor, _React$Component2);

    function Infor() {
        _classCallCheck(this, Infor);

        return _possibleConstructorReturn(this, (Infor.__proto__ || Object.getPrototypeOf(Infor)).apply(this, arguments));
    }

    _createClass(Infor, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                { className: 'order_detail_pay_wrap' },
                React.createElement(
                    'div',
                    { className: 'order_detail_pay_infor' },
                    React.createElement(
                        'div',
                        null,
                        '\u516C\u53F8\u5730\u5740'
                    ),
                    React.createElement(
                        'div',
                        null,
                        '\u4E0A\u6D77\u5B9D\u5C71\u533A\u547C\u5170\u8DEF911\u5F0411\u53F7\u535A\u6D4E\u667A\u6C47\u56ED101a'
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'order_detail_pay_infor' },
                    React.createElement(
                        'div',
                        null,
                        '\u5BA2\u670D\u7535\u8BDD'
                    ),
                    React.createElement(
                        'div',
                        null,
                        '021-51095181'
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'order_detail_pay_infor' },
                    React.createElement(
                        'div',
                        null,
                        '\u90AE\u7BB1'
                    ),
                    React.createElement(
                        'div',
                        null,
                        'haiminluo@ioioinfo.com'
                    )
                )
            );
        }
    }]);

    return Infor;
}(React.Component);

;
ReactDOM.render(React.createElement(Warp, null), document.getElementById("contact"));

/***/ })

/******/ });