webpackJsonp([0],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },

/***/ 1:
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
	
	var _MyScroller = __webpack_require__(289);
	
	var _MyScroller2 = _interopRequireDefault(_MyScroller);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var NUM_SECTIONS = 20;
	var NUM_ROWS_PER_SECTION = 10;
	
	var Demo = _react2.default.createClass({
	  displayName: 'Demo',
	  getInitialState: function getInitialState() {
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
	
	    return {
	      dataSource: dataSource.cloneWithRowsAndSections({}, [], []),
	      headerPressCount: 0
	    };
	  },
	  componentDidMount: function componentDidMount() {
	    var _this = this;
	
	    // simulate ajax
	    setTimeout(function () {
	      var dataBlob = {};
	      var sectionIDs = [];
	      var rowIDs = [];
	      for (var ii = 0; ii < NUM_SECTIONS; ii++) {
	        var sectionName = String.fromCharCode(65 + ii);
	        sectionIDs.push(sectionName);
	        dataBlob[sectionName] = sectionName;
	        rowIDs[ii] = [];
	
	        for (var jj = 0; jj < NUM_ROWS_PER_SECTION; jj++) {
	          var rowName = 'S' + ii + ', R' + jj;
	          rowIDs[ii].push(rowName);
	          dataBlob[rowName] = rowName;
	        }
	      }
	      _this.setState({
	        dataSource: _this.state.dataSource.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs)
	      });
	    }, 1000);
	  },
	  render: function render() {
	    return _react2.default.createElement(
	      'div',
	      { style: { margin: '10px auto', width: '80%', position: 'relative' } },
	      _react2.default.createElement(_rmcListView2.default.IndexedList, {
	        dataSource: this.state.dataSource,
	        renderHeader: function renderHeader() {
	          return _react2.default.createElement(
	            'span',
	            { style: { padding: 10 } },
	            'header'
	          );
	        },
	        renderFooter: function renderFooter() {
	          return _react2.default.createElement(
	            'span',
	            { style: { padding: 10 } },
	            'footer'
	          );
	        },
	        renderSectionHeader: function renderSectionHeader(sectionData) {
	          return _react2.default.createElement(
	            'div',
	            { style: { color: 'blue', padding: 10, backgroundColor: '#ddd' } },
	            sectionData
	          );
	        },
	        renderRow: function renderRow(rowData) {
	          return _react2.default.createElement(
	            'div',
	            { style: { padding: 10 } },
	            'Hello: ',
	            rowData
	          );
	        },
	        renderScrollComponent: function renderScrollComponent(props) {
	          return _react2.default.createElement(_MyScroller2.default, (0, _extends3.default)({}, props, { style: { height: 600, overflow: 'auto' } }));
	        },
	        quickSearchBarStyle: {
	          position: 'absolute',
	          top: 20, right: 30
	        },
	        onQuickSearch: function onQuickSearch(sectionID) {
	          return console.log(sectionID);
	        },
	        delayTime: 1000,
	        delayActivityIndicator: _react2.default.createElement(
	          'div',
	          { style: { padding: 25, textAlign: 'center' } },
	          'delay rendering...'
	        )
	      })
	    );
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
	
	var _react = __webpack_require__(41);
	
	var React = _interopRequireWildcard(_react);
	
	var _reactDom = __webpack_require__(74);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
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
	
	exports.default = React.createClass({
	  displayName: 'MyScroller',
	  componentDidMount: function componentDidMount() {
	    this.__handleScroll = this._handleScroll();
	    _reactDom2.default.findDOMNode(this.refs[SCROLLVIEW]).addEventListener('scroll', this.__handleScroll);
	  },
	  componentWillUnmount: function componentWillUnmount() {
	    _reactDom2.default.findDOMNode(this.refs[SCROLLVIEW]).removeEventListener('scroll', this.__handleScroll);
	  },
	  handleScroll: function handleScroll(e) {
	    var _props$onScroll = this.props.onScroll;
	    var onScroll = _props$onScroll === undefined ? function (ev) {} : _props$onScroll;
	
	    onScroll(e);
	  },
	  _handleScroll: function _handleScroll(e) {
	    var handleScroll = function handleScroll(ev) {};
	    // let handleScroll = this.handleScroll;
	    if (this.props.scrollEventThrottle && this.props.onScroll) {
	      handleScroll = throttle(this.handleScroll, this.props.scrollEventThrottle);
	    }
	    return handleScroll;
	  },
	  render: function render() {
	    var _props = this.props;
	    var children = _props.children;
	    var className = _props.className;
	    var style = _props.style;
	
	    var divProps = { className: className, style: style };
	    return React.cloneElement(React.createElement('div', { ref: SCROLLVIEW }), divProps, children);
	  }
	});
	module.exports = exports['default'];

/***/ }

});
//# sourceMappingURL=indexed.js.map