import React from 'react';
import PropTypes from 'prop-types';
import DOMScroller from 'zscroller';
import classNames from 'classnames';
import { throttle } from './util';

/* eslint react/prop-types: 0, react/sort-comp: 0, no-unused-expressions: 0 */

export default class ScrollView extends React.Component {
  static propTypes = {
    children: PropTypes.any,
    className: PropTypes.string,
    prefixCls: PropTypes.string,
    listPrefixCls: PropTypes.string,
    listViewPrefixCls: PropTypes.string,
    style: PropTypes.object,
    contentContainerStyle: PropTypes.object,
    onScroll: PropTypes.func,
    refreshControl: PropTypes.bool,
    icon: PropTypes.any,
    loading: PropTypes.any,
    distanceToRefresh: PropTypes.number,
    refreshing: PropTypes.bool,
    onRefresh: PropTypes.func,
  };

  static defaultProps = {
    prefixCls: 'zscroller',
    distanceToRefresh: 25,
    refreshing: false,
    icon: [
      <div key="0" className="zscroller-refresh-control-pull">
        ↓ 下拉
      </div>,
      <div key="1" className="zscroller-refresh-control-release">
        ↑ 释放
      </div>,
    ],
    loading: <div>loading...</div>,
  };

  state = {
    active: false,
    deactive: false,
    loadingState: false,
  };

  componentDidUpdate(prevProps) {
    if (prevProps.refreshControl && this.props.refreshControl) {
      const preRefreshing = prevProps.refreshing;
      const nowRefreshing = this.props.refreshing;
      if (preRefreshing && !nowRefreshing && !this._refreshControlTimer) {
        this.domScroller.scroller.finishPullToRefresh();
      } else if (!this.manuallyRefresh && !preRefreshing && nowRefreshing) {
        this.domScroller.scroller.triggerPullToRefresh();
      }
    }
  }
  componentDidMount() {
    let handleScroll = () =>
      this.props.onScroll && this.props.onScroll(this.domScroller, this.getMetrics());
    if (this.props.scrollEventThrottle) {
      handleScroll = throttle(handleScroll, this.props.scrollEventThrottle);
    }
    this.handleScroll = handleScroll;
    this.renderZscroller();
  }
  componentWillUnmount() {
    this.domScroller.destroy();
  }

  getMetrics = () => {
    const isVertical = !this.props.horizontal;
    return {
      visibleLength: this.domScroller.container[isVertical ? 'clientHeight' : 'clientWidth'],
      contentLength: this.domScroller.content[isVertical ? 'offsetHeight' : 'offsetWidth'],
      offset: this.domScroller.scroller.getValues()[isVertical ? 'top' : 'left'],
    };
  }

  getInnerViewNode = () => this.InnerScrollViewRef;

  scrollTo = (...args) => {
    // it will change zScroller's dimensions on data loaded, so it needs fire reflow.
    this.domScroller.reflow();
    this.domScroller.scroller.scrollTo(...args);
  }

  renderZscroller() {
    const { scrollerOptions, refreshControl, distanceToRefresh, onRefresh } = this.props;
    const { scrollingComplete, ...restProps } = scrollerOptions;
    this.domScroller = new DOMScroller(this.getInnerViewNode(), {
      scrollingX: false,
      onScroll: this.handleScroll,
      scrollingComplete: () => {
        if (refreshControl && this.state.deactive) {
          this.setState({ deactive: false });
        }
        if (scrollingComplete) {
          scrollingComplete();
        }
      },
      ...restProps,
    });
    if (refreshControl) {
      const scroller = this.domScroller.scroller;
      scroller.activatePullToRefresh(distanceToRefresh,
        () => {
          // console.log('reach to the distance');
          this.manuallyRefresh = true;
          this.overDistanceThenRelease = false;
          this.setState({ active: true });
        },
        () => {
          // console.log('back to the distance');
          this.manuallyRefresh = false;
          this.setState({
            deactive: this.overDistanceThenRelease,
            active: false,
            loadingState: false,
          });
        },
        () => {
          // console.log('Over distance and release to loading');
          this.overDistanceThenRelease = true;
          this.setState({
            deactive: false,
            loadingState: true,
          });
          this._refreshControlTimer = setTimeout(() => {
            if (!this.props.refreshing) {
              scroller.finishPullToRefresh();
            }
            this._refreshControlTimer = undefined;
          }, 1000);
          onRefresh();
        });
      if (this.props.refreshing) {
        scroller.triggerPullToRefresh();
      }
    }
  }
  render() {
    const {
      children, className, prefixCls, listPrefixCls, listViewPrefixCls,
      style = {}, contentContainerStyle = {}, refreshControl,
      icon, loading, refreshing,
    } = this.props;

    const preCls = prefixCls || listViewPrefixCls || '';

    const containerProps = {
      ref: el => this.ScrollViewRef = el,
      style: { position: 'relative', overflow: 'hidden', ...style },
      className: classNames(className, `${preCls}-scrollview`),
    };
    const contentContainerProps = {
      ref: el => this.InnerScrollViewRef = el,
      style: { position: 'absolute', minWidth: '100%', ...contentContainerStyle },
      className: classNames(`${preCls}-scrollview-content`, listPrefixCls),
    };

    const { active, deactive, loadingState } = this.state;
    const wrapCls = classNames(`${preCls}-refresh-control-indicator`, {
      [`${preCls}-refresh-control-active`]: active,
      [`${preCls}-refresh-control-deactive`]: deactive,
      [`${preCls}-refresh-control-loading`]: loadingState || refreshing,
    });

    if (refreshControl) {
      return (
        <div {...containerProps}>
          <div {...contentContainerProps}>
            <div ref={el => this.RefreshControlRef = el} className={wrapCls}>
              <div className={`${preCls}-refresh-control-indicator-icon-wrapper`}>{icon}</div>
              <div className={`${preCls}-refresh-control-indicator-loading-wrapper`}>{loading}</div>
            </div>
            {children}
          </div>
        </div>
      );
    }

    return (
      <div {...containerProps}>
        <div {...contentContainerProps}>
          {children}
        </div>
      </div>
    );
  }
}
