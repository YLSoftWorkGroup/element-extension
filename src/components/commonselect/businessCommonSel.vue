<template>
  <yl-commonselect
    :value="value"
    :page-data="pageData"
    :default-text="defaultText"
    :default-props="defaultProps"
    :placeholder="placeholder"
    :filter-placeholder="filterPlaceholder"
    :width="width"
    @getCurrentNode="_getCurrentNode"
    @clear="_clear"
    @reload="_reload"
    @load="_loadData"
  />
</template>
 <script>
  export default {
    name: 'ylBusinessCommonSel',
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
      // eslint-disable-next-line vue/require-default-prop
      value: [String, Number],
      defaultText: {
        type: String,
        default: ''
      },
      placeholder: {
        type: String,
        default: ''
      },
      filterPlaceholder: {
        type: String,
        default: ''
      },
      width: {
        type: [String, Number],
        default: '240px'
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
        visible: false,
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
      _add () {
        this.visible = true
        this.$children[0].selectPanelVisible = false
      },
      _close (bool) {
        if (bool) {
          this.visible = false
        }
      },
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
        this.listParams.condtionItems = [
          {
            fieldName: 'orgId',
            op: 'eq',
            fieldValue: this.parameter.orgId
          }
        ]
        if (filterKey) {
          this.listParams.condtionItems.push({
            fieldName: this.parameter.fieldName,
            op: 'like',
            fieldValue: '%' + filterKey + '%'
          })
        }
        this.listParams.draw += 1
        this.listParams.offset = this.offset
        this.$http.post(this.parameter.url, this.listParams).then(
          data => {
            this.pageData = data.rows
          })
      }
    }
  }
 </script>
 <style lang="css" >
 </style>
