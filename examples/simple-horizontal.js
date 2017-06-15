/* eslint-disable no-console */
import 'rmc-list-view/assets/index.less';
import React from 'react';
import ReactDOM from 'react-dom';
import ListView from 'rmc-list-view';
import { View, Text, THUMB_URLS } from './util';

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
    return (<div>
      <style dangerouslySetInnerHTML={{
        __html: `
          .list-view-section-body {
            display: flex;
            align-items: center;
          }
          .for-body-demo, .list-view-section-body {
            height: 100%;
          }
        ` }}
      />
      <ListView horizontal
        ref="lv"
        dataSource={this.state.dataSource}
        renderRow={(rowData) => (
          <View style={{ display: 'flex', alignItems: 'center' }}>
            <img src={THUMB_URLS[0]} />
            <Text>{`${rowData} - Lorem ipsum dolor sit amet`}</Text>
          </View>
        )}
        renderSeparator={(sectionID, rowID) => (
          <View key={`${sectionID}-${rowID}`}
            style={{
              width: 4,
              height: '100%',
              backgroundColor: '#3B5998',
            }}
          />
        )}
        renderBodyComponent={() => <div className="for-body-demo" />}
        contentContainerStyle={{
          height: '100%',
        }}
        style={{
          height: 120,
          width: '90%',
          margin: '10px auto',
          border: '1px solid #ddd',
          overflowX: 'scroll',
          overflowY: 'hidden',
        }}
        onEndReached={e => console.log(e.toString())}
        onEndReachedThreshold={10}
        scrollEventThrottle={20}
        scrollRenderAheadDistance={100}
        initialListSize={5}
        pageSize={5}
      />
    </div>);
  }
}

ReactDOM.render(<Demo />, document.getElementById('__react-content'));
