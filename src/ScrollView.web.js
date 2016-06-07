import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import ScrollResponder from './ScrollResponder.web';
import StyleSheet from './StyleSheet';
import View from './View.web';
import mixin from 'react-mixin';
import autobind from 'autobind-decorator';
const throttle = require('domkit/throttle');
const invariant = require('fbjs/lib/invariant');

const SCROLLVIEW = 'ScrollView';
const INNERVIEW = 'InnerScrollView';
const CONTENT_EXT_STYLE = ['padding', 'paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight'];

/**
 * Component that wraps platform ScrollView while providing
 * integration with touch locking "responder" system.
 *
 * Keep in mind that ScrollViews must have a bounded height in order to work,
 * since they contain unbounded-height children into a bounded container (via
 * a scroll interaction). In order to bound the height of a ScrollView, either
 * set the height of the view directly (discouraged) or make sure all parent
 * views have bounded height. Forgetting to transfer `{flex: 1}` down the
 * view stack can lead to errors here, which the element inspector makes
 * easy to debug.
 *
 * Doesn't yet support other contained responders from blocking this scroll
 * view from becoming the responder.
 */
class ScrollView extends React.Component {
  static propTypes = {
    /**
     * Controls whether iOS should automatically adjust the content inset
     * for scroll views that are placed behind a navigation bar or
     * tab bar/ toolbar. The default value is true.
     * @platform ios
     */
    automaticallyAdjustContentInsets: PropTypes.bool,
    /**
     * The amount by which the scroll view content is inset from the edges
     * of the scroll view. Defaults to `{0, 0, 0, 0}`.
     * @platform ios
     */
    // contentInset: EdgeInsetsPropType,
    /**
     * Used to manually set the starting scroll offset.
     * The default value is `{x: 0, y: 0}`.
     * @platform ios
     */
    // contentOffset: PointPropType,
    /**
     * When true, the scroll view bounces when it reaches the end of the
     * content if the content is larger then the scroll view along the axis of
     * the scroll direction. When false, it disables all bouncing even if
     * the `alwaysBounce*` props are true. The default value is true.
     * @platform ios
     */
    bounces: PropTypes.bool,
    /**
     * When true, gestures can drive zoom past min/max and the zoom will animate
     * to the min/max value at gesture end, otherwise the zoom will not exceed
     * the limits.
     * @platform ios
     */
    bouncesZoom: PropTypes.bool,
    /**
     * When true, the scroll view bounces horizontally when it reaches the end
     * even if the content is smaller than the scroll view itself. The default
     * value is true when `horizontal={true}` and false otherwise.
     * @platform ios
     */
    alwaysBounceHorizontal: PropTypes.bool,
    /**
     * When true, the scroll view bounces vertically when it reaches the end
     * even if the content is smaller than the scroll view itself. The default
     * value is false when `horizontal={true}` and true otherwise.
     * @platform ios
     */
    alwaysBounceVertical: PropTypes.bool,
    /**
     * When true, the scroll view automatically centers the content when the
     * content is smaller than the scroll view bounds; when the content is
     * larger than the scroll view, this property has no effect. The default
     * value is false.
     * @platform ios
     */
    centerContent: PropTypes.bool,
    /**
     * These styles will be applied to the scroll view content container which
     * wraps all of the child views. Example:
     *
     *   return (
     *     <ScrollView contentContainerStyle={styles.contentContainer}>
     *     </ScrollView>
     *   );
     *   ...
     *   var styles = StyleSheet.create({
     *     contentContainer: {
     *       paddingVertical: 20
     *     }
     *   });
     */
    // contentContainerStyle: StyleSheetPropType(ViewStylePropTypes),
    /**
     * A floating-point number that determines how quickly the scroll view
     * decelerates after the user lifts their finger. Reasonable choices include
     *   - Normal: 0.998 (the default)
     *   - Fast: 0.9
     * @platform ios
     */
    decelerationRate: PropTypes.number,
    /**
     * When true, the scroll view's children are arranged horizontally in a row
     * instead of vertically in a column. The default value is false.
     */
    horizontal: PropTypes.bool,
    /**
     * When true, the ScrollView will try to lock to only vertical or horizontal
     * scrolling while dragging.  The default value is false.
     * @platform ios
     */
    directionalLockEnabled: PropTypes.bool,
    /**
     * When false, once tracking starts, won't try to drag if the touch moves.
     * The default value is true.
     * @platform ios
     */
    canCancelContentTouches: PropTypes.bool,
    /**
     * Determines whether the keyboard gets dismissed in response to a drag.
     *   - 'none' (the default), drags do not dismiss the keyboard.
     *   - 'on-drag', the keyboard is dismissed when a drag begins.
     *   - 'interactive', the keyboard is dismissed interactively with the drag and moves in
     *     synchrony with the touch; dragging upwards cancels the dismissal.
     *     On android this is not supported and it will have the same behavior as 'none'.
     */
    keyboardDismissMode: PropTypes.oneOf([
      'none', // default
      'interactive',
      'on-drag',
    ]),
    /**
     * When false, tapping outside of the focused text input when the keyboard
     * is up dismisses the keyboard. When true, the scroll view will not catch
     * taps, and the keyboard will not dismiss automatically. The default value
     * is false.
     */
    keyboardShouldPersistTaps: PropTypes.bool,
    /**
     * The maximum allowed zoom scale. The default value is 1.0.
     * @platform ios
     */
    maximumZoomScale: PropTypes.number,
    /**
     * The minimum allowed zoom scale. The default value is 1.0.
     * @platform ios
     */
    minimumZoomScale: PropTypes.number,
    /**
     * Fires at most once per frame during scrolling. The frequency of the
     * events can be contolled using the `scrollEventThrottle` prop.
     */
    onScroll: PropTypes.func,
    /**
     * Called when a scrolling animation ends.
     * @platform ios
     */
    onScrollAnimationEnd: PropTypes.func,
    /**
     * When true, the scroll view stops on multiples of the scroll view's size
     * when scrolling. This can be used for horizontal pagination. The default
     * value is false.
     * @platform ios
     */
    pagingEnabled: PropTypes.bool,
    /**
     * When false, the content does not scroll.
     * The default value is true.
     * @platform ios
     */
    scrollEnabled: PropTypes.bool,
    /**
     * This controls how often the scroll event will be fired while scrolling
     * (in events per seconds). A higher number yields better accuracy for code
     * that is tracking the scroll position, but can lead to scroll performance
     * problems due to the volume of information being send over the bridge.
     * The default value is zero, which means the scroll event will be sent
     * only once each time the view is scrolled.
     * @platform ios
     */
    scrollEventThrottle: PropTypes.number,
    /**
     * The amount by which the scroll view indicators are inset from the edges
     * of the scroll view. This should normally be set to the same value as
     * the `contentInset`. Defaults to `{0, 0, 0, 0}`.
     * @platform ios
     */
    // scrollIndicatorInsets: EdgeInsetsPropType,
    /**
     * When true, the scroll view scrolls to top when the status bar is tapped.
     * The default value is true.
     * @platform ios
     */
    scrollsToTop: PropTypes.bool,
    /**
     * When true, shows a horizontal scroll indicator.
     */
    showsHorizontalScrollIndicator: PropTypes.bool,
    /**
     * When true, shows a vertical scroll indicator.
     */
    showsVerticalScrollIndicator: PropTypes.bool,
    /**
     * An array of child indices determining which children get docked to the
     * top of the screen when scrolling. For example, passing
     * `stickyHeaderIndices={[0]}` will cause the first child to be fixed to the
     * top of the scroll view. This property is not supported in conjunction
     * with `horizontal={true}`.
     * @platform ios
     */
    stickyHeaderIndices: PropTypes.arrayOf(PropTypes.number),
    // style: StyleSheetPropType(ViewStylePropTypes),
    /**
     * When set, causes the scroll view to stop at multiples of the value of
     * `snapToInterval`. This can be used for paginating through children
     * that have lengths smaller than the scroll view. Used in combination
     * with `snapToAlignment`.
     * @platform ios
     */
    snapToInterval: PropTypes.number,
    /**
     * When `snapToInterval` is set, `snapToAlignment` will define the relationship
     * of the the snapping to the scroll view.
     *   - `start` (the default) will align the snap at the left (horizontal) or top (vertical)
     *   - `center` will align the snap in the center
     *   - `end` will align the snap at the right (horizontal) or bottom (vertical)
     * @platform ios
     */
    snapToAlignment: PropTypes.oneOf([
      'start', // default
      'center',
      'end',
    ]),
    /**
     * Experimental: When true, offscreen child views (whose `overflow` value is
     * `hidden`) are removed from their native backing superview when offscreen.
     * This can improve scrolling performance on long lists. The default value is
     * false.
     */
    removeClippedSubviews: PropTypes.bool,
    /**
     * The current scale of the scroll view content. The default value is 1.0.
     * @platform ios
     */
    zoomScale: PropTypes.number,

    /**
     * A RefreshControl component, used to provide pull-to-refresh
     * functionality for the ScrollView.
     *
     * See [RefreshControl](docs/refreshcontrol.html).
     */
    refreshControl: PropTypes.element,
  }

