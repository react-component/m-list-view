webpackJsonp([1],{

/***/ 110:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(6);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(26);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = __webpack_require__(13);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _channel = __webpack_require__(62);

var _channel2 = _interopRequireDefault(_channel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Container = function (_React$Component) {
  _inherits(Container, _React$Component);

  function Container(props) {
    _classCallCheck(this, Container);

    var _this = _possibleConstructorReturn(this, (Container.__proto__ || Object.getPrototypeOf(Container)).call(this, props));

    _this.updateOffset = function (_ref) {
      var inherited = _ref.inherited,
          offset = _ref.offset;

      _this.channel.update(function (data) {
        data.inherited = inherited + offset;
      });
    };

    _this.channel = new _channel2.default({ inherited: 0, offset: 0, node: null });
    return _this;
  }

  _createClass(Container, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return { 'sticky-channel': this.channel };
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      var parentChannel = this.context['sticky-channel'];
      if (parentChannel) parentChannel.subscribe(this.updateOffset);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var node = _reactDom2.default.findDOMNode(this);
      this.channel.update(function (data) {
        data.node = node;
      });
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.channel.update(function (data) {
        data.node = null;
      });

      var parentChannel = this.context['sticky-channel'];
      if (parentChannel) parentChannel.unsubscribe(this.updateOffset);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        this.props,
        this.props.children
      );
    }
  }]);

  return Container;
}(_react2.default.Component);

Container.contextTypes = {
  'sticky-channel': _propTypes2.default.any
};
Container.childContextTypes = {
  'sticky-channel': _propTypes2.default.any
};
exports.default = Container;
module.exports = exports['default'];

/***/ }),

/***/ 111:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Channel = exports.StickyContainer = exports.Sticky = undefined;

var _sticky = __webpack_require__(112);

var _sticky2 = _interopRequireDefault(_sticky);

var _container = __webpack_require__(110);

var _container2 = _interopRequireDefault(_container);

var _channel = __webpack_require__(62);

var _channel2 = _interopRequireDefault(_channel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Sticky = _sticky2.default;
exports.StickyContainer = _container2.default;
exports.Channel = _channel2.default;
exports.default = _sticky2.default;

/***/ }),

