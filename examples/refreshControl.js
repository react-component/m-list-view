webpackJsonp([0],{

/***/ 13:
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_extends__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_objectWithoutProperties__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_objectWithoutProperties___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_objectWithoutProperties__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_react__);






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
  return __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
    'span',
    props,
    props.children
  );
}
function Image(props) {
  return __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement('img', {
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
  return __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
    'div',
    props,
    props.children
  );
}


var TouchableHighlight = function TouchableHighlight(props) {
  var onPress = props.onPress,
      children = props.children,
      restProps = __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_objectWithoutProperties___default()(props, ['onPress', 'children']);

  return __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
    'div',
    __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_extends___default()({}, restProps, { onClick: onPress }),
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
  __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits___default()(Thumb, _React$Component);

  function Thumb(props) {
    __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, Thumb);

    var _this = __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default()(this, (Thumb.__proto__ || Object.getPrototypeOf(Thumb)).call(this, props));

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

  __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(Thumb, [{
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
      return __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
        TouchableOpacity,
        {
          onPress: this._onPressThumb,
          style: flattenStyle([buttonContents, { flexDirection: this.state.dir }])
        },
        __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(Image, { source: THUMB_URLS[this.state.thumbIndex] }),
        __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(Image, { source: THUMB_URLS[this.state.thumbIndex] }),
        __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(Image, { source: THUMB_URLS[this.state.thumbIndex] }),
        this.state.dir === 'column' ? __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
          Text,
          null,
          'Oooo, Let me keep typing here so it wraps at least one line.'
        ) : __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(Text, null)
      );
    }
  }]);

  return Thumb;
}(__WEBPACK_IMPORTED_MODULE_6_react___default.a.Component);

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

/***/ }),

/***/ 159:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rmc_list_view_assets_index_less__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rmc_list_view_assets_index_less___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rmc_list_view_assets_index_less__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_react_dom__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_react_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rmc_list_view__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__util__ = __webpack_require__(13);





/* eslint-disable no-console */





/* eslint no-dupe-keys: 0, no-mixed-operators: 0 */

var index = __WEBPACK_IMPORTED_MODULE_9__util__["e" /* myData */].length - 1;
var pageIndex = 0;

var Demo = function (_React$Component) {
  __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default()(Demo, _React$Component);

  function Demo(props) {
    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, Demo);

    var _this = __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default()(this, (Demo.__proto__ || Object.getPrototypeOf(Demo)).call(this, props));

    _this.onRefresh = function () {
      console.log('onRefresh');
      _this.setState({ refreshing: true });
      _this.onAjax();
    };

    _this.onAjax = function () {
      setTimeout(function () {
        _this.initData = ['ref' + pageIndex++].concat(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default()(_this.initData));
        _this.setState({
          dataSource: _this.state.dataSource.cloneWithRows(_this.initData),
          refreshing: false
        });
      }, 1000);
    };

    var dataSource = new __WEBPACK_IMPORTED_MODULE_8_rmc_list_view__["a" /* default */].DataSource({
      rowHasChanged: function rowHasChanged(row1, row2) {
        return row1 !== row2;
      }
    });

    _this.initData = [];
    for (var i = 0; i < 20; i++) {
      _this.initData.push('r' + i);
    }
    _this.state = {
      dataSource: dataSource.cloneWithRows(_this.initData),
      refreshing: false
    };
    return _this;
  }

  __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(Demo, [{
    key: 'render',
    value: function render() {
      return __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_8_rmc_list_view__["a" /* default */], {
        dataSource: this.state.dataSource,
        renderHeader: function renderHeader() {
          return __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
            'div',
            null,
            '\u6CE8\u610F\u5BF9\u6BD4\u548C refreshControl-auto \u7684\u7528\u6CD5\u5DEE\u5F02'
          );
        },
        renderRow: function renderRow(rowData, sectionID, rowID) {
          if (index < 0) {
            index = __WEBPACK_IMPORTED_MODULE_9__util__["e" /* myData */].length - 1;
          }
          var obj = __WEBPACK_IMPORTED_MODULE_9__util__["e" /* myData */][index--];
          return __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
            'div',
            { key: rowID, style: { padding: '8px 16px' } },
            __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
              'h3',
              null,
              obj.title
            ),
            __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
              'div',
              { style: { display: 'flex' } },
              __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement('img', { style: { height: 64, marginRight: 8 }, src: obj.img }),
              __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
                'div',
                { style: { display: 'inline-block' } },
                __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
                  'div',
                  null,
                  rowData,
                  '-',
                  obj.des
                ),
                __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
                  'div',
                  { style: { color: '#FF6E27', marginTop: 15 } },
                  '35'
                )
              )
            )
          );
        },
        renderSeparator: function renderSeparator(sectionID, rowID) {
          return __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement('div', { key: sectionID + '-' + rowID, style: { backgroundColor: '#F5F5F9', height: 8 } });
        },
        initialListSize: 5,
        pageSize: 5,
        scrollRenderAheadDistance: 200,
        scrollEventThrottle: 20,
        style: {
          height: 400,
          border: '1px solid #ddd',
          margin: '10px 0'
        },
        useZscroller: true,
        scrollerOptions: { scrollbars: true },
        refreshControl: __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_8_rmc_list_view__["a" /* default */].RefreshControl, {
          className: 'my-refresh-control',
          refreshing: this.state.refreshing,
          onRefresh: this.onRefresh,
          resistance: 1
        })
      });
    }
  }]);

  return Demo;
}(__WEBPACK_IMPORTED_MODULE_6_react___default.a.Component);

