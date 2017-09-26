/* eslint-disable no-console */
/* eslint react/sort-comp: 0 */
import 'rmc-list-view/assets/index.less';
import React from 'react';
import ReactDOM from 'react-dom';
import ListView from 'rmc-list-view';
import { View, Text, Image, THUMB_URLS } from './util';

const NUM_ROWS = 6;

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
      useBodyScroll: true,
      pullUpRefreshing: false,
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
      <style dangerouslySetInnerHTML={{ __html: '#qrcode, .highlight { display: none; }' }}/>
      <div style={{ paddingBottom: 30 }}>
        <button onClick={() => { this._ctrlBodyScroll(true); }}>enableBodyScroll</button>&nbsp;
        <button onClick={() => { this._ctrlBodyScroll(false); }} style={{ color: 'red' }}>
          disableBodyScroll
        </button>
        <button onClick={() => this.setState({ useBodyScroll: !this.state.useBodyScroll })}>
          switch useBodyScroll
        </button>
      </div>
      <ListView key={this.state.useBodyScroll ? 1 : 0}
        ref={el => this.lv = el}
        dataSource={this.state.dataSource}
        renderRow={(rowData) => (
          <View style={{ display: 'flex', alignItems: 'center' }}>
            <Image style={{ width: 64, height: 64 }} source={THUMB_URLS[0]} />
            <Text>{`${rowData} - Lorem ipsum dolor sit amet`}</Text>
          </View>
        )}
        renderFooter={() => (<div>footer</div>)}
        useBodyScroll={this.state.useBodyScroll}
        style={!this.state.useBodyScroll ? { height: 200, border: '1px solid gray' } : {}}
        pullUpEnabled
        pullUpRefreshing={this.state.pullUpRefreshing}
        pullUpOnRefresh={() => {
          this.setState({ pullUpRefreshing: true });
          setTimeout(() => {
            this.setState({ pullUpRefreshing: false });
          }, 1000);
        }}
        pullUpRenderer={st => <div className="my-render">{st}</div>}
      />
    </div>);
  }
  _ctrlBodyScroll = (flag) => {
    document.getElementsByTagName('body')[0].style.overflowY = flag ? 'auto' : 'hidden';
  }
}

ReactDOM.render(<Demo />, document.getElementById('__react-content'));
