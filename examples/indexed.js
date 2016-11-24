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
	
	var _reactDom = __webpack_require__(72);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _rmcListView = __webpack_require__(218);
	
	var _rmcListView2 = _interopRequireDefault(_rmcListView);
	
	var _MyScroller = __webpack_require__(292);
	
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
	          return _react2.default.createElement(_MyScroller2.default, (0, _extends3.default)({}, props, {
	            style: { height: 500, overflow: 'auto' } }));
	        },
	        contentContainerStyle: { textAlign: 'left' },
	        quickSearchBarStyle: {
	          position: 'absolute',
	          top: 20, right: 30
	        },
	        onQuickSearch: function onQuickSearch(sectionID) {
	          return console.log(sectionID);
	        },
	        showQuickSearchIndicator: true,
	        delayTime: 100,
	        delayActivityIndicator: _react2.default.createElement(
	          'div',
	          { style: { padding: 25, textAlign: 'center' } },
	          'delay rendering...'
	        ),
	        sectionHeaderClassName: 'sh',
	        sectionBodyClassName: 'sb'
	      })
	    );
	  }
	});
	
	_reactDom2.default.render(_react2.default.createElement(Demo, null), document.getElementById('__react-content'));

/***/ },

/***/ 292:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _classCallCheck2 = __webpack_require__(222);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(223);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(259);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _react = __webpack_require__(41);
	
	var React = _interopRequireWildcard(_react);
	
	var _reactDom = __webpack_require__(72);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _zscroller = __webpack_require__(274);
	
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
	      var _this$props$onScroll = _this.props.onScroll,
	          onScroll = _this$props$onScroll === undefined ? function (ev) {} : _this$props$onScroll;
	
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
	    var _props = this.props,
	        children = _props.children,
	        className = _props.className,
	        _props$style = _props.style,
	        style = _props$style === undefined ? {} : _props$style,
	        contentContainerStyle = _props.contentContainerStyle,
	        useZscroller = _props.useZscroller;
	
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

/***/ }

});
//# sourceMappingURL=indexed.js.map