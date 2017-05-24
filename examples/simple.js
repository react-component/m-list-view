/* eslint-disable no-console */
import 'rmc-list-view/assets/index.less';
import React from 'react';
import ReactDOM from 'react-dom';
import ListView from 'rmc-list-view';
import { View, Text, Image, THUMB_URLS } from './util';

function _genRows(pressData) {
  const dataBlob = [];
  for (let ii = 0; ii < 30; ii++) {
    dataBlob.push(`Row ${ii + pressData[ii] ? ' (pressed)' : ''}`);
  }
  return dataBlob;
}

/* eslint react/sort-comp: 0 */

class Demo extends React.Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: ds.cloneWithRows(_genRows({})),
    };
  }

  render() {
    return (<div>
      <button onClick={() => { this.refs.lv.scrollTo(0, 100); }}>scrollTo(0, 100)</button>
      <ListView
        ref="lv"
        style={{ height: 200 }}
        dataSource={this.state.dataSource}
        onEndReached={e => console.log(e.toString())}
        onEndReachedThreshold={10}
        scrollEventThrottle={20}
        scrollRenderAheadDistance={100}
        initialListSize={5}
        pageSize={5}
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
