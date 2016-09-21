webpackJsonp([4],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(298);


/***/ },

/***/ 298:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _defineProperty2 = __webpack_require__(286);
	
	var _defineProperty3 = _interopRequireDefault(_defineProperty2);
	
	var _toConsumableArray2 = __webpack_require__(299);
	
	var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);
	
	__webpack_require__(40);
	
	var _react = __webpack_require__(41);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(74);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _rmcListView = __webpack_require__(212);
	
	var _rmcListView2 = _interopRequireDefault(_rmcListView);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// use jsx to render html, do not modify simple.html
	
	var data = [{
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
	var index = data.length - 1;
	
	var pageIndex = 0;
	
	var App = _react2.default.createClass({
	  displayName: 'App',
	  getInitialState: function getInitialState() {
	    var dataSource = new _rmcListView2.default.DataSource({
	      rowHasChanged: function rowHasChanged(row1, row2) {
	        return row1 !== row2;
	      }
	    });
	
	    this.initData = [];
	    for (var i = 0; i < 20; i++) {
	      this.initData.push('r' + i);
	    }
	    return {
	      dataSource: dataSource.cloneWithRows(this.initData),
	      refreshing: false,
	      manual: false
	    };
	  },
	  onRefresh: function onRefresh() {
	    console.log('onRefresh');
	    this.setState({ refreshing: true });
	    this.onAjax();
	  },
	  onAjax: function onAjax() {
	    var _this = this;
	
	    setTimeout(function () {
	      _this.initData = ['ref' + pageIndex++].concat((0, _toConsumableArray3.default)(_this.initData));
	      _this.setState({
	        dataSource: _this.state.dataSource.cloneWithRows(_this.initData),
	        refreshing: false
	      });
	    }, 1000);
	  },
	  onManual: function onManual() {
	    this.setState({
	      manual: true
	    });
	    console.log('onManual');
	    this.setState({ refreshing: true });
	  },
	  onScroll: function onScroll() {
	    console.log('sss');
	  },
	  render: function render() {
	    var _this2 = this;
	
	    var separator = function separator(sectionID, rowID) {
	      return _react2.default.createElement('div', { key: sectionID + '-' + rowID, style: {
	          backgroundColor: '#F5F5F9',
	          height: 8,
	          borderTop: '1px solid #ECECED',
	          borderBottom: '1px solid #ECECED'
	        } });
	    };
	    var row = function row(rowData, sectionID, rowID) {
	      if (index < 0) {
	        index = data.length - 1;
	      }
	      var obj = data[index--];
	      return _react2.default.createElement(
	        'div',
	        { key: rowID,
	          style: {
	            padding: '8px 16px',
	            backgroundColor: 'white'
	          }
	        },
	        _react2.default.createElement(
	          'h3',
	          { style: {
	              padding: 2,
	              marginBottom: 8,
	              borderBottom: '1px solid #F6F6F6'
	            } },
	          obj.title
	        ),
	        _react2.default.createElement(
	          'div',
	          { style: (0, _defineProperty3.default)({ display: '-webkit-box' }, 'display', 'flex') },
	          _react2.default.createElement('img', { style: { height: 64 * (window.viewportScale || 1), marginRight: 8 }, src: obj.img }),
	          _react2.default.createElement(
	            'div',
	            { style: { display: 'inline-block' } },
	            _react2.default.createElement(
	              'p',
	              null,
	              obj.des,
	              '-',
	              rowData
	            ),
	            _react2.default.createElement(
	              'p',
	              null,
	              _react2.default.createElement(
	                'span',
	                { style: { fontSize: '1.6em', color: '#FF6E27' } },
	                '35'
	              ),
	              '元/任务'
	            )
	          )
	        )
	      );
	    };
	    return _react2.default.createElement(_rmcListView2.default, {
	      dataSource: this.state.dataSource,
	      renderHeader: function renderHeader() {
	        return _react2.default.createElement(
	          'div',
	          null,
	          _react2.default.createElement(
	            'button',
	            { onClick: _this2.onManual },
	            '点击刷新'
	          ),
	          _react2.default.createElement(
	            'button',
	            { onClick: function onClick() {
	                return _this2.setState({ manual: false });
	              } },
	            '手动刷新'
	          )
	        );
	      },
	      renderRow: row,
	      renderSeparator: separator,
	      initialListSize: 5,
	      pageSize: 5,
	      scrollRenderAheadDistance: 200,
	      scrollEventThrottle: 20,
	      onScroll: this.onScroll,
	      style: {
	        height: 400,
	        border: '1px solid #ddd',
	        margin: '10px 0'
	      },
	      useZscroller: true,
	      scrollerOptions: { scrollbars: true },
	      refreshControl: _react2.default.createElement(_rmcListView2.default.RefreshControl, {
	        refreshing: this.state.refreshing,
	        onRefresh: this.state.manual ? this.onAjax : this.onRefresh,
	        resistance: 1
	      })
	    });
	  }
	});
	
	_reactDom2.default.render(_react2.default.createElement(App, null), document.getElementById('__react-content'));

/***/ },

/***/ 299:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _from = __webpack_require__(300);
	
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

/***/ },

/***/ 300:
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(301), __esModule: true };

/***/ },

/***/ 301:
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(221);
	__webpack_require__(302);
	module.exports = __webpack_require__(8).Array.from;

/***/ },

/***/ 302:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ctx            = __webpack_require__(9)
	  , $export        = __webpack_require__(6)
	  , toObject       = __webpack_require__(39)
	  , call           = __webpack_require__(303)
	  , isArrayIter    = __webpack_require__(304)
	  , toLength       = __webpack_require__(30)
	  , createProperty = __webpack_require__(305)
	  , getIterFn      = __webpack_require__(306);
	
	$export($export.S + $export.F * !__webpack_require__(308)(function(iter){ Array.from(iter); }), 'Array', {
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


/***/ },

/***/ 303:
/***/ function(module, exports, __webpack_require__) {

	// call something on iterator step with safe closing on error
	var anObject = __webpack_require__(13);
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

/***/ },

/***/ 304:
/***/ function(module, exports, __webpack_require__) {

	// check on default Array iterator
	var Iterators  = __webpack_require__(226)
	  , ITERATOR   = __webpack_require__(232)('iterator')
	  , ArrayProto = Array.prototype;
	
	module.exports = function(it){
	  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
	};

/***/ },

/***/ 305:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $defineProperty = __webpack_require__(12)
	  , createDesc      = __webpack_require__(20);
	
	module.exports = function(object, index, value){
	  if(index in object)$defineProperty.f(object, index, createDesc(0, value));
	  else object[index] = value;
	};

/***/ },

/***/ 306:
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(307)
	  , ITERATOR  = __webpack_require__(232)('iterator')
	  , Iterators = __webpack_require__(226);
	module.exports = __webpack_require__(8).getIteratorMethod = function(it){
	  if(it != undefined)return it[ITERATOR]
	    || it['@@iterator']
	    || Iterators[classof(it)];
	};

/***/ },

/***/ 307:
/***/ function(module, exports, __webpack_require__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(27)
	  , TAG = __webpack_require__(232)('toStringTag')
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

/***/ },

/***/ 308:
/***/ function(module, exports, __webpack_require__) {

	var ITERATOR     = __webpack_require__(232)('iterator')
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

/***/ }

});
//# sourceMappingURL=refreshControl.js.map