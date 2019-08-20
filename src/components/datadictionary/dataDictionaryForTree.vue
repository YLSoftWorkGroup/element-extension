<template>
  <yl-treeselect
    stepByOne
    :value="value"
    :width="width"
    :treeData="treeData"
    :defaultText="defaultText"
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
    name: 'ylDataDictionaryForTree',
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
        default: "240px"
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
      value: [String, Number],
    },
    methods: {
      // _clear () {
      //   this.$emit('clear')
      // },
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
    },
    mounted () {
    },
    components: {
      "yl-treeselect": treeselect
    },
    watch: {
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="postcss"  scoped></style>
