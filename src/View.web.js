import React, { PropTypes } from 'react';
import { Mixin as LayoutMixin } from './Utilties/LayoutMixin';
import { Mixin as NativeMethodsMixin } from './Utilties/NativeMethodsMixin';

const View = React.createClass({
  mixins: [LayoutMixin, NativeMethodsMixin],
  propTypes: {
    /**
     * When true, indicates that the view is an accessibility element. By default,
     * all the touchable elements are accessible.
     */
    accessible: PropTypes.bool,

    /**
     * Overrides the text that's read by the screen reader when the user interacts
     * with the element. By default, the label is constructed by traversing all the
     * children and accumulating all the Text nodes separated by space.
     */
    accessibilityLabel: PropTypes.string,
    /**
     * When `accessible` is true, the system will try to invoke this function
     * when the user performs accessibility tap gesture.
     */
    onAccessibilityTap: PropTypes.func,

    /**
     * When `accessible` is true, the system will invoke this function when the
     * user performs the magic tap gesture.
     */
    onMagicTap: PropTypes.func,

    /**
     * Used to locate this view in end-to-end tests. NB: disables the 'layout-only
     * view removal' optimization for this view!
     */
    testID: PropTypes.string,

    /**
     * For most touch interactions, you'll simply want to wrap your component in
     * `TouchableHighlight` or `TouchableOpacity`. Check out `Touchable.js`,
     * `ScrollResponder.js` and `ResponderEventPlugin.js` for more discussion.
     */
    onResponderGrant: PropTypes.func,
    onResponderMove: PropTypes.func,
    onResponderReject: PropTypes.func,
    onResponderRelease: PropTypes.func,
    onResponderTerminate: PropTypes.func,
    onResponderTerminationRequest: PropTypes.func,
    onStartShouldSetResponder: PropTypes.func,
    onStartShouldSetResponderCapture: PropTypes.func,
    onMoveShouldSetResponder: PropTypes.func,
    onMoveShouldSetResponderCapture: PropTypes.func,

    /**
     * Invoked on mount and layout changes with
     *
     *   {nativeEvent: { layout: {x, y, width, height}}}.
     *
     * This event is fired immediately once the layout has been calculated, but
     * the new layout may not yet be reflected on the screen at the time the
     * event is received, especially if a layout animation is in progress.
     */
    onLayout: PropTypes.func,

    /**
     * Controls whether the View can be the target of touch events.
     *
     *   - 'auto': The View can be the target of touch events.
     *   - 'none': The View is never the target of touch events.
     *   - 'box-none': The View is never the target of touch events but it's
     *     subviews can be. It behaves like if the view had the following classes
     *     in CSS:
     * ```
     * .box-none {
     * 		pointer-events: none;
     * }
     * .box-none * {
     * 		pointer-events: all;
     * }
     * ```
     *   - 'box-only': The view can be the target of touch events but it's
     *     subviews cannot be. It behaves like if the view had the following classes
     *     in CSS:
     * ```
     * .box-only {
     * 		pointer-events: all;
     * }
     * .box-only * {
     * 		pointer-events: none;
     * }
     * ```
     */
    // Since `pointerEvents` does not affect layout/appearance, and we are
    // already deviating from the spec by adding additional modes, we opt to not
    // include `pointerEvents` on `style`. On some platforms, we would need to
    // implement it as a `className` anyways. Using `style` or not is an
    // implementation detail of the platform.
    pointerEvents: PropTypes.oneOf([
      'box-none',
      'none',
      'box-only',
      'auto',
    ]),
    style: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array
    ]),

    /**
     * This is a special performance property exposed by RCTView and is useful
     * for scrolling content when there are many subviews, most of which are
     * offscreen. For this property to be effective, it must be applied to a
     * view that contains many subviews that extend outside its bound. The
     * subviews must also have overflow: hidden, as should the containing view
     * (or one of its superviews).
     */
    removeClippedSubviews: PropTypes.bool,
  },
  render() {
    const { children, className, style, onScroll, onCick = () => {} } = this.props;
    const divProps = { className, style, onScroll, onClick: onCick };
    return (
      <div {...divProps}>
        {children}
      </div>
    );
  }
});

View.isReactNativeComponent = true;

export default View;
