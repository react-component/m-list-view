webpackJsonp([5],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(295);


/***/ },

/***/ 292:
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

/***/ },

/***/ 295:
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
	
	var _util = __webpack_require__(292);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var NUM_ROWS = 20; // use jsx to render html, do not modify simple.html
	
	var pageIndex = 0;
	
	var Demo = _react2.default.createClass({
	  displayName: 'Demo',
	  getInitialState: function getInitialState() {
	    var dataSource = new _rmcListView2.default.DataSource({
	      rowHasChanged: function rowHasChanged(row1, row2) {
	        return row1 !== row2;
	      }
	    });
	
	    this._genData = function () {
	      var pIndex = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
	
	      var dataBlob = {};
	      for (var i = 0; i < NUM_ROWS; i++) {
	        var ii = pIndex * NUM_ROWS + i;
	        dataBlob['' + ii] = 'row - ' + ii;
	      }
	      return dataBlob;
	    };
	    this._data = {};
	    return {
	      dataSource: dataSource.cloneWithRows(this._genData()),
	      isLoading: false
	    };
	  },
	  _onEndReached: function _onEndReached(event) {
	    var _this = this;
	
	    // load new data
	    console.log('reach end', event);
	    this.setState({ isLoading: true });
	    setTimeout(function () {
	      _this._data = (0, _extends3.default)({}, _this._data, _this._genData(++pageIndex));
	      _this.setState({
	        dataSource: _this.state.dataSource.cloneWithRows(_this._data),
	        isLoading: false
	      });
	    }, 1000);
	  },
	  render: function render() {
	    var _this2 = this;
	
	    return _react2.default.createElement(
	      'div',
	      null,
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
	        renderFooter: function renderFooter() {
	          return _react2.default.createElement(
	            _util.View,
	            { style: {
	                backgroundColor: '#bbb', color: 'white',
	                padding: 30, textAlign: 'center'
	              } },
	            _this2.state.isLoading ? 'loading...' : 'loaded'
	          );
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
	              ' Let me keep typing here so it wraps at least one line.'
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
	        useBodyScroll: true,
	        onEndReached: this._onEndReached,
	        onEndReachedThreshold: 100
	      }),
	      _react2.default.createElement('div', { dangerouslySetInnerHTML: {
	          __html: '<style>\n        #qrcode{ display: none }\n        .highlight{ display: none }\n        </style>'
	        } })
	    );
	  }
	});
	var MySectionBodyWrapper = _react2.default.createClass({
	  displayName: 'MySectionBodyWrapper',
	  render: function render() {
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
	        this.props.children
	      )
	    );
	  }
	});
	
	_reactDom2.default.render(_react2.default.createElement(Demo, null), document.getElementById('__react-content'));

/***/ }

});
//# sourceMappingURL=simple-paging.js.map