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
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
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
/* 5 */,
/* 6 */,
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = __webpack_require__(0);
var ReactDOM = __webpack_require__(1);

// 框架

var Wrap = function (_React$Component) {
  _inherits(Wrap, _React$Component);

  function Wrap(props) {
    _classCallCheck(this, Wrap);

    var _this = _possibleConstructorReturn(this, (Wrap.__proto__ || Object.getPrototypeOf(Wrap)).call(this, props));

    _this.state = { vip_item: {}, record_items: [] };
    return _this;
  }

  _createClass(Wrap, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      $.ajax({
        url: "/get_member_info",
        dataType: 'json',
        type: 'GET',
        data: { "card_id": card_id },
        success: function (data) {
          if (data.rows.length > 0) {
            this.setState({ vip_item: data.rows[0] });
          } else {
            $('.ammount').html('暂无金额');
          }
        }.bind(this),
        error: function (xhr, status, err) {}.bind(this)
      });

      $.ajax({
        url: "/member_consume_history",
        dataType: 'json',
        type: 'GET',
        data: { "card_id": card_id },
        success: function (data) {
          var record_items = this.state.record_items;
          for (var i = 0; i < data.cost.length; i++) {
            var cost = data.cost[i];
            cost.type = 1;
            record_items.push(cost);
          };
          for (var i = 0; i < data.income.length; i++) {
            var income = data.income[i];
            income.type = 2;
            record_items.push(income);
          }

          function compare(a, b) {
            if (a.created_at < b.created_at) {
              return -1;
            }
            if (a.created_at > b.created_at) {
              return 1;
            }
            return 0;
          }

          record_items.sort(compare);

          this.setState({ record_items: record_items });
        }.bind(this),
        error: function (xhr, status, err) {}.bind(this)
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var record_items = this.state.record_items;

      var list = [];

      record_items.map(function (item) {
        var type = item.type;
        if (type == 1) {
          list.push(React.createElement(
            'div',
            { className: 'weui-cells', key: item.id },
            React.createElement(
              'div',
              { className: 'weui-cell' },
              React.createElement(
                'div',
                { className: 'weui-cell__hd' },
                '+'
              ),
              React.createElement(
                'div',
                { className: 'weui-cell__bd record_name' },
                React.createElement(
                  'p',
                  null,
                  '\u6D88\u8D39'
                ),
                React.createElement(
                  'p',
                  { className: 'record_time' },
                  item.created_at
                )
              ),
              React.createElement(
                'div',
                { className: 'weui-cell__ft' },
                '- ',
                item.jine,
                '\u5143'
              )
            )
          ));
        } else {
          list.push(React.createElement(
            'div',
            { className: 'weui-cells', key: item.id },
            React.createElement(
              'div',
              { className: 'weui-cell' },
              React.createElement(
                'div',
                { className: 'weui-cell__hd' },
                '+'
              ),
              React.createElement(
                'div',
                { className: 'weui-cell__bd record_name' },
                React.createElement(
                  'p',
                  null,
                  '\u5145\u503C'
                ),
                React.createElement(
                  'p',
                  { className: 'record_time' },
                  item.created_at
                )
              ),
              React.createElement(
                'div',
                { className: 'weui-cell__ft' },
                '+ ',
                item.jine,
                '\u5143'
              )
            )
          ));
        }
      });

      return React.createElement(
        'div',
        { className: 'record' },
        React.createElement(
          'h3',
          { className: 'record_title' },
          '\u5145\u503C\u8BB0\u5F55'
        ),
        React.createElement(
          'div',
          { className: 'page__hd' },
          React.createElement(
            'h1',
            { className: 'page__title ammount' },
            React.createElement(
              'span',
              { className: 'money_style' },
              '\uFFE5'
            ),
            ' 100'
          ),
          React.createElement(
            'p',
            { className: 'page__desc' },
            '\u4F59\u989D'
          )
        ),
        React.createElement(
          'div',
          { className: 'record_list' },
          list
        )
      );
    }
  }]);

  return Wrap;
}(React.Component);
// 返回到页面


ReactDOM.render(React.createElement(Wrap, null), document.getElementById("content"));

/***/ })
/******/ ]);