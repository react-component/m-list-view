# rmc-list-view
---

React ListView Component, port from [React Native ListView](https://facebook.github.io/react-native/docs/listview.html)

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![gemnasium deps][gemnasium-image]][gemnasium-url]
[![npm download][download-image]][download-url]

[npm-image]: http://img.shields.io/npm/v/rmc-list-view.svg?style=flat-square
[npm-url]: http://npmjs.org/package/rmc-list-view
[travis-image]: https://img.shields.io/travis/react-component/m-list-view.svg?style=flat-square
[travis-url]: https://travis-ci.org/react-component/m-list-view
[coveralls-image]: https://img.shields.io/coveralls/react-component/m-list-view.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/react-component/m-list-view?branch=master
[gemnasium-image]: http://img.shields.io/gemnasium/react-component/m-list-view.svg?style=flat-square
[gemnasium-url]: https://gemnasium.com/react-component/m-list-view
[node-image]: https://img.shields.io/badge/node.js-%3E=_0.10-green.svg?style=flat-square
[node-url]: http://nodejs.org/download/
[download-image]: https://img.shields.io/npm/dm/rmc-list-view.svg?style=flat-square
[download-url]: https://npmjs.org/package/rmc-list-view


## Screenshots

<img src="https://os.alipayobjects.com/rmsportal/ddyjYtQFAIywppH.png" width="288"/>


## Development

```
npm install
npm start
```

## Example

http://localhost:8999/examples/

online example: http://react-component.github.io/m-list-view/

## install

[![rmc-list-view](https://nodei.co/npm/rmc-list-view.png)](https://npmjs.org/package/rmc-list-view)

## Usage
see examples

## API

same as [React Native ListView](https://facebook.github.io/react-native/docs/listview.html#content)
(v0.26).

#### current not support:
In general, do not support platform-specific feature,
like: `android` endFillColor, `ios` alwaysBounceHorizontal.
And, use css style instead of react-native's style.

- onChangeVisibleRows
- stickyHeaderIndices
- [ScrollView](https://facebook.github.io/react-native/docs/scrollview.html#props) props:
    - keyboardDismissMode (not support control keyboard)
    - keyboardShouldPersistTaps (not support control keyboard)
    - onContentSizeChange (use onLayout instead)
    - removeClippedSubviews
    - showsHorizontalScrollIndicator (use css style instead)
    - showsVerticalScrollIndicator (use css style instead)
- [View](https://facebook.github.io/react-native/docs/view.html#props) props

#### new
- useBodyScroll (boolean, false) - use html `body`'s scroll
- stickyHeader (note: if set it, ScrollComponent will be render into the head of body element, auto enable `useBodyScroll`)
    - stickyProps / stickyContainerProps (see [react-sticky](https://github.com/captivationsoftware/react-sticky))
- renderBodyComponent - render listview body wrapper component
- renderSectionBodyWrapper - render listview section body wrapper component
- useZscroller (boolean, false) - use zscroller to well support RefreshControl and pull up refresh.(`useBodyScroll` and sticky not work when enable useZscroller)
- scrollerOptions - [zscroller options](https://github.com/yiminghe/zscroller#options)

**Note:** if you set `renderScrollComponent`, 
you need to write your own scroll logic like `ScrollView` component(see `/examples/MyScroller.js`).

### ListView.IndexedList
- quickSearchBarTop (object{value:string, label:string}, default '#') - top button
- quickSearchBarStyle (object) - quickSearchBar's style
- onQuickSearch (function())
- showQuickSearchIndicator (boolean, false) - show quick search indicator
- delayTime (number) - default 100ms, delay render time (delay render these items of `totalRowCount - initialListSize`)
- delayActivityIndicator (react node) - delay render activity indicator

**Note:** should not enable useZscroller on IndexedList.

### ListView.RefreshControl
- icon (any) - refresh indicator, include `pull` and `release` state
- loading (any) - loading indicator
- distanceToRefresh (number, default 50) - distance to refresh
- onRefresh (function, required) - onRefresh callback
- refreshing (boolean, false) - whether to show refreshing state


## Test Case

```
npm test
npm run chrome-test
```

## Coverage

```
npm run coverage
```

open coverage/ dir

## License

rmc-list-view is released under the MIT license.
