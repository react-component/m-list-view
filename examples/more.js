webpackJsonp([0],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },

/***/ 1:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(2);
	
	var _react = __webpack_require__(3);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(160);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _rmcListview = __webpack_require__(161);
	
	var _rmcListview2 = _interopRequireDefault(_rmcListview);
	
	var _util = __webpack_require__(180);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Demo = _react2.default.createClass({
	  displayName: 'Demo',
	
	  getInitialState: function getInitialState() {
	    var ds = new _rmcListview2.default.DataSource({ rowHasChanged: function rowHasChanged(r1, r2) {
	        return r1 !== r2;
	      } });
	    return {
	      dataSource: ds.cloneWithRows((0, _util._genRows)({}))
	    };
	  },
	
	  _pressData: {},
	
	  componentWillMount: function componentWillMount() {
	    this._pressData = {};
	  },
	
	  _renderRow: function _renderRow(rowData, sectionID, rowID, highlightRow) {
	    var _this = this;
	
	    var rowHash = Math.abs((0, _util.hashCode)(rowData));
	    var imgSource = _util.THUMB_URLS[rowHash % _util.THUMB_URLS.length];
	    return _react2.default.createElement(
	      _util.TouchableHighlight,
	      { onPress: function onPress() {
	          _this._pressRow(rowID);
	          highlightRow(sectionID, rowID);
	        } },
	      _react2.default.createElement(
	        _util.View,
	        null,
	        _react2.default.createElement(
	          _util.View,
	          { style: _util.styles.row },
	          _react2.default.createElement(_util.Image, { style: _util.styles.thumb, source: imgSource }),
	          _react2.default.createElement(
	            _util.Text,
	            { style: _util.styles.text },
	            rowData + ' - ' + _util.LOREM_IPSUM.substr(0, rowHash % 301 + 10)
	          )
	        )
	      )
	    );
	  },
	  _pressRow: function _pressRow(rowID) {
	    this._pressData[rowID] = !this._pressData[rowID];
	    this.setState({ dataSource: this.state.dataSource.cloneWithRows(this._genRows(this._pressData)) });
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
	    return _react2.default.createElement(_rmcListview2.default, {
	      dataSource: this.state.dataSource,
	      renderRow: this._renderRow,
	      renderScrollComponent: function renderScrollComponent(props) {
	        return _react2.default.createElement(_util.RecyclerViewBackedScrollView, props);
	      },
	      renderSeparator: this._renderSeperator
	    });
	  }
	}); // use jsx to render html, do not modify simple.html
	
	_reactDom2.default.render(_react2.default.createElement(Demo, null), document.getElementById('__react-content'));

/***/ },

/***/ 180:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.styles = exports.TouchableHighlight = exports.RecyclerViewBackedScrollView = exports.LOREM_IPSUM = exports.THUMB_URLS = undefined;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	exports._genRows = _genRows;
	exports.hashCode = hashCode;
	exports.Text = Text;
	exports.Image = Image;
	exports.View = View;
	
	var _react = __webpack_require__(3);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var THUMB_URLS = exports.THUMB_URLS = [];
	
	// require('./Thumbnails/like.png'),
	// require('./Thumbnails/dislike.png'),
	// require('./Thumbnails/call.png'),
	// require('./Thumbnails/fist.png'),
	// require('./Thumbnails/bandaged.png'),
	// require('./Thumbnails/flowers.png'),
	// require('./Thumbnails/heart.png'),
	// require('./Thumbnails/liking.png'),
	// require('./Thumbnails/party.png'),
	// require('./Thumbnails/poke.png'),
	// require('./Thumbnails/superlike.png'),
	// require('./Thumbnails/victory.png'),
	function _genRows(pressData) {
	  var dataBlob = [];
	  for (var ii = 0; ii < 100; ii++) {
	    var pressedText = pressData[ii] ? ' (pressed)' : '';
	    dataBlob.push('Row ' + ii + pressedText);
	  }
	  return dataBlob;
	}
	
	function hashCode(str) {
	  var hash = 15;
	  for (var ii = str.length - 1; ii >= 0; ii--) {
	    hash = (hash << 5) - hash + str.charCodeAt(ii);
	  }
	  return hash;
	};
	
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
	
	var RecyclerViewBackedScrollView = exports.RecyclerViewBackedScrollView = _react2.default.createClass({
	  displayName: 'RecyclerViewBackedScrollView',
	
	  render: function render() {
	    var props = this.props;
	    return _react2.default.createElement(
	      'div',
	      props,
	      props.children
	    );
	  }
	});
	
	var TouchableHighlight = exports.TouchableHighlight = _react2.default.createClass({
	  displayName: 'TouchableHighlight',
	
	  render: function render() {
	    var props = this.props;
	    return _react2.default.createElement(
	      'div',
	      props,
	      props.children
	    );
	  }
	});
	
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

/***/ }

});
//# sourceMappingURL=more.js.map