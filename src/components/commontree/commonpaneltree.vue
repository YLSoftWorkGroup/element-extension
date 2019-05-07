<template>
  <yl-panel
    :loading="treeLoading"
    :title="title"
    icon="el-icon-cluster"
    :width="width"
  >
    <div slot="tool">
        <i  class="el-icon-refresh" @click="_treeReload"></i>
    </div>
    <el-tree
      :data="treeData"
      :highlight-current="false"
      :expand-on-click-node="false"
      :props="defaultProps"
      :load="loadNode"
      lazy
      :node-key="defaultProps.id"
      :default-expanded-keys="defaultExpandedKeys"
      :render-content="renderContent"
      @node-click.self="_handleNodeClick"
    ></el-tree>
  </yl-panel>
</template>

<script type="text/babel">
import treeMixn from '../../utils/tree.jsx';
export default {
  name:'ylCommonpaneltree',
  mixins: [treeMixn],
  data() {
    return {
      defaultExpandedKeys: [],
      treeData: [],
      nodeParams: [],
      selectNode: {},
      defaultProps: {
        children: "children",
        label: "name",
        id: "id"
      },
      treeLoading: false
    };
  },
  props: {
    title: {
      type: String,
      default: "逐步加载树"
    },
    width: {
      type: String,
      default: "100%"
    },
    queryParams: {
      required: true,
      type: Object,
      default: function() {
        return {
          path: "",
          serviceId: "",
          parentId: -1,
          orgId: ""
        };
      }
    },
    rootName:{
        required: true,
        type:String,
        default:'根节点'
    }  
  },
  computed: {},
  methods: {
    _handleNodeClick(result, resolve) {
      this.selectNode = result;
      this.$emit("getCurrentNode", result);
    },
    _treeReload() {
      this._getTreeList();
    },
    loadNode(node, resolve) {
      if (!node.level) {
        //根节点
        this._getTreeList();
      } else {
        this._getTreeList(node.data.id, resolve);
      }
    },
    _getTreeList(val, resolve) {
      let _this = this;
      this.treeLoading = true;
      //加载根节点
      if(val===undefined){
          //首次加载...
          let rootNode={
              id: this.queryParams.parentId,
              name:this.rootName,
              children:[]
          }
          this.defaultExpandedKeys=[this.queryParams.parentId];
          this.treeData=[rootNode]
          this.treeLoading = false;
      }else{
        this.$http
        .get(
          "/cbaseinfo/get-nodelist-parentid?parentId=" +
            val +
            "&orgId=" +
            this.queryParams.orgId +
            "&serviceId=" +
            this.queryParams.serviceId +
            "&path=" +
            this.queryParams.path
        )
        .then(data => {
          resolve(data);
          _this.treeLoading = false;
        })
        .catch(function(error) {
          _this.treeLoading = false;
        });
      }
    }
  },
  mounted() {
  },
  components: {},
  watch: {}
};
</script>

<style lang="postcss">
.el-tree > .el-tree-node {
  display:inline-block !important;
  min-width: 100%;
  overflow: hidden;
}
</style>
