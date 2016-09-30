webpackJsonp([2],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(288);


/***/ },

/***/ 286:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _classCallCheck2 = __webpack_require__(216);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(217);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(253);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _react = __webpack_require__(41);
	
	var React = _interopRequireWildcard(_react);
	
	var _reactDom = __webpack_require__(74);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _zscroller = __webpack_require__(268);
	
	var _zscroller2 = _interopRequireDefault(_zscroller);
	
	var _objectAssign = __webpack_require__(44);
	
	var _objectAssign2 = _interopRequireDefault(_objectAssign);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var throttle = function throttle(fn, delay) {
	  var allowSample = true;
	  return function (e) {
	    if (allowSample) {
	      allowSample = false;
	      setTimeout(function () {
	        allowSample = true;
	      }, delay);
	      fn(e);
	    }
	  };
	};
	
	var SCROLLVIEW = 'ScrollView';
	var INNERVIEW = 'InnerScrollView';
	
	var MyScroller = function (_React$Component) {
	  (0, _inherits3.default)(MyScroller, _React$Component);
	
	  function MyScroller() {
	    var _temp, _this, _ret;
	
	    (0, _classCallCheck3.default)(this, MyScroller);
	
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }
	
	    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.handleScroll = function (e) {
	      var _this$props$onScroll = _this.props.onScroll;
	      var onScroll = _this$props$onScroll === undefined ? function (ev) {} : _this$props$onScroll;
	
	      onScroll(e);
	    }, _this.throttleScroll = function (e) {
	      var handleScroll = function handleScroll(ev) {};
	      if (_this.props.scrollEventThrottle && _this.props.onScroll) {
	        handleScroll = throttle(_this.handleScroll, _this.props.scrollEventThrottle);
	      }
	      return handleScroll;
	    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
	  }
	
	  MyScroller.prototype.componentDidMount = function componentDidMount() {
	    this.throttleScrollExec = this.throttleScroll();
	    if (this.props.useZscroller) {
	      this.domScroller = new _zscroller2.default(_reactDom2.default.findDOMNode(this.refs[INNERVIEW]), (0, _objectAssign2.default)({}, {
	        scrollingX: false,
	        onScroll: this.throttleScrollExec
	      }, this.props.scrollerOptions));
	    } else {
	      _reactDom2.default.findDOMNode(this.refs[SCROLLVIEW]).addEventListener('scroll', this.throttleScrollExec);
	    }
	  };
	
	  MyScroller.prototype.componentWillUnmount = function componentWillUnmount() {
	    if (this.props.useZscroller) {
	      this.domScroller.destroy();
	    } else {
	      _reactDom2.default.findDOMNode(this.refs[SCROLLVIEW]).removeEventListener('scroll', this.throttleScrollExec);
	    }
	  };
	
	  MyScroller.prototype.render = function render() {
	    var _props = this.props;
	    var children = _props.children;
	    var className = _props.className;
	    var _props$style = _props.style;
	    var style = _props$style === undefined ? {} : _props$style;
	    var contentContainerStyle = _props.contentContainerStyle;
	    var useZscroller = _props.useZscroller;
	
	    return React.cloneElement(React.createElement('div', { ref: SCROLLVIEW }), { className: className, style: useZscroller ? (0, _objectAssign2.default)({}, {
	        position: 'relative',
	        overflow: 'hidden',
	        flex: 1
	      }, style) : style }, React.createElement(
	      'div',
	      { ref: INNERVIEW, style: contentContainerStyle },
	      children
	    ));
	  };
	
	  return MyScroller;
	}(React.Component);
	
	exports.default = MyScroller;
	module.exports = exports['default'];

/***/ },

