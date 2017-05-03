webpackJsonp([7],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(317);


/***/ }),

/***/ 302:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Thumb = exports.TouchableOpacity = exports.TouchableHighlight = exports.THUMB_URLS = undefined;
	
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

/***/ }),

/***/ 317:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends2 = __webpack_require__(265);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
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
	
	var NUM_ROWS = 20;
	var pageIndex = 0;
	
	/* eslint react/prop-types: 0, react/no-multi-comp: 0 */
	
	var Demo = function (_React$Component) {
	  (0, _inherits3.default)(Demo, _React$Component);
	
	  function Demo(props) {
	    (0, _classCallCheck3.default)(this, Demo);
	
	    var _this = (0, _possibleConstructorReturn3.default)(this, _React$Component.call(this, props));
	
	    _this._onEndReached = function (event) {
	      // load new data
	      console.log('reach end', event);
	      _this.setState({ isLoading: true });
	      setTimeout(function () {
	        _this._data = (0, _extends3.default)({}, _this._data, _this._genData(++pageIndex));
	        _this.setState({
	          dataSource: _this.state.dataSource.cloneWithRows(_this._data),
	          isLoading: false
	        });
	      }, 1000);
	    };
	
	    var dataSource = new _rmcListView2.default.DataSource({
	      rowHasChanged: function rowHasChanged(row1, row2) {
	        return row1 !== row2;
	      }
	    });
	
	    _this._genData = function () {
	      var pIndex = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	
	      var dataBlob = {};
	      for (var i = 0; i < NUM_ROWS; i++) {
	        var ii = pIndex * NUM_ROWS + i;
	        dataBlob['' + ii] = 'row - ' + ii;
	      }
	      return dataBlob;
	    };
	    _this._data = {};
	    _this.state = {
	      dataSource: dataSource.cloneWithRows(_this._genData()),
	      isLoading: false,
	      destroy: false
	    };
	    return _this;
	  }
	
	  Demo.prototype.render = function render() {
	    var _this2 = this;
	
	    return _react2.default.createElement(
	      'div',
	      null,
	      _react2.default.createElement(
	        'button',
	        { style: { margin: 10 },
	          onClick: function onClick() {
	            return _this2.setState({ destroy: !_this2.state.destroy });
	          }
	        },
	        this.state.destroy ? 'create' : 'destroy',
	        ' ListView'
	      ),
	      !this.state.destroy ? _react2.default.createElement(_rmcListView2.default, { ref: 'lv',
	        dataSource: this.state.dataSource,
	        useBodyScroll: true,
	        renderHeader: function renderHeader() {
	          return _react2.default.createElement(
	            _util.View,
	            { style: { height: 90, backgroundColor: '#bbb' } },
	            _react2.default.createElement(
	              _util.Text,
	              null,
	              '\u8BBE\u7F6E\u4E86`useBodyScroll`\uFF0C\u4F7F\u7528 html body \u4F5C\u4E3A\u6EDA\u52A8\u5BB9\u5668'
	            )
	          );
	        },
	        renderFooter: function renderFooter() {
	          return _react2.default.createElement(
	            _util.View,
	            { style: {
	                backgroundColor: '#bbb', color: 'white',
	                padding: 30, textAlign: 'center'
	              }
	            },
	            _this2.state.isLoading ? 'loading...' : 'loaded'
	          );
	        },
	        renderBodyComponent: function renderBodyComponent() {
	          return _react2.default.createElement('div', { className: 'for-body-demo' });
	        },
	        renderSectionBodyWrapper: function renderSectionBodyWrapper(sectionID) {
	          return _react2.default.createElement(MySectionBodyWrapper, { key: sectionID });
	        },
	        renderRow: function renderRow(rowData) {
	          return _react2.default.createElement(
	            'tr',
	            { style: { height: 50 } },
	            _react2.default.createElement(
	              'td',
	              null,
	              rowData,
	              'Let me keep typing here so it wraps at least one line.'
	            )
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
	        onEndReachedThreshold: 100
	      }) : null,
	      _react2.default.createElement('div', { dangerouslySetInnerHTML: {
	          __html: '<style>\n        #qrcode{ display: none }\n        .highlight{ display: none }\n        </style>'
	        }
	      })
	    );
	  };
	
	  return Demo;
	}(_react2.default.Component);
	
	var MySectionBodyWrapper = function MySectionBodyWrapper(props) {
	  return _react2.default.createElement(
	    'table',
	    { className: 'my-section-body' },
	    _react2.default.createElement(
	      'thead',
	      null,
	      _react2.default.createElement(
	        'tr',
	        null,
	        _react2.default.createElement(
	          'td',
	          null,
	          'table title'
	        )
	      )
	    ),
	    _react2.default.createElement(
	      'tbody',
	      null,
	      props.children
	    )
	  );
	};
	
	_reactDom2.default.render(_react2.default.createElement(Demo, null), document.getElementById('__react-content'));

/***/ })

});
//# sourceMappingURL=simple-paging.js.map