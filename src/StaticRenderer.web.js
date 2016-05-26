import React, { PropTypes } from 'react';

class StaticRenderer extends React.Component {
  static propTypes = {
    shouldUpdate: PropTypes.bool.isRequired,
    render: PropTypes.func.isRequired,
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.shouldUpdate;
  }

  render() {
    return this.props.render();
  }
};

export default StaticRenderer;
