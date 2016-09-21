import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import DOMScroller from 'zscroller';
import assign from 'object-assign';
import classNames from 'classnames';
import { throttle } from './util';

const SCROLLVIEW = 'ScrollView';
const INNERVIEW = 'InnerScrollView';

// https://github.com/facebook/react-native/blob/master/Libraries/Components/ScrollView/ScrollView.js
// https://facebook.github.io/react-native/docs/refreshcontrol.html

const propTypes = {
  contentContainerStyle: PropTypes.object,
  onScroll: PropTypes.func,
  scrollEventThrottle: PropTypes.number,
  removeClippedSubviews: PropTypes.bool, // offscreen views are removed
  refreshControl: PropTypes.element,
};
const styles = {
  base: {
    position: 'relative',
    overflow: 'auto',
    WebkitOverflowScrolling: 'touch',
    flex: 1,
  },
  zScroller: {
    position: 'relative',
    overflow: 'hidden',
    flex: 1,
  },
};

export default class ScrollView extends React.Component {
  static propTypes = propTypes;

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.refreshControl && this.props.refreshControl) {
      const preRefreshing = prevProps.refreshControl.props.refreshing;
      const nowRefreshing = this.props.refreshControl.props.refreshing;
      if (preRefreshing && !nowRefreshing && this.refreshControlRefresh) { 
        this.refreshControlRefresh();
      } else if (!this.manuallyRefresh && !preRefreshing && nowRefreshing) {
        this.domScroller.scroller.triggerPullToRefresh();
      }
    }
  }
  componentDidMount() {
    const {
      stickyHeader, useBodyScroll, useZscroller, scrollerOptions, refreshControl,
    } = this.props;
    if (stickyHeader || useBodyScroll) {
      return;
    }
    this.tsExec = this.throttleScroll();
    if (useZscroller) {
      this.domScroller = new DOMScroller(ReactDOM.findDOMNode(this.refs[INNERVIEW]), assign({}, {
        scrollingX: false,
        onScroll: this.tsExec,
      }, scrollerOptions));
      if (refreshControl) {
        const scroller = this.domScroller.scroller;
        const { distanceToRefresh, onRefresh } = refreshControl.props;
        scroller.activatePullToRefresh(distanceToRefresh,
          () => {
            this.manuallyRefresh = true;
            this.refs.refreshControl.setState({ active: true });
          },
          () => {
            this.manuallyRefresh = false;  
            this.refs.refreshControl.setState({ active: false, loadingState: false });
          },
          () => {
            this.refs.refreshControl.setState({ loadingState: true });
            const finishPullToRefresh = () => {
              scroller.finishPullToRefresh();
              this.refreshControlRefresh = null;
            };
            Promise.all([
              new Promise(resolve => {
                onRefresh();
                this.refreshControlRefresh = resolve;
              }),
              // at lease 1s for ux
              new Promise(resolve => setTimeout(resolve, 1000))
            ]).then(finishPullToRefresh, finishPullToRefresh);
          });
        if (refreshControl.props.refreshing) {
          scroller.triggerPullToRefresh();
        }
      }
      return;
    }
    ReactDOM.findDOMNode(this.refs[SCROLLVIEW]).addEventListener('scroll', this.tsExec);
  }
  componentWillUnmount() {
    const {
      stickyHeader, useBodyScroll, useZscroller,
    } = this.props;
    if (stickyHeader || useBodyScroll) {
      return;
    }
    if (useZscroller) {
      this.domScroller.destroy();
      return;
    }
    ReactDOM.findDOMNode(this.refs[SCROLLVIEW]).removeEventListener('scroll', this.tsExec);
  }

  handleScroll = (e) => {
    this.props.onScroll && this.props.onScroll(e);
  }
  throttleScroll = () => {
    let handleScroll = () => {};
    if (this.props.scrollEventThrottle && this.props.onScroll) {
      handleScroll = throttle(this.handleScroll, this.props.scrollEventThrottle);
    }
    return handleScroll;
  }

  render() {
    const {
      children, className, prefixCls = '', listPrefixCls = '', listViewPrefixCls = '',
      style = {}, contentContainerStyle,
      useZscroller, refreshControl, stickyHeader, useBodyScroll,
    } = this.props;

    let styleBase = styles.base;
    if (stickyHeader || useBodyScroll) {
      styleBase = null;
    } else if (useZscroller) {
      styleBase = styles.zScroller;
    }

    const preCls = prefixCls || listViewPrefixCls || '';

    const containerProps = {
      ref: SCROLLVIEW,
      style: assign({}, styleBase, style),
      className: classNames({
        [className]: !!className,
        [`${preCls}-scrollview`]: true,
      }),
    };
    const contentContainerProps = {
      ref: INNERVIEW,
      style: assign({}, { position: 'absolute', minWidth: '100%' }, contentContainerStyle),
      className: classNames({
        [`${preCls}-scrollview-content`]: true,
        [listPrefixCls]: !!listPrefixCls,
      }),
    };

    if (refreshControl) {
      return (
        <div {...containerProps}>
          <div {...contentContainerProps}>
            {React.cloneElement(refreshControl, { ref: 'refreshControl' })}
            {children}
          </div>
        </div>
      );
    }

    if (stickyHeader || useBodyScroll) {
      return (
        <div {...containerProps}>
          {children}
        </div>
      );
    }
    return (
      <div {...containerProps}>
        <div {...contentContainerProps}>{children}</div>
      </div>
    );
  }
}
