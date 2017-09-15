/* eslint-disable no-console */
/* eslint react/prop-types: 0, react/no-multi-comp: 0 */
import 'rmc-list-view/assets/index.less';
import React from 'react';
import ReactDOM from 'react-dom';
import ListView from 'rmc-list-view';
import { View, Text } from './util';

const NUM_ROWS = 20;
let pageIndex = 0;

function genData(pIndex = 0) {
  const dataBlob = {};
  for (let i = 0; i < NUM_ROWS; i++) {
    const ii = (pIndex * NUM_ROWS) + i;
    dataBlob[`${ii}`] = `row - ${ii}`;
  }
  return dataBlob;
}

class Demo extends React.Component {
  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });

    this._data = {};
    this.state = {
      dataSource,
      isLoading: true,
      destroy: false,
    };
  }

  componentDidMount() {
    // you can scroll to the specified position
    // setTimeout(() => this.lv.scrollTo(0, 120), 800);

    // simulate initial Ajax
    setTimeout(() => {
      this.rData = genData();
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.rData),
        isLoading: false,
      });
    }, 600);
  }

  // If you use redux, the data maybe at props, you need use `componentWillReceiveProps`
  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.dataSource !== this.props.dataSource) {
  //     this.setState({
  //       dataSource: this.state.dataSource.cloneWithRows(nextProps.dataSource),
  //     });
  //   }
  // }

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
      this.rData = { ...this.rData, ...genData(++pageIndex) };
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.rData),
        isLoading: false,
      });
    }, 1000);
  }

  render() {
    return (<div>
      <button style={{ margin: 10 }}
        onClick={() => this.setState({ destroy: !this.state.destroy })}
      >
        {this.state.destroy ? 'create' : 'destroy'} ListView
      </button>
      <button onClick={() => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows({ xx: 'xxx' }),
        });
      }}
      >changeData</button>

      {!this.state.destroy ? <ListView
        ref={el => this.lv = el}
        dataSource={this.state.dataSource}
        renderHeader={() => (
          <View style={{ height: 90, backgroundColor: '#bbb' }}>
            <Text>设置了`useBodyScroll`，使用 html body 作为滚动容器</Text>
          </View>
        )}
        renderFooter={() => (
          <View style={{
            backgroundColor: '#bbb', color: 'white',
            padding: 30, textAlign: 'center',
          }}
          >
            {this.state.isLoading ? 'loading...' : 'loaded'}
          </View>
        )}
        renderBodyComponent={() => <div className="for-body-demo" />}
        renderSectionBodyWrapper={(sectionID) => <MySectionBodyWrapper key={sectionID} />}
        renderRow={(rowData) => (<tr style={{ height: 50 }}>
          <td>{rowData} Let me keep typing here so it wraps at least one line.</td>
        </tr>)}
        useBodyScroll
        initialListSize={10}
        pageSize={4}
        scrollRenderAheadDistance={500}
        scrollEventThrottle={200}
        onEndReached={this.onEndReached}
        onEndReachedThreshold={100}
      /> : null}
      <div dangerouslySetInnerHTML={{
        __html: `<style>
        #qrcode{ display: none }
        .highlight{ display: none }
        </style>`,
      }}
      />
    </div>);
  }
}

const MySectionBodyWrapper = (props) => {
  return (<table className="my-section-body">
    <thead><tr><td>table title</td></tr></thead>
    <tbody>{props.children}</tbody>
  </table>);
};

ReactDOM.render(<Demo />, document.getElementById('__react-content'));