/***/ 112:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(6);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(26);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = __webpack_require__(13);

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Sticky = function (_React$Component) {
  _inherits(Sticky, _React$Component);

  function Sticky(props) {
    _classCallCheck(this, Sticky);

    var _this = _possibleConstructorReturn(this, (Sticky.__proto__ || Object.getPrototypeOf(Sticky)).call(this, props));

    _this.updateContext = function (_ref) {
      var inherited = _ref.inherited,
          node = _ref.node;

      _this.containerNode = node;
      _this.setState({
        containerOffset: inherited,
        distanceFromBottom: _this.getDistanceFromBottom()
      });
    };

    _this.recomputeState = function () {
      var isSticky = _this.isSticky();
      var height = _this.getHeight();
      var width = _this.getWidth();
      var xOffset = _this.getXOffset();
      var distanceFromBottom = _this.getDistanceFromBottom();
      var hasChanged = _this.state.isSticky !== isSticky;

      _this.setState({ isSticky: isSticky, height: height, width: width, xOffset: xOffset, distanceFromBottom: distanceFromBottom });

      if (hasChanged) {
        if (_this.channel) {
          _this.channel.update(function (data) {
            data.offset = isSticky ? _this.state.height : 0;
          });
        }

        _this.props.onStickyStateChange(isSticky);
      }
    };

    _this.state = {};
    return _this;
  }

  _createClass(Sticky, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.channel = this.context['sticky-channel'];
      this.channel.subscribe(this.updateContext);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.on(['resize', 'scroll', 'touchstart', 'touchmove', 'touchend', 'pageshow', 'load'], this.recomputeState);
      this.recomputeState();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps() {
      this.recomputeState();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.off(['resize', 'scroll', 'touchstart', 'touchmove', 'touchend', 'pageshow', 'load'], this.recomputeState);
      this.channel.unsubscribe(this.updateContext);
    }
  }, {
    key: 'getXOffset',
    value: function getXOffset() {
      return this.refs.placeholder.getBoundingClientRect().left;
    }
  }, {
    key: 'getWidth',
    value: function getWidth() {
      return this.refs.placeholder.getBoundingClientRect().width;
    }
  }, {
    key: 'getHeight',
    value: function getHeight() {
      return _reactDom2.default.findDOMNode(this.refs.children).getBoundingClientRect().height;
    }
  }, {
    key: 'getDistanceFromTop',
    value: function getDistanceFromTop() {
      return this.refs.placeholder.getBoundingClientRect().top;
    }
  }, {
    key: 'getDistanceFromBottom',
    value: function getDistanceFromBottom() {
      if (!this.containerNode) return 0;
      return this.containerNode.getBoundingClientRect().bottom;
    }
  }, {
    key: 'isSticky',
    value: function isSticky() {
      if (!this.props.isActive) return false;

      var fromTop = this.getDistanceFromTop();
      var fromBottom = this.getDistanceFromBottom();

      var topBreakpoint = this.state.containerOffset - this.props.topOffset;
      var bottomBreakpoint = this.state.containerOffset + this.props.bottomOffset;

      return fromTop <= topBreakpoint && fromBottom >= bottomBreakpoint;
    }
  }, {
    key: 'on',
    value: function on(events, callback) {
      events.forEach(function (evt) {
        window.addEventListener(evt, callback);
      });
    }
  }, {
    key: 'off',
    value: function off(events, callback) {
      events.forEach(function (evt) {
        window.removeEventListener(evt, callback);
      });
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(newProps, newState) {
      var _this2 = this;

      // Have we changed the number of props?
      var propNames = Object.keys(this.props);
      if (Object.keys(newProps).length != propNames.length) return true;

      // Have we changed any prop values?
      var valuesMatch = propNames.every(function (key) {
        return newProps.hasOwnProperty(key) && newProps[key] === _this2.props[key];
      });
      if (!valuesMatch) return true;

      // Have we changed any state that will always impact rendering?
      var state = this.state;
      if (newState.isSticky !== state.isSticky) return true;

      // If we are sticky, have we changed any state that will impact rendering?
      if (state.isSticky) {
        if (newState.height !== state.height) return true;
        if (newState.width !== state.width) return true;
        if (newState.xOffset !== state.xOffset) return true;
        if (newState.containerOffset !== state.containerOffset) return true;
        if (newState.distanceFromBottom !== state.distanceFromBottom) return true;
      }

      return false;
    }

    /*
     * The special sauce.
     */

  }, {
    key: 'render',
    value: function render() {
      var placeholderStyle = { paddingBottom: 0 };
      var className = this.props.className;

      // To ensure that this component becomes sticky immediately on mobile devices instead
      // of disappearing until the scroll event completes, we add `transform: translateZ(0)`
      // to 'kick' rendering of this element to the GPU
      // @see http://stackoverflow.com/questions/32875046
      var style = _extends({}, { transform: 'translateZ(0)' }, this.props.style);

      if (this.state.isSticky) {
        var _stickyStyle = {
          position: 'fixed',
          top: this.state.containerOffset,
          left: this.state.xOffset,
          width: this.state.width
        };

        var bottomLimit = this.state.distanceFromBottom - this.state.height - this.props.bottomOffset;
        if (this.state.containerOffset > bottomLimit) {
          _stickyStyle.top = bottomLimit;
        }

        placeholderStyle.paddingBottom = this.state.height;

        className += ' ' + this.props.stickyClassName;
        style = _extends({}, style, _stickyStyle, this.props.stickyStyle);
      }

      var _props = this.props,
          topOffset = _props.topOffset,
          isActive = _props.isActive,
          stickyClassName = _props.stickyClassName,
          stickyStyle = _props.stickyStyle,
          bottomOffset = _props.bottomOffset,
          onStickyStateChange = _props.onStickyStateChange,
          props = _objectWithoutProperties(_props, ['topOffset', 'isActive', 'stickyClassName', 'stickyStyle', 'bottomOffset', 'onStickyStateChange']);

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement('div', { ref: 'placeholder', style: placeholderStyle }),
        _react2.default.createElement(
          'div',
          _extends({}, props, { ref: 'children', className: className, style: style }),
          this.props.children
        )
      );
    }
  }]);

  return Sticky;
}(_react2.default.Component);