/***/ 288:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends2 = __webpack_require__(2);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	__webpack_require__(40);
	
	var _react = __webpack_require__(41);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(74);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _rmcListView = __webpack_require__(212);
	
	var _rmcListView2 = _interopRequireDefault(_rmcListView);
	
	var _util = __webpack_require__(289);
	
	var _MyScroller = __webpack_require__(286);
	
	var _MyScroller2 = _interopRequireDefault(_MyScroller);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// use jsx to render html, do not modify simple.html
	
	var NUM_SECTIONS = 5;
	var NUM_ROWS_PER_SECTION = 5;
	var pageIndex = 0;
	
	var Demo = _react2.default.createClass({
	  displayName: 'Demo',
	  getInitialState: function getInitialState() {
	    var _this = this;
	
	    var getSectionData = function getSectionData(dataBlob, sectionID) {
	      return dataBlob[sectionID];
	    };
	    var getRowData = function getRowData(dataBlob, sectionID, rowID) {
	      return dataBlob[rowID];
	    };
	
	    var dataSource = new _rmcListView2.default.DataSource({
	      getRowData: getRowData,
	      getSectionHeaderData: getSectionData,
	      rowHasChanged: function rowHasChanged(row1, row2) {
	        return row1 !== row2;
	      },
	      sectionHeaderHasChanged: function sectionHeaderHasChanged(s1, s2) {
	        return s1 !== s2;
	      }
	    });
	
	    this.dataBlob = {};
	    this.sectionIDs = [];
	    this.rowIDs = [];
	    this._genData = function () {
	      var pIndex = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
	
	      for (var i = 0; i < NUM_SECTIONS; i++) {
	        var ii = pIndex * NUM_SECTIONS + i;
	        var sectionName = 'Section ' + ii;
	        _this.sectionIDs.push(sectionName);
	        _this.dataBlob[sectionName] = sectionName;
	        _this.rowIDs[ii] = [];
	
	        for (var jj = 0; jj < NUM_ROWS_PER_SECTION; jj++) {
	          var rowName = 'S' + ii + ', R' + jj;
	          _this.rowIDs[ii].push(rowName);
	          _this.dataBlob[rowName] = rowName;
	        }
	      }
	      // new object ref
	      _this.sectionIDs = [].concat(_this.sectionIDs);
	      _this.rowIDs = [].concat(_this.rowIDs);
	    };
	    this._genData();
	    return {
	      dataSource: dataSource.cloneWithRowsAndSections(this.dataBlob, this.sectionIDs, this.rowIDs),
	      isLoading: false
	    };
	  },
	  _onEndReached: function _onEndReached(event) {
	    var _this2 = this;
	
	    // load new data
	    console.log('reach end', event);
	    this.setState({ isLoading: true });
	    setTimeout(function () {
	      _this2._genData(++pageIndex);
	      _this2.setState({
	        dataSource: _this2.state.dataSource.cloneWithRowsAndSections(_this2.dataBlob, _this2.sectionIDs, _this2.rowIDs),
	        isLoading: false
	      });
	    }, 1000);
	  },
	  render: function render() {
	    var _this3 = this;
	
	    return _react2.default.createElement(
	      'div',
	      { style: { margin: '10px auto', width: '80%' } },
	      _react2.default.createElement(_rmcListView2.default, { ref: 'lv',
	        dataSource: this.state.dataSource,
	        renderHeader: function renderHeader() {
	          return _react2.default.createElement(
	            _util.View,
	            { style: { height: 90, backgroundColor: '#bbb' } },
	            _react2.default.createElement(
	              _util.Text,
	              null,
	              'Table Header'
	            )
	          );
	        },
	        renderSectionHeader: function renderSectionHeader(sectionData) {
	          return _react2.default.createElement(
	            _util.View,
	            { style: {
	                flexDirection: 'column',
	                justifyContent: 'center',
	                alignItems: 'flex-start',
	                padding: 6,
	                backgroundColor: '#5890ff'
	              } },
	            _react2.default.createElement(
	              _util.Text,
	              { style: { color: 'white' } },
	              sectionData
	            )
	          );
	        },
	        renderRow: function renderRow(rowData) {
	          return _react2.default.createElement(_util.Thumb, { text: rowData });
	        },
	        renderFooter: function renderFooter() {
	          return _react2.default.createElement(
	            _util.View,
	            { style: {
	                backgroundColor: '#bbb', color: 'white',
	                padding: 30, textAlign: 'center'
	              } },
	            _this3.state.isLoading ? 'loading...' : 'loaded'
	          );
	        },
	        initialListSize: 10,
	        pageSize: 4,
	        scrollRenderAheadDistance: 500,
	        scrollEventThrottle: 20,
	        onScroll: function onScroll() {
	          console.log('scroll');
	        },
	        onEndReached: this._onEndReached,
	        onEndReachedThreshold: 10,
	        renderScrollComponent: function renderScrollComponent(props) {
	          return _react2.default.createElement(_MyScroller2.default, (0, _extends3.default)({}, props, {
	            style: { height: 300 } }));
	        },
	        useZscroller: true,
	        scrollerOptions: { scrollbars: true },
	        renderBodyComponent: function renderBodyComponent() {
	          return _react2.default.createElement('div', { className: 'for-body-demo' });
	        }
	      }),
	      _react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement(
	          'p',
	          null,
	          'note: temporary disable bodyScroll can have a better experience'
	        ),
	        _react2.default.createElement(
	          'button',
	          { onClick: function onClick() {
	              _this3._ctrlBodyScroll(true);
	            } },
	          'enableBodyScroll'
	        ),
	        ' ',
	        _react2.default.createElement(
	          'button',
	          { onClick: function onClick() {
	              _this3._ctrlBodyScroll(false);
	            }, style: { color: 'red' } },
	          'disableBodyScroll'
	        )
	      )
	    );
	  },
	  _ctrlBodyScroll: function _ctrlBodyScroll(flag) {
	    document.getElementsByTagName('body')[0].style.overflowY = flag ? 'auto' : 'hidden';
	  }
	});
	
	_reactDom2.default.render(_react2.default.createElement(Demo, null), document.getElementById('__react-content'));

