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
/******/ 	return __webpack_require__(__webpack_require__.s = 12);
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

/***/ 12:
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

  function IoIo() {
    _classCallCheck(this, IoIo);

    return _possibleConstructorReturn(this, (IoIo.__proto__ || Object.getPrototypeOf(IoIo)).apply(this, arguments));
  }

  _createClass(IoIo, [{
    key: 'render',
    value: function render() {
      var style = { display: 'none' };
      return React.createElement(
        'div',
        { className: 'project_list_wrap' },
        React.createElement(Projectsearch, null),
        React.createElement(Projectlist, null),
        React.createElement(Top, null)
      );
    }
  }]);

  return IoIo;
}(React.Component);

;

var Projectsearch = function (_React$Component2) {
  _inherits(Projectsearch, _React$Component2);

  function Projectsearch(props) {
    _classCallCheck(this, Projectsearch);

    return _possibleConstructorReturn(this, (Projectsearch.__proto__ || Object.getPrototypeOf(Projectsearch)).call(this, props));
  }

  _createClass(Projectsearch, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'page__bd project_list_search' },
        React.createElement(
          'div',
          { className: 'weui-search-bar', id: 'searchBar' },
          React.createElement(
            'form',
            { className: 'weui-search-bar__form' },
            React.createElement(
              'div',
              { className: 'weui-search-bar__box' },
              React.createElement('i', { className: 'weui-icon-search' }),
              React.createElement('input', { type: 'search', className: 'weui-search-bar__input', id: 'searchInput', required: '' })
            )
          ),
          React.createElement(
            'a',
            { className: 'weui-search-bar__cancel-btn', id: 'searchCancel' },
            '\u641C\u7D22'
          )
        )
      );
    }
  }]);

  return Projectsearch;
}(React.Component);

;

var Projectlist = function (_React$Component3) {
  _inherits(Projectlist, _React$Component3);

  function Projectlist(props) {
    _classCallCheck(this, Projectlist);

    return _possibleConstructorReturn(this, (Projectlist.__proto__ || Object.getPrototypeOf(Projectlist)).call(this, props));
  }

  _createClass(Projectlist, [{
    key: 'render',
    value: function render() {
      var style = { marginRight: '5px', display: 'block' };
      return React.createElement(
        'ul',
        { className: 'project_list_ul' },
        React.createElement(
          'li',
          null,
          React.createElement(
            'div',
            { className: 'weui-cells' },
            React.createElement(
              'div',
              { className: 'weui-cell font_style position_relative' },
              React.createElement(
                'div',
                { className: 'weui-cell__hd project_list_img_wrap' },
                React.createElement('img', { src: 'images/biyou.jpg', alt: '', style: style })
              ),
              React.createElement(
                'div',
                { className: 'weui-cell__bd product_name' },
                React.createElement(
                  'p',
                  { className: 'product_name_infor' },
                  '\u65D7\u888D'
                ),
                React.createElement(
                  'p',
                  { className: 'product_price' },
                  React.createElement(
                    'span',
                    null,
                    '\uFFE5'
                  ),
                  '100'
                )
              )
            )
          )
        )
      );
    }
  }]);

  return Projectlist;
}(React.Component);

;

// 返回顶部

var Top = function (_React$Component4) {
  _inherits(Top, _React$Component4);

  function Top(props) {
    _classCallCheck(this, Top);

    var _this4 = _possibleConstructorReturn(this, (Top.__proto__ || Object.getPrototypeOf(Top)).call(this, props));

    _this4.handleClick = _this4.handleClick.bind(_this4);
    return _this4;
  }
  // 点击返回顶部


  _createClass(Top, [{
    key: 'handleClick',
    value: function handleClick(e) {
      $('body,html').animate({ scrollTop: 0 }, 400);
    }
    // 页面发生变化的时候触发

  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      $(window).scroll(function () {
        var topHeight = $(window).scrollTop();
        if (topHeight > 100) {
          //当滚动条的位置处于距顶部1000像素以下时，就是大于1000象数时，跳转出现
          $(".top").fadeIn(250);
        } else {
          //否则就消失
          $(".top").fadeOut(250);
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var topHeight = $(window).scrollTop();

      return React.createElement(
        'div',
        { className: 'top', onClick: this.handleClick },
        React.createElement('img', { src: 'images/scroll-to-top-icon.png', alt: '' })
      );
    }
  }]);

  return Top;
}(React.Component);

;

ReactDOM.render(React.createElement(IoIo, null), document.getElementById("order_list"));

/***/ })

/******/ });