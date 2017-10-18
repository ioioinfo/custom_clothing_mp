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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
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
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = __webpack_require__(0);
var ReactDOM = __webpack_require__(1);
var Lunbo = __webpack_require__(3);
// 框架

var Wrap = function (_React$Component) {
  _inherits(Wrap, _React$Component);

  function Wrap() {
    _classCallCheck(this, Wrap);

    return _possibleConstructorReturn(this, (Wrap.__proto__ || Object.getPrototypeOf(Wrap)).apply(this, arguments));
  }

  _createClass(Wrap, [{
    key: 'componentDidMount',
    value: function componentDidMount() {}
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'product_home' },
        React.createElement(Lunbo, { items: items, rate: rate }),
        React.createElement(ProductNav, null)
      );
    }
  }]);

  return Wrap;
}(React.Component);

;

// 菜单

var ProductNav = function (_React$Component2) {
  _inherits(ProductNav, _React$Component2);

  function ProductNav(props) {
    _classCallCheck(this, ProductNav);

    var _this2 = _possibleConstructorReturn(this, (ProductNav.__proto__ || Object.getPrototypeOf(ProductNav)).call(this, props));

    _this2.state = { qipao: [] };

    return _this2;
  }

  _createClass(ProductNav, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      // var product_nav_list_width = $('.product_nav_list').width();
      // $('.product_nav_list').css('height',product_nav_list_width/2);
      var list = [{ img: 'img/qipao_1.jpg', price: '399.00' }, { img: 'img/qipao_2.jpg', price: '399.00' }, { img: 'img/qipao_3.jpg', price: '399.00' }, { img: 'img/qipao_4.jpg', price: '399.00' }, { img: 'img/qipao_5.jpg', price: '399.00' }, { img: 'img/qipao_6.jpg', price: '399.00' }, { img: 'img/qipao_7.jpg', price: '399.00' }, { img: 'img/qipao_8.jpg', price: '399.00' }];
      this.setState({ qipao: list });
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'product_nav' },
        React.createElement(
          'div',
          { className: 'product_nav_list' },
          React.createElement(
            'h1',
            { className: 'qipao_title' },
            '\u300C\u65D7 \u888D\u300D'
          ),
          React.createElement(
            'ul',
            { className: 'qipao_wrap' },
            this.state.qipao.map(function (item, index) {
              return React.createElement(
                'li',
                { key: index },
                React.createElement('img', { src: item.img }),
                React.createElement(
                  'p',
                  { className: 'qipao_price' },
                  React.createElement(
                    'span',
                    { className: 'pull-left price_style' },
                    '\uFFE5',
                    item.price
                  ),
                  React.createElement(
                    'span',
                    { className: 'pull-right buy_style' },
                    '\u7ACB\u5373\u5B9A\u5236'
                  )
                )
              );
            })
          ),
          React.createElement(
            'div',
            { className: 'chuiniubi' },
            '\u73CD\u85CF'
          ),
          React.createElement(
            'div',
            { className: 'qipao_ad' },
            React.createElement('img', { src: 'img/qipao_9.jpg' })
          )
        ),
        React.createElement(
          'div',
          { className: 'product_nav_list' },
          React.createElement(
            'h1',
            { className: 'qipao_title' },
            '\u300C\u65D7 \u888D\u300D'
          ),
          React.createElement(
            'ul',
            { className: 'qipao_wrap' },
            this.state.qipao.map(function (item, index) {
              return React.createElement(
                'li',
                { key: index },
                React.createElement('img', { src: item.img }),
                React.createElement(
                  'p',
                  { className: 'qipao_price' },
                  React.createElement(
                    'span',
                    { className: 'pull-left price_style' },
                    '\uFFE5',
                    item.price
                  ),
                  React.createElement(
                    'span',
                    { className: 'pull-right buy_style' },
                    '\u7ACB\u5373\u5B9A\u5236'
                  )
                )
              );
            })
          ),
          React.createElement(
            'div',
            { className: 'chuiniubi' },
            '\u73CD\u85CF'
          ),
          React.createElement(
            'div',
            { className: 'qipao_ad' },
            React.createElement('img', { src: 'img/qipao_9.jpg' })
          )
        )
      );
    }
  }]);

  return ProductNav;
}(React.Component);

