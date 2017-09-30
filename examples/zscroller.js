/* eslint-disable no-console, no-alert */
import 'rmc-list-view/assets/index.less';
import React from 'react';
import ReactDOM from 'react-dom';
import ListView from 'rmc-list-view';

const NUM_ROWS = 20;

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
    };
  }

  componentDidMount() {
    // you can scroll to the specified position
    setTimeout(() => this.lv.scrollTo(0, 50), 800);

    // simulate initial Ajax
    setTimeout(() => {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(genData()),
      });
    }, 600);
  }

  render() {
    return (
      <ListView
        ref={el => this.lv = el}
        dataSource={this.state.dataSource}
        style={{ height: 200 }}
        useZscroller
        renderRow={rowData => <div style={{ padding: 16 }}>{rowData}</div>}
        renderBodyComponent={() => <div className="for-body-demo" />}
        sectionBodyClassName="sb"
        scrollerOptions={{ scrollbars: true }}
        onEndReached={e => console.log(e)}
        onEndReachedThreshold={10}
        scrollRenderAheadDistance={30}
        pageSize={10}
      />
    );
  }
}

ReactDOM.render(<Demo />, document.getElementById('__react-content'));
