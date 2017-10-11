/* eslint-disable no-console */
/* eslint no-dupe-keys: 0, no-mixed-operators: 0 */
import '../assets/index.less';
import React from 'react';
import ReactDOM from 'react-dom';
import ListView from '../src';
import Zscroller from '../src/Zscroller';

const data = [
  {
    img: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
    title: 'Meet hotel',
    des: '不是所有的兼职汪都需要风吹日晒',
  },
  {
    img: 'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png',
    title: 'McDonald\'s invites you',
    des: '不是所有的兼职汪都需要风吹日晒',
  },
  {
    img: 'https://zos.alipayobjects.com/rmsportal/hfVtzEhPzTUewPm.png',
    title: 'Eat the week',
    des: '不是所有的兼职汪都需要风吹日晒',
  },
];
let index = data.length - 1;

const NUM_ROWS = 20;
let pageIndex = 0;

function genData(pIndex = 0) {
  const dataArr = [];
  for (let i = 0; i < NUM_ROWS; i++) {
    dataArr.push(`row - ${(pIndex * NUM_ROWS) + i}`);
  }
  return dataArr;
}

class Demo extends React.Component {
  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });

    this.state = {
      dataSource,
      refreshing: true,
      height: document.documentElement.clientHeight,
    };
  }

  // If you use redux, the data maybe at props, you need use `componentWillReceiveProps`
  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.dataSource !== this.props.dataSource) {
  //     this.setState({
  //       dataSource: this.state.dataSource.cloneWithRows(nextProps.dataSource),
  //     });
  //   }
  // }

  componentDidMount() {
    document.body.style.overflowY =
      navigator.userAgent.match(/Android|iPhone|iPad|iPod/i) ? 'hidden' : 'auto';

    // handle https://github.com/ant-design/ant-design-mobile/issues/1588
    this.lv.getInnerViewNode().addEventListener('touchstart', this.ts = (e) => {
      this.tsPageY = e.touches[0].pageY;
    });
    // In chrome61 `document.body.scrollTop` is invalid
    const scrollNode = document.scrollingElement ? document.scrollingElement : document.body;
    this.lv.getInnerViewNode().addEventListener('touchmove', this.tm = (e) => {
      this.tmPageY = e.touches[0].pageY;
      if (this.tmPageY > this.tsPageY && this.scrollerTop <= 0 && scrollNode.scrollTop > 0) {
        console.log('start pull to refresh');
        this.domScroller.options.preventDefaultOnTouchMove = false;
      } else {
        this.domScroller.options.preventDefaultOnTouchMove = undefined;
      }
    });
  }

  componentWillUnmount() {
    this.lv.getInnerViewNode().removeEventListener('touchstart', this.ts);
    this.lv.getInnerViewNode().removeEventListener('touchmove', this.tm);
  }

  onScroll = (e) => {
    // onScroll will trigger on container touchstart, ref https://github.com/yiminghe/zscroller/blob/a67854c8dc0a1fda15acae4ffdb08e65aac79fb3/src/DOMScroller.js#L229
    this.scrollerTop = e.scroller.getValues().top;
    this.domScroller = e;
  };

  onRefresh = () => {
    console.log('onRefresh');
    if (!this.manuallyRefresh) {
      this.setState({ refreshing: true, isLoading: true });
    } else {
      this.manuallyRefresh = false;
    }

    // simulate initial Ajax
    setTimeout(() => {
      this.rData = genData();
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.rData),
        refreshing: false,
        isLoading: false,
        showFinishTxt: true,
      });
      if (this.domScroller) {
        this.domScroller.scroller.options.animationDuration = 500;
      }
    }, 200);
  };

  onEndReached = (event) => {
    console.log('fire onEndReached');
    // load new data
    // hasMore: from backend data, indicates whether it is the last page, here is false
    if (this.state.isLoading && !this.state.hasMore) {
      return;
    }
    console.log('reach end', event);
    this.setState({ isLoading: true });
    setTimeout(() => {
      this.rData = [...this.rData, ...genData(++pageIndex)];
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.rData),
        isLoading: false,
      });
    }, 1000);
  };

  scrollingComplete = () => {
    // In general, this.scrollerTop should be 0 at the end, but it may be -0.000051 in chrome61.
    if (this.scrollerTop >= -1) {
      this.setState({ showFinishTxt: false });
    }
  }

  renderCustomIcon() {
    return [
      <div key="0" className="zscroller-refresh-control-pull">
        <span>{this.state.showFinishTxt ? '刷新完毕' : '下拉可以刷新'}</span>
      </div>,
      <div key="1" className="zscroller-refresh-control-release">
        <span>松开立即刷新</span>
      </div>,
    ];
  }

  render() {
    return (
      <ListView
        ref={el => this.lv = el}
        dataSource={this.state.dataSource}
        style={{ height: 400, border: '1px solid #ddd', margin: '10px 0' }}
        renderScrollComponent={props => <Zscroller {...props} />}
        renderHeader={() => <span>Pull to refresh</span>}
        renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
          {this.state.isLoading ? 'Loading...' : 'Loaded'}
        </div>)}
        renderRow={(rowData, sectionID, rowID) => {
          if (index < 0) {
            index = data.length - 1;
          }
          const obj = data[index--];
          return (
            <div key={rowID} style={{ padding: '8px 16px' }}>
              <h3>{obj.title}</h3>
              <div style={{ display: 'flex' }}>
                <img style={{ height: 64, marginRight: 8 }} src={obj.img} />
                <div style={{ display: 'inline-block' }}>
                  <div>{rowData}-{obj.des}</div>
                  <div style={{ color: '#FF6E27', marginTop: 15 }}>{rowID}</div>
                </div>
              </div>
            </div>
          );
        }}
        renderSeparator={(sectionID, rowID) => (
          <div key={`${sectionID}-${rowID}`} style={{ backgroundColor: '#F5F5F9', height: 8 }} />
        )}
        scrollerOptions={{ scrollbars: true, scrollingComplete: this.scrollingComplete }}
        refreshControl
        refreshing={this.state.refreshing}
        onRefresh={this.onRefresh}
        icon={this.renderCustomIcon()}
        onScroll={this.onScroll}
        onEndReached={this.onEndReached}
        onEndReachedThreshold={10}
        pageSize={10}
      />
    );
  }
}

ReactDOM.render(<Demo />, document.getElementById('__react-content'));
