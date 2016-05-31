
'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import getLayout from './getLayout.web';

var LayoutMixin = {
  getInitialState: function() {
    return {layout: {}};
  },

  componentDidMount: function() {
    this.layoutHandle();
  },

  componentDidUpdate: function() {
    this.layoutHandle();
  },

  layoutHandle: function() {
    if (this.props.onLayout) {

      var layout = getLayout(ReactDOM.findDOMNode(this));
      var stateLayout = this.state.layout;
      if (stateLayout.x !== layout.x || stateLayout.y !== layout.y || stateLayout.width !== layout.width || stateLayout.height !== layout.height) {
        this.props.onLayout({nativeEvent: {layout}});
        this.setState({layout});
      }
    }
  }
};

module.exports = {
  Mixin: LayoutMixin
};
