<!--
 * @Description: 未描述
 * @Author: danielmlc
 * @Date: 2019-10-12 12:20:18
 * @LastEditTime: 2020-02-20 15:54:50
 -->
<template>
  <yl-tree-select
    step-by-one
    :value="value"
    :width="width"
    :tree-data="treeData"
    :default-text="defaultText"
    :default-props="defaultProps"
    :size="size"
    :disabled="disabled"
    :placeholder="placeholder"
    @clear="_clear"
    @loadNodeEvent="loadNode"
    @getCurrentNode="_getCurrentNode"
  />
</template>

<script type="text/babel">
  import YlTreeSelect from '../tree-select/tree-select.vue'
  export default {
    name: 'YlUnitDictionaryTree',
    components: {
      YlTreeSelect,
    },
    props: {
      code: {
        required: true,
        type: String,
        default: ''
      },
      rootName: {
        type: String,
        default: '根节点'
      },
      orgId: {
        required: true,
        type: Number,
        default: -1
      },
      width: {
        type: [String],
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
      defaultText: { // 默认文本值
        type: String,
        default: ''
      },
      value: [String, Number]
    },
    data () {
      return {
        treeData: [],
        defaultProps: {
          children: 'children',
          label: 'name',
          id: 'id'
        },
        rootNode: {
          id: -1,
          name: '根节点',
          children: []
        }
      }
    },
    methods: {
      _clear () {
        this.$emit('input', '')
        this.$emit('clear')
      },
      _getCurrentNode (selectNode) {
        this.$emit('input', selectNode.name)
        this.$emit('getCurrentNode', selectNode)
      },
      loadNode (node, resolve) {
        if (!node.level) {
          // 根节点
          this.rootNode.id = -1
          this.rootNode.name = this.rootName
          this._getTreeList()
        } else {
          this._getTreeList(node.data.id, resolve)
        }
      },
      _getTreeList (node, resolve) {
        // 加载根节点
        if (node === undefined) {
          // 首次加载...
          this.treeData = [this.rootNode]
        } else {
          const queryParams = {
            condtionItems: [
              {
                fieldName: 'dictType',
                op: 'eq',
                fieldValue: this.code
              },
              {
                fieldName: 'isRemoved',
                op: 'eq',
                fieldValue: false
              },
              {
                fieldName: 'parentId',
                op: 'eq',
                fieldValue: node
              },
              {
                fieldName: 'orgId',
                op: 'eq',
                fieldValue: this.orgId
              }
            ]
          }
          this.$http
            .post('/cbaseinfo/g-common-data-dictionary-params', queryParams)
            .then(data => {
              if (data.rows) {
                resolve(data.rows)
              }
            })
        }
      }
    }
  }
</script>
