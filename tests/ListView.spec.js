/* eslint-disable no-undef */
import React from 'react';
import { render/* , mount */ } from 'enzyme';
import ListView from '../src';

describe('ListView', () => {
  it('renders correctly', () => {
    class Minimal extends React.Component {
      constructor() {
        super();
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
          dataSource: ds.cloneWithRows(['row 1', 'row 2']),
        };
      }
      render() {
        return (
          <ListView
            dataSource={this.state.dataSource}
            renderRow={rowData => <span>{rowData}</span>}
          />
        );
      }
    }
    const wrapper = render(<Minimal />);
    expect(wrapper).toMatchSnapshot();
  });
});
