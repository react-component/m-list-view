export const THUMB_URLS = [
  // require('./Thumbnails/like.png'),
  // require('./Thumbnails/dislike.png'),
  // require('./Thumbnails/call.png'),
  // require('./Thumbnails/fist.png'),
  // require('./Thumbnails/bandaged.png'),
  // require('./Thumbnails/flowers.png'),
  // require('./Thumbnails/heart.png'),
  // require('./Thumbnails/liking.png'),
  // require('./Thumbnails/party.png'),
  // require('./Thumbnails/poke.png'),
  // require('./Thumbnails/superlike.png'),
  // require('./Thumbnails/victory.png'),
];

export function _genRows(pressData) {
  var dataBlob = [];
  for (var ii = 0; ii < 100; ii++) {
    var pressedText = pressData[ii] ? ' (pressed)' : '';
    dataBlob.push('Row ' + ii + pressedText);
  }
  return dataBlob;
}

export function hashCode(str) {
  var hash = 15;
  for (var ii = str.length - 1; ii >= 0; ii--) {
    hash = ((hash << 5) - hash) + str.charCodeAt(ii);
  }
  return hash;
};

export const LOREM_IPSUM = 'Lorem ipsum dolor sit amet, ius ad pertinax oportere accommodare, an vix civibus corrumpit referrentur. Te nam case ludus inciderint, te mea facilisi adipiscing. Sea id integre luptatum. In tota sale consequuntur nec. Erat ocurreret mei ei. Eu paulo sapientem vulputate est, vel an accusam intellegam interesset. Nam eu stet pericula reprimique, ea vim illud modus, putant invidunt reprehendunt ne qui.';

export function Text(props) {
  return <span {...props}>{props.children}</span>;
}
export function Image(props) {
  return <img src={props.source} {...props} />;
}
export function View(props) {
  return <div {...props}>{props.children}</div>;
}

import React from 'react';
export const RecyclerViewBackedScrollView = React.createClass({
  render: function() {
    const props = this.props;
    return <div {...props}>{props.children}</div>;
  },
});

export const TouchableHighlight = React.createClass({
  render: function() {
    const props = this.props;
    return <div {...props}>{props.children}</div>;
  },
});

export const styles = {
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#F6F6F6',
  },
  thumb: {
    width: 64,
    height: 64,
  },
  text: {
    flex: 1,
  },
};
