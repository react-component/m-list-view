webpackJsonp([5],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(315);


/***/ }),

/***/ 302:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.myData = exports.Thumb = exports.TouchableOpacity = exports.TouchableHighlight = exports.THUMB_URLS = undefined;
	
	var _classCallCheck2 = __webpack_require__(2);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(3);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(72);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _extends2 = __webpack_require__(265);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _objectWithoutProperties2 = __webpack_require__(270);
	
	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
	
	exports.Text = Text;
	exports.Image = Image;
	exports.View = View;
	
	var _react = __webpack_require__(81);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
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
	
	var THUMB_URLS = exports.THUMB_URLS = [like, dislike, call, fist, bandaged, flowers, heart, liking, party, poke, superlike, victory];
	
	function Text(props) {
	  return _react2.default.createElement(
	    'span',
	    props,
	    props.children
	  );
	}
	function Image(props) {
	  return _react2.default.createElement('img', {
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
	  return _react2.default.createElement(
	    'div',
	    props,
	    props.children
	  );
	}
	
	var TouchableHighlight = function TouchableHighlight(props) {
	  var onPress = props.onPress,
	      children = props.children,
	      restProps = (0, _objectWithoutProperties3.default)(props, ['onPress', 'children']);
	
	  return _react2.default.createElement(
	    'div',
	    (0, _extends3.default)({}, restProps, { onClick: onPress }),
	    children
	  );
	};
	exports.TouchableHighlight = TouchableHighlight;
	var TouchableOpacity = exports.TouchableOpacity = TouchableHighlight;
	
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
	
	var Thumb = exports.Thumb = function (_React$Component) {
	  (0, _inherits3.default)(Thumb, _React$Component);
	
	  function Thumb(props) {
	    (0, _classCallCheck3.default)(this, Thumb);
	
	    var _this = (0, _possibleConstructorReturn3.default)(this, _React$Component.call(this, props));
	
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
	
	  Thumb.prototype.componentWillMount = function componentWillMount() {
	    // UIManager.setLayoutAnimationEnabledExperimental &&
	    //   UIManager.setLayoutAnimationEnabledExperimental(true);
	  };
	
	  Thumb.prototype.render = function render() {
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
	    return _react2.default.createElement(
	      TouchableOpacity,
	      {
	        onPress: this._onPressThumb,
	        style: flattenStyle([buttonContents, { flexDirection: this.state.dir }])
	      },
	      _react2.default.createElement(Image, { source: THUMB_URLS[this.state.thumbIndex] }),
	      _react2.default.createElement(Image, { source: THUMB_URLS[this.state.thumbIndex] }),
	      _react2.default.createElement(Image, { source: THUMB_URLS[this.state.thumbIndex] }),
	      this.state.dir === 'column' ? _react2.default.createElement(
	        Text,
	        null,
	        'Oooo, Let me keep typing here so it wraps at least one line.'
	      ) : _react2.default.createElement(Text, null)
	    );
	  };
	
	  return Thumb;
	}(_react2.default.Component);
	
	var myData = exports.myData = [{
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

/***/ 305:
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _from = __webpack_require__(306);
	
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

/***/ 306:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(307), __esModule: true };

/***/ }),

/***/ 307:
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(7);
	__webpack_require__(308);
	module.exports = __webpack_require__(15).Array.from;

/***/ }),

/***/ 308:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	var ctx            = __webpack_require__(16)
	  , $export        = __webpack_require__(13)
	  , toObject       = __webpack_require__(50)
	  , call           = __webpack_require__(309)
	  , isArrayIter    = __webpack_require__(310)
	  , toLength       = __webpack_require__(40)
	  , createProperty = __webpack_require__(311)
	  , getIterFn      = __webpack_require__(312);
	
	$export($export.S + $export.F * !__webpack_require__(314)(function(iter){ Array.from(iter); }), 'Array', {
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


/***/ }),

/***/ 309:
/***/ (function(module, exports, __webpack_require__) {

	// call something on iterator step with safe closing on error
	var anObject = __webpack_require__(20);
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

/***/ 310:
/***/ (function(module, exports, __webpack_require__) {

	// check on default Array iterator
	var Iterators  = __webpack_require__(30)
	  , ITERATOR   = __webpack_require__(48)('iterator')
	  , ArrayProto = Array.prototype;
	
	module.exports = function(it){
	  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
	};

/***/ }),

/***/ 311:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	var $defineProperty = __webpack_require__(19)
	  , createDesc      = __webpack_require__(27);
	
	module.exports = function(object, index, value){
	  if(index in object)$defineProperty.f(object, index, createDesc(0, value));
	  else object[index] = value;
	};

/***/ }),

