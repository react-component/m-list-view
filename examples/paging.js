webpackJsonp([2],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(193);


/***/ },

/***/ 192:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Thumb = exports.pagingStyles = exports.styles = exports.TouchableOpacity = exports.TouchableHighlight = exports.LOREM_IPSUM = exports.THUMB_URLS = undefined;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	exports._genRows = _genRows;
	exports.hashCode = hashCode;
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
	
	function _genRows(pressData) {
	  var dataBlob = [];
	  for (var ii = 0; ii < 100; ii++) {
	    dataBlob.push('Row ' + (ii + pressData[ii] ? ' (pressed)' : ''));
	  }
	  return dataBlob;
	}
	
	function hashCode(str) {
	  var hash = 15;
	  for (var ii = str.length - 1; ii >= 0; ii--) {
	    hash = (hash << 5) - hash + str.charCodeAt(ii);
	  }
	  return hash;
	}
	
	var LOREM_IPSUM = exports.LOREM_IPSUM = 'Lorem ipsum dolor sit amet, ius ad pertinax oportere accommodare, an vix civibus corrumpit referrentur. Te nam case ludus inciderint, te mea facilisi adipiscing. Sea id integre luptatum. In tota sale consequuntur nec. Erat ocurreret mei ei. Eu paulo sapientem vulputate est, vel an accusam intellegam interesset. Nam eu stet pericula reprimique, ea vim illud modus, putant invidunt reprehendunt ne qui.';
	
	function Text(props) {
	  return _react2.default.createElement(
	    'span',
	    props,
	    props.children
	  );
	}
	function Image(props) {
	  return _react2.default.createElement('img', _extends({ src: props.source }, props));
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
	    var props = this.props;
	    return _react2.default.createElement(
	      'div',
	      _extends({}, props, { onClick: props.onPress }),
	      props.children
	    );
	  }
	});
	var TouchableOpacity = exports.TouchableOpacity = TouchableHighlight;
	
	var styles = exports.styles = {
	  row: {
	    flexDirection: 'row',
	    justifyContent: 'center',
	    padding: 10,
	    backgroundColor: '#F6F6F6'
	  },
	  thumb: {
	    width: 64,
	    height: 64
	  },
	  text: {
	    flex: 1
	  }
	};
	
	var pagingStyles = exports.pagingStyles = {
	  listview: {
	    height: '100%',
	    backgroundColor: '#B0C4DE'
	  },
	  header: {
	    height: 140,
	    justifyContent: 'center',
	    alignItems: 'center',
	    backgroundColor: '#3B5998',
	    flexDirection: 'row'
	  },
	  text: {
	    color: 'white',
	    paddingHorizontal: 8
	  },
	  rowText: {
	    color: '#888888'
	  },
	  thumbText: {
	    fontSize: 20,
	    color: '#888888'
	  },
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
	  img: {
	    width: 64,
	    height: 64,
	    marginHorizontal: 10,
	    backgroundColor: 'transparent'
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
	      _react2.default.createElement(Image, { style: pagingStyles.img, source: THUMB_URLS[this.state.thumbIndex] }),
	      _react2.default.createElement(Image, { style: pagingStyles.img, source: THUMB_URLS[this.state.thumbIndex] }),
	      _react2.default.createElement(Image, { style: pagingStyles.img, source: THUMB_URLS[this.state.thumbIndex] }),
	      this.state.dir === 'column' ? _react2.default.createElement(
	        Text,
	        null,
	        'Oooo, look at this new text!  So awesome it may just be crazy. Let me keep typing here so it wraps at least one line.'
	      ) : _react2.default.createElement(Text, null)
	    );
	  }
	});

/***/ },

