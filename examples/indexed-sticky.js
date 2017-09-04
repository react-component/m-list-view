webpackJsonp([8],{

/***/ 103:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rmc_list_view_assets_index_less__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rmc_list_view_assets_index_less___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rmc_list_view_assets_index_less__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_dom__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rmc_list_view__ = __webpack_require__(15);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* eslint-disable no-console */





var NUM_SECTIONS = 20;
var NUM_ROWS_PER_SECTION = 10;

function genData(ds) {
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
  return ds.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs);
}

var Demo = function (_React$Component) {
  _inherits(Demo, _React$Component);

  function Demo(props) {
    _classCallCheck(this, Demo);

    var _this = _possibleConstructorReturn(this, (Demo.__proto__ || Object.getPrototypeOf(Demo)).call(this, props));

    var getSectionData = function getSectionData(dataBlob, sectionID) {
      return dataBlob[sectionID];
    };
    var getRowData = function getRowData(dataBlob, sectionID, rowID) {
      return dataBlob[rowID];
    };

    var dataSource = new __WEBPACK_IMPORTED_MODULE_3_rmc_list_view__["a" /* default */].DataSource({
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
      dataSource: dataSource,
      isLoading: true
    };
    return _this;
  }

  _createClass(Demo, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      // simulate initial Ajax
      setTimeout(function () {
        _this2.setState({
          dataSource: genData(_this2.state.dataSource),
          isLoading: false
        });
      }, 600);
    }
  }, {
    key: 'render',
    value: function render() {
      return __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
        'div',
        null,
        __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_rmc_list_view__["a" /* default */].IndexedList, {
          dataSource: this.state.dataSource,
          renderHeader: function renderHeader() {
            return __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
              'span',
              { style: { padding: 10 } },
              'header'
            );
          },
          renderFooter: function renderFooter() {
            return __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
              'span',
              { style: { padding: 10 } },
              'footer'
            );
          },
          renderSectionHeader: function renderSectionHeader(sectionData) {
            return __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
              'div',
              { style: { color: 'blue', padding: 10, backgroundColor: '#ddd' } },
              sectionData
            );
          },
          renderRow: function renderRow(rowData) {
            return __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
              'div',
              { style: { padding: 10 } },
              'Hello: ',
              rowData
            );
          },
          stickyHeader: true,
          stickyProps: {
            stickyStyle: { zIndex: 999 },
            topOffset: -83
            // isActive: false,
          },
          quickSearchBarStyle: {
            top: 20
          },
          onQuickSearch: function onQuickSearch(sectionID) {
            return console.log(sectionID);
          },
          sectionBodyClassName: 'sb'
        })
      );
    }
  }]);

  return Demo;
}(__WEBPACK_IMPORTED_MODULE_1_react___default.a.Component);

__WEBPACK_IMPORTED_MODULE_2_react_dom___default.a.render(__WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(Demo, null), document.getElementById('__react-content'));

/***/ }),

/***/ 261:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(103);


/***/ })

},[261]);
//# sourceMappingURL=indexed-sticky.js.map