  state = this.scrollResponderMixinGetInitialState();

  componentDidMount() {
    let scrollView = ReactDOM.findDOMNode(this.refs[SCROLLVIEW]);
    this.__handleScroll = this._handleScroll();
    scrollView.addEventListener('scroll', this.__handleScroll);
  }
  componentWillUnmount() {
    let scrollView = ReactDOM.findDOMNode(this.refs[SCROLLVIEW]);
    scrollView.removeEventListener('scroll', this.__handleScroll);
  }
  /**
   * Returns a reference to the underlying scroll responder, which supports
   * operations like `scrollTo`. All ScrollView-like components should
   * implement this method so that they can be composed while providing access
   * to the underlying scroll responder's methods.
   */
  getScrollResponder() {
    return this;
  }

  getInnerViewNode() {
    return this.refs[INNERVIEW];
  }

  scrollTo(destY, destX) {
    // $FlowFixMe - Don't know how to pass Mixin correctly. Postpone for now
    // this.getScrollResponder().scrollResponderScrollTo(destX || 0, destY || 0);
    this.scrollWithoutAnimationTo(destY, destX);
  }

  scrollWithoutAnimationTo(destY, destX) {
    // $FlowFixMe - Don't know how to pass Mixin correctly. Postpone for now
    // this.getScrollResponder().scrollResponderScrollWithouthAnimationTo(
    //   destX || 0,
    //   destY || 0,
    // );

    let scrollView = ReactDOM.findDOMNode(this.refs[SCROLLVIEW]);
    scrollView.scrollTop = destY || 0;
    scrollView.scrollLeft = destX || 0;
  }

