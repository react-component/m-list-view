// use jsx to render html, do not modify simple.html

import 'rmc-list-view/assets/index.less';
import React from 'react';
import ReactDOM from 'react-dom';
import ListView from 'rmc-list-view';
import { View, Text, Image, _genRows, hashCode, THUMB_URLS, LOREM_IPSUM, styles,
 TouchableHighlight,  } from './util';

const Demo = React.createClass({
  getInitialState() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      dataSource: ds.cloneWithRows(_genRows({})),
    };
  },

  _pressData: {},

  componentWillMount() {
    this._pressData = {};
  },

  _renderRow(rowData, sectionID, rowID, highlightRow) {
    var rowHash = Math.abs(hashCode(rowData));
    var imgSource = THUMB_URLS[rowHash % THUMB_URLS.length];
    return (
      <TouchableHighlight onPress={() => {
          this._pressData[rowID] = !this._pressData[rowID];
          this.setState({dataSource: this.state.dataSource.cloneWithRows(
            _genRows(this._pressData)
          )});
          highlightRow(sectionID, rowID);
        }}>
        <View>
          <View style={styles.row}>
            <Image style={styles.thumb} source={imgSource} />
            <Text style={styles.text}>
              {rowData + ' - ' + LOREM_IPSUM.substr(0, rowHash % 301 + 10)}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  },

  _renderSeperator(sectionID, rowID, adjacentRowHighlighted) {
    return (
      <View
        key={`${sectionID}-${rowID}`}
        style={{
          height: adjacentRowHighlighted ? 4 : 1,
          backgroundColor: adjacentRowHighlighted ? '#3B5998' : '#CCCCCC',
        }}
      />
    );
  },

  render() {
    return (
      <ListView
        style={{ height: 300 }}
        dataSource={this.state.dataSource}
        onEndReached={e => console.log(e)}
        onEndReachedThreshold={500}
        scrollEventThrottle={100}
        pageSize={5}
        renderRow={this._renderRow}
        renderSeparator={this._renderSeperator}
        renderBodyComponent={() => <div className="for-body-demo" />}
      />
    );
  },
});

ReactDOM.render(<Demo />, document.getElementById('__react-content'));
