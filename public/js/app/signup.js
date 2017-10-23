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
/******/ 	return __webpack_require__(__webpack_require__.s = 57);
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

/***/ 57:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = __webpack_require__(1);
var ReactDOM = __webpack_require__(2);
var time;
function time(num) {
    var t = setInterval(function () {
        num--;
        $(".timenum").html(Math.ceil(num));
        if (num <= 0) {
            clearInterval(t);
            $(".timenum").html('获取验证码');
        }
    }, 1000);
}

var IoIo = function (_React$Component) {
    _inherits(IoIo, _React$Component);

    function IoIo(props) {
        _classCallCheck(this, IoIo);

        var _this = _possibleConstructorReturn(this, (IoIo.__proto__ || Object.getPrototypeOf(IoIo)).call(this, props));

        _this.handleClick = _this.handleClick.bind(_this);
        _this.handleClick1 = _this.handleClick1.bind(_this);
        _this.handleClick2 = _this.handleClick2.bind(_this);
        _this.handleClick3 = _this.handleClick3.bind(_this);
        // 初始化一个空对象
        _this.state = {};
        return _this;
    }

    _createClass(IoIo, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            $('#phone').focus();
            $("[name='checkbox']").prop("checked", true);
            var windowHeight = $(window).height();
            var signupTopHeight = $('.signup_top').height();
            var marginHeight = windowHeight - signupTopHeight - 46;
            $('.signup_button').css('margin-top', marginHeight);
        }
    }, {
        key: 'handleClick',
        value: function handleClick(e) {
            var phone = $('#phone').val();
            var isPhone = /^1(3|4|5|7|8)\d{9}$/;
            if (!isPhone.test(phone)) {
                alert('请输入正确的手机号');
                return;
            }
            $.ajax({
                url: "/get_vertify",
                dataType: 'json',
                type: 'POST',
                data: { "phone": phone },
                success: function (data) {
                    if (data.success) {
                        time(60);
                    } else {}
                }.bind(this),
                error: function (xhr, status, err) {}.bind(this)
            });
        }
    }, {
        key: 'handleClick1',
        value: function handleClick1(e) {
            $('.tiaokuan').show();
        }
    }, {
        key: 'handleClick2',
        value: function handleClick2(e) {
            $('.tiaokuan').hide();
        }
    }, {
        key: 'handleClick3',
        value: function handleClick3(e) {
            var mobile = $('#phone').val();
            var password = $('#password').val();
            var verify = $('#verify').val();
            if (!mobile) {
                alert('请输入正确的验证码');
                return;
            }
            if (!password) {
                alert('请输入密码');
                return;
            }
            $.ajax({
                url: "/do_register",
                dataType: 'json',
                type: 'POST',
                data: { "verify": verify, "mobile": mobile, "password": password },
                success: function (data) {
                    if (data.success) {
                        location.href = "login";
                    } else {
                        var message = "user already exists";
                        alert('用户已存在');
                    }
                }.bind(this),
                error: function (xhr, status, err) {}.bind(this)
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                { className: 'signup_wrap' },
                React.createElement(
                    'div',
                    { className: 'signup_top' },
                    React.createElement(
                        'div',
                        { className: 'page__hd signup_title_style' },
                        React.createElement(
                            'h1',
                            { className: 'page__title', id: 'animation' },
                            '\u6B22\u8FCE\u6765\u5230\u79C1\u4EBA\u8BA2\u5236'
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'weui-cells' },
                        React.createElement(
                            'div',
                            { className: 'weui-cell weui-cell_access' },
                            React.createElement(
                                'div',
                                { className: 'weui-cell__bd' },
                                React.createElement(
                                    'p',
                                    { className: 'signup_word_style' },
                                    '\u6CE8\u518C'
                                )
                            ),
                            React.createElement(
                                'a',
                                { className: 'weui-cell__ft account_style', href: 'login' },
                                '\u6709\u5E10\u53F7\uFF1F\u53BB\u767B\u5F55'
                            )
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'weui-cells weui-cells_form' },
                        React.createElement(
                            'div',
                            { className: 'weui-cell weui-cell_vcode' },
                            React.createElement(
                                'div',
                                { className: 'weui-cell__hd' },
                                React.createElement(
                                    'label',
                                    { className: 'weui-label' },
                                    '\u624B\u673A\u53F7'
                                )
                            ),
                            React.createElement(
                                'div',
                                { className: 'weui-cell__bd' },
                                React.createElement('input', { className: 'weui-input', type: 'tel', placeholder: '\u8BF7\u8F93\u5165\u624B\u673A\u53F7', id: 'phone' })
                            ),
                            React.createElement(
                                'div',
                                { className: 'weui-cell__ft' },
                                React.createElement(
                                    'button',
                                    { className: 'weui-vcode-btn  timenum', onClick: this.handleClick },
                                    '\u83B7\u53D6\u9A8C\u8BC1\u7801'
                                )
                            )
                        ),
                        React.createElement(
                            'div',
                            { className: 'weui-cell yanzhengma' },
                            React.createElement(
                                'div',
                                { className: 'weui-cell__hd' },
                                React.createElement(
                                    'label',
                                    { className: 'weui-label' },
                                    '\u9A8C\u8BC1\u7801'
                                )
                            ),
                            React.createElement(
                                'div',
                                { className: 'weui-cell__bd' },
                                React.createElement('input', { className: 'weui-input', type: 'number', pattern: '[0-9]*', placeholder: '\u8BF7\u8F93\u5165\u9A8C\u8BC1\u7801', id: 'verify' })
                            )
                        ),
                        React.createElement(
                            'div',
                            { className: 'weui-cell' },
                            React.createElement(
                                'div',
                                { className: 'weui-cell__hd' },
                                React.createElement(
                                    'label',
                                    { className: 'weui-label' },
                                    '\u5BC6\u7801'
                                )
                            ),
                            React.createElement(
                                'div',
                                { className: 'weui-cell__bd' },
                                React.createElement('input', { className: 'weui-input', placeholder: '\u8BF7\u8F93\u5165\u5BC6\u7801', id: 'password' })
                            )
                        )
                    ),
                    React.createElement(
                        'label',
                        { className: 'weui-agree agree_style' },
                        React.createElement('input', { id: 'weuiAgree', type: 'checkbox', name: 'checkbox', className: 'weui-agree__checkbox' }),
                        React.createElement(
                            'span',
                            { className: 'weui-agree__text' },
                            '\u9009\u62E9\u6CE8\u518C\u4EE3\u8868\u60A8\u5DF2\u7ECF\u540C\u610F',
                            React.createElement(
                                'a',
                                { onClick: this.handleClick1 },
                                '\u300A\u76F8\u5173\u6761\u6B3E\u300B'
                            )
                        )
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'signup_button' },
                    React.createElement(
                        'a',
                        { className: 'weui-btn weui-btn_primary', href: 'javascript:', id: 'showTooltips', onClick: this.handleClick3 },
                        '\u6CE8\u518C'
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'tiaokuan' },
                    React.createElement(
                        'span',
                        { className: 'close', onClick: this.handleClick2 },
                        '\u5173\u95ED'
                    ),
                    React.createElement(
                        'h3',
                        { className: 'tiaokuan_title' },
                        '\u6761\u6B3E'
                    ),
                    React.createElement(
                        'div',
                        { className: 'tiaokuan_infor' },
                        '\u5C0A\u656C\u7684\u5BA2\u6237\uFF0C\u6B22\u8FCE\u60A8\u6CE8\u518C\u6210\u4E3A\u672C\u7F51\u7AD9\u7528\u6237\u3002\u5728\u6CE8\u518C\u524D\u8BF7\u60A8\u4ED4\u7EC6\u9605\u8BFB\u5982\u4E0B\u670D\u52A1\u6761\u6B3E\uFF1A',
                        React.createElement('br', null),
                        '\xA0\xA0\xA0\u672C\u670D\u52A1\u534F\u8BAE\u53CC\u65B9\u4E3A\u672C\u7F51\u7AD9\u4E0E\u672C\u7F51\u7AD9\u5BA2\u6237\uFF0C\u672C\u670D\u52A1\u534F\u8BAE\u5177\u6709\u5408\u540C\u6548\u529B\u3002\u60A8\u786E\u8BA4\u672C\u670D\u52A1\u534F\u8BAE\u540E\uFF0C\u672C\u670D\u52A1\u534F\u8BAE\u5373\u5728\u60A8\u548C\u672C\u7F51\u7AD9\u4E4B\u95F4\u4EA7\u751F\u6CD5\u5F8B\u6548\u529B\u3002\u8BF7\u60A8\u52A1\u5FC5\u5728\u6CE8\u518C\u4E4B \u524D\u8BA4\u771F\u9605\u8BFB\u5168\u90E8\u670D\u52A1\u534F\u8BAE\u5185\u5BB9\uFF0C \u5982\u6709\u4EFB\u4F55\u7591\u95EE\uFF0C\u53EF\u5411\u672C\u7F51\u7AD9\u54A8\u8BE2\u3002 \u65E0\u8BBA\u60A8\u4E8B\u5B9E\u4E0A\u662F\u5426\u5728\u6CE8\u518C\u4E4B\u524D\u8BA4\u771F\u9605\u8BFB\u4E86\u672C\u670D\u52A1\u534F\u8BAE\uFF0C\u53EA\u8981\u60A8\u70B9\u51FB\u534F\u8BAE\u6B63\u672C\u4E0B\u65B9\u7684"\u6CE8\u518C"\u6309\u94AE\u5E76\u6309\u7167\u672C\u7F51\u7AD9\u6CE8\u518C\u7A0B\u5E8F\u6210\u529F\u6CE8\u518C\u4E3A\u7528\u6237\uFF0C\u60A8\u7684\u884C\u4E3A\u4ECD\u7136\u8868\u793A \u60A8\u540C\u610F\u5E76\u7B7E\u7F72\u4E86\u672C\u670D\u52A1\u534F\u8BAE\u3002 \u534F\u8BAE\u7EC6\u5219',
                        React.createElement('br', null),
                        '1\u3001\u672C\u7F51\u7AD9\u670D\u52A1\u6761\u6B3E\u7684\u786E\u8BA4\u548C\u63A5\u7EB3',
                        React.createElement('br', null),
                        '\u672C\u7F51\u7AD9\u5404\u9879\u670D\u52A1\u7684\u6240\u6709\u6743\u548C\u8FD0\u4F5C\u6743\u5F52\u672C\u7F51\u7AD9\u62E5\u6709\u3002',
                        React.createElement('br', null),
                        '2\u3001\u7528\u6237\u5FC5\u987B\uFF1A',
                        React.createElement('br', null),
                        '(1)\u81EA\u884C\u914D\u5907\u4E0A\u7F51\u7684\u6240\u9700\u8BBE\u5907\uFF0C \u5305\u62EC\u4E2A\u4EBA\u7535\u8111\u3001\u8C03\u5236\u89E3\u8C03\u5668\u6216\u5176\u4ED6\u5FC5\u5907\u4E0A\u7F51\u88C5\u7F6E\u3002',
                        React.createElement('br', null),
                        '(2)\u81EA\u884C\u8D1F\u62C5\u4E2A\u4EBA\u4E0A\u7F51\u6240\u652F\u4ED8\u7684\u4E0E\u6B64\u670D\u52A1\u6709\u5173\u7684\u7535\u8BDD\u8D39\u7528\u3001 \u7F51\u7EDC\u8D39\u7528\u3002',
                        React.createElement('br', null),
                        '3\u3001\u7528\u6237\u5728\u672C\u7F51\u7AD9\u4EA4\u6613\u5E73\u53F0\u4E0A\u4E0D\u5F97\u53D1\u5E03\u4E0B\u5217\u8FDD\u6CD5\u4FE1\u606F\uFF1A',
                        React.createElement('br', null),
                        '(1)\u53CD\u5BF9\u5BAA\u6CD5\u6240\u786E\u5B9A\u7684\u57FA\u672C\u539F\u5219\u7684\uFF1B',
                        React.createElement('br', null),
                        '(2)\u5371\u5BB3\u56FD\u5BB6\u5B89\u5168\uFF0C\u6CC4\u9732\u56FD\u5BB6\u79D8\u5BC6\uFF0C\u98A0\u8986\u56FD\u5BB6\u653F\u6743\uFF0C\u7834\u574F\u56FD\u5BB6\u7EDF\u4E00\u7684\uFF1B',
                        React.createElement('br', null),
                        '(3)\u635F\u5BB3\u56FD\u5BB6\u8363\u8A89\u548C\u5229\u76CA\u7684\uFF1B',
                        React.createElement('br', null),
                        '(4)\u717D\u52A8\u6C11\u65CF\u4EC7\u6068\u3001\u6C11\u65CF\u6B67\u89C6\uFF0C\u7834\u574F\u6C11\u65CF\u56E2\u7ED3\u7684\uFF1B',
                        React.createElement('br', null),
                        '(5)\u7834\u574F\u56FD\u5BB6\u5B97\u6559\u653F\u7B56\uFF0C\u5BA3\u626C\u90AA\u6559\u548C\u5C01\u5EFA\u8FF7\u4FE1\u7684\uFF1B',
                        React.createElement('br', null),
                        '(6)\u6563\u5E03\u8C23\u8A00\uFF0C\u6270\u4E71\u793E\u4F1A\u79E9\u5E8F\uFF0C\u7834\u574F\u793E\u4F1A\u7A33\u5B9A\u7684\uFF1B',
                        React.createElement('br', null),
                        '(7)\u6563\u5E03\u6DEB\u79FD\u3001\u8272\u60C5\u3001\u8D4C\u535A\u3001\u66B4\u529B\u3001\u51F6\u6740\u3001\u6050\u6016\u6216\u8005\u6559\u5506\u72AF\u7F6A\u7684\uFF1B',
                        React.createElement('br', null),
                        '(8)\u4FAE\u8FB1\u6216\u8005\u8BFD\u8C24\u4ED6\u4EBA\uFF0C\u4FB5\u5BB3\u4ED6\u4EBA\u5408\u6CD5\u6743\u76CA\u7684\uFF1B',
                        React.createElement('br', null),
                        '(9)\u542B\u6709\u6CD5\u5F8B\u3001\u884C\u653F\u6CD5\u89C4\u7981\u6B62\u7684\u5176\u4ED6\u5185\u5BB9\u7684\u3002',
                        React.createElement('br', null),
                        '4\u3001\u6709\u5173\u4E2A\u4EBA\u8D44\u6599',
                        React.createElement('br', null),
                        '\u7528\u6237\u540C\u610F\uFF1A',
                        React.createElement('br', null),
                        '(1) \u63D0\u4F9B\u53CA\u65F6\u3001\u8BE6\u5C3D\u53CA\u51C6\u786E\u7684\u4E2A\u4EBA\u8D44\u6599\u3002',
                        React.createElement('br', null),
                        '(2).\u540C\u610F\u63A5\u6536\u6765\u81EA\u672C\u7F51\u7AD9\u7684\u4FE1\u606F\u3002',
                        React.createElement('br', null),
                        '(3) \u4E0D\u65AD\u66F4\u65B0\u6CE8\u518C\u8D44\u6599\uFF0C\u7B26\u5408\u53CA\u65F6\u3001\u8BE6\u5C3D\u51C6\u786E\u7684\u8981\u6C42\u3002\u6240\u6709\u539F\u59CB\u952E\u5165\u7684\u8D44\u6599\u5C06\u5F15\u7528\u4E3A\u6CE8\u518C\u8D44\u6599\u3002',
                        React.createElement('br', null),
                        '5\u3001\u7535\u5B50\u90AE\u4EF6',
                        React.createElement('br', null),
                        '\u7528\u6237\u5728\u6CE8\u518C\u65F6\u5E94\u5F53\u9009\u62E9\u7A33\u5B9A\u6027\u53CA\u5B89\u5168\u6027\u76F8\u5BF9\u8F83\u597D\u7684\u7535\u5B50\u90AE\u7BB1\uFF0C\u5E76\u4E14\u540C\u610F\u63A5\u53D7\u5E76\u9605\u8BFB\u672C\u7F51\u7AD9\u53D1\u5F80\u7528\u6237\u7684\u5404\u7C7B\u7535\u5B50\u90AE\u4EF6\u3002\u5982\u7528\u6237\u672A\u53CA\u65F6\u4ECE\u81EA\u5DF1\u7684\u7535\u5B50\u90AE\u7BB1\u63A5\u53D7\u7535\u5B50\u90AE\u4EF6\u6216\u56E0\u7528\u6237\u7535\u5B50\u90AE\u7BB1\u6216\u7528\u6237 \u7535\u5B50\u90AE\u4EF6\u63A5\u6536\u53CA\u9605\u8BFB\u7A0B\u5E8F\u672C\u8EAB\u7684\u95EE\u9898\u4F7F\u7535\u5B50\u90AE\u4EF6\u65E0\u6CD5\u6B63\u5E38\u63A5\u6536\u6216\u9605\u8BFB\u7684\uFF0C\u53EA\u8981\u672C\u7F51\u7AD9\u6210\u529F\u53D1\u9001\u4E86\u7535\u5B50\u90AE\u4EF6\uFF0C\u5E94\u5F53\u89C6\u4E3A\u7528\u6237\u5DF2\u7ECF\u63A5\u6536\u5230\u76F8\u5173\u7684\u7535\u5B50\u90AE\u4EF6\u3002\u7535\u5B50\u90AE\u4EF6\u5728\u53D1\u4FE1\u670D\u52A1\u5668\u4E0A\u6240\u8BB0\u5F55\u7684 \u53D1\u51FA\u65F6\u95F4\u89C6\u4E3A\u9001\u8FBE\u65F6\u95F4\u3002',
                        React.createElement('br', null),
                        '6\u3001\u670D\u52A1\u6761\u6B3E\u7684\u4FEE\u6539',
                        React.createElement('br', null),
                        '\u672C\u7F51\u7AD9\u6709\u6743\u5728\u5FC5\u8981\u65F6\u4FEE\u6539\u670D\u52A1\u6761\u6B3E\uFF0C\u672C\u7F51\u7AD9\u670D\u52A1\u6761\u6B3E\u4E00\u65E6\u53D1\u751F\u53D8\u52A8\uFF0C\u5C06\u4F1A\u5728\u91CD\u8981\u9875\u9762\u4E0A\u63D0\u793A\u4FEE\u6539\u5185\u5BB9\u3002\u5982\u679C\u4E0D\u540C\u610F\u6240\u6539\u52A8\u7684\u5185\u5BB9\uFF0C\u7528\u6237\u53EF\u4EE5\u4E3B\u52A8\u53D6\u6D88\u83B7\u5F97\u7684\u672C\u7F51\u7AD9\u4FE1\u606F\u670D\u52A1\u3002 \u5982\u679C\u7528\u6237\u7EE7\u7EED\u4EAB\u7528\u672C\u7F51\u7AD9\u4FE1\u606F\u670D\u52A1\uFF0C\u5219\u89C6\u4E3A\u63A5\u53D7\u670D\u52A1\u6761\u6B3E\u7684\u53D8\u52A8\u3002\u672C\u7F51\u7AD9\u4FDD\u7559\u968F\u65F6\u4FEE\u6539\u6216\u4E2D\u65AD\u670D\u52A1\u800C\u4E0D\u9700\u901A\u77E5\u7528\u6237\u7684\u6743\u5229\u3002\u672C\u7F51\u7AD9\u884C\u4F7F\u4FEE\u6539\u6216\u4E2D\u65AD\u670D\u52A1\u7684\u6743\u5229\uFF0C\u4E0D\u9700\u5BF9\u7528\u6237\u6216\u7B2C\u4E09\u65B9\u8D1F\u8D23\u3002',
                        React.createElement('br', null),
                        '7\u3001\u7528\u6237\u7684\u5E10\u53F7\u3001\u5BC6\u7801\u548C\u5B89\u5168\u6027',
                        React.createElement('br', null),
                        '\u4F60\u4E00\u65E6\u6CE8\u518C\u6210\u529F\u6210\u4E3A\u7528\u6237\uFF0C\u4F60\u5C06\u5F97\u5230\u4E00\u4E2A\u5BC6\u7801\u548C\u5E10\u53F7\u3002\u5982\u679C\u4F60\u4E0D\u4FDD\u7BA1\u597D\u81EA\u5DF1\u7684\u5E10\u53F7\u548C\u5BC6\u7801\u5B89\u5168\uFF0C\u5C06\u8D1F\u5168\u90E8\u8D23\u4EFB\u3002\u53E6\u5916\uFF0C\u6BCF\u4E2A\u7528\u6237\u90FD\u8981\u5BF9\u5176\u5E10\u6237\u4E2D\u7684\u6240\u6709\u6D3B\u52A8\u548C\u4E8B\u4EF6\u8D1F\u5168\u8D23\u3002\u4F60\u53EF\u968F\u65F6\u6839\u636E\u6307\u793A\u6539\u53D8\u4F60\u7684 \u5BC6\u7801\uFF0C\u4E5F\u53EF\u4EE5\u7ED3\u675F\u65E7\u7684\u5E10\u6237\u91CD\u5F00\u4E00\u4E2A\u65B0\u5E10\u6237\u3002\u7528\u6237\u540C\u610F\u82E5\u53D1\u73B0\u4EFB\u4F55\u975E\u6CD5\u4F7F\u7528\u7528\u6237\u5E10\u53F7\u6216\u5B89\u5168\u6F0F\u6D1E\u7684\u60C5\u51B5\uFF0C\u8BF7\u7ACB\u5373\u901A\u77E5\u672C\u7F51\u7AD9\u3002',
                        React.createElement('br', null),
                        '8\u3001\u62D2\u7EDD\u63D0\u4F9B\u62C5\u4FDD',
                        React.createElement('br', null),
                        '\u7528\u6237\u660E\u786E\u540C\u610F\u4FE1\u606F\u670D\u52A1\u7684\u4F7F\u7528\u7531\u7528\u6237\u4E2A\u4EBA\u627F\u62C5\u98CE\u9669\u3002\u672C\u7F51\u7AD9\u4E0D\u62C5\u4FDD\u670D\u52A1\u4E0D\u4F1A\u53D7\u4E2D\u65AD\uFF0C\u5BF9\u670D\u52A1\u7684\u53CA\u65F6\u6027\uFF0C\u5B89\u5168\u6027\uFF0C\u51FA\u9519\u53D1\u751F\u90FD\u4E0D\u4F5C\u62C5\u4FDD\uFF0C\u4F46\u4F1A\u5728\u80FD\u529B\u8303\u56F4\u5185\uFF0C\u907F\u514D\u51FA\u9519\u3002',
                        React.createElement('br', null),
                        '9\u3001\u6709\u9650\u8D23\u4EFB',
                        React.createElement('br', null),
                        '\u672C\u7F51\u7AD9\u5BF9\u4EFB\u4F55\u76F4\u63A5\u3001\u95F4\u63A5\u3001\u5076\u7136\u3001\u7279\u6B8A\u53CA\u7EE7\u8D77\u7684\u635F\u5BB3\u4E0D\u8D1F\u8D23\u4EFB\uFF0C\u8FD9\u4E9B\u635F\u5BB3\u6765\u81EA\uFF1A\u4E0D\u6B63\u5F53\u4F7F\u7528\u672C\u7F51\u7AD9\u670D\u52A1\uFF0C\u6216\u7528\u6237\u4F20\u9001\u7684\u4FE1\u606F\u4E0D\u7B26\u5408\u89C4\u5B9A\u7B49\u3002\u8FD9\u4E9B\u884C\u4E3A\u90FD\u6709\u53EF\u80FD\u5BFC\u81F4\u672C\u7F51\u7AD9\u5F62\u8C61\u53D7\u635F\uFF0C\u6240\u4EE5\u672C\u7F51\u7AD9 \u4E8B\u5148\u63D0\u51FA\u8FD9\u79CD\u635F\u5BB3\u7684\u53EF\u80FD\u6027\uFF0C\u540C\u65F6\u4F1A\u5C3D\u91CF\u907F\u514D\u8FD9\u79CD\u635F\u5BB3\u7684\u53D1\u751F\u3002',
                        React.createElement('br', null),
                        '10\u3001\u4FE1\u606F\u7684\u50A8\u5B58\u53CA\u9650\u5236',
                        React.createElement('br', null),
                        '\u672C\u7F51\u7AD9\u6709\u5224\u5B9A\u7528\u6237\u7684\u884C\u4E3A\u662F\u5426\u7B26\u5408\u672C\u7F51\u7AD9\u670D\u52A1\u6761\u6B3E\u7684\u8981\u6C42\u548C\u7CBE\u795E\u7684\u6743\u5229\uFF0C\u5982\u679C\u7528\u6237\u8FDD\u80CC\u672C\u7F51\u7AD9\u670D\u52A1\u6761\u6B3E\u7684\u89C4\u5B9A\uFF0C\u672C\u7F51\u7AD9\u6709\u6743\u4E2D\u65AD\u5176\u670D\u52A1\u7684\u5E10\u53F7\u3002',
                        React.createElement('br', null),
                        '11\u3001\u7528\u6237\u7BA1\u7406',
                        React.createElement('br', null),
                        '\u7528\u6237\u5FC5\u987B\u9075\u5FAA\uFF1A',
                        React.createElement('br', null),
                        '(1) \u4F7F\u7528\u4FE1\u606F\u670D\u52A1\u4E0D\u4F5C\u975E\u6CD5\u7528\u9014\u3002',
                        React.createElement('br', null),
                        '(2) \u4E0D\u5E72\u6270\u6216\u6DF7\u4E71\u7F51\u7EDC\u670D\u52A1\u3002',
                        React.createElement('br', null),
                        '(3) \u9075\u5B88\u6240\u6709\u4F7F\u7528\u670D\u52A1\u7684\u7F51\u7EDC\u534F\u8BAE\u3001\u89C4\u5B9A\u3001\u7A0B\u5E8F\u548C\u60EF\u4F8B\u3002\u7528\u6237\u7684\u884C\u4E3A\u51C6\u5219\u662F\u4EE5\u56E0\u7279\u7F51\u6CD5\u89C4\uFF0C\u653F\u7B56\u3001\u7A0B\u5E8F\u548C\u60EF\u4F8B\u4E3A\u6839\u636E\u7684\u3002',
                        React.createElement('br', null),
                        '12\u3001\u4FDD\u969C',
                        React.createElement('br', null),
                        '\u7528\u6237\u540C\u610F\u4FDD\u969C\u548C\u7EF4\u62A4\u672C\u7F51\u7AD9\u5168\u4F53\u6210\u5458\u7684\u5229\u76CA\uFF0C\u8D1F\u8D23\u652F\u4ED8\u7531\u7528\u6237\u4F7F\u7528\u8D85\u51FA\u670D\u52A1\u8303\u56F4\u5F15\u8D77\u7684\u5F8B\u5E08\u8D39\u7528\uFF0C\u8FDD\u53CD\u670D\u52A1\u6761\u6B3E\u7684\u635F\u5BB3\u8865\u507F\u8D39\u7528\uFF0C\u5176\u5B83\u4EBA\u4F7F\u7528\u7528\u6237\u7684\u7535\u8111\u3001\u5E10\u53F7\u548C\u5176\u5B83\u77E5\u8BC6\u4EA7\u6743\u7684\u8FFD\u7D22\u8D39\u3002',
                        React.createElement('br', null),
                        '13\u3001\u7ED3\u675F\u670D\u52A1',
                        React.createElement('br', null),
                        '\u7528\u6237\u6216\u672C\u7F51\u7AD9\u53EF\u968F\u65F6\u6839\u636E\u5B9E\u9645\u60C5\u51B5\u4E2D\u65AD\u4E00\u9879\u6216\u591A\u9879\u670D\u52A1\u3002\u672C\u7F51\u7AD9\u4E0D\u9700\u5BF9\u4EFB\u4F55\u4E2A\u4EBA\u6216\u7B2C\u4E09\u65B9\u8D1F\u8D23\u800C\u968F\u65F6\u4E2D\u65AD\u670D\u52A1\u3002\u7528\u6237\u82E5\u53CD\u5BF9\u4EFB\u4F55\u670D\u52A1\u6761\u6B3E\u7684\u5EFA\u8BAE\u6216\u5BF9\u540E\u6765\u7684\u6761\u6B3E\u4FEE\u6539\u6709\u5F02\u8BAE\uFF0C\u6216\u5BF9\u672C\u7F51\u7AD9\u670D\u52A1\u4E0D\u6EE1\uFF0C \u7528\u6237\u53EF\u4EE5\u884C\u4F7F\u5982\u4E0B\u6743\u5229\uFF1A',
                        React.createElement('br', null),
                        '(1) \u4E0D\u518D\u4F7F\u7528\u672C\u7F51\u7AD9\u4FE1\u606F\u670D\u52A1\u3002',
                        React.createElement('br', null),
                        '(2) \u901A\u77E5\u672C\u7F51\u7AD9\u505C\u6B62\u5BF9\u8BE5\u7528\u6237\u7684\u670D\u52A1\u3002',
                        React.createElement('br', null),
                        '\u7ED3\u675F\u7528\u6237\u670D\u52A1\u540E\uFF0C\u7528\u6237\u4F7F\u7528\u672C\u7F51\u7AD9\u670D\u52A1\u7684\u6743\u5229\u9A6C\u4E0A\u4E2D\u6B62\u3002\u4ECE\u90A3\u65F6\u8D77\uFF0C\u7528\u6237\u6CA1\u6709\u6743\u5229\uFF0C\u672C\u7F51\u7AD9\u4E5F\u6CA1\u6709\u4E49\u52A1\u4F20\u9001\u4EFB\u4F55\u672A\u5904\u7406\u7684\u4FE1\u606F\u6216\u672A\u5B8C\u6210\u7684\u670D\u52A1\u7ED9\u7528\u6237\u6216\u7B2C\u4E09\u65B9\u3002',
                        React.createElement('br', null),
                        '14\u3001\u901A\u544A',
                        React.createElement('br', null),
                        '\u6240\u6709\u53D1\u7ED9\u7528\u6237\u7684\u901A\u544A\u90FD\u53EF\u901A\u8FC7\u91CD\u8981\u9875\u9762\u7684\u516C\u544A\u6216\u7535\u5B50\u90AE\u4EF6\u6216\u5E38\u89C4\u7684\u4FE1\u4EF6\u4F20\u9001\u3002\u670D\u52A1\u6761\u6B3E\u7684\u4FEE\u6539\u3001\u670D\u52A1\u53D8\u66F4\u3001\u6216\u5176\u5B83\u91CD\u8981\u4E8B\u4EF6\u7684\u901A\u544A\u90FD\u4F1A\u4EE5\u6B64\u5F62\u5F0F\u8FDB\u884C\u3002',
                        React.createElement('br', null),
                        '15\u3001\u4FE1\u606F\u5185\u5BB9\u7684\u6240\u6709\u6743',
                        React.createElement('br', null),
                        '\u672C\u7F51\u7AD9\u5B9A\u4E49\u7684\u4FE1\u606F\u5185\u5BB9\u5305\u62EC\uFF1A\u6587\u5B57\u3001\u8F6F\u4EF6\u3001\u58F0\u97F3\u3001\u76F8\u7247\u3001\u5F55\u8C61\u3001\u56FE\u8868\uFF1B\u5728\u5E7F\u544A\u4E2D\u5168\u90E8\u5185\u5BB9\uFF1B\u672C\u7F51\u7AD9\u4E3A\u7528\u6237\u63D0\u4F9B\u7684\u5176\u5B83\u4FE1\u606F\u3002\u6240\u6709\u8FD9\u4E9B\u5185\u5BB9\u53D7\u7248\u6743\u3001\u5546\u6807\u3001\u6807\u7B7E\u548C\u5176\u5B83\u8D22\u4EA7\u6240\u6709\u6743\u6CD5\u5F8B\u7684\u4FDD\u62A4\u3002\u6240\u4EE5\uFF0C \u7528\u6237\u53EA\u80FD\u5728\u672C\u7F51\u7AD9\u548C\u5E7F\u544A\u5546\u6388\u6743\u4E0B\u624D\u80FD\u4F7F\u7528\u8FD9\u4E9B\u5185\u5BB9\uFF0C\u800C\u4E0D\u80FD\u64C5\u81EA\u590D\u5236\u3001\u518D\u9020\u8FD9\u4E9B\u5185\u5BB9\u3001\u6216\u521B\u9020\u4E0E\u5185\u5BB9\u6709\u5173\u7684\u6D3E\u751F\u4EA7\u54C1\u3002',
                        React.createElement('br', null),
                        '16\u3001\u6CD5\u5F8B',
                        React.createElement('br', null),
                        '\u672C\u7F51\u7AD9\u4FE1\u606F\u670D\u52A1\u6761\u6B3E\u8981\u4E0E\u4E2D\u534E\u4EBA\u6C11\u5171\u548C\u56FD\u7684\u6CD5\u5F8B\u89E3\u91CA\u4E00\u81F4\u3002\u7528\u6237\u548C\u672C\u7F51\u7AD9\u4E00\u81F4\u540C\u610F\u670D\u4ECE\u672C\u7F51\u7AD9\u6240\u5728\u5730\u6709\u7BA1\u8F96\u6743\u7684\u6CD5\u9662\u7BA1\u8F96\u3002',
                        React.createElement('br', null)
                    )
                )
            );
        }
    }]);

    return IoIo;
}(React.Component);

;

ReactDOM.render(React.createElement(IoIo, null), document.getElementById("signup"));

/***/ })

/******/ });