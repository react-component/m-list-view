/* eslint-disable no-console */
import '../assets/index.less';
import React from 'react';
import ReactDOM from 'react-dom';
import ListView from '../src';

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
    return (<div style={{ margin: '10px auto', width: '90%', position: 'relative' }}>
      <ListView.IndexedList
        dataSource={this.state.dataSource}
        renderHeader={() => <span style={{ padding: 10 }}>header</span>}
        renderFooter={() => <span style={{ padding: 10 }}>footer</span>}
        renderSectionHeader={(sectionData) => (
          <div style={{ color: 'blue', padding: 10, backgroundColor: '#ddd' }}>
            {sectionData}
          </div>
        )}
        renderRow={(rowData) => (<div style={{ padding: 10 }}>Hello: {rowData}</div>) }
        contentContainerStyle={{ textAlign: 'left' }}
        quickSearchBarStyle={{
          position: 'absolute',
          top: 20, right: 10,
        }}
        style={{ height: 500 }}
        onQuickSearch={(sectionID) => console.log(sectionID)}
        showQuickSearchIndicator
        delayTime={100}
        delayActivityIndicator={
          <div style={{ padding: 25, textAlign: 'center' }}>delay rendering...</div>
        }
        sectionHeaderClassName="sh"
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
