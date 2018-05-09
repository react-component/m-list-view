/* eslint-disable no-console */
import '../assets/index.less';
import React from 'react';
import ReactDOM from 'react-dom';
import ListView from '../src';
import { StickyContainer, Sticky } from 'react-sticky';

const NUM_SECTIONS = 20;
const NUM_ROWS_PER_SECTION = 10;

function genData(ds) {
  const dataBlob = {};
  const sectionIDs = [];
  const rowIDs = [];
  for (let ii = 0; ii < NUM_SECTIONS; ii++) {
    const sectionName = String.fromCharCode(65 + ii);
    sectionIDs.push(sectionName);
    dataBlob[sectionName] = sectionName;
    rowIDs[ii] = [];

    for (let jj = 0; jj < NUM_ROWS_PER_SECTION; jj++) {
      const rowName = `S${ii}, R${jj}`;
      rowIDs[ii].push(rowName);
      dataBlob[rowName] = rowName;
    }
  }
  return ds.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs);
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
    // simulate initial Ajax
    setTimeout(() => {
      this.setState({
        dataSource: genData(this.state.dataSource),
        isLoading: false,
      });
    }, 600);
  }

  render() {
    return (<div>
      <ListView.IndexedList
        dataSource={this.state.dataSource}
        useBodyScroll
        renderSectionWrapper={(sectionID) => (
          <StickyContainer
            key={`s_${sectionID}_c`} className="for-stickyContainer" style={{ zIndex: 4 }}
          />
        )}
        renderSectionHeader={(sectionData) => (
          <Sticky>
            {({
              style,
            }) => (
              <div
                style={{
                  ...style, color: 'blue', padding: 10, backgroundColor: '#ddd',
                }}
              >{sectionData}</div>
            )}
          </Sticky>
        )}
        renderHeader={() => <span style={{ padding: 10 }}>header</span>}
        renderFooter={() => <span style={{ padding: 10 }}>footer</span>}
        renderRow={(rowData) => (<div style={{ padding: 10 }}>Hello: {rowData}</div>)}
        quickSearchBarStyle={{
          top: 20,
        }}
        onQuickSearch={(sectionID) => console.log(sectionID) }
        sectionBodyClassName="sb"
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
