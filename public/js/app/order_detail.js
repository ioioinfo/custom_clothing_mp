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
/******/ 	return __webpack_require__(__webpack_require__.s = 13);
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

/***/ 13:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = __webpack_require__(0);
var ReactDOM = __webpack_require__(1);

var IoIo = function (_React$Component) {
    _inherits(IoIo, _React$Component);

    function IoIo(props) {
        _classCallCheck(this, IoIo);

        return _possibleConstructorReturn(this, (IoIo.__proto__ || Object.getPrototypeOf(IoIo)).call(this, props));
    }

    _createClass(IoIo, [{
        key: 'componentDidMount',
        value: function componentDidMount() {}
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                { className: 'order_detail_wrap' },
                React.createElement(
                    'div',
                    { className: 'order_detail_title' },
                    '\u8BA2\u5355\u8BE6\u60C5'
                ),
                React.createElement(OrderDetailAddress, null),
                React.createElement(OrderDetail, null),
                React.createElement(OrderDetail, null),
                React.createElement(
                    'div',
                    { className: 'call_me_wrap' },
                    React.createElement('i', { className: 'fa fa-phone call_me' }),
                    '\u8054\u7CFB\u6211\u4EEC'
                ),
                React.createElement(PayDetail, null)
            );
        }
    }]);

    return IoIo;
}(React.Component);

;
//物流状态

var OrderDetailAddress = function (_React$Component2) {
    _inherits(OrderDetailAddress, _React$Component2);

    function OrderDetailAddress() {
        _classCallCheck(this, OrderDetailAddress);

        return _possibleConstructorReturn(this, (OrderDetailAddress.__proto__ || Object.getPrototypeOf(OrderDetailAddress)).apply(this, arguments));
    }

    _createClass(OrderDetailAddress, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                { className: 'order_detail_address_wrap' },
                React.createElement(
                    'div',
                    { className: 'address_icon_wrap' },
                    React.createElement('i', { className: 'fa fa-clock-o address_icon' })
                ),
                React.createElement(
                    'span',
                    { className: 'address_word' },
                    '\u7269\u6D41\u914D\u9001\u4E2D'
                )
            );
        }
    }]);

    return OrderDetailAddress;
}(React.Component);

;

//物流状态

var PayDetail = function (_React$Component3) {
    _inherits(PayDetail, _React$Component3);

    function PayDetail() {
        _classCallCheck(this, PayDetail);

        return _possibleConstructorReturn(this, (PayDetail.__proto__ || Object.getPrototypeOf(PayDetail)).apply(this, arguments));
    }

    _createClass(PayDetail, [{
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
                        '\u652F\u4ED8\u65B9\u5F0F'
                    ),
                    React.createElement(
                        'div',
                        null,
                        '\u652F\u4ED8\u5B9D'
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'order_detail_pay_infor' },
                    React.createElement(
                        'div',
                        null,
                        '\u5546\u54C1\u4EF7\u683C'
                    ),
                    React.createElement(
                        'div',
                        null,
                        '\xA5 100.00'
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'order_detail_pay_infor' },
                    React.createElement(
                        'div',
                        null,
                        '\u5176\u4ED6\u8D39\u7528'
                    ),
                    React.createElement(
                        'div',
                        null,
                        '\xA5 0.00'
                    )
                )
            );
        }
    }]);

    return PayDetail;
}(React.Component);

;

// 订单x信息

var OrderDetail = function (_React$Component4) {
    _inherits(OrderDetail, _React$Component4);

    function OrderDetail() {
        _classCallCheck(this, OrderDetail);

        return _possibleConstructorReturn(this, (OrderDetail.__proto__ || Object.getPrototypeOf(OrderDetail)).apply(this, arguments));
    }

    _createClass(OrderDetail, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                { className: 'product-infor', 'data-id': '00137208_C25' },
                React.createElement(
                    'div',
                    { className: 'all' },
                    React.createElement(
                        'div',
                        { className: 'product-infor-left' },
                        React.createElement('img', { src: 'http://image.buy42.com/00137208C.jpg', alt: '' })
                    ),
                    React.createElement(
                        'div',
                        { className: 'product-infor-middle' },
                        React.createElement(
                            'p',
                            { className: 'p1' },
                            'HUGO BOSS\u7EA2\u5916\u7EBF\u5065\u5EB7\u529F\u80FD\u88AB \u63D0\u9AD8\u7761\u7720\u8D28\u91CF \u5BB6\u5C45\u65E5\u7528'
                        ),
                        React.createElement(
                            'p',
                            { className: 'p2' },
                            '\uFFE5 660'
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'product-infor-right' },
                        React.createElement(
                            'p',
                            null,
                            'x1'
                        )
                    )
                )
            );
        }
    }]);

    return OrderDetail;
}(React.Component);

;

ReactDOM.render(React.createElement(IoIo, null), document.getElementById("order_detail"));

/***/ })

/******/ });