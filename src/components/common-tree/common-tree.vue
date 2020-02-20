<!--
 * @Description: 未描述
 * @Author: danielmlc
 * @Date: 2019-08-22 11:35:09
 * @LastEditTime: 2020-02-20 15:38:11
 -->
<template>
  <yl-tree-select
    step-by-one
    :value="value"
    :tree-data="treeData"
    :default-props="defaultProps"
    :default-text="defaultText"
    :size="size"
    :width="width"
    :disabled="disabled"
    :placeholder="placeholder"
    :default-expanded-keys="defaultExpandedKeys"
    :render-content="renderC()"
    :displaytool-bar="displaytoolBar"
    @getCurrentNode="_getCurrentNode"
    @loadNodeEvent="loadNode"
    @reload="_reload"
    @clear="_clear" />
</template>

 <script type="text/babel">
  import treeMixn from '../../utils/tree.jsx'
  export default {
    name: 'YlCommonTree',
    components: {
    },
    mixins: [treeMixn],
    props: {
      value: [String, Number],
      defaultText: {
        type: String,
        default: ''
      },
      width: {
        type: [String, Number],
        default: '240px'
      },
      size: {
        type: String,
        default: ''
      },
      disabled: {
        type: Boolean,
        default: false
      },
      placeholder: {
        type: String,
        default: ''
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
      displaytoolBar: {
        type: Boolean,
        default: true
      },
      rootName: {
        required: true,
        type: String,
        default: '根节点'
      },
      renderContent: {
        type: Function
      }
    },
    data () {
      return {
        treeData: [],
        defaultProps: {
          children: 'children',
          label: 'name',
          id: 'id'
        },
        stepByOne: true,
        defaultExpandedKeys: []
      }
    },
    computed: {
      parentName: function () {
        if (this.defaultText) {
          const Arr = this.defaultText.split('|')
          if (Arr.length > 1) {
            return Arr[Arr.length - 2]
          } else {
            return this.rootName
          }
        } else {
          return this.rootName
        }
      }
    },
    mounted () {
    },
    methods: {
      renderC: function () {
        if (this.renderContent) return this.renderContent
        return this.renderContents
      },
      _reload (node) {
        // 重新加载
        this._getTreeList()
      },
      _clear () {
        this.$emit('input', '')
        this.$emit('clear')
      },
      _getCurrentNode (selectNode) {
        if (this.textOnly) {
          this.$emit('input', selectNode.text)
        } else {
          this.$emit('input', selectNode.id)
        }
        this.$emit('getCurrentNode', selectNode)
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
            })
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="postcss" scoped>
</style>
