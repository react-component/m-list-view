webpackJsonp([4],{

/***/ 107:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rmc_list_view_assets_index_less__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rmc_list_view_assets_index_less___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rmc_list_view_assets_index_less__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_dom__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rmc_list_view__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__util__ = __webpack_require__(9);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* eslint-disable no-console */





/* eslint no-dupe-keys: 0, no-mixed-operators: 0 */

var index = __WEBPACK_IMPORTED_MODULE_4__util__["e" /* myData */].length - 1;

var NUM_ROWS = 20;
var pageIndex = 0;

function genData() {
  var pIndex = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

  var dataArr = [];
  for (var i = 0; i < NUM_ROWS; i++) {
    dataArr.push('row - ' + (pIndex * NUM_ROWS + i));
  }
  return dataArr;
}

var Demo = function (_React$Component) {
  _inherits(Demo, _React$Component);

  function Demo(props) {
    _classCallCheck(this, Demo);

    var _this = _possibleConstructorReturn(this, (Demo.__proto__ || Object.getPrototypeOf(Demo)).call(this, props));

    _this.onScroll = function (e) {
      // onScroll will trigger on container touchstart, ref https://github.com/yiminghe/zscroller/blob/a67854c8dc0a1fda15acae4ffdb08e65aac79fb3/src/DOMScroller.js#L229
      _this.st = e.scroller.getValues().top;
      _this.domScroller = e;
    };

    _this.onRefresh = function () {
      console.log('onRefresh');
      if (!_this.manuallyRefresh) {
        _this.setState({ refreshing: true });
      } else {
        _this.manuallyRefresh = false;
      }

      // simulate initial Ajax
      setTimeout(function () {
        _this.rData = genData();
        _this.setState({
          dataSource: _this.state.dataSource.cloneWithRows(_this.rData),
          refreshing: false
        });
      }, 600);
    };

    _this.onEndReached = function (event) {
      // load new data
      // hasMore: from backend data, indicates whether it is the last page, here is false
      if (_this.state.isLoading && !_this.state.hasMore) {
        return;
      }
      console.log('reach end', event);
      _this.setState({ isLoading: true });
      setTimeout(function () {
        _this.rData = [].concat(_toConsumableArray(_this.rData), _toConsumableArray(genData(++pageIndex)));
        _this.setState({
          dataSource: _this.state.dataSource.cloneWithRows(_this.rData),
          isLoading: false
        });
      }, 1000);
    };

    var dataSource = new __WEBPACK_IMPORTED_MODULE_3_rmc_list_view__["a" /* default */].DataSource({
      rowHasChanged: function rowHasChanged(row1, row2) {
        return row1 !== row2;
      }
    });

    _this.state = {
      dataSource: dataSource,
      refreshing: true
    };
    return _this;
  }

  // If you use redux, the data maybe at props, you need use `componentWillReceiveProps`
  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.dataSource !== this.props.dataSource) {
  //     this.setState({
  //       dataSource: this.state.dataSource.cloneWithRows(nextProps.dataSource),
  //     });
  //   }
  // }

  _createClass(Demo, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      // handle https://github.com/ant-design/ant-design-mobile/issues/1588
      this.lv.getInnerViewNode().addEventListener('touchstart', this.ts = function (e) {
        _this2.tsPageY = e.touches[0].pageY;
      });
      this.lv.getInnerViewNode().addEventListener('touchmove', this.tm = function (e) {
        _this2.tmPageY = e.touches[0].pageY;
        if (_this2.tmPageY > _this2.tsPageY && _this2.st <= 0 && document.body.scrollTop > 0) {
          console.log('start pull to refresh');
          _this2.domScroller.options.preventDefaultOnTouchMove = false;
        } else {
          _this2.domScroller.options.preventDefaultOnTouchMove = undefined;
        }
      });
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.lv.getInnerViewNode().removeEventListener('touchstart', this.ts);
      this.lv.getInnerViewNode().removeEventListener('touchmove', this.tm);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      return __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_rmc_list_view__["a" /* default */], {
        ref: function ref(el) {
          return _this3.lv = el;
        },
        dataSource: this.state.dataSource,
        renderHeader: function renderHeader() {
          return __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
            'span',
            null,
            'Pull to refresh'
          );
        },
        renderRow: function renderRow(rowData, sectionID, rowID) {
          if (index < 0) {
            index = __WEBPACK_IMPORTED_MODULE_4__util__["e" /* myData */].length - 1;
          }
          var obj = __WEBPACK_IMPORTED_MODULE_4__util__["e" /* myData */][index--];
          return __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
            'div',
            { key: rowID, style: { padding: '8px 16px' } },
            __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
              'h3',
              null,
              obj.title
            ),
            __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
              'div',
              { style: { display: 'flex' } },
              __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement('img', { style: { height: 64, marginRight: 8 }, src: obj.img }),
              __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
                'div',
                { style: { display: 'inline-block' } },
                __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
                  'div',
                  null,
                  rowData,
                  '-',
                  obj.des
                ),
                __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
                  'div',
                  { style: { color: '#FF6E27', marginTop: 15 } },
                  rowID
                )
              )
            )
          );
        },
        renderSeparator: function renderSeparator(sectionID, rowID) {
          return __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement('div', { key: sectionID + '-' + rowID, style: { backgroundColor: '#F5F5F9', height: 8 } });
        },
        initialListSize: 5,
        pageSize: 5,
        style: {
          height: 400,
          border: '1px solid #ddd',
          margin: '10px 0'
        },
        useZscroller: true,
        scrollerOptions: {
          scrollbars: true, scrollingComplete: function scrollingComplete() {
            return console.log('scrollingComplete');
          }
        },
        refreshControl: __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_rmc_list_view__["a" /* default */].RefreshControl, {
          className: 'my-refresh-control',
          refreshing: this.state.refreshing,
          onRefresh: this.onRefresh,
          resistance: 1
        }),
        onScroll: this.onScroll,
        scrollRenderAheadDistance: 200,
        scrollEventThrottle: 20,
        onEndReached: this.onEndReached,
        onEndReachedThreshold: 10
      });
    }
  }]);

  return Demo;
}(__WEBPACK_IMPORTED_MODULE_1_react___default.a.Component);

