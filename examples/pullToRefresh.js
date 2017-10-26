webpackJsonp([5],{

/***/ 166:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__assets_index_less__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__assets_index_less___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__assets_index_less__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react_dom__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_react_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__src__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rmc_pull_to_refresh__ = __webpack_require__(311);




/* eslint-disable no-console */
/* eslint react/sort-comp: 0 */






var NUM_ROWS = 6;

function genData() {
  var pIndex = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

  var dataArr = [];
  for (var i = 0; i < NUM_ROWS; i++) {
    dataArr.push('row - ' + (pIndex * NUM_ROWS + i));
  }
  return dataArr;
}

var Demo = function (_React$Component) {
  __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits___default()(Demo, _React$Component);

  function Demo(props) {
    __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, Demo);

    var _this = __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default()(this, (Demo.__proto__ || Object.getPrototypeOf(Demo)).call(this, props));

    var dataSource = new __WEBPACK_IMPORTED_MODULE_7__src__["a" /* default */].DataSource({
      rowHasChanged: function rowHasChanged(row1, row2) {
        return row1 !== row2;
      }
    });

    _this.state = {
      dataSource: dataSource,
      useBodyScroll: false,
      refreshing: false,
      down: false
    };
    return _this;
  }

  __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(Demo, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      document.body.style.overflowY = navigator.userAgent.match(/Android|iPhone|iPad|iPod/i) ? 'hidden' : 'auto';
      // you can scroll to the specified position
      setTimeout(function () {
        return _this2.lv.scrollTo(0, 50);
      }, 800);

      // simulate initial Ajax
      setTimeout(function () {
        _this2.setState({
          dataSource: _this2.state.dataSource.cloneWithRows(genData())
        });
      }, 600);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      return __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
        'div',
        null,
        __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
          'button',
          {
            style: { display: 'inline-block', marginBottom: 30, border: 1 },
            onClick: function onClick() {
              return _this3.setState({ useBodyScroll: !_this3.state.useBodyScroll });
            }
          },
          'useBodyScroll: ',
          this.state.useBodyScroll ? 'true' : 'false'
        ),
        __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
          'button',
          {
            style: { display: 'inline-block', marginBottom: 30, marginLeft: 10, border: 1 },
            onClick: function onClick() {
              return _this3.setState({ down: !_this3.state.down });
            }
          },
          'direction: ',
          this.state.down ? 'down' : 'up'
        ),
        __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7__src__["a" /* default */], {
          key: this.state.useBodyScroll ? 1 : 0,
          ref: function ref(el) {
            return _this3.lv = el;
          },
          dataSource: this.state.dataSource,
          useBodyScroll: this.state.useBodyScroll,
          style: !this.state.useBodyScroll ? { height: 200, border: '1px solid gray' } : {},
          renderHeader: function renderHeader() {
            return __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
              'span',
              { style: { padding: 10 } },
              'header'
            );
          },
          renderRow: function renderRow(rowData) {
            return __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
              'div',
              { style: { padding: 16 } },
              rowData
            );
          },
          pullToRefresh: __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_8_rmc_pull_to_refresh__["a" /* default */], {
            className: 'forTest',
            direction: this.state.down ? 'down' : 'up',
            refreshing: this.state.refreshing,
            onRefresh: function onRefresh() {
              _this3.setState({ refreshing: true });
              setTimeout(function () {
                _this3.setState({ refreshing: false });
              }, 1000);
            }
          })
        }),
        __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement('div', { dangerouslySetInnerHTML: {
            __html: navigator.userAgent.match(/Android|iPhone|iPad|iPod/i) ? '<style>#qrcode, .highlight{ display: none }</style>' : ''
          }
        })
      );
    }
  }]);

  return Demo;
}(__WEBPACK_IMPORTED_MODULE_5_react___default.a.Component);

__WEBPACK_IMPORTED_MODULE_6_react_dom___default.a.render(__WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(Demo, null), document.getElementById('__react-content'));

/***/ }),

/***/ 310:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_classnames__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_classnames__);





var __rest = this && this.__rest || function (s, e) {
    var t = {};
    for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    }if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (e.indexOf(p[i]) < 0) t[p[i]] = s[p[i]];
    }return t;
};



var StaticRenderer = function (_React$Component) {
    __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default()(StaticRenderer, _React$Component);

    function StaticRenderer() {
        __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, StaticRenderer);

        return __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default()(this, (StaticRenderer.__proto__ || Object.getPrototypeOf(StaticRenderer)).apply(this, arguments));
    }

    __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(StaticRenderer, [{
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps) {
            return nextProps.shouldUpdate;
        }
    }, {
        key: 'render',
        value: function render() {
            return __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
                'div',
                null,
                this.props.render()
            );
        }
    }]);

    return StaticRenderer;
}(__WEBPACK_IMPORTED_MODULE_5_react___default.a.Component);

