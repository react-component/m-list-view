# History
----

## 0.11.0 / 2017-10-09
- Add `pullToRefresh` prop.
- Remove `useZscroller` `scrollerOptions` `refreshControl` `pullUpEnabled` `pullUpRefreshing` `pullUpOnRefresh` `pullUpDistanceToRefresh` `pullUpRenderer` props.
- Remove `ListView.RefreshControl` components.

### Upgrade tips

**Note: 0.11.0 version has very big optimization**, if you use `useZscroller`/`ListView.RefreshControl` before. You need to follow new usage.

Now `useZscroller` `scrollerOptions` `refreshControl` these props no longer work by default. But you can also use [zscroller](https://github.com/yiminghe/zscroller) to simulate the implementation of rolling containers like bofore(**Note we do not recommend using simulated scroller**). For ease of upgrade and forward compatibility. We have already implemented a Zscroller ScrollView in 'rmc-list-view/lib/Zscroller', you can use it directly(or you can do it yourself). the complete example is here: [zscroller](https://github.com/react-component/m-list-view/blob/master/examples/zscroller.js).

**At the same time, we strongly recommend using `PullToRefresh` instead of `RefreshControl`**.

But for some reason, you still need to use zscroller and RefreshControl, then the following props table is in the `ListView.RefreshControl` before,

Properties | Descrition | Type | Default
-----------|------------|------|--------
| icon | refresh indicator, include `pull` and `release` state | react node | - |
| loading | loading indicator | react node | - |
| distanceToRefresh | distance to refresh | number | 25 |
| onRefresh | required, Called when the view starts refreshing. | () => void | - |
| refreshing | Whether the view should be indicating an active refresh | bool | false |

now just directly attach them in `ListView` component, and they will still work like before. Upgrade example:

  ```diff
  + import Zscroller from 'rmc-list-view/lib/Zscroller';
  <ListView
     dataSource={this.state.dataSource}
  -  refreshControl={<RefreshControl
  -    refreshing={this.state.refreshing}
  -    onRefresh={this.onRefresh}
  -    icon={this.renderCustomIcon()}
  -  />}
  +  renderScrollComponent={props => <Zscroller {...props} />}
  +  refreshControl
  +  refreshing={this.state.refreshing}
  +  onRefresh={this.onRefresh}
  +  icon={this.renderCustomIcon()}
  />
  ```

the complete example is here: [zscroller-pulldown](https://github.com/react-component/m-list-view/blob/master/examples/zscroller-pulldown.js)


## 0.10.1 / 2017-09-28
- Rename `pullUpDistance` prop to `pullUpDistanceToRefresh`.

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
