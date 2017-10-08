import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
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
  scrollEventThrottle: PropTypes.number,
};

export default class ScrollView extends React.Component {
  static propTypes = propTypes;
  componentWillUpdate(nextProps) {
    // https://github.com/ant-design/ant-design-mobile/issues/1480
    // https://stackoverflow.com/questions/1386696/make-scrollleft-scrolltop-changes-not-trigger-scroll-event
    // 问题情景：用户滚动内容后，改变 dataSource 触发 ListView componentWillReceiveProps
    // 内容变化后 scrollTop 如果改变、会自动触发 scroll 事件，而此事件应该避免被执行
    if ((this.props.dataSource !== nextProps.dataSource ||
        this.props.initialListSize !== nextProps.initialListSize) && this.tsExec) {
      // console.log('componentWillUpdate');
      if (this.props.useBodyScroll) {
        window.removeEventListener('scroll', this.tsExec);
      } else {
        ReactDOM.findDOMNode(this.ScrollViewRef).removeEventListener('scroll', this.tsExec);
      }
    }
  }
  componentDidUpdate(prevProps) {
    // handle componentWillUpdate accordingly
    if ((this.props.dataSource !== prevProps.dataSource ||
        this.props.initialListSize !== prevProps.initialListSize) && this.tsExec) {
      setTimeout(() => {
        if (this.props.useBodyScroll) {
          window.addEventListener('scroll', this.tsExec);
        } else {
          ReactDOM.findDOMNode(this.ScrollViewRef).addEventListener('scroll', this.tsExec);
        }
      }, 0);
    }
  }
  componentDidMount() {
    this.tsExec = this.throttleScroll();
    // IE supports onresize on all HTML elements.
    // In all other Browsers the onresize is only available at the window object
    this.onLayout = () => this.props.onLayout({
      nativeEvent: { layout: { width: window.innerWidth, height: window.innerHeight } },
    });

    if (this.props.useBodyScroll) {
      window.addEventListener('scroll', this.tsExec);
      window.addEventListener('resize', this.onLayout);
    } else {
      ReactDOM.findDOMNode(this.ScrollViewRef).addEventListener('scroll', this.tsExec);
    }
  }
  componentWillUnmount() {
    if (this.props.useBodyScroll) {
      window.removeEventListener('scroll', this.tsExec);
      window.removeEventListener('resize', this.onLayout);
    } else {
      ReactDOM.findDOMNode(this.ScrollViewRef).removeEventListener('scroll', this.tsExec);
    }
  }

  getInnerViewNode = () => {
    return ReactDOM.findDOMNode(this.InnerScrollViewRef);
  }

  scrollTo = (...args) => {
    if (this.props.useBodyScroll) {
      window.scrollTo(...args);
    } else {
      const ele = ReactDOM.findDOMNode(this.ScrollViewRef);
      ele.scrollLeft = args[0];
      ele.scrollTop = args[1];
    }
  }

  throttleScroll = () => {
    let handleScroll = () => {};
    if (this.props.scrollEventThrottle && this.props.onScroll) {
      handleScroll = throttle(e => {
        this.props.onScroll && this.props.onScroll(e);
      }, this.props.scrollEventThrottle);
    }
    return handleScroll;
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
      flex: 1,
    };
    const preCls = prefixCls || listViewPrefixCls || '';

    const containerProps = {
      ref: el => this.ScrollViewRef = el,
      style: { ...(useBodyScroll ? {} : styleBase), ...style },
      className: classNames(className, `${preCls}-scrollview`),
    };
    const contentContainerProps = {
      ref: el => this.InnerScrollViewRef = el,
      style: { position: 'absolute', minWidth: '100%', ...contentContainerStyle },
      className: classNames(`${preCls}-scrollview-content`, listPrefixCls),
    };
    
    const clonePullToRefresh = isBody => React.cloneElement(pullToRefresh, {
      prefixCls: `${preCls}-pull-to-refresh`,
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

    if (pullToRefresh && this.ScrollViewRef) {
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