function setTransform(nodeStyle, value) {
    nodeStyle.transform = value;
    nodeStyle.webkitTransform = value;
    nodeStyle.MozTransform = value;
}
var isWebView = typeof navigator !== 'undefined' && /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(navigator.userAgent);
var DOWN = 'down';
var UP = 'up';
var INDICATOR = { activate: 'release', deactivate: 'pull', release: 'loading', finish: 'finish' };

var PullToRefresh = function (_React$Component2) {
    __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default()(PullToRefresh, _React$Component2);

    function PullToRefresh() {
        __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, PullToRefresh);

        // https://github.com/yiminghe/zscroller/blob/2d97973287135745818a0537712235a39a6a62a1/src/Scroller.js#L355
        // currSt: `activate` / `deactivate` / `release` / `finish`
        var _this2 = __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default()(this, (PullToRefresh.__proto__ || Object.getPrototypeOf(PullToRefresh)).apply(this, arguments));

        _this2.state = {
            currSt: '',
            dragOnEdge: false
        };
        _this2.shouldUpdateChildren = false;
        _this2.triggerPullToRefresh = function () {
            // 在初始化时、用代码 自动 触发 pullToRefresh
            // 注意：当 direction 为 up 时，当 visible length < content length 时、则看不到效果
            if (!_this2.state.dragOnEdge) {
                if (_this2.props.refreshing) {
                    if (_this2.props.direction === UP) {
                        _this2._lastScreenY = -_this2.props.distanceToRefresh - 1;
                    }
                    if (_this2.props.direction === DOWN) {
                        _this2._lastScreenY = _this2.props.distanceToRefresh + 1;
                    }
                    // change dom need after setState
                    _this2.setState({ currSt: 'release' }, function () {
                        return _this2.setContentStyle(_this2._lastScreenY);
                    });
                } else {
                    _this2.setState({ currSt: 'finish' }, function () {
                        return _this2.reset();
                    });
                }
            }
        };
        _this2.init = function (ele) {
            if (!ele) {
                // like return in destroy fn ???!!
                return;
            }
            _this2._to = {
                touchstart: _this2.onTouchStart.bind(_this2, ele),
                touchmove: _this2.onTouchMove.bind(_this2, ele),
                touchend: _this2.onTouchEnd.bind(_this2, ele),
                touchcancel: _this2.onTouchEnd.bind(_this2, ele)
            };
            Object.keys(_this2._to).forEach(function (key) {
                ele.addEventListener(key, _this2._to[key]);
            });
        };
        _this2.destroy = function (ele) {
            if (!_this2._to || !ele) {
                // componentWillUnmount fire before componentDidMount, like forceUpdate ???!!
                return;
            }
            Object.keys(_this2._to).forEach(function (key) {
                ele.removeEventListener(key, _this2._to[key]);
            });
        };
        _this2.onTouchStart = function (_ele, e) {
            _this2._ScreenY = _this2._startScreenY = e.touches[0].screenY;
            // 一开始 refreshing 为 true 时 this._lastScreenY 有值
            _this2._lastScreenY = _this2._lastScreenY || 0;
        };
        _this2.isEdge = function (ele, direction) {
            var container = _this2.props.getScrollContainer();
            if (container && container === document.body) {
                // In chrome61 `document.body.scrollTop` is invalid
                var scrollNode = document.scrollingElement ? document.scrollingElement : document.body;
                if (direction === UP) {
                    return scrollNode.scrollHeight - scrollNode.scrollTop <= window.innerHeight;
                }
                if (direction === DOWN) {
                    return scrollNode.scrollTop <= 0;
                }
            }
            if (direction === UP) {
                return ele.scrollHeight - ele.scrollTop === ele.clientHeight;
            }
            if (direction === DOWN) {
                return ele.scrollTop <= 0;
            }
        };
        _this2.onTouchMove = function (ele, e) {
            // 使用 pageY 对比有问题
            var _screenY = e.touches[0].screenY;
            var direction = _this2.props.direction;
            // 拖动方向不符合的不处理

            if (direction === UP && _this2._startScreenY < _screenY || direction === DOWN && _this2._startScreenY > _screenY) {
                return;
            }
            if (_this2.isEdge(ele, direction)) {
                if (!_this2.state.dragOnEdge) {
                    _this2.setState({ dragOnEdge: true });
                }
                e.preventDefault();
                e.stopPropagation();
                var _diff = Math.round(_screenY - _this2._ScreenY);
                _this2._ScreenY = _screenY;
                _this2._lastScreenY += _diff;
                _this2.setContentStyle(_this2._lastScreenY);
                if (Math.abs(_this2._lastScreenY) < _this2.props.distanceToRefresh) {
                    if (_this2.state.currSt !== 'deactivate') {
                        // console.log('back to the distance');
                        _this2.setState({ currSt: 'deactivate' });
                    }
                } else {
                    if (_this2.state.currSt === 'deactivate') {
                        // console.log('reach to the distance');
                        _this2.setState({ currSt: 'activate' });
                    }
                }
                // https://github.com/ant-design/ant-design-mobile/issues/573#issuecomment-339560829
                // iOS UIWebView issue, It seems no problem in WKWebView
                if (isWebView && e.changedTouches[0].clientY < 0) {
                  document.body.style.background = '#ccc'
                    _this2.onTouchEnd();
                }
            }
        };
        _this2.onTouchEnd = function () {
            if (_this2.state.dragOnEdge) {
                _this2.setState({ dragOnEdge: false });
            }
            if (_this2.state.currSt === 'activate') {
                _this2.setState({ currSt: 'release' });
                _this2._timer = setTimeout(function () {
                    if (!_this2.props.refreshing) {
                        _this2.setState({ currSt: 'finish' }, function () {
                            return _this2.reset();
                        });
                    }
                    _this2._timer = undefined;
                }, 1000);
                _this2.props.onRefresh();
            } else {
                _this2.reset();
            }
        };
        _this2.reset = function () {
            _this2._lastScreenY = 0;
            _this2.setContentStyle(0);
        };
        _this2.setContentStyle = function (ty) {
            // todos: Why sometimes do not have `this.contentRef` ?
            if (_this2.contentRef) {
                setTransform(_this2.contentRef.style, 'translate3d(0px,' + ty + 'px,0)');
            }
        };
        return _this2;
    }

    __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(PullToRefresh, [{
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps) {
            this.shouldUpdateChildren = this.props.children !== nextProps.children;
            return true;
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps) {
            if (prevProps === this.props || prevProps.refreshing === this.props.refreshing) {
                return;
            }
            // triggerPullToRefresh 需要尽可能减少 setState 次数
            this.triggerPullToRefresh();
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this3 = this;

            // `getScrollContainer` most likely return React.Node at the next tick. Need setTimeout
            setTimeout(function () {
                _this3.init(_this3.props.getScrollContainer() || _this3.containerRef);
                _this3.triggerPullToRefresh();
            });
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            // Should have no setTimeout here!
            this.destroy(this.props.getScrollContainer() || this.containerRef);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this4 = this;

            var _a = this.props,
                className = _a.className,
                prefixCls = _a.prefixCls,
                children = _a.children,
                getScrollContainer = _a.getScrollContainer,
                direction = _a.direction,
                onRefresh = _a.onRefresh,
                refreshing = _a.refreshing,
                indicator = _a.indicator,
                distanceToRefresh = _a.distanceToRefresh,
                restProps = __rest(_a, ["className", "prefixCls", "children", "getScrollContainer", "direction", "onRefresh", "refreshing", "indicator", "distanceToRefresh"]);
            var renderChildren = __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(StaticRenderer, { shouldUpdate: this.shouldUpdateChildren, render: function render() {
                    return children;
                } });
            var renderRefresh = function renderRefresh(cls) {
                var cla = __WEBPACK_IMPORTED_MODULE_6_classnames___default()(cls, !_this4.state.dragOnEdge && prefixCls + '-transition');
                return __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
                    'div',
                    { className: prefixCls + '-content-wrapper' },
                    __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
                        'div',
                        { className: cla, ref: function ref(el) {
                                return _this4.contentRef = el;
                            } },
                        direction === UP ? renderChildren : null,
                        __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
                            'div',
                            { className: prefixCls + '-indicator' },
                            indicator[_this4.state.currSt] || INDICATOR[_this4.state.currSt]
                        ),
                        direction === DOWN ? renderChildren : null
                    )
                );
            };
            if (getScrollContainer()) {
                return renderRefresh(prefixCls + '-content ' + prefixCls + '-' + direction);
            }
            return __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
                'div',
                __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({ ref: function ref(el) {
                        return _this4.containerRef = el;
                    }, className: __WEBPACK_IMPORTED_MODULE_6_classnames___default()(className, prefixCls, prefixCls + '-' + direction) }, restProps),
                renderRefresh(prefixCls + '-content')
            );
        }
    }]);

    return PullToRefresh;
}(__WEBPACK_IMPORTED_MODULE_5_react___default.a.Component);

/* harmony default export */ __webpack_exports__["a"] = (PullToRefresh);

PullToRefresh.defaultProps = {
    prefixCls: 'rmc-pull-to-refresh',
    getScrollContainer: function getScrollContainer() {
        return undefined;
    },
    direction: DOWN,
    distanceToRefresh: 25,
    indicator: INDICATOR
};


/***/ }),

/***/ 311:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__PullToRefresh__ = __webpack_require__(310);

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__PullToRefresh__["a" /* default */]);

/***/ }),

/***/ 319:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(166);


/***/ })

},[319]);
//# sourceMappingURL=pullToRefresh.js.map