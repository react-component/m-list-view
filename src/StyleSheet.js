export default {
  create: function(styles) {
    return styles;
  },
  flattenStyle: function flattenStyle(style, processor) {
    if (!style) {
      return undefined;
    }

    if (!Array.isArray(style)) {
      return (processor && processor(style)) || style;
    } else {

      var result = {};
      for (var i = 0; i < style.length; ++i) {
        var computedStyle = flattenStyle(style[i]);
        if (computedStyle) {
          for (var key in computedStyle) {
            result[key] = computedStyle[key];
          }
        }
      }

      return (processor && processor(result)) || result;;
    }

  },
};
