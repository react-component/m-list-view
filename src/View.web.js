import React, { PropTypes } from 'react';
import { Mixin as LayoutMixin } from './Utilties/LayoutMixin';
import { Mixin as NativeMethodsMixin } from './Utilties/NativeMethodsMixin';

const View = React.createClass({
  mixins: [LayoutMixin, NativeMethodsMixin],
  propTypes: {
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
  },
  render() {
    return (
      <div {...this.props}>
        {this.props.children}
      </div>
    );
  }
});

View.isReactNativeComponent = true;

export default View;
