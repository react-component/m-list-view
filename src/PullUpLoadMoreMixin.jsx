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
      ele = document.body;
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
    this._pullUpStartPageY = e.touches[0].screenY;
    this._isPullUp = false;
    this._pullUpEle = this.getEle();
  },
  onPullUpMove(e) {
    // console.log(this._getDistanceFromEnd(this.scrollProperties), Object.keys(this.scrollProperties).every(i => this.scrollProperties[i] !== null))
    // 使用 pageY 对比有问题
    if (e.touches[0].screenY < this._pullUpStartPageY && this._reachBottom()) {
      // console.log('滚动条到了底部，pull up');
      this._isPullUp = true;
    }
  },
  onPullUpEnd(e) {
    if (this._isPullUp && this.props.onEndReached) {
      this.props.onEndReached(e);
    }
    this._isPullUp = false;
  },
  _reachBottom() {
    const element = this._pullUpEle;
    if (element === document.body) {
      return element.scrollHeight - element.scrollTop === window.innerHeight;
    }
    return element.scrollHeight - element.scrollTop === element.clientHeight;
  }
};