/***/ },

/***/ 289:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Thumb = exports.TouchableOpacity = exports.TouchableHighlight = exports.THUMB_URLS = undefined;
	
	var _extends2 = __webpack_require__(2);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _objectWithoutProperties2 = __webpack_require__(215);
	
	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
	
	exports.Text = Text;
	exports.Image = Image;
	exports.View = View;
	
	var _react = __webpack_require__(41);
	
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
	
	var TouchableHighlight = exports.TouchableHighlight = _react2.default.createClass({
	  displayName: 'TouchableHighlight',
	  render: function render() {
	    var _props = this.props;
	    var onPress = _props.onPress;
	    var children = _props.children;
	    var restProps = (0, _objectWithoutProperties3.default)(_props, ['onPress', 'children']);
	
	    return _react2.default.createElement(
	      'div',
	      (0, _extends3.default)({}, restProps, { onClick: onPress }),
	      children
	    );
	  }
	});
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
	
	var Thumb = exports.Thumb = _react2.default.createClass({
	  displayName: 'Thumb',
	  getInitialState: function getInitialState() {
	    return { thumbIndex: this._getThumbIdx(), dir: 'row' };
	  },
	  componentWillMount: function componentWillMount() {
	    // UIManager.setLayoutAnimationEnabledExperimental &&
	    //   UIManager.setLayoutAnimationEnabledExperimental(true);
	  },
	  _getThumbIdx: function _getThumbIdx() {
	    return Math.floor(Math.random() * THUMB_URLS.length);
	  },
	  _onPressThumb: function _onPressThumb() {
	    this.setState({
	      thumbIndex: this._getThumbIdx(),
	      dir: this.state.dir === 'row' ? 'column' : 'row'
	    });
	  },
	  render: function render() {
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
	        style: flattenStyle([buttonContents, { flexDirection: this.state.dir }]) },
	      _react2.default.createElement(Image, { source: THUMB_URLS[this.state.thumbIndex] }),
	      _react2.default.createElement(Image, { source: THUMB_URLS[this.state.thumbIndex] }),
	      _react2.default.createElement(Image, { source: THUMB_URLS[this.state.thumbIndex] }),
	      this.state.dir === 'column' ? _react2.default.createElement(
	        Text,
	        null,
	        'Oooo, Let me keep typing here so it wraps at least one line.'
	      ) : _react2.default.createElement(Text, null)
	    );
	  }
	});

/***/ }

});
//# sourceMappingURL=paging.js.map