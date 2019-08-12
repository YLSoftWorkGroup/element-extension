<template>
  <yl-treeselect
    stepByOne
    :value="value"
    :width="width"
    :treeData="treeData"
    :default-props="defaultProps"
    :size="size"
    :disabled="disabled"
    :placeholder="placeholder"
    @loadNodeEvent="loadNode"
    @getCurrentNode="_getCurrentNode"
  />
</template>

<script type="text/babel">
  import treeselect from '../treeselect/treeselect.vue'
  export default {
    name: 'ylComDataDictionary',
    components: {
      'yl-treeselect': treeselect
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
    props: {
      code: {
        required: true,
        type: String,
        default: ''
      },
      rootName: {
        type: String,
        default: "根节点",
      },
      orgId: {
        required: true,
        type: Number,
        default: -1
      },
      width: {
        type: [String],
        default: "240px"
      },
      size: {
        type: String,
        default: "",
      },
      disabled: {
        type: Boolean,
        default: false
      },
      placeholder: {
        type: String,
        default: "",
      },
      value: [String, Number],
    },
    methods: {
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
        let _this = this;
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
            .post("/cbaseinfo/g-common-data-dictionary-params", queryParams)
            .then(data => {
              if (data.rows) {
                resolve(data.rows)
              }
            })
        }
      }
    },
    mounted () {
    }
  }
</script>