__WEBPACK_IMPORTED_MODULE_2_react_dom___default.a.render(__WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(Demo, null), document.getElementById('__react-content'));

/***/ }),

/***/ 265:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(107);


/***/ }),

/***/ 9:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return THUMB_URLS; });
/* harmony export (immutable) */ __webpack_exports__["d"] = Text;
/* harmony export (immutable) */ __webpack_exports__["b"] = Image;
/* harmony export (immutable) */ __webpack_exports__["a"] = View;
/* unused harmony export TouchableHighlight */
/* unused harmony export TouchableOpacity */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return Thumb; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return myData; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var victory = 'https://os.alipayobjects.com/rmsportal/kwihkdUVljwUURM.png';
var superlike = 'https://os.alipayobjects.com/rmsportal/pmXtSKUFLsIEJLh.png';
var poke = 'https://os.alipayobjects.com/rmsportal/ZlYzyBcrtLqnbjN.png';
var party = 'https://os.alipayobjects.com/rmsportal/mIrghdvucaPOLhc.png';
var liking = 'https://os.alipayobjects.com/rmsportal/DrcLpisGZWASeoj.png';
var like = 'https://os.alipayobjects.com/rmsportal/jloFMiDVGaHrHIO.png';
var heart = 'https://os.alipayobjects.com/rmsportal/QFjTyLzmuJQIflm.png';
var flowers = 'https://os.alipayobjects.com/rmsportal/rgahTjFqZATwqqL.png';
var fist = 'https://os.alipayobjects.com/rmsportal/KcyBnnVZlfIDgci.png';
var dislike = 'https://os.alipayobjects.com/rmsportal/FmMzrxqOhiogBOX.png';
var call = 'https://os.alipayobjects.com/rmsportal/TKlynYhJACDNwKw.png';
var bandaged = 'https://os.alipayobjects.com/rmsportal/htJwTSIUpppWwSb.png';