__WEBPACK_IMPORTED_MODULE_7_react_dom___default.a.render(__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(Demo, null), document.getElementById('__react-content'));

/***/ }),

/***/ 327:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(159);


/***/ }),

/***/ 64:
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(67), __esModule: true };

/***/ }),

/***/ 66:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _from = __webpack_require__(64);

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

/***/ 67:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(88);
__webpack_require__(87);
module.exports = __webpack_require__(19).Array.from;

/***/ }),

/***/ 68:
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(52)
  , TAG = __webpack_require__(14)('toStringTag')
  // ES3 wrong here
  , ARG = cof(function(){ return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function(it, key){
  try {
    return it[key];
  } catch(e){ /* empty */ }
};

module.exports = function(it){
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

/***/ 69:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__(25)
  , createDesc      = __webpack_require__(40);

module.exports = function(object, index, value){
  if(index in object)$defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};

/***/ }),

/***/ 72:
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators  = __webpack_require__(33)
  , ITERATOR   = __webpack_require__(14)('iterator')
  , ArrayProto = Array.prototype;

module.exports = function(it){
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};

/***/ }),

/***/ 73:
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(30);
module.exports = function(iterator, fn, value, entries){
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch(e){
    var ret = iterator['return'];
    if(ret !== undefined)anObject(ret.call(iterator));
    throw e;
  }
};

/***/ }),

/***/ 74:
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR     = __webpack_require__(14)('iterator')
  , SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function(){ SAFE_CLOSING = true; };
  Array.from(riter, function(){ throw 2; });
} catch(e){ /* empty */ }

module.exports = function(exec, skipClosing){
  if(!skipClosing && !SAFE_CLOSING)return false;
  var safe = false;
  try {
    var arr  = [7]
      , iter = arr[ITERATOR]();
    iter.next = function(){ return {done: safe = true}; };
    arr[ITERATOR] = function(){ return iter; };
    exec(arr);
  } catch(e){ /* empty */ }
  return safe;
};

/***/ }),

/***/ 86:
/***/ (function(module, exports, __webpack_require__) {

var classof   = __webpack_require__(68)
  , ITERATOR  = __webpack_require__(14)('iterator')
  , Iterators = __webpack_require__(33);
module.exports = __webpack_require__(19).getIteratorMethod = function(it){
  if(it != undefined)return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};

/***/ }),

/***/ 87:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx            = __webpack_require__(53)
  , $export        = __webpack_require__(27)
  , toObject       = __webpack_require__(55)
  , call           = __webpack_require__(73)
  , isArrayIter    = __webpack_require__(72)
  , toLength       = __webpack_require__(82)
  , createProperty = __webpack_require__(69)
  , getIterFn      = __webpack_require__(86);

$export($export.S + $export.F * !__webpack_require__(74)(function(iter){ Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike/*, mapfn = undefined, thisArg = undefined*/){
    var O       = toObject(arrayLike)
      , C       = typeof this == 'function' ? this : Array
      , aLen    = arguments.length
      , mapfn   = aLen > 1 ? arguments[1] : undefined
      , mapping = mapfn !== undefined
      , index   = 0
      , iterFn  = getIterFn(O)
      , length, result, step, iterator;
    if(mapping)mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if(iterFn != undefined && !(C == Array && isArrayIter(iterFn))){
      for(iterator = iterFn.call(O), result = new C; !(step = iterator.next()).done; index++){
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for(result = new C(length); length > index; index++){
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});


/***/ })

},[327]);
//# sourceMappingURL=refreshControl.js.map