;

// 返回到页面
ReactDOM.render(React.createElement(Wrap, null), document.getElementById("product"));

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = __webpack_require__(0);

var Lunbo = function (_React$Component) {
    _inherits(Lunbo, _React$Component);

    function Lunbo(props) {
        _classCallCheck(this, Lunbo);

        var _this = _possibleConstructorReturn(this, (Lunbo.__proto__ || Object.getPrototypeOf(Lunbo)).call(this, props));

        _this.jump = _this.jump.bind(_this);
        _this.back = _this.back.bind(_this);
        _this.move = _this.move.bind(_this);
        _this.onTouchStart = _this.onTouchStart.bind(_this);
        _this.onTouchMove = _this.onTouchMove.bind(_this);
        _this.onTouchEnd = _this.onTouchEnd.bind(_this);
        // 初始化一个空对象
        _this.state = { imgItems: _this.props.items || [], selected: 0, touchPage: 0, change: 0 };
        return _this;
    }

    _createClass(Lunbo, [{
        key: "jump",
        value: function jump() {
            //当前显示图片
            var selected = this.state.selected;
            var imgLength = this.state.imgItems.length;
            var widthUl = $(window).width();

            var next1 = selected + 1;
            if (next1 >= imgLength) {
                next1 = next1 - imgLength;
            }

            //循环所有图片
            $(".imgul li").each(function (index, element) {
                if (index == selected) {
                    $(this).css("z-index", "10");
                    $(this).css("transform", "translate3d(" + -widthUl + "px, 0px, 0px)");
                    $(this).css("transition", "all 300ms ease");
                } else if (index == next1) {
                    $(this).css("z-index", "10");
                    $(this).css("transform", "translate3d(0px, 0px, 0px)");
                    $(this).css("transition", "all 300ms ease");
                } else {
                    $(this).css("z-index", "9");
                    $(this).css("transform", "translate3d(" + widthUl + "px, 0px, 0px)");
                    $(this).css("transition", "all 0ms ease");
                }
            });

            this.setState({ selected: next1 });
        }
        //向右移动一张

    }, {
        key: "back",
        value: function back() {
            //当前显示图片
            var selected = this.state.selected;
            var imgLength = this.state.imgItems.length;
            var widthUl = $(window).width();

            var prev1 = selected - 1;
            if (prev1 < 0) {
                prev1 = imgLength - 1;
            }

            //循环所有图片
            $(".imgul li").each(function (index, element) {
                if (index == selected) {
                    $(this).css("z-index", "10");
                    $(this).css("transform", "translate3d(" + widthUl + "px, 0px, 0px)");
                    $(this).css("transition", "all 300ms ease");
                } else if (index == prev1) {
                    $(this).css("z-index", "10");
                    $(this).css("transform", "translate3d(0px, 0px, 0px)");
                    $(this).css("transition", "all 300ms ease");
                } else {
                    $(this).css("z-index", "9");
                    $(this).css("transform", "translate3d(" + -widthUl + "px, 0px, 0px)");
                    $(this).css("transition", "all 0ms ease");
                }
            });

            this.setState({ selected: prev1 });
        }
    }, {
        key: "move",
        value: function move(change) {
            var widthUl = $(window).width();
            if (change < -widthUl / 8) {
                this.jump();
            } else if (change > widthUl / 8) {
                this.back();
            }
        }
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {
            $(".imgul li").css("width", $(window).width());
            var rate = this.props.rate;
            if (!rate) {
                rate = 0.3125;
            }

            var imgLIheight = rate * $(window).width();
            $(".imgul").css("height", imgLIheight);
            var imgLength = this.state.imgItems.length;
            var widthUl = $(window).width();
            //循环所有图片
            $(".imgul li").each(function (index, element) {
                if (index == 0) {
                    $(this).css("z-index", "10");
                } else if (index == 1) {
                    $(this).css("transform", "translate3d(" + widthUl + "px, 0px, 0px)");
                    $(this).css("transition", "all 0ms ease");
                } else if (index == imgLength - 1) {
                    $(this).css("z-index", "10");
                    $(this).css("transform", "translate3d(" + -widthUl + "px, 0px, 0px)");
                    $(this).css("transition", "all 0ms ease");
                } else {
                    $(this).css("z-index", "9");
                    $(this).css("transform", "translate3d(" + widthUl + "px, 0px, 0px)");
                    $(this).css("transition", "all 0ms ease");
                }
            });

            if (this.state.imgItems.length > 1) {
                this.timer = setInterval(this.jump, 1500);
            }
        }

        // 开始

    }, {
        key: "onTouchStart",
        value: function onTouchStart(e) {
            if (this.state.imgItems.length <= 1) {
                return;
            }
            if (this.timer) {
                clearInterval(this.timer);
            }

            var touch = e.targetTouches[0]; //touches数组对象获得屏幕上所有的touch，取第一个touch
            var touchPageStart = touch.pageX; //获取当前最新的坐标

            this.setState({ touchPage: touchPageStart, change: 0 });
        }

        // 移动中

    }, {
        key: "onTouchMove",
        value: function onTouchMove(e) {
            if (this.state.imgItems.length <= 1) {
                return;
            }
            var touchPageMove = e.targetTouches[0].pageX; //获取当前最新的坐标

            var touchPage = this.state.touchPage;
            var change = touchPageMove - touchPage;

            this.setState({ change: change });
        }
        // 移动结束

    }, {
        key: "onTouchEnd",
        value: function onTouchEnd(e) {
            if (this.state.imgItems.length <= 1) {
                return;
            }
            var change = this.state.change;
            this.move(change);
        }
    }, {
        key: "render",
        value: function render() {
            var _this2 = this;

            return React.createElement(
                "div",
                { className: "flashWrap" },
                React.createElement(
                    "ul",
                    { className: "imgul", onTouchStart: this.onTouchStart, onTouchMove: this.onTouchMove, onTouchEnd: this.onTouchEnd },
                    this.state.imgItems.map(function (item) {
                        return React.createElement(FlashImgLi, { key: item.id, item: item });
                    })
                ),
                React.createElement(
                    "div",
                    { className: "pointul" },
                    this.state.imgItems.map(function (item, index) {
                        return React.createElement(FlashPointLi, { key: index, selected: _this2.state.selected, index: index });
                    })
                )
            );
        }
    }]);

    return Lunbo;
}(React.Component);
// 图片


