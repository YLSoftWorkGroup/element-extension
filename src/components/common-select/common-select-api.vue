<template>
  <div class="common-select-api">
    <yl-common-select
      ref="commonSel"
      :value="value"
      :page-data="pageData"
      :default-text="defaultText"
      :default-props="defaultProps"
      :placeholder="placeholder"
      :filter-placeholder="filterPlaceholder"
      :displaytool-bar="displaytoolBar"
      :filter-visibe="filterVisibe"
      :width="width"
      :panelWidth="panelWidth"
      :disabled="disabled"
      @getCurrentNode="_getCurrentNode"
      @clear="_clear"
      @reload="_reload"
      @load="_loadData"
    />
  </div>
</template>
<script>
  export default {
    name: 'YlCommonSelectApi',
    props: {
      defaultProps: {
        type: Object,
        default: function () {
          return {}
        }
      },
      parameter: {
        type: Object,
        default: function () {
          return {}
        }
      },
      value: [String, Number],
      // 默认值
      defaultText: {
        type: String,
        default: ''
      },
      // 提示输入文本
      placeholder: {
        type: String,
        default: ''
      },
      // 输入关键字过滤提示
      filterPlaceholder: {
        type: String,
        default: ''
      },
      disabled: {
        type: Boolean,
        default: false
      },
      // 启用树控件工具栏（包含清除和刷新功能）
      displaytoolBar: {
        type: Boolean,
        default: false
      },
      // 过滤器 （在全部加载模式下启用）
      filterVisibe: {
        type: Boolean,
        default: true
      },
      // 宽度
      width: {
        type: [String, Number],
        default: '100%'
      },
      panelWidth: {
        type: [String],
        default: ''
      }
    },
    data () {
      return {
        listParams: {
          offset: 0,
          limit: 10,
          draw: 0
        },
        pageData: [],
        selectNode: []
      }
    },
    computed: {
      offset: {
        get () {
          return this.listParams.limit * (this.listParams.draw - 1)
        }
      }
    },
    methods: {
      _reload (filterKey) {
        // 重刷
        this.listParams.draw = 0
        this._loadData(filterKey)
      },
      _clear () {
        this.$emit('input', undefined)
        this.$emit('clear')
        // 重刷
      },
      _getCurrentNode (node) {
        this.selectNode = node
        this.$emit('input', this.selectNode.id)
        this.$emit('getCurrentNode', this.selectNode)
      },
      _loadData (filterKey) {
        this.listParams.condtionItems = []
        if (this.parameter.orgId > 0) {
          this.listParams.condtionItems.push({
            fieldName: 'orgId',
            op: 'eq',
            fieldValue: this.parameter.orgId
          })
        }
        if (filterKey) {
          this.listParams.condtionItems.push({
            fieldName: this.parameter.fieldName,
            op: 'like',
            fieldValue: '%' + filterKey + '%'
          })
        }
        if (this.parameter.condtionItems) {
          this.listParams.condtionItems.push(...this.parameter.condtionItems)
        }
        this.listParams.draw += 1
        this.listParams.offset = this.offset
        this.$http.post(this.parameter.url, this.listParams).then(data => {
          if (data.rows) {
            this.pageData = data.rows
          } else {
            this.pageData = data
          }
        })
      }
    }
  }
</script>
<style lang="css"></style>
