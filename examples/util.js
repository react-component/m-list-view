const victory = 'https://os.alipayobjects.com/rmsportal/kwihkdUVljwUURM.png';
const superlike = 'https://os.alipayobjects.com/rmsportal/pmXtSKUFLsIEJLh.png';
const poke = 'https://os.alipayobjects.com/rmsportal/ZlYzyBcrtLqnbjN.png';
const party = 'https://os.alipayobjects.com/rmsportal/mIrghdvucaPOLhc.png';
const liking = 'https://os.alipayobjects.com/rmsportal/DrcLpisGZWASeoj.png';
const like = 'https://os.alipayobjects.com/rmsportal/jloFMiDVGaHrHIO.png';
const heart = 'https://os.alipayobjects.com/rmsportal/QFjTyLzmuJQIflm.png';
const flowers = 'https://os.alipayobjects.com/rmsportal/rgahTjFqZATwqqL.png';
const fist = 'https://os.alipayobjects.com/rmsportal/KcyBnnVZlfIDgci.png';
const dislike = 'https://os.alipayobjects.com/rmsportal/FmMzrxqOhiogBOX.png';
const call = 'https://os.alipayobjects.com/rmsportal/TKlynYhJACDNwKw.png';
const bandaged = 'https://os.alipayobjects.com/rmsportal/htJwTSIUpppWwSb.png';

export const THUMB_URLS = [
  like,
  dislike,
  call,
  fist,
  bandaged,
  flowers,
  heart,
  liking,
  party,
  poke,
  superlike,
  victory,
];

export function Text(props) {
  return <span {...props}>{props.children}</span>;
}
export function Image(props) {
  return (
    <img
      style={{
        width: 64,
        height: 64,
        marginHorizontal: 10,
        backgroundColor: 'transparent',
      }}
      src={props.source}
    />
  );
}
export function View(props) {
  return <div {...props}>{props.children}</div>;
}

import React from 'react';
export const TouchableHighlight = React.createClass({
  render() {
    const { onPress, children, ...restProps } = this.props;
    return <div {...restProps} onClick={onPress}>{children}</div>;
  },
});
export const TouchableOpacity = TouchableHighlight;

export const pagingStyles = {
  buttonContents: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    marginVertical: 3,
    padding: 5,
    backgroundColor: '#EAEAEA',
    borderRadius: 3,
    paddingVertical: 10,
  },
  section: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 6,
    backgroundColor: '#5890ff',
  },
};

function flattenStyle(style, processor) {
  if (!style) {
    return undefined;
  }

  if (!Array.isArray(style)) {
    return (processor && processor(style)) || style;
  }
  const result = {};
  for (let i = 0; i < style.length; ++i) {
    const computedStyle = flattenStyle(style[i]);
    if (computedStyle) {
      for (const key in computedStyle) {
        if (computedStyle.hasOwnProperty(key)) {
          result[key] = computedStyle[key];
        }
      }
    }
  }

  return (processor && processor(result)) || result;
}

export const Thumb = React.createClass({
  getInitialState() {
    return { thumbIndex: this._getThumbIdx(), dir: 'row' };
  },
  componentWillMount() {
    // UIManager.setLayoutAnimationEnabledExperimental &&
    //   UIManager.setLayoutAnimationEnabledExperimental(true);
  },
  _getThumbIdx() {
    return Math.floor(Math.random() * THUMB_URLS.length);
  },
  _onPressThumb() {
    this.setState({
      thumbIndex: this._getThumbIdx(),
      dir: this.state.dir === 'row' ? 'column' : 'row',
    });
  },
  render() {
    return (
      <TouchableOpacity
        onPress={this._onPressThumb}
        style={flattenStyle([pagingStyles.buttonContents, { flexDirection: this.state.dir }])}>
        <Image source={THUMB_URLS[this.state.thumbIndex]} />
        <Image source={THUMB_URLS[this.state.thumbIndex]} />
        <Image source={THUMB_URLS[this.state.thumbIndex]} />
        {this.state.dir === 'column' ?
          <Text>
            Oooo, Let me keep typing here so it wraps at least one line.
          </Text> :
          <Text />
        }
      </TouchableOpacity>
    );
  },
});