var FlashImgLi = function (_React$Component2) {
    _inherits(FlashImgLi, _React$Component2);

    function FlashImgLi() {
        _classCallCheck(this, FlashImgLi);

        return _possibleConstructorReturn(this, (FlashImgLi.__proto__ || Object.getPrototypeOf(FlashImgLi)).apply(this, arguments));
    }

    _createClass(FlashImgLi, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            $(".imgul li").css("width", $(window).width());
            $(".imgul li img").css("width", $(window).width());
        }
    }, {
        key: "render",
        value: function render() {
            var imgsec = this.props.item.img;
            return React.createElement(
                "li",
                { className: "pull-left" },
                React.createElement(
                    "a",
                    { href: this.props.item.href || "javascript:void(0)" },
                    React.createElement("img", { src: imgsec, className: "img-responsive", alt: "" })
                )
            );
        }
    }]);

    return FlashImgLi;
}(React.Component);

// 点


var FlashPointLi = function (_React$Component3) {
    _inherits(FlashPointLi, _React$Component3);

    function FlashPointLi() {
        _classCallCheck(this, FlashPointLi);

        return _possibleConstructorReturn(this, (FlashPointLi.__proto__ || Object.getPrototypeOf(FlashPointLi)).apply(this, arguments));
    }

    _createClass(FlashPointLi, [{
        key: "render",
        value: function render() {

            var c = "";
            if (this.props.selected == this.props.index) {
                c = "on";
            }
            return React.createElement("span", { className: c });
        }
    }]);

    return FlashPointLi;
}(React.Component);

module.exports = Lunbo;

/***/ })
/******/ ]);