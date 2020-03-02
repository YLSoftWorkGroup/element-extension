<!--
 * @Description: 未描述
 * @Author: danielmlc
 * @Date: 2019-10-12 12:20:18
 * @LastEditTime: 2020-03-03 00:13:13
 -->
<template>
  <yl-panel
    :loading="treeLoading"
    :title="title"
    icon="el-icon-cluster"
    style="height:100%"
    :width="width">
    <div slot="tool">
      <i class="el-icon-refresh" @click="_treeReload" />
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
      :render-content="renderC()"
      @node-click.self="_handleNodeClick" />
  </yl-panel>
</template>

<script type="text/babel">
  import treeMixn from '../../utils/tree.jsx'
  export default {
    name: 'YlCommonTreePanel',
    components: {},
    mixins: [treeMixn],
    props: {
      title: {
        type: String,
        default: '逐步加载树'
      },
      width: {
        type: String,
        default: '100%'
      },
      queryParams: {
        required: true,
        type: Object,
        default: function () {
          return {
            path: '',
            serviceId: '',
            parentId: -1,
            orgId: ''
          }
        }
      },
      renderContent: {
        type: Function
      },
      rootName: {
        required: true,
        type: String,
        default: '根节点'
      }
    },
    data () {
      return {
        defaultExpandedKeys: [],
        treeData: [],
        nodeParams: [],
        selectNode: {},
        defaultProps: {
          children: 'children',
          label: 'name',
          id: 'id'
        },
        treeLoading: false
      }
    },
    computed: {},
    watch: {},
    mounted () {
    },
    methods: {
      renderC: function () {
        if (this.renderContent) return this.renderContent
        return this.renderContents
      },
      _handleNodeClick (result, resolve) {
        this.selectNode = result
        this.$emit('getCurrentNode', result)
      },
      _treeReload () {
        this._getTreeList()
      },
      loadNode (node, resolve) {
        if (!node.level) {
          // 根节点
          this._getTreeList()
        } else {
          this._getTreeList(node.data.id, resolve)
        }
      },
      _getTreeList (val, resolve) {
        const _this = this
        this.treeLoading = true
        // 加载根节点
        if (val === undefined) {
          // 首次加载...
          const rootNode = {
            id: this.queryParams.parentId,
            name: this.rootName,
            children: []
          }
          this.defaultExpandedKeys = [this.queryParams.parentId]
          this.treeData = [rootNode]
          this.treeLoading = false
        } else {
          this.$http
            .get(
              '/cbaseinfo/get-nodelist-parentid?parentId=' +
                val +
                '&orgId=' +
                this.queryParams.orgId +
                '&serviceId=' +
                this.queryParams.serviceId +
                '&path=' +
                this.queryParams.path
            )
            .then(data => {
              resolve(data)
              _this.treeLoading = false
            })
            .catch(function (error) {
              _this.treeLoading = false
            })
        }
      }
    }
  }
</script>

<style lang="postcss">
  .el-tree > .el-tree-node {
    display: inline-block !important;
    min-width: 100%;
    overflow: hidden;
  }
</style>
