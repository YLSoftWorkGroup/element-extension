import PageHeader from './components/page-header/page-header.vue'
import PageHeaderItem from './components/page-header/page-header-item.vue'
import FlexBox from './components/flex-box/flex-box.vue'
import Panel from './components/panel/panel.vue'
import ToolBar from './components/tool-bar/tool-bar.vue'
import TimeBar from './components/time-bar/time-bar.vue'

import CommonSelect from './components/common-select/common-select.vue'
import CommonSelectApi from './components/common-select/common-select-api.vue'

import TreeSelect from './components/tree-select/tree-select.vue'
import TableEdit from './components/table-edit/table-edit.vue'
import List from './components/list/list.vue'
import ListReport from './components/list/list-report.vue'
import ListNext from './components/list/list-next.vue'
import Table from './components/table/table.jsx'
import TableNext from './components/table/table-next.jsx'
import TableReport from './components/table/table-report.jsx'
import OnlyTable from './components/table/only-table.jsx'

// 业务组件
import Commontree from './components/common-tree/common-tree.vue'
import Commonpaneltree from './components/common-tree/common-tree-panel.vue'
import DictionarySelect from './components/dictionary/dictionary-select.vue'
import DictionaryTree from './components/dictionary/dictionary-tree.vue'
import UnitDictionaryTree from './components/dictionary/unit-dictionary-tree.vue'

const components = [
  FlexBox,
  Panel,
  ToolBar,
  TimeBar,
  PageHeader,
  PageHeaderItem,
  CommonSelect,
  CommonSelectApi,
  TreeSelect,
  Commontree,
  Commonpaneltree,
  DictionarySelect,
  DictionaryTree,
  UnitDictionaryTree,
  Table,
  TableNext,
  TableReport,
  OnlyTable,
  TableEdit,
  List,
  ListReport,
  ListNext
]

const install = function (Vue) {
  components.forEach(component => {
    Vue.component(component.name, component)
  })
}

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install,
  FlexBox,
  Panel,
  ToolBar,
  TimeBar,
  PageHeader,
  CommonSelect,
  CommonSelectApi,
  TreeSelect,
  Commontree,
  Commonpaneltree,
  DictionarySelect,
  DictionaryTree,
  UnitDictionaryTree,
  Table,
  TableReport,
  TableNext,
  OnlyTable,
  TableEdit,
  List,
  ListReport,
  ListNext
}
