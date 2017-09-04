/* eslint-disable no-console */
import 'rmc-list-view/assets/index.less';
import React from 'react';
import ReactDOM from 'react-dom';
import ListView from 'rmc-list-view';
import { View, Text, THUMB_URLS } from './util';

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
    // simulate initial Ajax
    setTimeout(() => {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(genData()),
      });
    }, 600);
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
      <ListView
        horizontal
        dataSource={this.state.dataSource}
        renderRow={(rowData) => (
          <View style={{ display: 'flex', alignItems: 'center' }}>
            <img src={THUMB_URLS[0]} />
            <Text>{`${rowData} - Lorem ipsum`}</Text>
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
