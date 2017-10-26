webpackJsonp([7],{

/***/ 163:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__assets_index_less__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__assets_index_less___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__assets_index_less__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_react_dom__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_react_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__src__ = __webpack_require__(21);





/* eslint-disable no-console */
/* eslint react/prop-types: 0, react/no-multi-comp: 0 */





var NUM_ROWS = 20;
var pageIndex = 0;

function genData() {
  var pIndex = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

  var dataBlob = {};
  for (var i = 0; i < NUM_ROWS; i++) {
    var ii = pIndex * NUM_ROWS + i;
    dataBlob['' + ii] = 'row - ' + ii;
  }
  return dataBlob;
}

var MySectionBodyWrapper = function MySectionBodyWrapper(props) {
  return __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
    'table',
    { className: 'my-section-body' },
    __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
      'thead',
      null,
      __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
        'tr',
        null,
        __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
          'td',
          null,
          'table title'
        )
      )
    ),
    __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
      'tbody',
      null,
      props.children
    )
  );
};

var Demo = function (_React$Component) {
  __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default()(Demo, _React$Component);

  function Demo(props) {
    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, Demo);

    var _this = __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default()(this, (Demo.__proto__ || Object.getPrototypeOf(Demo)).call(this, props));

    _this.onEndReached = function (event) {
      console.log('fire onEndReached');
      // load new data
      // hasMore: from backend data, indicates whether it is the last page, here is false
      if (_this.state.isLoading && !_this.state.hasMore) {
        return;
      }
      console.log('reach end', event);
      _this.setState({ isLoading: true });
      setTimeout(function () {
        _this.rData = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, _this.rData, genData(++pageIndex));
        _this.setState({
          dataSource: _this.state.dataSource.cloneWithRows(_this.rData),
          isLoading: false
        });
      }, 1000);
    };

    var dataSource = new __WEBPACK_IMPORTED_MODULE_8__src__["a" /* default */].DataSource({
      rowHasChanged: function rowHasChanged(row1, row2) {
        return row1 !== row2;
      }
    });

    _this.state = {
      dataSource: dataSource,
      isLoading: true
    };
    return _this;
  }

  __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(Demo, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      // simulate initial Ajax
      setTimeout(function () {
        _this2.rData = genData();
        _this2.setState({
          dataSource: _this2.state.dataSource.cloneWithRows(_this2.rData),
          isLoading: false
        });
      }, 600);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      return __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
        'div',
        null,
        __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_8__src__["a" /* default */], {
          ref: function ref(el) {
            return _this3.lv = el;
          },
          dataSource: this.state.dataSource,
          useBodyScroll: true,
          renderHeader: function renderHeader() {
            return __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
              'div',
              { style: { padding: 30 } },
              '\u8BBE\u7F6E\u4E86`useBodyScroll`'
            );
          },
          renderFooter: function renderFooter() {
            return __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
              'div',
              { style: { padding: 30 } },
              _this3.state.isLoading ? 'loading...' : 'loaded'
            );
          },
          renderBodyComponent: function renderBodyComponent() {
            return __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement('div', { className: 'for-body-demo' });
          },
          renderSectionBodyWrapper: function renderSectionBodyWrapper(sectionID) {
            return __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(MySectionBodyWrapper, { key: sectionID });
          },
          renderRow: function renderRow(rowData) {
            return __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
              'tr',
              { style: { height: 50 } },
              __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
                'td',
                null,
                rowData,
                ' Let me keep typing here so it wraps at least one line.'
              )
            );
          },
          onEndReached: this.onEndReached,
          onEndReachedThreshold: 100,
          pageSize: 10
        }),
        __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement('div', { dangerouslySetInnerHTML: {
            __html: navigator.userAgent.match(/Android|iPhone|iPad|iPod/i) ? '<style>#qrcode, .highlight{ display: none }</style>' : ''
          }
        })
      );
    }
  }]);

  return Demo;
}(__WEBPACK_IMPORTED_MODULE_6_react___default.a.Component);

__WEBPACK_IMPORTED_MODULE_7_react_dom___default.a.render(__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(Demo, null), document.getElementById('__react-content'));

/***/ }),

/***/ 316:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(163);


/***/ })

},[316]);
//# sourceMappingURL=base-useBodyScroll.js.map