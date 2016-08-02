webpackJsonp([1],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(296);


/***/ },

/***/ 296:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends2 = __webpack_require__(180);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	__webpack_require__(2);
	
	var _react = __webpack_require__(3);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(37);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _rmcListView = __webpack_require__(177);
	
	var _rmcListView2 = _interopRequireDefault(_rmcListView);
	
	var _util = __webpack_require__(297);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var NUM_SECTIONS = 5; // use jsx to render html, do not modify simple.html
	
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
	            { style: _util.pagingStyles.section },
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
	          return _react2.default.createElement(MyScroller, (0, _extends3.default)({}, props, { style: { height: 300, overflow: 'auto' } }));
	        },
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
	
	var MyScroller = _react2.default.createClass({
	  displayName: 'MyScroller',
	  render: function render() {
	    var _props = this.props;
	    var children = _props.children;
	    var style = _props.style;
	    var onScroll = _props.onScroll;
	
	    var divProps = { style: style, onScroll: onScroll };
	    return _react2.default.createElement(
	      'div',
	      (0, _extends3.default)({ className: 'c-s' }, divProps),
	      children
	    );
	  }
	});
	
	_reactDom2.default.render(_react2.default.createElement(Demo, null), document.getElementById('__react-content'));

/***/ },

/***/ 297:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Thumb = exports.pagingStyles = exports.TouchableOpacity = exports.TouchableHighlight = exports.THUMB_URLS = undefined;
	
	var _extends2 = __webpack_require__(180);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _objectWithoutProperties2 = __webpack_require__(218);
	
	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
	
	exports.Text = Text;
	exports.Image = Image;
	exports.View = View;
	
	var _react = __webpack_require__(3);
	
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
	
	var pagingStyles = exports.pagingStyles = {
	  buttonContents: {
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
	  },
	  section: {
	    flexDirection: 'column',
	    justifyContent: 'center',
	    alignItems: 'flex-start',
	    padding: 6,
	    backgroundColor: '#5890ff'
	  }
	};
	
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
	    return _react2.default.createElement(
	      TouchableOpacity,
	      {
	        onPress: this._onPressThumb,
	        style: flattenStyle([pagingStyles.buttonContents, { flexDirection: this.state.dir }]) },
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