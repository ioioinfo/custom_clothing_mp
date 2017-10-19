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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
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
/* 4 */
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

    // 初始化一个空对象
    var _this = _possibleConstructorReturn(this, (IoIo.__proto__ || Object.getPrototypeOf(IoIo)).call(this, props));

    _this.handleSubmit = _this.handleSubmit.bind(_this);
    _this.state = {};
    return _this;
  }

  _createClass(IoIo, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var windowHeight = $(window).height();
      var inforHeight = $('.loding_middle').height();
      $(".login_bottom").css("margin-top", windowHeight - inforHeight - 200);
    }
  }, {
    key: 'handleSubmit',
    value: function handleSubmit(e) {
      var data_email = $('#data_email').val();
      var data_password = $('#data_password').val();
      if (!data_email) {
        $('#data_email').addClass('loding_border');
        $('.error_message').css('display', 'block');
        $('.error_message').attr('id', 'animation1');
        return;
      } else if (!data_password) {

        $('#data_email').removeClass('loding_border');
        $('.error_message').css('display', 'none');
        $('.error_message').removeAttr('id', 'animation1');

        $('#data_password').addClass('loding_border');
        $('.error_message1').css('display', 'block');
        $('.error_message1').attr('id', 'animation1');
        return;
      }
      $.ajax({
        url: "/do_login",
        dataType: 'json',
        type: 'POST',
        data: { "username": data_email, "password": data_password },
        success: function (data) {
          if (data.success) {
            location.href = "person_center";
            if ($('#loadingToast').css('display') != 'none') return;
            $('#loadingToast').fadeIn(100);
            setTimeout(function () {
              $('#loadingToast').fadeOut(100);
            }, 2000);

            $('#data_password').removeClass('loding_border');
            $('.error_message1').css('display', 'none');
            $('.error_message1').removeAttr('id', 'animation1');
          } else {
            var message = data.message;
            if (message == 'no account') {
              alert('用户名不存在');
            } else if (message == 'login error') {
              alert('用户名或密码错误');
            }
          }
        }.bind(this),
        error: function (xhr, status, err) {}.bind(this)
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var style = { display: 'none' };
      return React.createElement(
        'div',
        { className: 'loding_wrap' },
        React.createElement(
          'div',
          { className: 'loding_com_namewrap', id: 'animation' },
          React.createElement(
            'div',
            { className: 'loding_com_name' },
            React.createElement(
              'span',
              null,
              '\u4F51\u4F51\u79D1\u6280'
            )
          )
        ),
        React.createElement(
          'div',
          { className: 'loding_middle' },
          React.createElement(
            'div',
            { className: 'loding_middle_next' },
            React.createElement(
              'div',
              { className: 'loding_middle_email_wrap' },
              React.createElement('input', { className: 'loding_middle_email_input', placeholder: '\u624B\u673A\u53F7', type: 'email', name: 'data[email]', id: 'data_email' }),
              React.createElement('label', { className: 'loding_middle_email_name' }),
              React.createElement(
                'span',
                { className: 'error_message' },
                '\u8BF7\u91CD\u65B0\u8F93\u5165\u7528\u6237\u540D',
                React.createElement('i', { className: 'ico error-buble' })
              )
            ),
            React.createElement(
              'div',
              { className: 'loding_middle_password_wrap' },
              React.createElement('input', { className: 'loding_middle_password_input', placeholder: '\u5BC6\u7801', type: 'password', name: 'data[password]', id: 'data_password' }),
              React.createElement('label', { className: 'loding_middle_password_name' }),
              React.createElement(
                'span',
                { className: 'error_message1' },
                '\u8BF7\u91CD\u65B0\u8F93\u5165\u5BC6\u7801',
                React.createElement('i', { className: 'ico error-buble' })
              )
            ),
            React.createElement('input', { type: 'submit', name: 'commit', value: '\u767B \u5F55', className: 'loding_middle_submit', onClick: this.handleSubmit })
          )
        ),
        React.createElement(
          'div',
          { id: 'loadingToast', style: style },
          React.createElement('div', { className: 'weui-mask_transparent' }),
          React.createElement(
            'div',
            { className: 'weui-toast' },
            React.createElement('i', { className: 'weui-loading weui-icon_toast' }),
            React.createElement(
              'p',
              { className: 'weui-toast__content' },
              '\u767B\u5F55\u52A0\u8F7D\u4E2D'
            )
          )
        ),
        React.createElement(
          'p',
          { className: 'login_bottom' },
          React.createElement(
            'a',
            { href: 'signup' },
            '\u6CE8\u518C'
          ),
          '|',
          React.createElement(
            'a',
            { href: 'reset_password' },
            '\u5FD8\u8BB0\u5BC6\u7801\uFF1F'
          )
        )
      );
    }
  }]);

  return IoIo;
}(React.Component);

;

ReactDOM.render(React.createElement(IoIo, null), document.getElementById("loding"));

/***/ })
/******/ ]);