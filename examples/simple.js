webpackJsonp([3],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(194);


/***/ },

/***/ 194:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(2);
	
	var _rmcListView = __webpack_require__(161);
	
	var _rmcListView2 = _interopRequireDefault(_rmcListView);
	
	var _react = __webpack_require__(3);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(160);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// use jsx to render html, do not modify simple.html
	
	var styles = {
	  display: 'flex',
	  height: 60,
	  margin: 10,
	  border: '1px solid #ccc'
	};
	
	var Demo = _react2.default.createClass({
	  displayName: 'Demo',
	
	  getInitialState: function getInitialState() {
	    var ds = new _rmcListView2.default.DataSource({ rowHasChanged: function rowHasChanged(r1, r2) {
	        return r1 !== r2;
	      } });
	    return {
	      dataSource: ds.cloneWithRows(['row 1', 'row 2', 'row 3', 'row 4'])
	    };
	  },
	
	  render: function render() {
	    return _react2.default.createElement(
	      'div',
	      { style: styles },
	      _react2.default.createElement(_rmcListView2.default, {
	        dataSource: this.state.dataSource,
	        renderRow: function renderRow(rowData) {
	          return _react2.default.createElement(
	            'div',
	            { style: { height: 40 } },
	            rowData
	          );
	        }
	      })
	    );
	  }
	});
	
	_reactDom2.default.render(_react2.default.createElement(Demo, null), document.getElementById('__react-content'));

/***/ }

});
//# sourceMappingURL=simple.js.map