/* eslint-disable no-console */
import '../assets/index.less';
import React from 'react';
import ReactDOM from 'react-dom';
import ListView from '../src';
import { StickyContainer, Sticky } from 'react-sticky';

const NUM_SECTIONS = 20;
const NUM_ROWS_PER_SECTION = 10;
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
    return (<div>
      <ListView
        ref={el => this.lv = el}
        dataSource={this.state.dataSource}
        useBodyScroll
        renderSectionWrapper={(sectionID) => (
          <StickyContainer
            key={`s_${sectionID}_c`} className="sticky-container" style={{ zIndex: 4 }}
          />
        )}
        renderSectionHeader={(sectionData) => (
          <Sticky>
            {({
              style,
            }) => (
              <div
                className="sticky"
                style={{
                  ...style,
                  zIndex: 3,
                  padding: 16,
                  backgroundColor: parseInt(sectionData.replace('Section ', ''), 10) % 2 ?
                    '#5890ff' : '#F8591A',
                  color: 'white',
                }}
              >{sectionData}</div>
            )}
          </Sticky>
        )}
        renderHeader={() => <div style={{ height: 90, backgroundColor: '#bbb' }}>Header</div>}
        renderFooter={() => <div style={{ height: 90, backgroundColor: '#bbb' }}>Footer</div>}
        renderRow={rowData => <div style={{ padding: 16 }}>{rowData}</div>}
        onEndReached={this.onEndReached}
        pageSize={10}
      />
      <div dangerouslySetInnerHTML={{
        __html: navigator.userAgent.match(/Android|iPhone|iPad|iPod/i) ?
          '<style>#qrcode, .highlight{ display: none }</style>' : '',
      }}
      />
    </div>);
  }
}

ReactDOM.render(<Demo />, document.getElementById('__react-content'));
