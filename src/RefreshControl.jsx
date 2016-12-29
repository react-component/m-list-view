import React, { PropTypes } from 'react';
import classNames from 'classnames';

export default React.createClass({
  propTypes: {
    prefixCls: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.object,
    icon: PropTypes.any,
    loading: PropTypes.any,
    distanceToRefresh: PropTypes.number,
    refreshing: PropTypes.bool,
    onRefresh: PropTypes.func.isRequired,
  },
  getDefaultProps() {
    return {
      prefixCls: 'list-view-refresh-control',
      distanceToRefresh: 50,
      refreshing: false,
      icon: [
        <div key="0" className="list-view-refresh-control-pull">
          ↓ 下拉
        </div>,
        <div key="1" className="list-view-refresh-control-release">
          ↑ 释放
        </div>,
      ],
      loading: <div>loading...</div>,
    };
  },

  getInitialState() {
    return {
      active: false,
      deactive: false,
      loadingState: false,
    };
  },

  render() {
    const {
      prefixCls, className = '', style, icon, loading, refreshing,
    } = this.props;
    const { active, deactive, loadingState } = this.state;
    const wrapCls = classNames({
      [className]: className,
      [`${prefixCls}-ptr`]: true,
      [`${prefixCls}-active`]: active,
      [`${prefixCls}-deactive`]: deactive,
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
