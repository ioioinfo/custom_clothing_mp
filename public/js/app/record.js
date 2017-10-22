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
/******/ 	return __webpack_require__(__webpack_require__.s = 56);
/******/ })
/************************************************************************/
/******/ ({

/***/ 1:
/***/ (function(module, exports) {

module.exports = React;

/***/ }),

/***/ 2:
/***/ (function(module, exports) {

module.exports = ReactDOM;

/***/ }),

/***/ 56:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = __webpack_require__(1);
var ReactDOM = __webpack_require__(2);

// 框架

var Wrap = function (_React$Component) {
    _inherits(Wrap, _React$Component);

    function Wrap(props) {
        _classCallCheck(this, Wrap);

        var _this = _possibleConstructorReturn(this, (Wrap.__proto__ || Object.getPrototypeOf(Wrap)).call(this, props));

        _this.state = { items: [] };
        return _this;
    }

    _createClass(Wrap, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            $.ajax({
                url: "/list_vip_amount_history",
                dataType: 'json',
                type: 'GET',
                success: function (data) {

                    this.setState({ items: data.rows });
                }.bind(this),
                error: function (xhr, status, err) {}.bind(this)
            });
        }
    }, {
        key: 'render',
        value: function render() {

            return React.createElement(
                'div',
                { className: 'record' },
                React.createElement(
                    'div',
                    { className: 'record_list' },
                    this.state.items.map(function (item, index) {
                        return React.createElement(List, { item: item, index: index });
                    })
                )
            );
        }
    }]);

    return Wrap;
}(React.Component);

var List = function (_React$Component2) {
    _inherits(List, _React$Component2);

    function List() {
        _classCallCheck(this, List);

        return _possibleConstructorReturn(this, (List.__proto__ || Object.getPrototypeOf(List)).apply(this, arguments));
    }

    _createClass(List, [{
        key: 'render',
        value: function render() {
            var pay_amount = this.props.item.pay_amount;
            var way = '消费';
            var style = { color: 'green', fontSize: '22px' };
            if (pay_amount > 0) {
                pay_amount = "+ " + this.props.item.pay_amount;
                way = '充值';
                style = { color: 'red', fontSize: '22px' };
            }
            return React.createElement(
                'div',
                { className: 'weui-cells', key: this.props.index },
                React.createElement(
                    'div',
                    { className: 'weui-cell' },
                    React.createElement(
                        'div',
                        { className: 'weui-cell__hd', style: style },
                        '*'
                    ),
                    React.createElement(
                        'div',
                        { className: 'weui-cell__bd record_name' },
                        React.createElement(
                            'p',
                            null,
                            way
                        ),
                        React.createElement(
                            'p',
                            { className: 'record_time' },
                            this.props.item.created_at_text
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'weui-cell__ft' },
                        pay_amount,
                        '\u5143'
                    )
                )
            );
        }
    }]);

    return List;
}(React.Component);
// 返回到页面


ReactDOM.render(React.createElement(Wrap, null), document.getElementById("content"));

/***/ })

/******/ });