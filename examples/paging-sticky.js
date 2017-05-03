import 'rmc-list-view/assets/index.less';
import React from 'react';
import ReactDOM from 'react-dom';
import ListView from 'rmc-list-view';
import { View, Text, Thumb } from './util';

const NUM_SECTIONS = 20;
const NUM_ROWS_PER_SECTION = 10;
let pageIndex = 0;

class Demo extends React.Component {
  constructor(props) {
    super(props);
    const getSectionData = (dataBlob, sectionID) => {
      return dataBlob[sectionID];
    };
    const getRowData = (dataBlob, sectionID, rowID) => {
      return dataBlob[rowID];
    };

    const dataSource = new ListView.DataSource({
      getRowData,
      getSectionHeaderData: getSectionData,
      rowHasChanged: (row1, row2) => row1 !== row2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
    });

    this.dataBlob = {};
    this.sectionIDs = [];
    this.rowIDs = [];
    this._genData = (pIndex = 0) => {
      for (let i = 0; i < NUM_SECTIONS; i++) {
        const ii = pIndex * NUM_SECTIONS + i;
        const sectionName = `Section ${ii}`;
        this.sectionIDs.push(sectionName);
        this.dataBlob[sectionName] = sectionName;
        this.rowIDs[ii] = [];

        for (let jj = 0; jj < NUM_ROWS_PER_SECTION; jj++) {
          const rowName = `S${ii}, R${jj}`;
          this.rowIDs[ii].push(rowName);
          this.dataBlob[rowName] = rowName;
        }
      }
      // new object ref
      this.sectionIDs = [].concat(this.sectionIDs);
      this.rowIDs = [].concat(this.rowIDs);
    };
    this._genData();
    this.state = {
      dataSource: dataSource.cloneWithRowsAndSections(this.dataBlob, this.sectionIDs, this.rowIDs),
      headerPressCount: 0,
    };
  }
  componentDidMount() {
    console.log(this.refs.lv);
  }
  _onEndReached = (event) => {
    // load new data
    console.log('reach end', event);
    this._genData(++pageIndex);
    this.setState({
      dataSource: this.state.dataSource.cloneWithRowsAndSections(
        this.dataBlob, this.sectionIDs, this.rowIDs
      ),
    });
  }
  render() {
    return (<div>
      <ListView
        ref="lv"
        dataSource={this.state.dataSource}
        renderHeader={() => (
          <View style={{ height: 90, backgroundColor: '#bbb' }}>
            <Text>Table Header</Text>
            <button onClick={() => { this.refs.lv.scrollTo(0, 100); }}>scrollTo(0, 100)</button>
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
          <View style={{ height: 90, backgroundColor: '#bbb', textAlign: 'center' }}>
            Table Footer
          </View>
        )}
        initialListSize={10}
        pageSize={4}
        scrollRenderAheadDistance={500}
        scrollEventThrottle={20}
        onScroll={() => { console.log('scroll'); } }
        onEndReached={this._onEndReached}
        onEndReachedThreshold={500}
        renderBodyComponent={() => <div className="for-body-demo" />}
        stickyHeader
        stickyProps={{
          className: 'for-sticky-demo',
          stickyStyle: { top: '10px', WebkitTransform: 'none', transform: 'none' },
          onStickyStateChange: (isSticky) => {
            console.log(isSticky);
          },
        }}
        stickyContainerProps={{
          className: 'for-stickyContainer-demo',
        }}
      />
    </div>);
  }
}

ReactDOM.render(<Demo />, document.getElementById('__react-content'));
