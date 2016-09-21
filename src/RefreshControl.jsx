import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';

export default React.createClass({
  propTypes: {
    className: PropTypes.string,
    style: PropTypes.object,
    icon: PropTypes.element,
    prefixCls: PropTypes.string,
    loading: PropTypes.element,
    distanceToRefresh: PropTypes.number,
    refreshing: PropTypes.bool,
    onRefresh: PropTypes.func.isRequired,
  },

  getInitialState() {
    return {
      active: false,
      loadingState: false,
    };
  },

  getDefaultProps() {
    return {
      prefixCls: 'list-view-refresh-control',
      distanceToRefresh: 50,
      refreshing: false,
      icon: <div style={{lineHeight: '50px', textAlign: 'center' }}>
        <div className="list-view-refresh-control-pull">
          ↓ 下拉
        </div>
        <div className="list-view-refresh-control-release">
          ↑ 释放
        </div>
      </div>,
      loading: <div style={{ lineHeight: '50px', textAlign: 'center' }}>loading...</div>,
    };
  },

  render() {
    const {
      prefixCls, icon, loading, className = '', style, refreshing
    } = this.props;
    const { active, loadingState } = this.state;
    const wrapCls = classNames({
      [className]: className,
      [`${prefixCls}-ptr`]: true,
      [`${prefixCls}-active`]: active,
      [`${prefixCls}-loading`]: loadingState || refreshing,
    });
    return (
      <div ref="ptr" className={wrapCls} style={style}>
        <div className={`${prefixCls}-ptr-icon`}>{icon}</div>
        <div className={`${prefixCls}-ptr-loading`}>{loading}</div>
      </div>
    );
  },
});
