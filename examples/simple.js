webpackJsonp([4],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(301);


/***/ },

/***/ 299:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Thumb = exports.TouchableOpacity = exports.TouchableHighlight = exports.THUMB_URLS = undefined;
	
	var _extends2 = __webpack_require__(2);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _objectWithoutProperties2 = __webpack_require__(218);
	
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

/***/ 301:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(40);
	
	var _react = __webpack_require__(41);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(75);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _rmcListView = __webpack_require__(215);
	
	var _rmcListView2 = _interopRequireDefault(_rmcListView);
	
	var _util = __webpack_require__(299);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var styles = {
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
	}; // use jsx to render html, do not modify simple.html
	
	function _genRows(pressData) {
	  var dataBlob = [];
	  for (var ii = 0; ii < 20; ii++) {
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
	
	var Demo = _react2.default.createClass({
	  displayName: 'Demo',
	  getInitialState: function getInitialState() {
	    var ds = new _rmcListView2.default.DataSource({ rowHasChanged: function rowHasChanged(r1, r2) {
	        return r1 !== r2;
	      } });
	    return {
	      dataSource: ds.cloneWithRows(_genRows({}))
	    };
	  },
	
	
	  _pressData: {},
	
	  componentWillMount: function componentWillMount() {
	    this._pressData = {};
	  },
	  _renderRow: function _renderRow(rowData, sectionID, rowID, highlightRow) {
	    var _this = this;
	
	    var rowHash = Math.abs(hashCode(rowData));
	    var imgSource = _util.THUMB_URLS[rowHash % _util.THUMB_URLS.length];
	    return _react2.default.createElement(
	      _util.TouchableHighlight,
	      { onPress: function onPress() {
	          _this._pressData[rowID] = !_this._pressData[rowID];
	          _this.setState({ dataSource: _this.state.dataSource.cloneWithRows(_genRows(_this._pressData)) });
	          highlightRow(sectionID, rowID);
	        } },
	      _react2.default.createElement(
	        _util.View,
	        null,
	        _react2.default.createElement(
	          _util.View,
	          { style: styles.row },
	          _react2.default.createElement(_util.Image, { style: styles.thumb, source: imgSource }),
	          _react2.default.createElement(
	            _util.Text,
	            { style: styles.text },
	            rowData + ' - Lorem ipsum dolor sit amet'
	          )
	        )
	      )
	    );
	  },
	  _renderSeperator: function _renderSeperator(sectionID, rowID, adjacentRowHighlighted) {
	    return _react2.default.createElement(_util.View, {
	      key: sectionID + '-' + rowID,
	      style: {
	        height: adjacentRowHighlighted ? 4 : 1,
	        backgroundColor: adjacentRowHighlighted ? '#3B5998' : '#CCCCCC'
	      }
	    });
	  },
	  render: function render() {
	    return _react2.default.createElement(_rmcListView2.default, {
	      style: { height: 300 },
	      dataSource: this.state.dataSource,
	      onEndReached: function onEndReached(e) {
	        return alert(e.toString());
	      },
	      onEndReachedThreshold: 10,
	      scrollEventThrottle: 20,
	      pageSize: 5,
	      renderRow: this._renderRow,
	      renderSeparator: this._renderSeperator,
	      renderBodyComponent: function renderBodyComponent() {
	        return _react2.default.createElement('div', { className: 'for-body-demo' });
	      }
	    });
	  }
	});
	
	_reactDom2.default.render(_react2.default.createElement(Demo, null), document.getElementById('__react-content'));

/***/ }

});
//# sourceMappingURL=simple.js.map