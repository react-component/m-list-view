/* eslint no-unused-vars: 0, react/no-multi-comp: 0
react/prop-types: 0, react/sort-comp: 0, no-unused-expressions: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import ListViewDataSource from './ListViewDataSource';
import ScrollView from './ScrollView';
import { StickyContainer, Sticky } from 'react-sticky';

const DEFAULT_PAGE_SIZE = 1;
const DEFAULT_INITIAL_ROWS = 10;
const DEFAULT_SCROLL_RENDER_AHEAD = 1000;
const DEFAULT_END_REACHED_THRESHOLD = 1000;
const DEFAULT_SCROLL_CALLBACK_THROTTLE = 50;
const SCROLLVIEW_REF = 'listviewscroll';

class StaticRenderer extends React.Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.shouldUpdate;
  }
  render() {
    return this.props.render();
  }
}
// https://github.com/facebook/react-native/blob/0.26-stable/Libraries/CustomComponents/ListView/ListView.js
export default class ListView extends React.Component {
  static DataSource = ListViewDataSource
  static propTypes = {
    ...ScrollView.propTypes,
    dataSource: PropTypes.instanceOf(ListViewDataSource).isRequired,
    renderSeparator: PropTypes.func,
    renderRow: PropTypes.func.isRequired,
    initialListSize: PropTypes.number,
    onEndReached: PropTypes.func,
    onEndReachedThreshold: PropTypes.number,
    pageSize: PropTypes.number,
    renderFooter: PropTypes.func,
    renderHeader: PropTypes.func,
    renderSectionHeader: PropTypes.func,
    renderScrollComponent: PropTypes.func,
    scrollRenderAheadDistance: PropTypes.number,
    onChangeVisibleRows: PropTypes.func,
    scrollEventThrottle: PropTypes.number,
    // another added
    renderBodyComponent: PropTypes.func,
    renderSectionBodyWrapper: PropTypes.func,
    sectionBodyClassName: PropTypes.string,
    useZscroller: PropTypes.bool, // for web
    useBodyScroll: PropTypes.bool, // for web
    stickyHeader: PropTypes.bool, // for web
    stickyProps: PropTypes.object, // https://github.com/captivationsoftware/react-sticky/blob/master/README.md#sticky--props
    stickyContainerProps: PropTypes.object,
  }

  static defaultProps = {
    initialListSize: DEFAULT_INITIAL_ROWS,
    pageSize: DEFAULT_PAGE_SIZE,
    renderScrollComponent: props => <ScrollView {...props} />,
    renderBodyComponent: () => <div />,
    renderSectionBodyWrapper: (sectionID) => <div key={sectionID} />,
    sectionBodyClassName: 'list-view-section-body',
    scrollRenderAheadDistance: DEFAULT_SCROLL_RENDER_AHEAD,
    onEndReachedThreshold: DEFAULT_END_REACHED_THRESHOLD,
    scrollEventThrottle: DEFAULT_SCROLL_CALLBACK_THROTTLE,
    stickyProps: {},
    stickyContainerProps: {},
    scrollerOptions: {},
  }

  state = {
    curRenderedRowsCount: this.props.initialListSize,
    highlightedRow: {},
  }

  /**
   * Exports some data, e.g. for perf investigations or analytics.
   */
  getMetrics = () => {
    return {
      contentLength: this.scrollProperties.contentLength,
      totalRows: this.props.dataSource.getRowCount(),
      renderedRows: this.state.curRenderedRowsCount,
      visibleRows: Object.keys(this._visibleRows).length,
    };
  }

  scrollTo = (...args) => {
    this.refs[SCROLLVIEW_REF] &&
    this.refs[SCROLLVIEW_REF].scrollTo &&
    this.refs[SCROLLVIEW_REF].scrollTo(...args);
  }

  getInnerViewNode = () => {
    // console.log(this.refs[SCROLLVIEW_REF]);
    return this.refs[SCROLLVIEW_REF].getInnerViewNode();
  }

  componentWillMount() {
    // this data should never trigger a render pass, so don't put in state
    this.scrollProperties = {
      visibleLength: null,
      contentLength: null,
      offset: 0,
    };
    this._childFrames = [];
    this._visibleRows = {};
    this._prevRenderedRowsCount = 0;
    this._sentEndForContentLength = null;
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.dataSource !== nextProps.dataSource ||
        this.props.initialListSize !== nextProps.initialListSize) {
      this.setState((state, props) => {
        this._prevRenderedRowsCount = 0;
        return {
          curRenderedRowsCount: Math.min(
            Math.max(
              state.curRenderedRowsCount,
              nextProps.initialListSize // for preact
            ),
            nextProps.dataSource.getRowCount() // for preact
          ),
        };
      }, () => this._renderMoreRowsIfNeeded());
    }
  }

  onRowHighlighted = (sectionID, rowID) => {
    this.setState({ highlightedRow: { sectionID, rowID } });
  }

  stickyRefs = {}

  render() {
    let bodyComponents = [];

    const dataSource = this.props.dataSource;
    const allRowIDs = dataSource.rowIdentities;
    let rowCount = 0;
    const sectionHeaderIndices = [];

    const header = this.props.renderHeader && this.props.renderHeader();
    const footer = this.props.renderFooter && this.props.renderFooter();
    let totalIndex = header ? 1 : 0;

    for (let sectionIdx = 0; sectionIdx < allRowIDs.length; sectionIdx++) {
      const sectionID = dataSource.sectionIdentities[sectionIdx];
      const rowIDs = allRowIDs[sectionIdx];
      if (rowIDs.length === 0) {
        continue;
      }

      if (this.props.renderSectionHeader) {
        const shouldUpdateHeader = rowCount >= this._prevRenderedRowsCount &&
          dataSource.sectionHeaderShouldUpdate(sectionIdx);

        let renderSectionHeader = (
          <StaticRenderer
            key={`s_${sectionID}`}
            shouldUpdate={!!shouldUpdateHeader}
            render={this.props.renderSectionHeader.bind(
              null,
              dataSource.getSectionHeaderData(sectionIdx),
              sectionID
            )}
          />
        );
        if (this.props.stickyHeader) {
          renderSectionHeader = (<Sticky {...this.props.stickyProps} key={`s_${sectionID}`}
            ref={c => { this.stickyRefs[sectionID] = c; }}
          >{renderSectionHeader}</Sticky>);
        }
        bodyComponents.push(renderSectionHeader);
        sectionHeaderIndices.push(totalIndex++);
      }

      const sectionBody = [];
      for (let rowIdx = 0; rowIdx < rowIDs.length; rowIdx++) {
        const rowID = rowIDs[rowIdx];
        const comboID = `${sectionID}_${rowID}`;
        const shouldUpdateRow = rowCount >= this._prevRenderedRowsCount &&
          dataSource.rowShouldUpdate(sectionIdx, rowIdx);
        const row = (<StaticRenderer
          key={`r_${comboID}`}
          shouldUpdate={!!shouldUpdateRow}
          render={this.props.renderRow.bind(
            null,
            dataSource.getRowData(sectionIdx, rowIdx),
            sectionID,
            rowID,
            this.onRowHighlighted
          )}
        />);
        // bodyComponents.push(row);
        sectionBody.push(row);
        totalIndex++;

        if (this.props.renderSeparator &&
            (rowIdx !== rowIDs.length - 1 || sectionIdx === allRowIDs.length - 1)) {
          const adjacentRowHighlighted =
            this.state.highlightedRow.sectionID === sectionID && (
              this.state.highlightedRow.rowID === rowID ||
              this.state.highlightedRow.rowID === rowIDs[rowIdx + 1]
            );
          const separator = this.props.renderSeparator(
            sectionID,
            rowID,
            adjacentRowHighlighted
          );
          if (separator) {
            // bodyComponents.push(separator);
            sectionBody.push(separator);
            totalIndex++;
          }
        }
        if (++rowCount === this.state.curRenderedRowsCount) {
          break;
        }
      }
      bodyComponents.push(React.cloneElement(this.props.renderSectionBodyWrapper(sectionID), {
        className: this.props.sectionBodyClassName,
      }, sectionBody));
      if (rowCount >= this.state.curRenderedRowsCount) {
        break;
      }
    }

    const {
      renderScrollComponent,
      ...props,
    } = this.props;

    bodyComponents = React.cloneElement(props.renderBodyComponent(), {}, bodyComponents);
    if (props.stickyHeader) {
      bodyComponents = (<StickyContainer {...props.stickyContainerProps}>
        {bodyComponents}
      </StickyContainer>);
    }

    this._sc = React.cloneElement(renderScrollComponent({ ...props, onScroll: this._onScroll }), {
      ref: SCROLLVIEW_REF,
      onContentSizeChange: this._onContentSizeChange,
      onLayout: this._onLayout,
    }, header, bodyComponents, footer, props.children);
    return this._sc;
  }

  _onContentSizeChange = (width, height) => {
    const contentLength = !this.props.horizontal ? height : width;
    if (contentLength !== this.scrollProperties.contentLength) {
      this.scrollProperties.contentLength = contentLength;
      this._renderMoreRowsIfNeeded();
    }
    this.props.onContentSizeChange && this.props.onContentSizeChange(width, height);
  }

  _onLayout = (event) => {
    const { width, height } = event.nativeEvent.layout;
    const visibleLength = !this.props.horizontal ? height : width;
    if (visibleLength !== this.scrollProperties.visibleLength) {
      this.scrollProperties.visibleLength = visibleLength;
      this._renderMoreRowsIfNeeded();
    }
    this.props.onLayout && this.props.onLayout(event);
  }

  _maybeCallOnEndReached = (event) => {
    // console.log(this.scrollProperties, this._getDistanceFromEnd(this.scrollProperties));
    if (this.props.onEndReached &&
        this.scrollProperties.contentLength !== this._sentEndForContentLength &&
        this._getDistanceFromEnd(this.scrollProperties) < this.props.onEndReachedThreshold &&
        this.state.curRenderedRowsCount === this.props.dataSource.getRowCount()) {
      this._sentEndForContentLength = this.scrollProperties.contentLength;
      this.props.onEndReached(event);
      return true;
    }
    return false;
  }

  _renderMoreRowsIfNeeded = () => {
    if (this.scrollProperties.contentLength === null ||
      this.scrollProperties.visibleLength === null ||
      this.state.curRenderedRowsCount === this.props.dataSource.getRowCount()) {
      this._maybeCallOnEndReached();
      return;
    }

    const distanceFromEnd = this._getDistanceFromEnd(this.scrollProperties);
    // console.log(distanceFromEnd, this.props.scrollRenderAheadDistance);
    if (distanceFromEnd < this.props.scrollRenderAheadDistance) {
      this._pageInNewRows();
    }
  }

  _pageInNewRows = () => {
    this.setState((state, props) => {
      const rowsToRender = Math.min(
        state.curRenderedRowsCount + props.pageSize,
        props.dataSource.getRowCount()
      );
      this._prevRenderedRowsCount = state.curRenderedRowsCount;
      return {
        curRenderedRowsCount: rowsToRender,
      };
    }, () => {
      this._prevRenderedRowsCount = this.state.curRenderedRowsCount;
    });
  }

  _getDistanceFromEnd = (scrollProperties) => {
    return scrollProperties.contentLength -
      scrollProperties.visibleLength - scrollProperties.offset;
  }

  _onScroll = (e) => {
    const isVertical = !this.props.horizontal;
    let ev = e;
    // when the ListView is destroyed,
    // but also will trigger scroll event after `scrollEventThrottle`
    if (!this.refs[SCROLLVIEW_REF]) {
      return;
    }
    const target = ReactDOM.findDOMNode(this.refs[SCROLLVIEW_REF]);
    if (this.props.stickyHeader || this.props.useBodyScroll) {
      this.scrollProperties.visibleLength = window[
        isVertical ? 'innerHeight' : 'innerWidth'
      ];
      this.scrollProperties.contentLength = target[
        isVertical ? 'scrollHeight' : 'scrollWidth'
      ];
      this.scrollProperties.offset = window.document.body[
        isVertical ? 'scrollTop' : 'scrollLeft'
      ];
    } else if (this.props.useZscroller) {
      const domScroller = this.refs[SCROLLVIEW_REF].domScroller;
      ev = domScroller;
      this.scrollProperties.visibleLength = domScroller.container[
        isVertical ? 'clientHeight' : 'clientWidth'
      ];
      this.scrollProperties.contentLength = domScroller.content[
        isVertical ? 'offsetHeight' : 'offsetWidth'
      ];
      this.scrollProperties.offset = domScroller.scroller.getValues()[
        isVertical ? 'top' : 'left'
      ];
      // console.log(this.scrollProperties, domScroller.scroller.getScrollMax())
    } else {
      this.scrollProperties.visibleLength = target[
        isVertical ? 'offsetHeight' : 'offsetWidth'
      ];
      this.scrollProperties.contentLength = target[
        isVertical ? 'scrollHeight' : 'scrollWidth'
      ];
      this.scrollProperties.offset = target[
        isVertical ? 'scrollTop' : 'scrollLeft'
      ];
    }

    if (!this._maybeCallOnEndReached(ev)) {
      this._renderMoreRowsIfNeeded();
    }

    if (this.props.onEndReached &&
        this._getDistanceFromEnd(this.scrollProperties) > this.props.onEndReachedThreshold) {
      // Scrolled out of the end zone, so it should be able to trigger again.
      this._sentEndForContentLength = null;
    }

    this.props.onScroll && this.props.onScroll(ev);
  }

  /**
   The following code was originally intended to implement the pull-up-refresh feature,
   but not need to do it.

   Coincidentally, it solves a problem, if the content is not high enough,
   the `onScroll` and `onEndReached` event will not be fired.
   However, there should be a better solution for this issue.
   */
  componentDidMount() {
    this.bindEvt();
  }
  componentWillUnmount() {
    this.unBindEvt();
  }
  bindEvt = () => {
    const ele = this.getEle();
    ele.addEventListener('touchstart', this.onPullUpStart);
    ele.addEventListener('touchmove', this.onPullUpMove);
    ele.addEventListener('touchend', this.onPullUpEnd);
    ele.addEventListener('touchcancel', this.onPullUpEnd);
  }
  unBindEvt = () => {
    const ele = this.getEle();
    ele.removeEventListener('touchstart', this.onPullUpStart);
    ele.removeEventListener('touchmove', this.onPullUpMove);
    ele.removeEventListener('touchend', this.onPullUpEnd);
    ele.removeEventListener('touchcancel', this.onPullUpEnd);
  }
  getEle = () => {
    const { stickyHeader, useBodyScroll } = this.props;
    let ele;
    if (stickyHeader || useBodyScroll) {
      ele = document.body;
    } else {
      ele = ReactDOM.findDOMNode(this.refs.listviewscroll.refs.ScrollView);
    }
    return ele;
  }
  onPullUpStart = (e) => {
    this._pullUpStartPageY = e.touches[0].screenY;
    this._isPullUp = false;
    this._pullUpEle = this.getEle();
  }
  onPullUpMove = (e) => {
    // 使用 pageY 对比有问题
    if (e.touches[0].screenY < this._pullUpStartPageY && this._reachBottom()) {
      // console.log('滚动条到了底部，pull up');
      this._isPullUp = true;
    }
  }
  onPullUpEnd = (e) => {
    if (this._isPullUp && this.props.onEndReached) {
      // this.props.onEndReached(e);
      // https://github.com/react-component/m-list-view/pull/15/files
      // need update `this.scrollProperties` in order to render correctly
      this._onScroll(e);
    }
    this._isPullUp = false;
  }
  _reachBottom = () => {
    const element = this._pullUpEle;
    if (element === document.body) {
      return element.scrollHeight - element.scrollTop === window.innerHeight;
    }
    return element.scrollHeight - element.scrollTop === element.clientHeight;
  }
}