Sticky.propTypes = {
  isActive: _propTypes2.default.bool,
  className: _propTypes2.default.string,
  style: _propTypes2.default.object,
  stickyClassName: _propTypes2.default.string,
  stickyStyle: _propTypes2.default.object,
  topOffset: _propTypes2.default.number,
  bottomOffset: _propTypes2.default.number,
  onStickyStateChange: _propTypes2.default.func
};
Sticky.defaultProps = {
  isActive: true,
  className: '',
  style: {},
  stickyClassName: 'sticky',
  stickyStyle: {},
  topOffset: 0,
  bottomOffset: 0,
  onStickyStateChange: function onStickyStateChange() {}
};
Sticky.contextTypes = {
  'sticky-channel': _propTypes2.default.any
};
exports.default = Sticky;
module.exports = exports['default'];

/***/ }),

/***/ 162:
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_toConsumableArray__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_toConsumableArray___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_toConsumableArray__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__assets_index_less__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__assets_index_less___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__assets_index_less__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_react_dom__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_react_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__src__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_react_sticky__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_react_sticky___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_react_sticky__);





/* eslint-disable no-console */






var NUM_SECTIONS = 20;
var NUM_ROWS_PER_SECTION = 10;
var pageIndex = 0;

var dataBlobs = {};
var sectionIDs = [];
var rowIDs = [];
function genData() {
  var pIndex = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

  for (var i = 0; i < NUM_SECTIONS; i++) {
    var ii = pIndex * NUM_SECTIONS + i;
    var sectionName = 'Section ' + ii;
    sectionIDs.push(sectionName);
    dataBlobs[sectionName] = sectionName;
    rowIDs[ii] = [];

    for (var jj = 0; jj < NUM_ROWS_PER_SECTION; jj++) {
      var rowName = 'S' + ii + ', R' + jj;
      rowIDs[ii].push(rowName);
      dataBlobs[rowName] = rowName;
    }
  }
  sectionIDs = [].concat(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_toConsumableArray___default()(sectionIDs));
  rowIDs = [].concat(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_toConsumableArray___default()(rowIDs));
}

