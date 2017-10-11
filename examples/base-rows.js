webpackJsonp([8],{

/***/ 162:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__assets_index_less__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__assets_index_less___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__assets_index_less__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react_dom__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_react_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__src__ = __webpack_require__(21);




/* eslint-disable no-console */
/* eslint react/sort-comp: 0 */





var NUM_ROWS = 20;

function genData() {
  var pIndex = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

  var dataArr = [];
  for (var i = 0; i < NUM_ROWS; i++) {
    dataArr.push('row - ' + (pIndex * NUM_ROWS + i));
  }
  return dataArr;
}

var Demo = function (_React$Component) {
  __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits___default()(Demo, _React$Component);

  function Demo(props) {
    __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, Demo);

    var _this = __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default()(this, (Demo.__proto__ || Object.getPrototypeOf(Demo)).call(this, props));

    var dataSource = new __WEBPACK_IMPORTED_MODULE_7__src__["a" /* default */].DataSource({
      rowHasChanged: function rowHasChanged(row1, row2) {
        return row1 !== row2;
      }
    });

    _this.state = {
      dataSource: dataSource
    };
    return _this;
  }

  __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(Demo, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      document.body.style.overflowY = navigator.userAgent.match(/Android|iPhone|iPad|iPod/i) ? 'hidden' : 'auto';
      // you can scroll to the specified position
      setTimeout(function () {
        return _this2.lv.scrollTo(0, 50);
      }, 800);

      // simulate initial Ajax
      setTimeout(function () {
        _this2.setState({
          dataSource: _this2.state.dataSource.cloneWithRows(genData())
        });
      }, 600);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      return __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7__src__["a" /* default */], {
        ref: function ref(el) {
          return _this3.lv = el;
        },
        dataSource: this.state.dataSource,
        style: { height: 200, border: '1px solid #ccc', margin: 10 },
        renderHeader: function renderHeader() {
          return __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
            'button',
            { onClick: function onClick() {
                return _this3.lv.scrollTo(0, 100);
              } },
            'scrollTo(0, 100)'
          );
        },
        renderRow: function renderRow(rowData) {
          return __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
            'div',
            { style: { padding: 16 } },
            rowData
          );
        },
        onEndReachedThreshold: 10
      });
    }
  }]);

  return Demo;
}(__WEBPACK_IMPORTED_MODULE_5_react___default.a.Component);

__WEBPACK_IMPORTED_MODULE_6_react_dom___default.a.render(__WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(Demo, null), document.getElementById('__react-content'));

/***/ }),

/***/ 315:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(162);


/***/ })

},[315]);
//# sourceMappingURL=base-rows.js.map