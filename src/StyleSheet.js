export default {
  create(styles) {
    return styles;
  },
  flattenStyle: function flattenStyle(style, processor) {
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
  },
};
