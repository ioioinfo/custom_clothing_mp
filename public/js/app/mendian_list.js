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
/******/ 	return __webpack_require__(__webpack_require__.s = 63);
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

/***/ 63:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = __webpack_require__(1);
var ReactDOM = __webpack_require__(2);

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
        React.createElement(Header, null),
        React.createElement(Middle, null),
        React.createElement(
          'div',
          { className: 'down' },
          '\u5230\u5E95\u4E86'
        )
      );
    }
  }]);

  return Warp;
}(React.Component);

;
// 头部

var Header = function (_React$Component2) {
  _inherits(Header, _React$Component2);

  function Header() {
    _classCallCheck(this, Header);

    return _possibleConstructorReturn(this, (Header.__proto__ || Object.getPrototypeOf(Header)).apply(this, arguments));
  }

  _createClass(Header, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'head' },
        React.createElement(
          'span',
          { className: 'title' },
          '\u95E8\u5E97\u5217\u8868'
        )
      );
    }
  }]);

  return Header;
}(React.Component);

;
// 中间部分

var Middle = function (_React$Component3) {
  _inherits(Middle, _React$Component3);

  // 2
  function Middle(props) {
    _classCallCheck(this, Middle);

    var _this3 = _possibleConstructorReturn(this, (Middle.__proto__ || Object.getPrototypeOf(Middle)).call(this, props));

    _this3.state = { store_list: [] };
    return _this3;
  }
  // 3


  _createClass(Middle, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      $.ajax({
        url: "/get_store_list",
        dataType: 'json',
        type: 'GET',
        success: function (data) {
          if (data.success) {
            this.setState({ store_list: data.store_list });
          } else {}
        }.bind(this),
        error: function (xhr, status, err) {}.bind(this)
      });
    }
    // 1

  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'middle' },
        this.state.store_list.map(function (item, index) {
          return React.createElement(News, { item: item, key: index });
        })
      );
    }
  }]);

  return Middle;
}(React.Component);

;
// 中间消息

var News = function (_React$Component4) {
  _inherits(News, _React$Component4);

  function News() {
    _classCallCheck(this, News);

    return _possibleConstructorReturn(this, (News.__proto__ || Object.getPrototypeOf(News)).apply(this, arguments));
  }

  _createClass(News, [{
    key: 'render',
    value: function render() {
      var img = "images/no.jpg";
      if (this.props.item.pictures.length > 0) {
        img = "http://shop.buy42.com/images/" + this.props.item.pictures[0].location;
      }

      return React.createElement(
        'div',
        { className: 'news' },
        React.createElement(
          'a',
          { href: '#' },
          React.createElement(
            'div',
            { className: 'newsInfor' },
            React.createElement(
              'div',
              { className: 'newscontent' },
              React.createElement(
                'p',
                { className: 'newsimg' },
                React.createElement('img', { src: img, alt: '' })
              ),
              React.createElement(
                'p',
                { className: 'newsword' },
                React.createElement(
                  'span',
                  null,
                  this.props.item.points[0].point_name
                ),
                React.createElement(
                  'span',
                  null,
                  this.props.item.points[0].province + this.props.item.points[0].district + this.props.item.points[0].detail_address
                )
              )
            )
          )
        )
      );
    }
  }]);

  return News;
}(React.Component);

;

ReactDOM.render(React.createElement(Warp, null), document.getElementById("mendian_list"));

/***/ })

/******/ });