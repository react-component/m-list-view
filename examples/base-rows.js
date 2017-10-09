/* eslint-disable no-console */
/* eslint react/sort-comp: 0 */
import '../assets/index.less';
import React from 'react';
import ReactDOM from 'react-dom';
import ListView from '../src';

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
    document.body.style.overflowY =
      navigator.userAgent.match(/Android|iPhone|iPad|iPod/i) ? 'hidden' : 'auto';
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
        style={{ height: 200, border: '1px solid #ccc', margin: 10 }}
        renderHeader={() =>
          <button onClick={() => this.lv.scrollTo(0, 100)}>scrollTo(0, 100)</button>}
        renderRow={rowData => <div style={{ padding: 16 }}>{rowData}</div>}
        onEndReachedThreshold={10}
      />
    );
  }
}

ReactDOM.render(<Demo />, document.getElementById('__react-content'));
