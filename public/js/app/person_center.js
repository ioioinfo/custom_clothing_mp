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
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = React;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = ReactDOM;

/***/ }),
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */
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

        var _this = _possibleConstructorReturn(this, (IoIo.__proto__ || Object.getPrototypeOf(IoIo)).call(this, props));

        _this.state = { person_wx: {}, person: {} };
        return _this;
    }

    _createClass(IoIo, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            $.ajax({
                url: "/member_info",
                dataType: 'json',
                type: 'GET',
                success: function (data) {
                    if (data.success) {
                        this.setState({ person_wx: data.person_wx, person: data.person });
                    } else {}
                }.bind(this),
                error: function (xhr, status, err) {}.bind(this)
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var img = "images/head.jpeg";
            if (this.state.person_wx) {
                img = this.state.person_wx.headimgurl;
            }
            return React.createElement(
                'div',
                { className: 'person_center' },
                React.createElement(
                    'div',
                    { className: 'person_center_head' },
                    React.createElement(
                        'span',
                        { className: 'person_center_head_img' },
                        React.createElement('img', { src: img })
                    ),
                    React.createElement(
                        'p',
                        { className: 'person_center_head_name' },
                        this.state.person_wx.nickname
                    ),
                    React.createElement(
                        'span',
                        { className: 'person_infor' },
                        React.createElement(
                            'a',
                            { href: 'my_profile' },
                            '\u6211\u7684\u8D44\u6599'
                        )
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'person_center_number' },
                    React.createElement(
                        'a',
                        { href: 'record' },
                        React.createElement(
                            'div',
                            { className: 'person_center_number_left pull-left' },
                            React.createElement(
                                'p',
                                { className: 'person_center_number_infor' },
                                this.state.person.amount,
                                React.createElement(
                                    'span',
                                    null,
                                    '\u5143'
                                )
                            ),
                            React.createElement(
                                'p',
                                null,
                                '\u4F59\u989D'
                            )
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'person_center_number_right pull-right' },
                        React.createElement(
                            'p',
                            { className: 'person_center_number_infor' },
                            '0',
                            React.createElement(
                                'span',
                                null,
                                '\u4EF6'
                            )
                        ),
                        React.createElement(
                            'p',
                            null,
                            '\u5DF2\u8D2D'
                        )
                    )
                ),
                React.createElement(PersonCenterMiddle, null)
            );
        }
    }]);

    return IoIo;
}(React.Component);

;

var PersonCenterMiddle = function (_React$Component2) {
    _inherits(PersonCenterMiddle, _React$Component2);

    function PersonCenterMiddle(props) {
        _classCallCheck(this, PersonCenterMiddle);

        return _possibleConstructorReturn(this, (PersonCenterMiddle.__proto__ || Object.getPrototypeOf(PersonCenterMiddle)).call(this, props));
        // 初始化一个空对象
    }

    _createClass(PersonCenterMiddle, [{
        key: 'componentDidMount',
        value: function componentDidMount() {}
    }, {
        key: 'render',
        value: function render() {
            var style = { color: '#fff', marginRight: '5px', display: 'block' };
            return React.createElement(
                'div',
                { className: 'weui-cells' },
                React.createElement(
                    'a',
                    { className: 'weui-cell weui-cell_access', href: 'order_list' },
                    React.createElement(
                        'div',
                        { className: 'weui-cell__hd icon_wrap_style' },
                        React.createElement(
                            'span',
                            { style: style, className: 'icon_style1' },
                            React.createElement('i', { className: 'fa fa-align-justify' })
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'weui-cell__bd' },
                        React.createElement(
                            'p',
                            null,
                            '\u6211\u7684\u8BA2\u5355'
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'weui-cell__ft' },
                        '1'
                    )
                ),
                React.createElement(
                    'a',
                    { className: 'weui-cell weui-cell_access', href: 'company' },
                    React.createElement(
                        'div',
                        { className: 'weui-cell__hd icon_wrap_style' },
                        React.createElement(
                            'span',
                            { style: style, className: 'icon_style2' },
                            React.createElement('i', { className: 'fa fa-file-pdf-o' })
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'weui-cell__bd' },
                        React.createElement(
                            'p',
                            null,
                            '\u516C\u53F8\u7B80\u4ECB'
                        )
                    ),
                    React.createElement('div', { className: 'weui-cell__ft' })
                ),
                React.createElement(
                    'a',
                    { className: 'weui-cell weui-cell_access', href: 'mendian_list' },
                    React.createElement(
                        'div',
                        { className: 'weui-cell__hd icon_wrap_style' },
                        React.createElement(
                            'span',
                            { style: style, className: 'icon_style3' },
                            React.createElement('i', { className: 'fa fa-building-o' })
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'weui-cell__bd' },
                        React.createElement(
                            'p',
                            null,
                            '\u95E8\u5E97\u5217\u8868'
                        )
                    ),
                    React.createElement('div', { className: 'weui-cell__ft' })
                ),
                React.createElement(
                    'a',
                    { className: 'weui-cell weui-cell_access', href: 'clothing_chongzhi' },
                    React.createElement(
                        'div',
                        { className: 'weui-cell__hd icon_wrap_style' },
                        React.createElement(
                            'span',
                            { style: style, className: 'icon_style4' },
                            React.createElement('i', { className: 'fa fa-credit-card-alt' })
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'weui-cell__bd' },
                        React.createElement(
                            'p',
                            null,
                            '\u4F1A\u5458\u5145\u503C'
                        )
                    ),
                    React.createElement('div', { className: 'weui-cell__ft' })
                )
            );
        }
    }]);

    return PersonCenterMiddle;
}(React.Component);

;

ReactDOM.render(React.createElement(IoIo, null), document.getElementById("loding"));

/***/ })
/******/ ]);