  _handleScroll(e: Event) {
    let handleScroll = () => {};
    // let handleScroll = this.handleScroll;
    if (this.props.scrollEventThrottle && this.props.onScroll) {
      handleScroll = throttle(this.handleScroll, this.props.scrollEventThrottle);
    }
    return handleScroll;
  }
  handleScroll(e: Event) {
    // if (__DEV__) {
    //   if (this.props.onScroll && !this.props.scrollEventThrottle) {
    //     console.log(
    //       'You specified `onScroll` on a <ScrollView> but not ' +
    //       '`scrollEventThrottle`. You will only receive one event. ' +
    //       'Using `16` you get all the events but be aware that it may ' +
    //       'cause frame drops, use a bigger number if you don\'t need as ' +
    //       'much precision.'
    //     );
    //   }
    // }
    // if (Platform.OS === 'android') {
    //   if (this.props.keyboardDismissMode === 'on-drag') {
    //     dismissKeyboard();
    //   }
    // }

    this.props.onScroll && this.props.onScroll(e);
  }

  // _handleContentOnLayout(e) {
  //   const {width, height} = e.nativeEvent.layout;
  //   this.props.onContentSizeChange && this.props.onContentSizeChange(width, height);
  // }

  render() {
    let {
      style = {},
      ...otherProps
    } = this.props;

    let contentContainerExtStyle = {};

    for (let i = 0; i < CONTENT_EXT_STYLE.length; i++) {
      if (typeof style[CONTENT_EXT_STYLE[i]] === 'number') {
        contentContainerExtStyle[CONTENT_EXT_STYLE[i]] = style[CONTENT_EXT_STYLE[i]];
      }
    }

    let contentContainerStyle = [
      styles.contentContainer,
      this.props.horizontal && styles.contentContainerHorizontal,
      this.props.contentContainerStyle,
      contentContainerExtStyle,
    ];
    // if (__DEV__ && this.props.style) {
    //   let style = flattenStyle(this.props.style);
    //   let childLayoutProps = ['alignItems', 'justifyContent']
    //     .filter((prop) => style && style[prop] !== undefined);
    //   invariant(
    //     childLayoutProps.length === 0,
    //     'ScrollView child layout (' + JSON.stringify(childLayoutProps) +
    //       ') must by applied through the contentContainerStyle prop.'
    //   );
    // }

    let contentSizeChangeProps = {};
    // if (this.props.onContentSizeChange) { // 会多次触发 scroll 事件
    //   contentSizeChangeProps = {
    //     onLayout: this._handleContentOnLayout,
    //   };
    // }

    let contentContainer =
      <View
        {...contentSizeChangeProps}
        ref={INNERVIEW}
        style={StyleSheet.flattenStyle(contentContainerStyle)}
        removeClippedSubviews={this.props.removeClippedSubviews}
        collapsable={false}>
        {this.props.children}
      </View>;

    let alwaysBounceHorizontal =
      this.props.alwaysBounceHorizontal !== undefined ?
        this.props.alwaysBounceHorizontal :
        this.props.horizontal;

    let alwaysBounceVertical =
      this.props.alwaysBounceVertical !== undefined ?
        this.props.alwaysBounceVertical :
        !this.props.horizontal;

    // const handleScroll = this._handleScroll();

    let props = {
      ...otherProps,
      alwaysBounceHorizontal,
      alwaysBounceVertical,
      style: StyleSheet.flattenStyle([styles.base, this.props.style]),
      onTouchStart: this.scrollResponderHandleTouchStart,
      onTouchMove: this.scrollResponderHandleTouchMove,
      onTouchEnd: this.scrollResponderHandleTouchEnd,
      onScrollBeginDrag: this.scrollResponderHandleScrollBeginDrag,
      onScrollEndDrag: this.scrollResponderHandleScrollEndDrag,
      onMomentumScrollBegin: this.scrollResponderHandleMomentumScrollBegin,
      onMomentumScrollEnd: this.scrollResponderHandleMomentumScrollEnd,
      onStartShouldSetResponder: this.scrollResponderHandleStartShouldSetResponder,
      onStartShouldSetResponderCapture: this.scrollResponderHandleStartShouldSetResponderCapture,
      // onScrollShouldSetResponder: this.scrollResponderHandleScrollShouldSetResponder,
      // onScroll: handleScroll,
      // onScrollShouldSetResponder: handleScroll,
      // replace onScroll in the props
      // onScroll: () => {},
      onResponderGrant: this.scrollResponderHandleResponderGrant,
      onResponderTerminationRequest: this.scrollResponderHandleTerminationRequest,
      onResponderTerminate: this.scrollResponderHandleTerminate,
      onResponderRelease: this.scrollResponderHandleResponderRelease,
      onResponderReject: this.scrollResponderHandleResponderReject,
    };
    delete props.onScroll;

    const { decelerationRate } = this.props;
    if (decelerationRate) {
      props.decelerationRate = processDecelerationRate(decelerationRate);
    }

    let ScrollViewClass = View;
    // if (Platform.OS === 'ios') {
    //   ScrollViewClass = RCTScrollView;
    // } else if (Platform.OS === 'android') {
    //   if (this.props.horizontal) {
    //     ScrollViewClass = AndroidHorizontalScrollView;
    //   } else {
    //     ScrollViewClass = AndroidScrollView;
    //   }
    // }
    // invariant(
    //   ScrollViewClass !== undefined,
    //   'ScrollViewClass must not be undefined'
    // );

    const refreshControl = this.props.refreshControl;
    if (refreshControl) {
      // if (Platform.OS === 'ios') {
      //   // On iOS the RefreshControl is a child of the ScrollView.
      //   return (
      //     <ScrollViewClass {...props} ref={this._setScrollViewRef}>
      //       {refreshControl}
      //       {contentContainer}
      //     </ScrollViewClass>
      //   );
      // } else if (Platform.OS === 'android') {
      //   // On Android wrap the ScrollView with a AndroidSwipeRefreshLayout.
      //   // Since the ScrollView is wrapped add the style props to the
      //   // AndroidSwipeRefreshLayout and use flex: 1 for the ScrollView.
      //   return React.cloneElement(
      //     refreshControl,
      //     {style: props.style},
      //     <ScrollViewClass {...props} style={styles.base} ref={this._setScrollViewRef}>
      //       {contentContainer}
      //     </ScrollViewClass>
      //   );
      // }
      return (
        <ScrollViewClass {...props} ref={SCROLLVIEW}>
          {refreshControl}
          {contentContainer}
        </ScrollViewClass>
      );
    }

    return (
      <ScrollViewClass {...props} ref={SCROLLVIEW}>
        {contentContainer}
      </ScrollViewClass>
    );
  }
};

let styles = StyleSheet.create({
  base: {
    position: 'relative',
    overflow: 'scroll',
    WebkitOverflowScrolling: 'touch',
    flex: 1,
  },
  contentContainer: {
    position: 'absolute',
    minWidth: '100%',
  },
  contentContainerHorizontal: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
  },
});

mixin(ScrollView.prototype, ScrollResponder.Mixin);
autobind(ScrollView);

ScrollView.isReactNativeComponent = true;

export default ScrollView;
