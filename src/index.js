// export this package's api
import ListView from './ListView';
import IndexedList from './Indexed';

ListView.IndexedList = IndexedList;
const DataSource = ListView.DataSource;

export { DataSource, IndexedList };
export default ListView;