/***/ 312:
/***/ (function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(313)
	  , ITERATOR  = __webpack_require__(48)('iterator')
	  , Iterators = __webpack_require__(30);
	module.exports = __webpack_require__(15).getIteratorMethod = function(it){
	  if(it != undefined)return it[ITERATOR]
	    || it['@@iterator']
	    || Iterators[classof(it)];
	};

/***/ }),

/***/ 313:
/***/ (function(module, exports, __webpack_require__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(38)
	  , TAG = __webpack_require__(48)('toStringTag')
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

/***/ 314:
/***/ (function(module, exports, __webpack_require__) {

	var ITERATOR     = __webpack_require__(48)('iterator')
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

/***/ 315:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _toConsumableArray2 = __webpack_require__(305);
	
	var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);
	
	var _classCallCheck2 = __webpack_require__(2);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(3);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(72);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	__webpack_require__(80);
	
	var _react = __webpack_require__(81);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(116);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _rmcListView = __webpack_require__(262);
	
	var _rmcListView2 = _interopRequireDefault(_rmcListView);
	
	var _util = __webpack_require__(302);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/* eslint no-dupe-keys: 0, no-mixed-operators: 0 */
	
	var index = _util.myData.length - 1;
	var pageIndex = 0;
	
	var Demo = function (_React$Component) {
	  (0, _inherits3.default)(Demo, _React$Component);
	
	  function Demo(props) {
	    (0, _classCallCheck3.default)(this, Demo);
	
	    var _this = (0, _possibleConstructorReturn3.default)(this, _React$Component.call(this, props));
	
	    _this.onAjax = function () {
	      setTimeout(function () {
	        _this.initData = ['ref' + pageIndex++].concat((0, _toConsumableArray3.default)(_this.initData));
	        _this.setState({
	          dataSource: _this.state.dataSource.cloneWithRows(_this.initData),
	          refreshing: false
	        });
	      }, 1000);
	    };
	
	    var dataSource = new _rmcListView2.default.DataSource({
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
	
	  Demo.prototype.render = function render() {
	    var _this2 = this;
	
	    return _react2.default.createElement(_rmcListView2.default, {
	      dataSource: this.state.dataSource,
	      renderHeader: function renderHeader() {
	        return _react2.default.createElement(
	          'div',
	          null,
	          _react2.default.createElement(
	            'button',
	            { onClick: function onClick() {
	                return _this2.setState({ refreshing: true });
	              } },
	            '\u70B9\u51FB\u81EA\u52A8\u5237\u65B0'
	          ),
	          _react2.default.createElement(
	            'div',
	            { style: { fontSize: 14, color: '#bbb' } },
	            '\u6B64\u5904\u4E0D\u80FD\u624B\u52A8\u5237\u65B0'
	          )
	        );
	      },
	      renderRow: function renderRow(rowData, sectionID, rowID) {
	        if (index < 0) {
	          index = _util.myData.length - 1;
	        }
	        var obj = _util.myData[index--];
	        return _react2.default.createElement(
	          'div',
	          { key: rowID, style: { padding: '8px 16px' } },
	          _react2.default.createElement(
	            'h3',
	            null,
	            obj.title
	          ),
	          _react2.default.createElement(
	            'div',
	            { style: { display: 'flex' } },
	            _react2.default.createElement('img', { style: { height: 64, marginRight: 8 }, src: obj.img }),
	            _react2.default.createElement(
	              'div',
	              { style: { display: 'inline-block' } },
	              _react2.default.createElement(
	                'div',
	                null,
	                rowData,
	                '-',
	                obj.des
	              ),
	              _react2.default.createElement(
	                'div',
	                { style: { color: '#FF6E27', marginTop: 15 } },
	                '35'
	              )
	            )
	          )
	        );
	      },
	      renderSeparator: function renderSeparator(sectionID, rowID) {
	        return _react2.default.createElement('div', { key: sectionID + '-' + rowID, style: { backgroundColor: '#F5F5F9', height: 8 } });
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
	      refreshControl: _react2.default.createElement(_rmcListView2.default.RefreshControl, {
	        className: 'my-refresh-control',
	        refreshing: this.state.refreshing,
	        onRefresh: this.onAjax,
	        resistance: 1
	      })
	    });
	  };
	
	  return Demo;
	}(_react2.default.Component);
	
	_reactDom2.default.render(_react2.default.createElement(Demo, null), document.getElementById('__react-content'));

/***/ })

});
//# sourceMappingURL=refreshControl-auto.js.map