var THUMB_URLS = [like, dislike, call, fist, bandaged, flowers, heart, liking, party, poke, superlike, victory];

function Text(props) {
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'span',
    props,
    props.children
  );
}
function Image(props) {
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('img', {
    style: {
      width: 64,
      height: 64,
      marginHorizontal: 10,
      backgroundColor: 'transparent'
    },
    src: props.source
  });
}
function View(props) {
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'div',
    props,
    props.children
  );
}


var TouchableHighlight = function TouchableHighlight(props) {
  var onPress = props.onPress,
      children = props.children,
      restProps = _objectWithoutProperties(props, ['onPress', 'children']);

  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'div',
    _extends({}, restProps, { onClick: onPress }),
    children
  );
};

var TouchableOpacity = TouchableHighlight;

function flattenStyle(style, processor) {
  if (!style) {
    return undefined;
  }

  if (!Array.isArray(style)) {
    return processor && processor(style) || style;
  }
  var result = {};
  for (var i = 0; i < style.length; ++i) {
    var computedStyle = flattenStyle(style[i]);
    if (computedStyle) {
      for (var key in computedStyle) {
        if (computedStyle.hasOwnProperty(key)) {
          result[key] = computedStyle[key];
        }
      }
    }
  }

  return processor && processor(result) || result;
}

/* eslint react/prop-types: 0, no-multi-comp: 0 */
var Thumb = function (_React$Component) {
  _inherits(Thumb, _React$Component);

  function Thumb(props) {
    _classCallCheck(this, Thumb);

    var _this = _possibleConstructorReturn(this, (Thumb.__proto__ || Object.getPrototypeOf(Thumb)).call(this, props));

    _this._getThumbIdx = function () {
      return Math.floor(Math.random() * THUMB_URLS.length);
    };

    _this._onPressThumb = function () {
      _this.setState({
        thumbIndex: _this._getThumbIdx(),
        dir: _this.state.dir === 'row' ? 'column' : 'row'
      });
    };

    _this.state = { thumbIndex: _this._getThumbIdx(), dir: 'row' };
    return _this;
  }

  _createClass(Thumb, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      // UIManager.setLayoutAnimationEnabledExperimental &&
      //   UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }, {
    key: 'render',
    value: function render() {
      var buttonContents = {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 5,
        marginVertical: 3,
        padding: 5,
        backgroundColor: '#EAEAEA',
        borderRadius: 3,
        paddingVertical: 10
      };
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        TouchableOpacity,
        {
          onPress: this._onPressThumb,
          style: flattenStyle([buttonContents, { flexDirection: this.state.dir }])
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(Image, { source: THUMB_URLS[this.state.thumbIndex] }),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(Image, { source: THUMB_URLS[this.state.thumbIndex] }),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(Image, { source: THUMB_URLS[this.state.thumbIndex] }),
        this.state.dir === 'column' ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          Text,
          null,
          'Oooo, Let me keep typing here so it wraps at least one line.'
        ) : __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(Text, null)
      );
    }
  }]);

  return Thumb;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

var myData = [{
  img: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
  title: '相约酒店',
  des: '不是所有的兼职汪都需要风吹日晒'
}, {
  img: 'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png',
  title: '麦当劳邀您过周末',
  des: '不是所有的兼职汪都需要风吹日晒'
}, {
  img: 'https://zos.alipayobjects.com/rmsportal/hfVtzEhPzTUewPm.png',
  title: '食惠周',
  des: '不是所有的兼职汪都需要风吹日晒'
}];

/***/ })

},[265]);
//# sourceMappingURL=refreshControl.js.map