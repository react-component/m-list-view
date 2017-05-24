/* eslint-disable no-console, no-alert */
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

class Demo extends React.Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: ds.cloneWithRows(_genRows({})),
    };
  }

  render() {
    return (
      <ListView
        style={{ height: 200 }}
        dataSource={this.state.dataSource}
        onEndReached={e => alert(e.toString())}
        onEndReachedThreshold={10}
        onScroll={e => console.log(e.toString())}
        scrollEventThrottle={20}
        scrollRenderAheadDistance={30}
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
        sectionBodyClassName="sb"
        useZscroller
        scrollerOptions={{ scrollbars: true }}
      />
    );
  }
}

ReactDOM.render(<Demo />, document.getElementById('__react-content'));