var Demo = function (_React$Component) {
  __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits___default()(Demo, _React$Component);

  function Demo(props) {
    __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, Demo);

    var _this = __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default()(this, (Demo.__proto__ || Object.getPrototypeOf(Demo)).call(this, props));

    _this.onEndReached = function (event) {
      console.log('fire onEndReached');
      // load new data
      // hasMore: from backend data, indicates whether it is the last page, here is false
      if (_this.state.isLoading && !_this.state.hasMore) {
        return;
      }
      console.log('reach end', event);
      _this.setState({ isLoading: true });
      setTimeout(function () {
        genData(++pageIndex);
        _this.setState({
          dataSource: _this.state.dataSource.cloneWithRowsAndSections(dataBlobs, sectionIDs, rowIDs),
          isLoading: false
        });
      }, 1000);
    };

    var getSectionData = function getSectionData(dataBlob, sectionID) {
      return dataBlob[sectionID];
    };
    var getRowData = function getRowData(dataBlob, sectionID, rowID) {
      return dataBlob[rowID];
    };

    var dataSource = new __WEBPACK_IMPORTED_MODULE_8__src__["a" /* default */].DataSource({
      getRowData: getRowData,
      getSectionHeaderData: getSectionData,
      rowHasChanged: function rowHasChanged(row1, row2) {
        return row1 !== row2;
      },
      sectionHeaderHasChanged: function sectionHeaderHasChanged(s1, s2) {
        return s1 !== s2;
      }
    });

    _this.state = {
      dataSource: dataSource,
      isLoading: true
    };
    return _this;
  }

  __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(Demo, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      // you can scroll to the specified position
      // setTimeout(() => this.lv.scrollTo(0, 120), 800);

      // simulate initial Ajax
      setTimeout(function () {
        genData();
        _this2.setState({
          dataSource: _this2.state.dataSource.cloneWithRowsAndSections(dataBlobs, sectionIDs, rowIDs),
          isLoading: false
        });
      }, 600);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      return __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
        'div',
        null,
        __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_8__src__["a" /* default */], {
          ref: function ref(el) {
            return _this3.lv = el;
          },
          dataSource: this.state.dataSource,
          useBodyScroll: true,
          renderSectionWrapper: function renderSectionWrapper(sectionID) {
            return __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_9_react_sticky__["StickyContainer"], {
              key: 's_' + sectionID + '_c', className: 'sticky-container', style: { zIndex: 4 }
            });
          },
          renderSectionHeader: function renderSectionHeader(sectionData) {
            return __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_9_react_sticky__["Sticky"],
              {
                className: 'sticky',
                style: {
                  zIndex: 3,
                  padding: 16,
                  backgroundColor: parseInt(sectionData.replace('Section ', ''), 10) % 2 ? '#5890ff' : '#F8591A',
                  color: 'white'
                },
                onStickyStateChange: function onStickyStateChange(isSticky) {
                  return console.log(isSticky);
                }
              },
              sectionData
            );
          },
          renderHeader: function renderHeader() {
            return __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
              'div',
              { style: { height: 90, backgroundColor: '#bbb' } },
              'Header'
            );
          },
          renderFooter: function renderFooter() {
            return __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
              'div',
              { style: { height: 90, backgroundColor: '#bbb' } },
              'Footer'
            );
          },
          renderRow: function renderRow(rowData) {
            return __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
              'div',
              { style: { padding: 16 } },
              rowData
            );
          },
          onEndReached: this.onEndReached,
          pageSize: 10
        }),
        __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement('div', { dangerouslySetInnerHTML: {
            __html: navigator.userAgent.match(/Android|iPhone|iPad|iPod/i) ? '<style>#qrcode, .highlight{ display: none }</style>' : ''
          }
        })
      );
    }
  }]);

  return Demo;
}(__WEBPACK_IMPORTED_MODULE_6_react___default.a.Component);

__WEBPACK_IMPORTED_MODULE_7_react_dom___default.a.render(__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(Demo, null), document.getElementById('__react-content'));

/***/ }),

/***/ 315:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(162);


/***/ }),

/***/ 42:
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(45), __esModule: true };

/***/ }),

/***/ 43:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _from = __webpack_require__(42);

var _from2 = _interopRequireDefault(_from);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  } else {
    return (0, _from2.default)(arr);
  }
};

/***/ }),

/***/ 45:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(70);
__webpack_require__(57);
module.exports = __webpack_require__(14).Array.from;


/***/ }),

/***/ 46:
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(47);
var TAG = __webpack_require__(7)('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),

/***/ 48:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__(18);
var createDesc = __webpack_require__(33);

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};


/***/ }),

/***/ 51:
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__(24);
var ITERATOR = __webpack_require__(7)('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),

/***/ 53:
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(28);
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),

/***/ 54:
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__(7)('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ }),

/***/ 56:
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(46);
var ITERATOR = __webpack_require__(7)('iterator');
var Iterators = __webpack_require__(24);
module.exports = __webpack_require__(14).getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),

/***/ 57:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx = __webpack_require__(49);
var $export = __webpack_require__(23);
var toObject = __webpack_require__(55);
var call = __webpack_require__(53);
var isArrayIter = __webpack_require__(51);
var toLength = __webpack_require__(68);
var createProperty = __webpack_require__(48);
var getIterFn = __webpack_require__(56);

$export($export.S + $export.F * !__webpack_require__(54)(function (iter) { Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});


/***/ }),

/***/ 62:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Channel = function Channel(data) {
  _classCallCheck(this, Channel);

  var listeners = [];
  data = data || {};

  this.subscribe = function (fn) {
    listeners.push(fn);
  };

  this.unsubscribe = function (fn) {
    var idx = listeners.indexOf(fn);
    if (idx !== -1) listeners.splice(idx, 1);
  };

  this.update = function (fn) {
    if (fn) fn(data);
    listeners.forEach(function (l) {
      return l(data);
    });
  };
};

exports.default = Channel;
module.exports = exports['default'];

/***/ })

},[315]);
//# sourceMappingURL=base-sticky.js.map