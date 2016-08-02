import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import ListView from './ListView.web';
import { getOffsetTop, _event } from './indexed-util';

export default class IndexedList extends React.Component {
  static propTypes = {
    prefixCls: PropTypes.string,
    quickSearchBarTop: PropTypes.object,
    onQuickSearch: PropTypes.func,
  }

  static defaultProps = {
    prefixCls: 'am-indexed-list',
    quickSearchBarTop: { value: '#', label: '#' },
    onQuickSearch: () => { },
  }

  constructor(props) {
    super(props);
    this.state = {
      qsOver: false,
    };
  }

  componentDidMount() {
    const quickSearchBar = this.refs.quickSearchBar;
    const height = quickSearchBar.offsetHeight;
    const hCache = [];
    [].slice.call(quickSearchBar.querySelectorAll('[data-qf-target]')).forEach((d) => {
      hCache.push([d]);
    });
    const _avgH = height / hCache.length;
    let _top = 0;
    for (let i = 0, len = hCache.length; i < len; i++) {
      _top = i * _avgH;
      hCache[i][1] = [_top, _top + _avgH];
    }
    this._qsHeight = height;
    this._avgH = _avgH;
    this._hCache = hCache;
  }

  sectionComponents = {}

  onQuickSearchTop = (sectionID, topId) => {
    if (this.props.stickyHeader) {
      window.document.body.scrollTop = 0;
    } else {
      ReactDOM.findDOMNode(this.refs.indexedListView.refs.listviewscroll).scrollTop = 0;
    }
    this.props.onQuickSearch(sectionID, topId);
  }
  onQuickSearch = (sectionID) => {
    const lv = ReactDOM.findDOMNode(this.refs.indexedListView.refs.listviewscroll);
    let sec = ReactDOM.findDOMNode(this.sectionComponents[sectionID]);
    if (this.props.stickyHeader) {
      // react-sticky 会把 header 设置为 fixed ，但提供了 placeholder 记忆原来位置
      const stickyComponent = this.refs.indexedListView.stickyRefs[sectionID];
      if (stickyComponent && stickyComponent.refs.placeholder) {
        sec = ReactDOM.findDOMNode(stickyComponent.refs.placeholder);
      }
      window.document.body.scrollTop = sec.getBoundingClientRect().top - lv.getBoundingClientRect().top + getOffsetTop(lv);
    } else {
      lv.scrollTop += sec.getBoundingClientRect().top - lv.getBoundingClientRect().top;
    }
    this.props.onQuickSearch(sectionID);
  }

  onTouchStart = (e) => {
    // e.preventDefault();
    this._target = e.target;
    this._basePos = this.refs.quickSearchBar.getBoundingClientRect();
    const overValue = this._target.getAttribute('data-qf-target');
    this.setState({
      qsOver: overValue,
    });
  }
  onTouchMove = (e) => {
    e.preventDefault();
    if (this._target) {
      const ex = _event(e);
      const basePos = this._basePos;
      let _pos;
      if (ex.clientY >= basePos.top && ex.clientY <= (basePos.top + this._qsHeight)) {
        _pos = Math.floor((ex.clientY - basePos.top) / this._avgH);
        let target;
        if (_pos in this._hCache) {
          target = this._hCache[_pos][0];
        }
        if (target) {
          const overValue = target.getAttribute('data-qf-target');
          if (this._target !== target) {
            if (this.props.quickSearchBarTop.value === overValue) {
              this.onQuickSearchTop(undefined, overValue);
            } else {
              this.onQuickSearch(overValue);
            }
          }
          this.setState({
            qsOver: overValue,
          });
          this._target = target;
        }
      }
    }
  }
  onTouchEnd = (e) => {
    if (!this._target) {
      return;
    }
    this._target = null;
    this.setState({
      qsOver: false,
    });
  }

  renderQuickSearchBar(quickSearchBarTop, quickSearchBarStyle) {
    const { dataSource, prefixCls } = this.props;
    const sectionKvs = dataSource.sectionIdentities.map(i => {
      return {
        value: i,
        label: dataSource._getSectionHeaderData(dataSource._dataBlob, i),
      };
    });
    return (
      <ul ref="quickSearchBar"
        className={`${prefixCls}-quick-search-bar`} style={quickSearchBarStyle}
        onTouchStart={e => this.onTouchStart(e)}
        onTouchMove={e => this.onTouchMove(e)}
        onTouchEnd={e => this.onTouchEnd(e)}
      >
        <li data-qf-target={quickSearchBarTop.value}
          className={
            this.state.qsOver === quickSearchBarTop.value ? `${prefixCls}-quick-search-bar-over` : ''}
          onClick={() => this.onQuickSearchTop(undefined, quickSearchBarTop.value) }
        >
          {quickSearchBarTop.label}
        </li>
        {sectionKvs.map(i => {
          return (
            <li key={i.value} data-qf-target={i.value}
              className={
                this.state.qsOver === i.value ? `${prefixCls}-quick-search-bar-over` : ''}
              onClick={() => this.onQuickSearch(i.value) }
            >
              {i.label}
            </li>
          );
        })}
      </ul>
    );
  }

  render() {
    const { className, prefixCls, children, quickSearchBarTop, quickSearchBarStyle,
      renderSectionHeader, ...other } = this.props;
    const wrapCls = classNames({
      [className]: className,
      [prefixCls]: true,
    });
    return (
      <ListView
        {...other}
        ref="indexedListView"
        className={wrapCls}
        initialListSize={this.props.dataSource.getRowCount()}
        renderSectionHeader={(sectionData, sectionID) => (<div
          className={`${prefixCls}-section-header`}
          ref={c => {this.sectionComponents[sectionID] = c;}}
          >
          {renderSectionHeader(sectionData, sectionID)}
        </div>)}
      >{this.renderQuickSearchBar(quickSearchBarTop, quickSearchBarStyle)}{children}</ListView>
    );
  }
}
