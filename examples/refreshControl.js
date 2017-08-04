/* eslint-disable no-console */
import 'rmc-list-view/assets/index.less';
import React from 'react';
import ReactDOM from 'react-dom';
import ListView from 'rmc-list-view';
import { myData as data } from './util';
/* eslint no-dupe-keys: 0, no-mixed-operators: 0 */

let index = data.length - 1;
let pageIndex = 0;

class Demo extends React.Component {
  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });

    this.initData = [];
    for (let i = 0; i < 20; i++) {
      this.initData.push(`r${i}`);
    }
    this.state = {
      dataSource: dataSource.cloneWithRows(this.initData),
      refreshing: false,
    };
  }
  componentDidMount() {
    // console.log(this.refs.lv.refs.listviewscroll.refs.InnerScrollView);
    this.refs.lv.getInnerViewNode().addEventListener('touchstart', this.ts = (e) => {
      this.tsPageY = e.touches[0].pageY;
    });
    this.refs.lv.getInnerViewNode().addEventListener('touchmove', this.tm = (e) => {
      this.tmPageY = e.touches[0].pageY;
      if (this.tmPageY > this.tsPageY && this.st <= 0 && document.body.scrollTop > 0) {
        console.log('start pull to refresh');
        this.domScroller.options.preventDefaultOnTouchMove = false;
      } else {
        this.domScroller.options.preventDefaultOnTouchMove = undefined;
      }
    });
  }
  componentWillUnmount() {
    this.refs.lv.getInnerViewNode().removeEventListener('touchstart', this.ts);
    this.refs.lv.getInnerViewNode().removeEventListener('touchmove', this.tm);
  }
  onScroll = (e) => {
    // onScroll will trigger on container touchstart, ref https://github.com/yiminghe/zscroller/blob/a67854c8dc0a1fda15acae4ffdb08e65aac79fb3/src/DOMScroller.js#L229
    this.st = e.scroller.getValues().top;
    this.domScroller = e;
  }
  onRefresh = () => {
    console.log('onRefresh');
    if (!this.manuallyRefresh) {
      this.setState({ refreshing: true });
    } else {
      this.manuallyRefresh = false;
    }
    setTimeout(() => {
      this.initData = [`ref${pageIndex++}`, ...this.initData];
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.initData),
        refreshing: false,
      });
    }, 1000);
  }
  scrollingComplete = () => {
    console.log('scrollingComplete');
  }
  render() {
    return (
      <ListView
        ref="lv"
        dataSource={this.state.dataSource}
        renderHeader={() => <div>
          <button onClick={() => {
            this.manuallyRefresh = true;
            this.setState({ refreshing: true });
          }}
          >点击自动刷新</button>
        </div>}
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
                  <div style={{ color: '#FF6E27', marginTop: 15 }}>35</div>
                </div>
              </div>
            </div>
          );
        }}
        renderSeparator={(sectionID, rowID) => (
          <div key={`${sectionID}-${rowID}`} style={{ backgroundColor: '#F5F5F9', height: 8 }} />
        )}
        initialListSize={5}
        pageSize={5}
        scrollRenderAheadDistance={200}
        scrollEventThrottle={20}
        style={{
          height: 400,
          border: '1px solid #ddd',
          margin: '10px 0',
        }}
        useZscroller
        scrollerOptions={{ scrollbars: true, scrollingComplete: this.scrollingComplete }}
        refreshControl={<ListView.RefreshControl
          className="my-refresh-control"
          refreshing={this.state.refreshing}
          onRefresh={this.onRefresh}
          resistance={1}
        />}
        onScroll={this.onScroll}
      />
    );
  }
}

ReactDOM.render(<Demo />, document.getElementById('__react-content'));
