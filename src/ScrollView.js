import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import DOMScroller from 'zscroller';
import classNames from 'classnames';
import { throttle, setTransform, setTransformOrigin } from './util';

// const SCROLLVIEW = 'ScrollViewRef';
// const INNERVIEW = 'InnerScrollViewRef';

// https://github.com/facebook/react-native/blob/0.26-stable/Libraries/Components/ScrollView/ScrollView.js

/* eslint react/prop-types: 0, react/sort-comp: 0, no-unused-expressions: 0 */

const propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  prefixCls: PropTypes.string,
  listPrefixCls: PropTypes.string,
  listViewPrefixCls: PropTypes.string,
  style: PropTypes.object,
  contentContainerStyle: PropTypes.object,
  onScroll: PropTypes.func,
  scrollEventThrottle: PropTypes.number,
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
      } else if (!this.props.useZscroller) { // not handle useZscroller now. todo
        ReactDOM.findDOMNode(this.ScrollViewRef).removeEventListener('scroll', this.tsExec);
      }
    }
  }
  componentDidUpdate(prevProps) {
    // console.log('componentDidUpdate');
    if (prevProps.refreshControl && this.props.refreshControl) {
      const preRefreshing = prevProps.refreshControl.props.refreshing;
      const nowRefreshing = this.props.refreshControl.props.refreshing;
      if (preRefreshing && !nowRefreshing && !this._refreshControlTimer) {
        this.domScroller.scroller.finishPullToRefresh();
      } else if (!this.manuallyRefresh && !preRefreshing && nowRefreshing) {
        this.domScroller.scroller.triggerPullToRefresh();
      }
    }
    // handle componentWillUpdate accordingly
    if ((this.props.dataSource !== prevProps.dataSource ||
        this.props.initialListSize !== prevProps.initialListSize) && this.tsExec) {
      // console.log('componentDidUpdate');
      setTimeout(() => {
        if (this.props.useBodyScroll) {
          window.addEventListener('scroll', this.tsExec);
        } else if (!this.props.useZscroller) { // not handle useZscroller now. todo
          ReactDOM.findDOMNode(this.ScrollViewRef).addEventListener('scroll', this.tsExec);
        }
      }, 0);
    }

    // for pullUp
    if (this.props.pullUpEnabled) {
      const preRefreshing = prevProps.pullUpRefreshing;
      const nowRefreshing = this.props.pullUpRefreshing;
      if (preRefreshing && !nowRefreshing && !this._pullUpTimer) {
        this.pullUpFinish();
      }
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
      this.initPullUp(document.body); // for pullUp
    } else if (this.props.useZscroller) {
      this.renderZscroller();
    } else {
      const ele = ReactDOM.findDOMNode(this.ScrollViewRef);
      ele.addEventListener('scroll', this.tsExec);
      this.initPullUp(ele); // for pullUp
    }
  }
  componentWillUnmount() {
    if (this.props.useBodyScroll) {
      window.removeEventListener('scroll', this.tsExec);
      window.removeEventListener('resize', this.onLayout);
      this.destroyPullUp(document.body); // for pullUp
    } else if (this.props.useZscroller) {
      this.domScroller.destroy();
    } else {
      const ele = ReactDOM.findDOMNode(this.ScrollViewRef);
      ele.removeEventListener('scroll', this.tsExec);
      this.destroyPullUp(ele); // for pullUp
    }
  }

  getInnerViewNode = () => {
    return ReactDOM.findDOMNode(this.InnerScrollViewRef);
  }

  scrollTo = (...args) => {
    if (this.props.useBodyScroll) {
      window.scrollTo(...args);
    } else if (this.props.useZscroller) {
      // it will change zScroller's dimensions on data loaded, so it needs fire reflow.
      this.domScroller.reflow();
      this.domScroller.scroller.scrollTo(...args);
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

  scrollingComplete = () => {
    // console.log('scrolling complete');
    if (this.props.refreshControl &&
    this.RefreshControlRef && this.RefreshControlRef.state.deactive) {
      this.RefreshControlRef.setState({ deactive: false });
    }
  }

  renderZscroller() {
    const { scrollerOptions, refreshControl } = this.props;
    const { scrollingComplete, onScroll, ...restProps } = scrollerOptions;
    // console.log(scrollingComplete, onScroll, restProps);
    // console.log('onRefresh will not change', refreshControl.props.onRefresh.toString());
    this.domScroller = new DOMScroller(this.getInnerViewNode(), {
      scrollingX: false,
      onScroll: () => {
        this.tsExec();
        if (onScroll) {
          onScroll();
        }
      },
      scrollingComplete: () => {
        this.scrollingComplete();
        if (scrollingComplete) {
          scrollingComplete();
        }
      },
      ...restProps,
    });
    if (refreshControl) {
      const scroller = this.domScroller.scroller;
      const { distanceToRefresh, onRefresh } = refreshControl.props;
      scroller.activatePullToRefresh(distanceToRefresh,
        () => {
          // console.log('reach to the distance');
          this.manuallyRefresh = true;
          this.overDistanceThenRelease = false;
          this.RefreshControlRef && this.RefreshControlRef.setState({ active: true });
        },
        () => {
          // console.log('back to the distance');
          this.manuallyRefresh = false;
          this.RefreshControlRef && this.RefreshControlRef.setState({
            deactive: this.overDistanceThenRelease,
            active: false,
            loadingState: false,
          });
        },
        () => {
          // console.log('Over distance and release to loading');
          this.overDistanceThenRelease = true;
          this.RefreshControlRef && this.RefreshControlRef.setState({
            deactive: false,
            loadingState: true,
          });
          this._refreshControlTimer = setTimeout(() => {
            if (!this.props.refreshControl.props.refreshing) {
              scroller.finishPullToRefresh();
            }
            this._refreshControlTimer = undefined;
          }, 1000);
          onRefresh();
        });
      if (refreshControl.props.refreshing) {
        scroller.triggerPullToRefresh();
      }
    }
  }
  render() {
    const {
      children, className, prefixCls, listPrefixCls, listViewPrefixCls,
      style = {}, contentContainerStyle = {},
      useZscroller, refreshControl, useBodyScroll, pullUpEnabled, pullUpRenderer,
    } = this.props;

    let styleBase = styles.base;
    if (useBodyScroll) {
      styleBase = {};
    } else if (useZscroller) {
      styleBase = styles.zScroller;
    }

    const preCls = prefixCls || listViewPrefixCls || '';

    const containerProps = {
      ref: el => this.ScrollViewRef = el,
      style: { ...styleBase, ...style },
      className: classNames(className, `${preCls}-scrollview`),
    };
    const contentContainerProps = {
      ref: el => this.InnerScrollViewRef = el,
      style: { position: 'absolute', minWidth: '100%', ...contentContainerStyle },
      className: classNames(`${preCls}-scrollview-content`, listPrefixCls),
    };

    if (refreshControl) {
      return (
        <div {...containerProps}>
          <div {...contentContainerProps}>
            {React.cloneElement(refreshControl, { ref: el => this.RefreshControlRef = el })}
            {children}
          </div>
        </div>
      );
    }

    const createPullUp = () => {
      const pullUpCls = classNames(`${preCls}-pull-up-content`,
        !this.state.isTouching && `${preCls}-pull-up-dropped`);
      let defaultRenderer = this.pullUpDisplay.deactivate;
      switch (this.state.pullUp) {
        case 'activate':
        case 'deactivate':
        case 'release':
        case 'finish':
        default:
          defaultRenderer = this.pullUpDisplay[this.state.pullUp];
      }
      return (
        <div className={pullUpCls} ref={el => this.pullUpContentRef = el}>
          {children}
          <div ref={el => this.pullUpIndicatorRef = el} className={`${preCls}-pull-up-indicator`}>
            {pullUpRenderer ? pullUpRenderer(this.state.pullUp) : defaultRenderer}
          </div>
        </div>
      );
    };

    if (useBodyScroll) {
      if (pullUpEnabled) {
        containerProps.style.overflow = 'hidden';
        return (
          <div {...containerProps}>
            {createPullUp()}
          </div>
        );
      }
      return (
        <div {...containerProps}>
          {children}
        </div>
      );
    }

    if (pullUpEnabled) {
      contentContainerProps.style.overflow = 'hidden';
      return (
        <div {...containerProps}>
          <div {...contentContainerProps}>
            {createPullUp()}
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

  /**
   The following code was intended to implement the pull-up-to-load-more feature,

   Coincidentally, it solves a problem, if the content is not high enough,
   the `onScroll` and `onEndReached` event will not be fired.
   However, there should be a better solution for this issue.
   */
  // https://github.com/yiminghe/zscroller/blob/2d97973287135745818a0537712235a39a6a62a1/src/Scroller.js#L355
  // states: `activate` / `deactivate` / `release` / `finish`
  state = {
    pullUp: false,
    isTouching: false,
  };

  pullUpStats = {
    activate: 'activate',
    deactivate: 'deactivate',
    release: 'release',
    finish: 'finish',
  };

  pullUpDisplay = {
    activate: '释放刷新',
    deactivate: '上拉 ↑',
    release: '加载中...',
    finish: '完成刷新',
  };

  genEvtHandler = (ele) => {
    return {
      touchstart: this.onTouchStart.bind(this, ele),
      touchmove: this.onTouchMove.bind(this, ele),
      touchend: this.onTouchEnd.bind(this, ele),
      touchcancel: this.onTouchEnd.bind(this, ele),
    };
  }

  initPullUp = (ele) => {
    if (this.pullUpContentRef) {
      setTransformOrigin(this.pullUpContentRef.style, 'left top');
    }

    this._to = this.genEvtHandler(ele);
    Object.keys(this._to).forEach(key => {
      ele.addEventListener(key, this._to[key]);
    });
  }

  destroyPullUp = (ele) => {
    Object.keys(this._to).forEach(key => {
      ele.removeEventListener(key, this._to[key]);
    });
  }

  onTouchStart = (ele, e) => {
    this._pullUpScreenY = this._pullUpStartScreenY = e.touches[0].screenY;
    this._pullUpLastScreenY = 0;
    if (this.props.pullUpEnabled) {
      this.setState({ isTouching: true });
    }
  }

  onTouchMove = (ele, e) => {
    if (!this.props.pullUpEnabled) {
      return;
    }

    // 使用 pageY 对比有问题
    const _screenY = e.touches[0].screenY;
    if (this._pullUpStartScreenY - _screenY > 0) {
      // console.log('is pull up', _screenY);

      let isReachBottom;
      if (this.props.useBodyScroll) {
        // In chrome61 `document.body.scrollTop` is invalid, here `ele === document.body`
        const scrollNode = document.scrollingElement ? document.scrollingElement : ele;
        isReachBottom = ele.scrollHeight - scrollNode.scrollTop <= window.innerHeight;
        // console.log(ele.scrollHeight, scrollNode.scrollTop, window.innerHeight);
      } else {
        isReachBottom = ele.scrollHeight - ele.scrollTop === ele.clientHeight;
      }
      if (isReachBottom) {
        const _diff = Math.round(_screenY - this._pullUpScreenY);
        this._pullUpScreenY = _screenY;
        this._pullUpLastScreenY += _diff;

        setTransform(this.pullUpContentRef.style,
          `translate3d(0px,${this._pullUpLastScreenY}px,0)`);

        if (Math.abs(this._pullUpLastScreenY) < this.props.pullUpDistanceToRefresh) {
          if (this.state.pullUp !== this.pullUpStats.deactivate) {
            // console.log('back to the distance');
            this.setState({ pullUp: this.pullUpStats.deactivate });
          }
        } else {
          if (this.state.pullUp === this.pullUpStats.deactivate) {
            // console.log('reach to the distance');
            this.setState({ pullUp: this.pullUpStats.activate });
          }
        }
      }
    }
  }

  onTouchEnd = () => {
    if (this.props.pullUpEnabled) {
      this.setState({ isTouching: false });
    }
    if (this.state.pullUp === this.pullUpStats.deactivate) {
      this.pullUpFinish();
    } else if (this.state.pullUp === this.pullUpStats.activate) {
      this.setState({ pullUp: this.pullUpStats.release });
      this._pullUpTimer = setTimeout(() => {
        if (!this.props.pullUpRefreshing) {
          this.pullUpFinish();
        }
        this._pullUpTimer = undefined;
      }, 1000);
      this.props.pullUpOnRefresh();
    }
  }

  pullUpFinish = () => {
    this._pullUpLastScreenY = 0;
    setTransform(this.pullUpContentRef.style, `translate3d(0px,0px,0)`);
    if (this.state.pullUp === this.pullUpStats.release) {
      this.setState({ pullUp: this.pullUpStats.finish });
    }
  }
}
