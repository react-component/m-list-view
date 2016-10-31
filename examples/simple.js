// use jsx to render html, do not modify simple.html

import 'rmc-list-view/assets/index.less';
import React from 'react';
import ReactDOM from 'react-dom';
import ListView from 'rmc-list-view';
import { View, Text, Image, THUMB_URLS, TouchableHighlight,  } from './util';

function _genRows(pressData) {
  const dataBlob = [];
  for (let ii = 0; ii < 30; ii++) {
    dataBlob.push(`Row ${ii + pressData[ii] ? ' (pressed)' : ''}`);
  }
  return dataBlob;
}

const Demo = React.createClass({
  getInitialState() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      dataSource: ds.cloneWithRows(_genRows({})),
    };
  },

  render() {
    return (<div>
      <ListView
        style={{ height: 200 }}
        dataSource={this.state.dataSource}
        onEndReached={e => console.log(e.toString())}
        onEndReachedThreshold={10}
        scrollEventThrottle={20}
        scrollRenderAheadDistance={100}
        initialListSize={5}
        pageSize={5}
        renderRow={(rowData, sectionID, rowID, highlightRow) => (
          <View style={{ display: 'flex', alignItems: 'center' }}>
            <Image style={{ width: 64, height: 64 }} source={THUMB_URLS[0]} />
            <Text>{rowData + ' - Lorem ipsum dolor sit amet'}</Text>
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
        <button onClick={() => { this._ctrlBodyScroll(true) }}>enableBodyScroll</button>&nbsp;
        <button onClick={() => { this._ctrlBodyScroll(false) } } style={{ color: 'red' }}>disableBodyScroll</button>
      </div>
    </div>);
  },
  _ctrlBodyScroll(flag) {
    document.getElementsByTagName('body')[0].style.overflowY = flag ? 'auto' : 'hidden';
  },
});

ReactDOM.render(<Demo />, document.getElementById('__react-content'));
