import * as React from 'react';
import ReactDOM from 'react-dom';
import DOMScroller from 'zscroller';
import assign from 'object-assign';

const throttle = function (fn, delay) {
  let allowSample = true;
  return function (e) {
    if (allowSample) {
      allowSample = false;
      setTimeout(function () { allowSample = true; }, delay);
      fn(e);
    }
  };
};

const SCROLLVIEW = 'ScrollView';
const INNERVIEW = 'InnerScrollView';

export default class MyScroller extends React.Component {
  componentDidMount() {
    this.__handleScroll = this._handleScroll();
    if (this.props.useZscroller) {
      this.domScroller = new DOMScroller(ReactDOM.findDOMNode(this.refs[INNERVIEW]), assign({}, {
        scrollingX: false,
        onScroll: this.__handleScroll,
      }, this.props.scrollerOptions));
    } else {
      ReactDOM.findDOMNode(this.refs[SCROLLVIEW]).addEventListener('scroll', this.__handleScroll);
    }
  }
  componentWillUnmount() {
    if (this.props.useZscroller) {
      this.domScroller.destroy();
    } else {
      ReactDOM.findDOMNode(this.refs[SCROLLVIEW]).removeEventListener('scroll', this.__handleScroll);
    }
  }
  handleScroll = (e) => {
    const { onScroll = (ev) => { } } = this.props;
    onScroll(e);
  }
  _handleScroll = (e) => {
    let handleScroll = (ev) => {};
    if (this.props.scrollEventThrottle && this.props.onScroll) {
      handleScroll = throttle(this.handleScroll, this.props.scrollEventThrottle);
    }
    return handleScroll;
  }
  render() {
    const { children, className, style = {}, contentContainerStyle, useZscroller } = this.props;
    return React.cloneElement(
      <div ref={SCROLLVIEW} />, { className, style: useZscroller ? assign({}, {
        position: 'relative',
        overflow: 'hidden',
        flex: 1,
      }, style) : style },
      <div ref={INNERVIEW} style={contentContainerStyle}>{children}</div>
    );
  }
}
