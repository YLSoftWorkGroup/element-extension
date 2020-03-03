<!--
 * @Description: 未描述
 * @Author: danielmlc
 * @Date: 2019-10-12 12:20:18
 * @LastEditTime: 2020-03-03 18:06:28
 -->
<template>
  <yl-tree-select
    step-by-one
    :value="value"
    :width="width"
    :panel-width="panelWidth"
    :tree-data="treeData"
    :default-text="defaultText"
    :default-props="defaultProps"
    :size="size"
    :disabled="disabled"
    :placeholder="placeholder"
    @loadNodeEvent="loadNode"
    @getCurrentNode="_getCurrentNode"
    @clear="_clear"
  />
</template>

<script type="text/babel">
  import YlTreeSelect from '../tree-select/tree-select.vue'
  export default {
    name: 'YlDictionaryTree',
    components: {
      YlTreeSelect
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
      width: {
        type: [String],
        default: '240px'
      },
      panelWidth: {
        type: [String],
        default: ''
      },
      placeholder: {
        required: false,
        type: String,
        default: ''
      },
      defaultText: { // 默认文本值
        type: String,
        default: ''
      },
      size: {
        type: String,
        default: ''
      },
      disabled: {
        type: Boolean,
        default: false
      },
      value: [String, Number]
    },
    methods: {
      _clear () {
        this.$emit('input', '')
        this.$emit('clear')
      },
      _getCurrentNode (node) {
        this.$emit('input', node.name)
        this.$emit('getCurrentNode', node)
      },
      loadNode (node, resolve) {
        if (!node.level) {
          // 根节点
          const queryParams = {
            condtionItems: [
              {
                fieldName: 'code',
                op: 'eq',
                fieldValue: this.code
              },
              {
                fieldName: 'isRemoved',
                op: 'eq',
                fieldValue: false
              }
            ]
          }
          this.$http.post('/cbaseinfo/g-data-dictionary-params', queryParams).then(data => {
            if (data.rows) {
              this.rootNode.id = data.rows[0].id
              this.rootNode.name = data.rows[0].name
              this._getTreeList()
            }
          }).catch(err => {
            this.$message.error('获取数据失败！' + err)
          })
        } else {
          this._getTreeList(node.data.id, resolve)
        }
      },
      _getTreeList (node, resolve) {
        let _this = this;
        // 加载根节点
        if (node === undefined) {
          // 首次加载...
          // this.defaultExpandedKeys = [node.id]
          this.treeData = [this.rootNode]
        } else {
          this.$http
            .get(
              "/cbaseinfo/get-nodelist-parentid?parentId=" +
              node +
              "&serviceId=node-cbaseinfo-service&path=cbaseinfo/g-data-dictionary"
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
<style lang="postcss"  scoped></style>
