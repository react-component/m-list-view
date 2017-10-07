/* eslint-disable no-console */
/* eslint react/sort-comp: 0 */
import 'rmc-list-view/assets/index.less';
import React from 'react';
import ReactDOM from 'react-dom';
import ListView from 'rmc-list-view';
import PullToRefresh from 'rmc-pull-to-refresh';

const NUM_ROWS = 6;

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
      useBodyScroll: true,
      refreshing: false,
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
    return (<div>
      <button
        style={{ display: 'inline-block', marginBottom: 30, border: 1 }}
        onClick={() => this.setState({ useBodyScroll: !this.state.useBodyScroll })}
      >
        useBodyScroll: {this.state.useBodyScroll ? 'true' : 'false'}
      </button>
      <ListView
        key={this.state.useBodyScroll ? 1 : 0}
        ref={el => this.lv = el}
        dataSource={this.state.dataSource}
        useBodyScroll={this.state.useBodyScroll}
        style={!this.state.useBodyScroll ? { height: 200, border: '1px solid gray' } : {}}
        renderHeader={() => <span style={{ padding: 10 }}>header</span>}
        renderRow={rowData => <div style={{ padding: 16 }}>{rowData}</div>}
        pullToRefresh={
          <PullToRefresh
            className="forTest"
            direction="up"
            refreshing={this.state.refreshing}
            onRefresh={() => {
              this.setState({ refreshing: true });
              setTimeout(() => {
                this.setState({ refreshing: false });
              }, 1000);
            }}
          />
        }
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
