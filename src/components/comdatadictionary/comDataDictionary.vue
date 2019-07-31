<template>
  <yl-treeselect
    :value='value'
    :treedata="treedata"
    :textOnly="textOnly"
    :defaultProps="defaultProps"
    :isexpand="isexpand"
    :size="size"
    :readonly="readonly"
    :disabled="disabled"
    :maxlength="maxlength"
    :minlength="minlength"
    :autofocus="autofocus"
    :placeholder="placeholder"
    :filterTextVisibe="filterVisibe"
    @getCurrentNode="_getCurrentNode"
    style="width:100%">
  </yl-treeselect>
</template>

<script type="text/babel">
  import treeselect from '../treeselect/treeselect'
  export default {
    name: 'ylComDataDictionary',
    components: {
      'yl-treeselect': treeselect
    },
    data () {
      return {
        treedata: [],
        defaultProps: {
          children: 'children',
          label: 'text',
          id: 'id'
        },
        textOnly: true,
      }
    },
    props: {
      code: {
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
        default: "",
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
    },
    methods: {
      _getCurrentNode (selectNode) {
        if (this.textOnly) {
          this.$emit('input', selectNode.text);
        }
        else {
          this.$emit('input', selectNode.id);
        }
        this.$emit('getCurrentNode', selectNode);
      },
      _getTreeList () {
        let obj = {};
        obj.orgId = this.orgId
        obj.code = this.dictType
        this.$http.post('g-common-data-dictionary-params', obj).then(data => {
          this.tableData = data
        }).then(data => {
          if (data.success) {
            this.treedata = data.result.selectModelDtos;
          }
          else {
            this.$message.error('获取数据失败！');
          }
        })
      },
    },
    mounted () {
      //this._getTreeList();
    },
    components: {
    }
  }
</script>