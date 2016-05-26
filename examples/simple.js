// use jsx to render html, do not modify simple.html

import 'rmc-listview/assets/index.less';
import ListView from 'rmc-listview';
import React from 'react';
import ReactDOM from 'react-dom';

const styles = {
  display: 'flex',
  height: 60,
  margin: 10,
  border: '1px solid #ccc',
};

const Demo = React.createClass({
  getInitialState: function() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      dataSource: ds.cloneWithRows(['row 1', 'row 2', 'row 3', 'row 4']),
    };
  },

  render: function() {
    return (<div style={styles}>
      <ListView
        dataSource={this.state.dataSource}
        renderRow={(rowData) => <div style={{height: 40}}>{rowData}</div>}
      />
    </div>);
  },
});

ReactDOM.render(<Demo />, document.getElementById('__react-content'));
