import React, { PropTypes } from 'react';

class View extends React.Component {
  render() {
    return (
      <div {...this.props}>
        {this.props.children}
      </div>
    );
  }
};

export default View;
