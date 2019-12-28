/*
 * @Description: 未描述
 * @Author: danielmlc
 * @Date: 2019-08-22 11:35:09
 * @LastEditTime : 2019-12-28 17:29:49
 */
import Flexbox from './components/flexbox/flexbox.vue'
import Panel from './components/panel/panel.vue'
import Timebar from './components/timebar/timebar.vue'
import Toolbar from './components/toolbar/toolbar.vue'
import PageHeader from './components/pageheader/pageheader.vue'
import TreeSelect from './components/treeselect/treeselect.vue'
import TableEdit from './components/tableedit/tableedit.vue'
import List from './components/list/list.vue'
import Listr from './components/list/listr.vue'
import Listn from './components/list/listn.vue'
import Table from './components/table/table.jsx'
import Tablen from './components/table/tablen.jsx'
import Tabler from './components/table/tabler.jsx'
import OnlyTable from './components/table/onlytable.jsx'
import CommonSelect from './components/commonselect/commonSelect.vue'
// 业务组件
import YlBusinessCommonSel from './components/commonselect/ylBusinessCommonSel.vue'
import Commontree from './components/commontree/commontree.vue'
import Commonpaneltree from './components/commontree/commonpaneltree.vue'
import DataDictionaryForSel from './components/datadictionary/dataDictionaryForSel.vue'
import DataDictionaryForTree from './components/datadictionary/dataDictionaryForTree.vue'
import ComDataDictionary from './components/comdatadictionary/comDataDictionary.vue'

const components = [
  Flexbox,
  Panel,
  Toolbar,
  Timebar,
  PageHeader,
  Table,
  Tabler,
  Tablen,
  OnlyTable,
  TableEdit,
  List,
  Listr,
  Listn,
  TreeSelect,
  Commontree,
  Commonpaneltree,
  DataDictionaryForSel,
  DataDictionaryForTree,
  ComDataDictionary,
  CommonSelect,
  YlBusinessCommonSel
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
  Flexbox,
  Panel,
  Toolbar,
  Timebar,
  PageHeader,
  Table,
  Tabler,
  Tablen,
  OnlyTable,
  TableEdit,
  List,
  Listr,
  Listn,
  TreeSelect,
  Commontree,
  Commonpaneltree,
  DataDictionaryForSel,
  DataDictionaryForTree,
  ComDataDictionary,
  CommonSelect,
  YlBusinessCommonSel
}
