webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(2);
	
	var _react = __webpack_require__(3);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(34);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _rmcListView = __webpack_require__(180);
	
	var _rmcListView2 = _interopRequireDefault(_rmcListView);
	
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
	        ref: 'lv',
	        style: { height: 500 },
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

/***/ }
]);
//# sourceMappingURL=indexed.js.map