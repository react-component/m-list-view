webpackJsonp([5],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(302);


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

/***/ },

/***/ 302:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(40);
	
	var _react = __webpack_require__(41);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(74);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _rmcListView = __webpack_require__(212);
	
	var _rmcListView2 = _interopRequireDefault(_rmcListView);
	
	var _util = __webpack_require__(289);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _genRows(pressData) {
	  var dataBlob = [];
	  for (var ii = 0; ii < 30; ii++) {
	    dataBlob.push('Row ' + (ii + pressData[ii] ? ' (pressed)' : ''));
	  }
	  return dataBlob;
	} // use jsx to render html, do not modify simple.html
	
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
	  render: function render() {
	    return _react2.default.createElement(_rmcListView2.default, {
	      style: { height: 200 },
	      dataSource: this.state.dataSource,
	      onEndReached: function onEndReached(e) {
	        return alert(e.toString());
	      },
	      onEndReachedThreshold: 10,
	      scrollEventThrottle: 20,
	      scrollRenderAheadDistance: 100,
	      initialListSize: 5,
	      pageSize: 5,
	      renderRow: function renderRow(rowData, sectionID, rowID, highlightRow) {
	        return _react2.default.createElement(
	          _util.View,
	          { style: { display: 'flex', alignItems: 'center' } },
	          _react2.default.createElement(_util.Image, { style: { width: 64, height: 64 }, source: _util.THUMB_URLS[0] }),
	          _react2.default.createElement(
	            _util.Text,
	            null,
	            rowData + ' - Lorem ipsum dolor sit amet'
	          )
	        );
	      },
	      renderSeparator: function renderSeparator(sectionID, rowID, adjacentRowHighlighted) {
	        return _react2.default.createElement(_util.View, { key: sectionID + '-' + rowID,
	          style: {
	            height: adjacentRowHighlighted ? 4 : 1,
	            backgroundColor: adjacentRowHighlighted ? '#3B5998' : '#CCCCCC'
	          }
	        });
	      },
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