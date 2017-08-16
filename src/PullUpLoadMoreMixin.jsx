/* eslint no-unused-vars: 0 */
import React from 'react';
import ReactDOM from 'react-dom';

export default {
  bindEvt() {
    const ele = this.getEle();
    ele.addEventListener('touchstart', this.onPullUpStart);
    ele.addEventListener('touchmove', this.onPullUpMove);
    ele.addEventListener('touchend', this.onPullUpEnd);
    ele.addEventListener('touchcancel', this.onPullUpEnd);
  },
  unBindEvt() {
    const ele = this.getEle();
    ele.removeEventListener('touchstart', this.onPullUpStart);
    ele.removeEventListener('touchmove', this.onPullUpMove);
    ele.removeEventListener('touchend', this.onPullUpEnd);
    ele.removeEventListener('touchcancel', this.onPullUpEnd);
  },
  getEle() {
    const { stickyHeader, useBodyScroll } = this.props;
    let ele;
    if (stickyHeader || useBodyScroll) {
      ele = document.body;
    } else {
      ele = ReactDOM.findDOMNode(this.refs.listviewscroll.refs.ScrollView);
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
    this._pullUpStartPageY = e.touches[0].screenY;
    this._isPullUp = false;
    this._pullUpEle = this.getEle();
  },
  onPullUpMove(e) {
    // 使用 pageY 对比有问题
    if (e.touches[0].screenY < this._pullUpStartPageY && this._reachBottom()) {
      // console.log('滚动条到了底部，pull up');
      this._isPullUp = true;
    }
  },
  onPullUpEnd(e) {
    if (this._isPullUp && this.props.onEndReached) {
      // this.props.onEndReached(e);
      this._onScroll(e); // need update `this.scrollProperties` in order to render correctly
    }
    this._isPullUp = false;
  },
  _reachBottom() {
    const element = this._pullUpEle;
    if (element === document.body) {
      return element.scrollHeight - element.scrollTop === window.innerHeight;
    }
    return element.scrollHeight - element.scrollTop === element.clientHeight;
  },
};
