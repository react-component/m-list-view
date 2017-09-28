# History
----

## 0.10.0 / 2017-09-28

- Remove `stickyHeader` prop and [react-sticky](https://github.com/captivationsoftware/react-sticky) dependency, but you can also use react-sticky and `useBodyScroll` in listview by your self. (see demo)
    > Because this feature is not commonly used and does not contain UI, so it is not suitable for integration.
- Add `renderSectionWrapper` prop, for more precise control.

## 0.9.1 / 2017-09-26

- Change `RefreshControl`'s inner dom className
    - from `${prefixCls}-ptr` to `${prefixCls}-indicator`
    - from `${prefixCls}-ptr-icon` to `${prefixCls}-indicator-icon-wrapper`
    - from `${prefixCls}-ptr-loading` to `${prefixCls}-indicator-loading-wrapper`
- Remove `Promise`.
- Support pull-up fully.

## 0.9.0 / 2017-09-21

- Change `ref` from `string` to `function`.
    - ListView component's `refs.listviewscroll` change to `ListViewRef`
    - ScrollView component's `refs.ScrollView` change to `ScrollViewRef`
    - ScrollView component's `refs.InnerScrollView` change to `InnerScrollViewRef`
    - ScrollView component's `refs.refreshControl` change to `RefreshControlRef`
