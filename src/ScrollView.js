import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { throttle } from './util';

// const SCROLLVIEW = 'ScrollViewRef';
// const INNERVIEW = 'InnerScrollViewRef';

// https://github.com/facebook/react-native/blob/0.26-stable/Libraries/Components/ScrollView/ScrollView.js

/* eslint react/prop-types: 0, react/sort-comp: 0, no-unused-expressions: 0 */

const propTypes = {
  className: PropTypes.string,
  prefixCls: PropTypes.string,
  listPrefixCls: PropTypes.string,
  listViewPrefixCls: PropTypes.string,
  style: PropTypes.object,
  contentContainerStyle: PropTypes.object,
  onScroll: PropTypes.func,
};

export default class ScrollView extends React.Component {
  static propTypes = propTypes;
  componentWillUpdate(nextProps) {
    // https://github.com/ant-design/ant-design-mobile/issues/1480
    // https://stackoverflow.com/questions/1386696/make-scrollleft-scrolltop-changes-not-trigger-scroll-event
    // 问题情景：用户滚动内容后，改变 dataSource 触发 ListView componentWillReceiveProps
    // 内容变化后 scrollTop 如果改变、会自动触发 scroll 事件，而此事件应该避免被执行
    if ((this.props.dataSource !== nextProps.dataSource ||
        this.props.initialListSize !== nextProps.initialListSize) && this.handleScroll) {
      // console.log('componentWillUpdate');
      if (this.props.useBodyScroll) {
        window.removeEventListener('scroll', this.handleScroll);
      } else {
        this.ScrollViewRef.removeEventListener('scroll', this.handleScroll);
      }
    }
  }
  componentDidUpdate(prevProps) {
    // handle componentWillUpdate accordingly
    if ((this.props.dataSource !== prevProps.dataSource ||
        this.props.initialListSize !== prevProps.initialListSize) && this.handleScroll) {
      setTimeout(() => {
        if (this.props.useBodyScroll) {
          window.addEventListener('scroll', this.handleScroll);
        } else {
          this.ScrollViewRef.addEventListener('scroll', this.handleScroll);
        }
      }, 0);
    }
  }
  componentDidMount() {
    let handleScroll = e => this.props.onScroll && this.props.onScroll(e, this.getMetrics());
    if (this.props.scrollEventThrottle) {
      handleScroll = throttle(handleScroll, this.props.scrollEventThrottle);
    }
    this.handleScroll = handleScroll;

    // IE supports onresize on all HTML elements.
    // In all other Browsers the onresize is only available at the window object
    this.onLayout = () => this.props.onLayout({
      nativeEvent: { layout: { width: window.innerWidth, height: window.innerHeight } },
    });

    if (this.props.useBodyScroll) {
      window.addEventListener('scroll', this.handleScroll);
      window.addEventListener('resize', this.onLayout);
    } else {
      this.ScrollViewRef.addEventListener('scroll', this.handleScroll);
    }
  }
  componentWillUnmount() {
    if (this.props.useBodyScroll) {
      window.removeEventListener('scroll', this.handleScroll);
      window.removeEventListener('resize', this.onLayout);
    } else {
      this.ScrollViewRef.removeEventListener('scroll', this.handleScroll);
    }
  }

  getMetrics = () => {
    const isVertical = !this.props.horizontal;
    if (this.props.useBodyScroll) {
      // In chrome61 `document.body.scrollTop` is invalid,
      // and add new `document.scrollingElement`(chrome61, iOS support).
      // In old-android-browser and iOS `document.documentElement.scrollTop` is invalid.
      const scrollNode = document.scrollingElement ? document.scrollingElement : document.body;
      // todos: Why sometimes do not have `this.ScrollViewRef` ?
      return {
        visibleLength: window[isVertical ? 'innerHeight' : 'innerWidth'],
        contentLength: this.ScrollViewRef ?
          this.ScrollViewRef[isVertical ? 'scrollHeight' : 'scrollWidth'] : 0,
        offset: scrollNode[isVertical ? 'scrollTop' : 'scrollLeft'],
      };
    }
    return {
      visibleLength: this.ScrollViewRef[isVertical ? 'offsetHeight' : 'offsetWidth'],
      contentLength: this.ScrollViewRef[isVertical ? 'scrollHeight' : 'scrollWidth'],
      offset: this.ScrollViewRef[isVertical ? 'scrollTop' : 'scrollLeft'],
    };
  }

  getInnerViewNode = () => this.InnerScrollViewRef;

  scrollTo = (...args) => {
    if (this.props.useBodyScroll) {
      window.scrollTo(...args);
    } else {
      this.ScrollViewRef.scrollLeft = args[0];
      this.ScrollViewRef.scrollTop = args[1];
    }
  }

  render() {
    const {
      children, className, prefixCls, listPrefixCls, listViewPrefixCls,
      style = {}, contentContainerStyle = {}, useBodyScroll, pullToRefresh,
    } = this.props;

    const styleBase = {
      position: 'relative',
      overflow: 'auto',
      WebkitOverflowScrolling: 'touch',
    };
    const preCls = prefixCls || listViewPrefixCls || '';

    const containerProps = {
      ref: el => this.ScrollViewRef = el || this.ScrollViewRef,
      style: { ...(useBodyScroll ? {} : styleBase), ...style },
      className: classNames(className, `${preCls}-scrollview`),
    };
    const contentContainerProps = {
      ref: el => this.InnerScrollViewRef = el,
      style: { position: 'absolute', minWidth: '100%', ...contentContainerStyle },
      className: classNames(`${preCls}-scrollview-content`, listPrefixCls),
    };

    const clonePullToRefresh = isBody => React.cloneElement(pullToRefresh, {
      getScrollContainer: isBody ? () => document.body : () => this.ScrollViewRef,
    }, children);

    if (useBodyScroll) {
      if (pullToRefresh) {
        return (
          <div {...containerProps}>
            {clonePullToRefresh(true)}
          </div>
        );
      }
      return (
        <div {...containerProps}>
          {children}
        </div>
      );
    }

    if (pullToRefresh) {
      return (
        <div {...containerProps}>
          <div {...contentContainerProps}>
            {clonePullToRefresh()}
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
