// use jsx to render html, do not modify simple.html

import 'rmc-list-view/assets/index.less';
import React from 'react';
import ReactDOM from 'react-dom';
import ListView from 'rmc-list-view';
import { View, Text } from './util';

const NUM_ROWS = 20;
let pageIndex = 0;

const Demo = React.createClass({
  getInitialState() {
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });

    this._genData = (pIndex = 0) => {
      const dataBlob = {};
      for (let i = 0; i < NUM_ROWS; i++) {
        let ii = pIndex * NUM_ROWS + i;
        dataBlob[`${ii}`] = `row - ${ii}`;
      }
      return dataBlob;
    }
    this._data = {};
    return {
      dataSource: dataSource.cloneWithRows(this._genData()),
      isLoading: false,
    };
  },
  _onEndReached(event) {
    // load new data
    console.log('reach end', event);
    this.setState({ isLoading: true });
    setTimeout(() => {
      this._data = {...this._data, ...this._genData(++pageIndex)};
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this._data),
        isLoading: false,
      });
    }, 1000);
  },
  render() {
    return (<div>
      <ListView ref="lv"
        dataSource={this.state.dataSource}
        renderHeader={() => (
          <View style={{ height: 90, backgroundColor: '#bbb' }}>
            <Text>Table Header</Text>
          </View>
        )}
        renderFooter={() => (
          <View style={{
            backgroundColor: '#bbb', color: 'white',
            padding: 30, textAlign: 'center',
          }}>
            {this.state.isLoading ? 'loading...' : 'loaded'}
          </View>
        )}
        renderSectionBodyWrapper={(sectionID) => <MySectionBodyWrapper key={sectionID} />}
        renderRow={(rowData) => (<tr style={{ height: 50 }}>
          <td>{rowData} Let me keep typing here so it wraps at least one line.</td>
        </tr>)}
        initialListSize={10}
        pageSize={4}
        scrollRenderAheadDistance={500}
        scrollEventThrottle={20}
        onScroll={() => { console.log('scroll'); } }
        useBodyScroll
        onEndReached={this._onEndReached}
        onEndReachedThreshold={100}
        />
      <div dangerouslySetInnerHTML={{
        __html: `<style>
        #qrcode{ display: none }
        .highlight{ display: none }
        </style>`
      }}></div>
    </div>);
  }
});
const MySectionBodyWrapper = React.createClass({
  render() {
    return <table className="my-section-body">
      <thead><tr><td>table title</td></tr></thead>
      <tbody>{this.props.children}</tbody>
    </table>
  }
});

ReactDOM.render(<Demo />, document.getElementById('__react-content'));
