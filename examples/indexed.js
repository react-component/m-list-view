webpackJsonp([8],{

/***/ 155:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rmc_list_view_assets_index_less__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rmc_list_view_assets_index_less___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rmc_list_view_assets_index_less__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react_dom__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_react_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rmc_list_view__ = __webpack_require__(20);




/* eslint-disable no-console */





var NUM_SECTIONS = 20;
var NUM_ROWS_PER_SECTION = 10;

var Demo = function (_React$Component) {
  __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits___default()(Demo, _React$Component);

  function Demo(props) {
    __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, Demo);

    var _this = __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default()(this, (Demo.__proto__ || Object.getPrototypeOf(Demo)).call(this, props));

    var getSectionData = function getSectionData(dataBlob, sectionID) {
      return dataBlob[sectionID];
    };
    var getRowData = function getRowData(dataBlob, sectionID, rowID) {
      return dataBlob[rowID];
    };

    var dataSource = new __WEBPACK_IMPORTED_MODULE_7_rmc_list_view__["a" /* default */].DataSource({
      getRowData: getRowData,
      getSectionHeaderData: getSectionData,
      rowHasChanged: function rowHasChanged(row1, row2) {
        return row1 !== row2;
      },
      sectionHeaderHasChanged: function sectionHeaderHasChanged(s1, s2) {
        return s1 !== s2;
      }
    });

    _this.state = {
      dataSource: dataSource.cloneWithRowsAndSections({}, [], []),
      headerPressCount: 0
    };
    return _this;
  }

  __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(Demo, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

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
        _this2.setState({
          dataSource: _this2.state.dataSource.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs)
        });
      }, 1000);
    }
  }, {
    key: 'render',
    value: function render() {
      return __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
        'div',
        { style: { margin: '10px auto', width: '80%', position: 'relative' } },
        __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7_rmc_list_view__["a" /* default */].IndexedList, {
          ref: 'lv',
          style: { height: 500 },
          dataSource: this.state.dataSource,
          renderHeader: function renderHeader() {
            return __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
              'span',
              { style: { padding: 10 } },
              'header'
            );
          },
          renderFooter: function renderFooter() {
            return __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
              'span',
              { style: { padding: 10 } },
              'footer'
            );
          },
          renderSectionHeader: function renderSectionHeader(sectionData) {
            return __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
              'div',
              { style: { color: 'blue', padding: 10, backgroundColor: '#ddd' } },
              sectionData
            );
          },
          renderRow: function renderRow(rowData) {
            return __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
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
          delayActivityIndicator: __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
            'div',
            { style: { padding: 25, textAlign: 'center' } },
            'delay rendering...'
          ),
          sectionHeaderClassName: 'sh',
          sectionBodyClassName: 'sb'
        })
      );
    }
  }]);

  return Demo;
}(__WEBPACK_IMPORTED_MODULE_5_react___default.a.Component);

__WEBPACK_IMPORTED_MODULE_6_react_dom___default.a.render(__WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(Demo, null), document.getElementById('__react-content'));

/***/ }),

/***/ 323:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(155);


/***/ })

},[323]);
//# sourceMappingURL=indexed.js.map