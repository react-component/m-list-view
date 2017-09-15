/* eslint-disable no-console */
/* eslint react/sort-comp: 0 */
import 'rmc-list-view/assets/index.less';
import React from 'react';
import ReactDOM from 'react-dom';
import ListView from 'rmc-list-view';
import { View, Text, Thumb } from './util';

const NUM_SECTIONS = 5;
const NUM_ROWS_PER_SECTION = 5;
let pageIndex = 0;

const dataBlobs = {};
let sectionIDs = [];
let rowIDs = [];
function genData(pIndex = 0) {
  for (let i = 0; i < NUM_SECTIONS; i++) {
    const ii = (pIndex * NUM_SECTIONS) + i;
    const sectionName = `Section ${ii}`;
    sectionIDs.push(sectionName);
    dataBlobs[sectionName] = sectionName;
    rowIDs[ii] = [];

    for (let jj = 0; jj < NUM_ROWS_PER_SECTION; jj++) {
      const rowName = `S${ii}, R${jj}`;
      rowIDs[ii].push(rowName);
      dataBlobs[rowName] = rowName;
    }
  }
  sectionIDs = [...sectionIDs];
  rowIDs = [...rowIDs];
}

class Demo extends React.Component {
  constructor(props) {
    super(props);
    const getSectionData = (dataBlob, sectionID) => dataBlob[sectionID];
    const getRowData = (dataBlob, sectionID, rowID) => dataBlob[rowID];

    const dataSource = new ListView.DataSource({
      getRowData,
      getSectionHeaderData: getSectionData,
      rowHasChanged: (row1, row2) => row1 !== row2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
    });

    this.state = {
      dataSource,
      isLoading: true,
    };
  }

  componentDidMount() {
    // you can scroll to the specified position
    // setTimeout(() => this.lv.scrollTo(0, 120), 800);

    // simulate initial Ajax
    setTimeout(() => {
      genData();
      this.setState({
        dataSource: this.state.dataSource.cloneWithRowsAndSections(dataBlobs, sectionIDs, rowIDs),
        isLoading: false,
      });
    }, 600);
  }

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
      genData(++pageIndex);
      this.setState({
        dataSource: this.state.dataSource.cloneWithRowsAndSections(dataBlobs, sectionIDs, rowIDs),
        isLoading: false,
      });
    }, 1000);
  }

  render() {
    return (<div style={{ margin: '10px auto', width: '80%' }}>
      <ListView
        ref={el => this.lv = el}
        dataSource={this.state.dataSource}
        renderHeader={() => (
          <View style={{ height: 90, backgroundColor: '#bbb' }}>
            <Text>Table Header</Text>
          </View>
        )}
        renderSectionHeader={(sectionData) => (
          <View style={{
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            padding: 6,
            backgroundColor: '#5890ff',
          }}
          >
            <Text style={{ color: 'white' }}>
              {sectionData}
            </Text>
          </View>
        )}
        renderRow={(rowData) => (<Thumb text={rowData} />) }
        renderFooter={() => (
          <View style={{
            backgroundColor: '#bbb', color: 'white',
            padding: 30, textAlign: 'center',
          }}
          >
            {this.state.isLoading ? 'loading...' : 'loaded'}
          </View>
        )}
        style={{ height: 200 }}
        initialListSize={10}
        pageSize={4}
        scrollRenderAheadDistance={500}
        scrollEventThrottle={20}
        onScroll={() => {}}
        onEndReached={this.onEndReached}
        onEndReachedThreshold={10}
        renderBodyComponent={() => <div className="for-body-demo" />}
        onLayout={() => console.log('onLayout')}
      />
      <div>
        <p>note: temporary disable bodyScroll can have a better experience</p>
        <button onClick={() => { this._ctrlBodyScroll(true); }}>enableBodyScroll</button>&nbsp;
        <button onClick={() => { this._ctrlBodyScroll(false); } } style={{ color: 'red' }}>
          disableBodyScroll
        </button>
      </div>
    </div>);
  }
  _ctrlBodyScroll = (flag) => {
    document.getElementsByTagName('body')[0].style.overflowY = flag ? 'auto' : 'hidden';
  }
}

ReactDOM.render(<Demo />, document.getElementById('__react-content'));
