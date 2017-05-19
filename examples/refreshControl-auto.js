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
  onAjax = () => {
    setTimeout(() => {
      this.initData = [`ref${pageIndex++}`, ...this.initData];
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.initData),
        refreshing: false,
      });
    }, 1000);
  }
  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderHeader={() => <div>
          <button onClick={() => this.setState({ refreshing: true })}>点击自动刷新</button>
          <div style={{ fontSize: 14, color: '#bbb' }}>此处不能手动刷新</div>
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
        scrollerOptions={{ scrollbars: true }}
        refreshControl={<ListView.RefreshControl
          className="my-refresh-control"
          refreshing={this.state.refreshing}
          onRefresh={this.onAjax}
          resistance={1}
        />}
      />
    );
  }
}

ReactDOM.render(<Demo />, document.getElementById('__react-content'));