/***/ 193:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(2);
	
	var _react = __webpack_require__(3);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(160);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _rmcListView = __webpack_require__(161);
	
	var _rmcListView2 = _interopRequireDefault(_rmcListView);
	
	var _util = __webpack_require__(192);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var NUM_SECTIONS = 20; // use jsx to render html, do not modify simple.html
	
	var NUM_ROWS_PER_SECTION = 10;
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
	      headerPressCount: 0
	    };
	  },
	  renderRow: function renderRow(rowData) {
	    return _react2.default.createElement(_util.Thumb, { text: rowData });
	  },
	  renderSectionHeader: function renderSectionHeader(sectionData) {
	    return _react2.default.createElement(
	      _util.View,
	      { style: _util.pagingStyles.section },
	      _react2.default.createElement(
	        _util.Text,
	        { style: _util.pagingStyles.text },
	        sectionData
	      )
	    );
	  },
	  renderHeader: function renderHeader() {
	    var headerLikeText = this.state.headerPressCount % 2 ? _react2.default.createElement(
	      _util.View,
	      null,
	      _react2.default.createElement(
	        _util.Text,
	        { style: _util.pagingStyles.text },
	        '1 Like'
	      )
	    ) : null;
	    return _react2.default.createElement(
	      _util.TouchableOpacity,
	      { onPress: this._onPressHeader, style: _util.pagingStyles.header },
	      headerLikeText,
	      _react2.default.createElement(
	        _util.View,
	        null,
	        _react2.default.createElement(
	          _util.Text,
	          { style: _util.pagingStyles.text },
	          'Table Header (click me)'
	        )
	      )
	    );
	  },
	  renderFooter: function renderFooter() {
	    return _react2.default.createElement(
	      _util.View,
	      { style: _util.pagingStyles.header },
	      _react2.default.createElement(
	        _util.Text,
	        { onPress: function onPress() {
	            return console.log('Footer!');
	          }, style: _util.pagingStyles.text },
	        'Table Footer'
	      )
	    );
	  },
	  componentDidMount: function componentDidMount() {
	    console.log(this.refs.lv);
	  },
	  render: function render() {
	    return _react2.default.createElement(
	      'div',
	      null,
	      _react2.default.createElement(_rmcListView2.default, { ref: 'lv',
	        style: _util.pagingStyles.listview,
	        dataSource: this.state.dataSource,
	        renderHeader: this.renderHeader,
	        renderFooter: this.renderFooter,
	        renderSectionHeader: this.renderSectionHeader,
	        renderRow: this.renderRow,
	        initialListSize: 10,
	        pageSize: 4,
	        scrollRenderAheadDistance: 500,
	        scrollEventThrottle: 100,
	        onScroll: function onScroll() {
	          console.log('scroll');
	        },
	        onEndReached: this._onEndReached,
	        onEndReachedThreshold: 500
	        // renderScrollComponent={props => <div className="for-scroll-demo" {...props} />}
	        , renderBodyComponent: function renderBodyComponent() {
	          return _react2.default.createElement('div', { className: 'for-body-demo' });
	        },
	        stickyHeader: true,
	        stickyProps: {
	          className: 'for-sticky-demo',
	          stickyStyle: { top: '10px' },
	          onStickyStateChange: this._onStickyStateChange
	        },
	        stickyContainerProps: {
	          className: 'for-stickyContainer-demo'
	        }
	      })
	    );
	  },
	  _onStickyStateChange: function _onStickyStateChange(isSticky) {
	    // console.log(isSticky);
	  },
	  _onPressHeader: function _onPressHeader() {
	    this.setState({ headerPressCount: this.state.headerPressCount + 1 });
	  },
	  _onEndReached: function _onEndReached(event) {
	    // load new data
	    console.log('reach end', event);
	    this._genData(++pageIndex);
	    this.setState({
	      dataSource: this.state.dataSource.cloneWithRowsAndSections(this.dataBlob, this.sectionIDs, this.rowIDs)
	    });
	  }
	});
	
	_reactDom2.default.render(_react2.default.createElement(Demo, null), document.getElementById('__react-content'));

/***/ }

});
//# sourceMappingURL=paging.js.map