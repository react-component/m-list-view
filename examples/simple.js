/* eslint-disable no-console */
/* eslint react/sort-comp: 0 */
import 'rmc-list-view/assets/index.less';
import React from 'react';
import ReactDOM from 'react-dom';
import ListView from 'rmc-list-view';
import { View, Text, Image, THUMB_URLS } from './util';

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
    return (<div>
      <button onClick={() => { this.lv.scrollTo(0, 100); }}>scrollTo(0, 100)</button>
      <ListView
        ref={el => this.lv = el}
        dataSource={this.state.dataSource}
        renderRow={(rowData) => (
          <View style={{ display: 'flex', alignItems: 'center' }}>
            <Image style={{ width: 64, height: 64 }} source={THUMB_URLS[0]} />
            <Text>{`${rowData} - Lorem ipsum dolor sit amet`}</Text>
          </View>
        )}
        renderSeparator={(sectionID, rowID, adjacentRowHighlighted) => (
          <View key={`${sectionID}-${rowID}`}
            style={{
              height: adjacentRowHighlighted ? 4 : 1,
              backgroundColor: adjacentRowHighlighted ? '#3B5998' : '#CCCCCC',
            }}
          />
        )}
        renderBodyComponent={() => <div className="for-body-demo" />}
        style={{ height: 200 }}
        onEndReached={e => console.log(e)}
        onEndReachedThreshold={10}
        scrollEventThrottle={20}
        scrollRenderAheadDistance={100}
        initialListSize={5}
        pageSize={5}
      />
      <div>
        <p>note: temporary disable bodyScroll can have a better experience</p>
        <button onClick={() => { this._ctrlBodyScroll(true); }}>enableBodyScroll</button>&nbsp;
        <button onClick={() => { this._ctrlBodyScroll(false); }} style={{ color: 'red' }}>
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
