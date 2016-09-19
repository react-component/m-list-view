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
    return (
      <ListView
        style={{ height: 200 }}
        dataSource={this.state.dataSource}
        onEndReached={e => alert(e.toString())}
        onEndReachedThreshold={10}
        scrollEventThrottle={20}
        scrollRenderAheadDistance={30}
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
        useZscroller
        scrollerOptions={{
          scrollbars: true,
        }}
      />
    );
  },
});

ReactDOM.render(<Demo />, document.getElementById('__react-content'));
