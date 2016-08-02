export function getOffsetTop(elem) {
  let offsetTop = 0;
  do {
    if (!isNaN(elem.offsetTop)) {
        offsetTop += elem.offsetTop;
    }
  } while(elem = elem.offsetParent);
  return offsetTop;
}

export const isTouchable = 'ontouchstart' in window;
export const START = isTouchable ? 'touchstart' : 'mousedown';
export const MOVE = isTouchable ? 'touchmove' : 'mousemove';
export const END = isTouchable ? 'touchend' : 'mouseup';
export const CANCEL = isTouchable ? 'touchcancel' : 'mousecancel';
export const CLICK = isTouchable ? 'touchstart' : 'click';

const isBadMobile = (/Android[^\d]*(1|2|3|4\.0)/.test(window.navigator.appVersion) ||
  /iPhone[^\d]*(5)/.test(window.navigator.appVersion));

export function _event(e) {
  if (e.touches && e.touches.length) {
    return e.touches[0];
  }
  if (e.changedTouches && e.changedTouches.length) {
    return e.changedTouches[0];
  }
  return e;
}
