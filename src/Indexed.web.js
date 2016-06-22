import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import ListView from './ListView.web';

function getOffsetTop(elem) {
  let offsetTop = 0;
  do {
    if (!isNaN(elem.offsetTop)) {
        offsetTop += elem.offsetTop;
    }
  } while(elem = elem.offsetParent);
  return offsetTop;
}

export default class IndexedList extends React.Component {
  static propTypes = {
    prefixCls: PropTypes.string,
    quickSearchBarTop: PropTypes.object,
    onQuickSearch: PropTypes.func,
  }

  static defaultProps = {
    prefixCls: 'am-indexed-list',
    quickSearchBarTop: { value: '#', label: '#' },
    onQuickSearch: () => {},
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
      }console.log(getOffsetTop(lv));
      window.document.body.scrollTop = sec.getBoundingClientRect().top - lv.getBoundingClientRect().top + getOffsetTop(lv);
    } else {
      lv.scrollTop += sec.getBoundingClientRect().top - lv.getBoundingClientRect().top;
    }
    this.props.onQuickSearch(sectionID);
  }

  renderQuickSearchBar(quickSearchBarTop) {
    const { dataSource, prefixCls } = this.props;
    const sectionKvs = dataSource.sectionIdentities.map(i => {
      return {
        value: i,
        label: dataSource._getSectionHeaderData(dataSource._dataBlob, i),
      };
    });
    return (<ul className={`${prefixCls}-quick-search-bar`}>
      <li onClick={() => this.onQuickSearchTop(undefined, quickSearchBarTop.value)}>{quickSearchBarTop.label}</li>
      {sectionKvs.map(i => {
        return (
          <li key={i.value} onClick={() => this.onQuickSearch(i.value)}>{i.label}</li>
        );
      })}
    </ul>);
  }

  render() {
    const { className, prefixCls, children, quickSearchBarTop,
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
      >{this.renderQuickSearchBar(quickSearchBarTop)}{children}</ListView>
    );
  }
}
