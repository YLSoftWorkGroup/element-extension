<template>
  <yl-treeselect
    :value='value'
    :treeData="treedata"
    :textOnly="textOnly"
    :defaultProps="defaultProps"
    :isexpand="isexpand"
    :stepByOne="true"
    :size="size"
    :readonly="readonly"
    :defaultText="defaultText"
    :disabled="propsData.disabled"
    :autofocus="autofocus"
    :placeholder="placeholder"
    :nodeStateConf="nodeStateConf"
    :displaytoolBar="displaytoolBar"
    :filterTextVisibe="filterVisibe"
    @loadNodeEvent="nodeExpand"
    @getCurrentNode="_getCurrentNode"
    @reload="nodeExpand"
    @clear="_clear">
  </yl-treeselect>
</template>


<script type="text/babel">
  import treeselect from '../treeselect/treeselect'
  export default {
    name: 'ylComDataDictionary',
    componentName:  {
      'yl-treeselect': treeselect
    },
     data () {
      return {
        treedata: [],
        defaultProps: {
          children: 'children',
          label: 'name',
          id: 'id'
        },
        propsData: {
          disabled: this.disabled,
        },
        currentValue: this.value
      }
    },
    props: {
      dictType: {
        required: true,
        type: String,
        default: ''
      },
      size: {
        type: String,
        default: "",
      },
      readonly: {
        type: Boolean,
        default: false
      },
      textOnly: {
        type: Boolean,
        default: true
      },
      disabled: {
        type: Boolean,
        default: false
      },
      maxlength: {
        type: Number,
      },
      minlength: {
        type: Number,
      },
      placeholder: {
        type: String,
        default: '',
      },
      autofocus: {
        type: Boolean,
        default: false,
      },
      filterVisibe: {
        type: Boolean,
        default: false,
      },
      isexpand: { type: Boolean, default: false },
      value: [String, Number],
      nodeStateConf: {
        required: false,
        type: Array,
        default: function () {
          return []
        }
      },
      displaytoolBar: {
        type: Boolean,
        default: true
      }, 
      stepByOne: {
        type: Boolean,
        default: true
      },
      defaultText: {
        type: String,
        default: ''
      }
    },

    methods: {
      _clear () {
        this.$emit('clear')
      },
      _getCurrentNode (val) {
        // this.$emit('input', val)
        this.$emit('getCurrentNode', val)
      },
      nodeExpand (node, resolve) {
        let id = 0
        if (node.data.id !== undefined) {
          id = node.data.id
          this.getData(id, resolve)
        } else {
          const queryParams = {
            condtionItems: []
          }
          queryParams.condtionItems = [
            {
              fieldName: 'dictType',
              op: 'eq',
              fieldValue: this.code
            },
            {
              fieldName: 'isRemoved',
              op: 'eq',
              fieldValue: false
            }
          ]
          this.$http.post('/cbaseinfo/g-common-data-dictionary-params', queryParams).then(data => {
            id = data.rows[0].id
            this.getData(id, resolve)
          }).catch(err => {
            this.$message.error('获取数据失败！' + err)
          })
        }
      },
      getData (id, resolve) {
        this.$http.get('/cbaseinfo/get-nodelist-parentid?parentId=' + id + '&orgId=&serviceId=node-cbaseinfo-service&path=cbaseinfo/g-data-dictionary').then(data => {   
          resolve(data)
        })
      },
      _setCurrentValue (value) {
        if (value === this.currentValue) return
        this.currentValue = value
        if (this.validateEvent) {
          this.dispatch('ElFormItem', 'el.form.change', [value])
        }
      }
    },
    mounted () {
      // this._getTreeList()
    },
    components: {
    },
    watch: {
      value: function (val, oldVal) {
        this._setCurrentValue(val)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped></style>
