import React from 'react';
import ReactDOM from 'react-dom';

export default {
  bindEvt() {
    const ele = this.getEle();
    ele.addEventListener('touchstart', this.onPullUpStart.bind(this));
    ele.addEventListener('touchmove', this.onPullUpMove.bind(this));
    ele.addEventListener('touchend', this.onPullUpEnd.bind(this));
    ele.addEventListener('touchcancel', this.onPullUpEnd.bind(this));
  },
  unBindEvt() {
    const ele = this.getEle();
    ele.removeEventListener('touchstart', this.onPullUpStart.bind(this));
    ele.removeEventListener('touchmove', this.onPullUpMove.bind(this));
    ele.removeEventListener('touchend', this.onPullUpEnd.bind(this));
    ele.removeEventListener('touchcancel', this.onPullUpEnd.bind(this));
  },
  getEle() {
    const { stickyHeader, useBodyScroll, useZscroller } = this.props;
    let ele;
    if (stickyHeader || useBodyScroll) {
      ele = window;
    } else {
      ele = ReactDOM.findDOMNode(this.refs['listviewscroll'].refs['ScrollView']);
    }
    return ele;
  },
  componentDidMount() {
    this.bindEvt();
  },
  componentWillUnmount() {
    this.unBindEvt();
  },
  onPullUpStart(e) {
    this._pullUpStartPageY = e.touches[0].pageY;
    this._isPullUp = false;
  },
  onPullUpMove(e) {
    // console.log(this._getDistanceFromEnd(this.scrollProperties))
    if (e.touches[0].pageY < this._pullUpStartPageY &&
      Object.keys(this.scrollProperties).every(i => this.scrollProperties[i] !== null) &&
      this._getDistanceFromEnd(this.scrollProperties) === 0) {
      // console.log('pull up');
      this._isPullUp = true;
    }
  },
  onPullUpEnd(e) {
    if (this._isPullUp && this.props.onEndReached) {
      this.props.onEndReached(e);
    }
    this._isPullUp = false;
  },
};
