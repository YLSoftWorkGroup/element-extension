<!--
 * @Description: 未描述
 * @Author: danielmlc
 * @Date: 2019-10-12 12:20:18
 * @LastEditTime: 2020-06-12 17:09:59
 -->
<template>
  <div class="yl-common-select">
    <el-input
      ref="inputText"
      v-popover:selectPanel
      :style="{width:width}"
      type="text"
      :size="size"
      readonly
      :disabled="disabled"
      :placeholder="placeholder"
      :suffix-icon="suffixIcon"
      :value="currentValue" />
    <el-popover
      ref="selectPanel"
      v-model="selectPanelVisible"
      placement="bottom-start"
      :disabled="disabled"
      :width="popoverWidth"
      trigger="click">
      <div v-if="displaytoolBar" class="el-select-panel-toolbar">
        <el-button size="mini" icon="el-icon-refresh" circle @click="_reload" />
        <el-button size="mini" icon="el-icon-close" circle @click="_clear" />
        <slot name="extendComs" />
      </div>
      <el-input
        v-if="filterVisibe"
        v-model="filterText"
        :placeholder="filterPlaceholder"
        size="small"
        clearable
        :autofocus="inputAutofocus"
        class="filter-style"
      />
      <el-scrollbar v-if="selectPanelVisible" wrap-class="selectpanel" view-class="selectpanel_view">
        <div v-infinite-scroll="loadData"
          class="select-list-panel"
          :infinite-scroll-disabled="infiniteDisabled">
          <ul class="infinite-list-wrapper"
            style="overflow:auto"
            :infinite-scroll-delay="infiniteScroll.delay"
            :infinite-scroll-distance="infiniteScroll.distance"
            :infinite-scroll-immediate="infiniteScroll.immediate"
          >
            <template v-for="(node,index) in listData">
              <li
                :key="index"
                class="infinite-list-item"
                @click="_nodeClick(node)">
                <p class="label">
                  <span :title="node[defaultProps.label]">{{ node[defaultProps.label] }}</span>
                </p>
                <p v-if="defaultProps.subLabel" class="sub-label">
                  <span :title="node[defaultProps.subLabel]"> {{ node[defaultProps.subLabel] }} </span>
                </p>
                <p v-if="defaultProps.nextLabel" class="sub-label">
                  <span :title="node[defaultProps.nextLabel]"> {{ node[defaultProps.nextLabel] }} </span>
                </p>
              </li>
            </template>
          </ul>
          <p v-if="listLoading" class="infinite-list-tip">
            加载中...
          </p>
          <p v-if="noData" class="infinite-list-tip">
            没有更多了
          </p>
        </div>
      </el-scrollbar>
    </el-popover>
  </div>
</template>

<script type="text/babel">
  let searchTimer
  export default {
    name: 'YlCommonSelect',
    props: {
      pageData: {
        type: Array,
        default: function () {
          return []
        }
      },
      width: {
        type: [String],
        default: '100%'
      },
      panelWidth: {
        type: [String],
        default: ''
      },
      defaultProps: {
        required: true,
        type: Object,
        default: function () {
          return {
            label: 'label',
            subLabel: 'subLabel',
            nextLabel: 'nextLabel',
            id: 'id'
          }
        }
      },
      // eslint-disable-next-line vue/require-default-prop
      value: [String, Number], // 显示名称
      size: {
        type: String,
        default: 'small'
      },
      disabled: {
        type: Boolean,
        default: false
      },
      placeholder: {
        type: String,
        default: ''
      },
      filterVisibe: {
        type: Boolean,
        default: true
      },
      filterPlaceholder: {
        type: String,
        default: '输入关键字过滤'
      },
      displaytoolBar: {
        type: Boolean,
        default: true
      },
      defaultText: {
        type: String,
        default: ''
      },
      infiniteScroll: {
        type: Object,
        default: function () {
          return {
            disabled: false,
            delay: 200,
            distance: 5,
            immediate: false
          }
        }
      }
    },
    data () {
      return {
        selectNode: {},
        filterText: '',
        suffixIcon: 'el-icon-caret-down',
        selectPanelVisible: false,
        inputText: '',
        listLoading: false,
        listData: [],
        inputAutofocus: false,
        is0: true
      }
    },
    computed: {
      popoverWidth: function () {
        if (this.panelWidth) {
          return parseInt(this.panelWidth.substr(0, this.panelWidth.length - 2))
        }
        return parseInt(this.width.substr(0, this.width.length - 2))
      },
      currentValue: {
        get () {
          if (this.selectNode.id) {
            // eslint-disable-next-line vue/no-side-effects-in-computed-properties
            this.inputText = this.selectNode[this.defaultProps.label]
          } else {
            // eslint-disable-next-line vue/no-side-effects-in-computed-properties
            this.inputText = this.defaultText
          }
          return this.inputText
        },
        set (value) {
          if (!value) {
            this.selectNode = {}
          }
        }
      },
      noData: {
        get () {
          return this.pageData.length === 0 && !this.is0
        }
      },
      infiniteDisabled: {
        get () {
          return this.listLoading || this.noData
        }
      }
    },
    watch: {
      selectPanelVisible: function (n) {
        this.inputAutofocus = n
        if (n) {
          this.suffixIcon = 'el-icon-caret-up'
        } else {
          this.suffixIcon = 'el-icon-caret-down'
        }
      },
      filterText (val) {
        this._filterText(val)
      },
      pageData: function (n, o) {
        this.listLoading = false
        this.is0 = false
        this.listData.push(...n)
      }
    },
    mounted () {
    },
    methods: {
      loadData () {
        const _this = this
        _this.listLoading = true
        _this.$emit('load', this.filterText)
      },
      _clear () {
        this.currentValue = ''
        this.$emit('input', '')
        this.$emit('clear')
      },
      _reload (event, keyWord) {
        const _this = this
        _this.listLoading = true
        _this.is0 = true
        _this.listData = []
        _this.$emit('reload', keyWord || this.filterText)
      },
      _filterText (val) {
        if (searchTimer) clearTimeout(searchTimer)
        searchTimer = setTimeout(() => {
          this._reload(null, val)
        }, 500)
      },
      _nodeClick (node) {
        this.selectNode = node
        this.$emit('input', this.selectNode[this.defaultProps.id])
        this.$emit('getCurrentNode', this.selectNode)
        this.selectPanelVisible = false
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="postcss" >
  @import "../../styl/var.pcss";
  .infinite-list-wrapper{
    height: 100%;
  }
  .infinite-list-item{
    min-height: 28px;
    padding:5px;
    &:hover{
      cursor: pointer;
      background:$background-color-b
    }
    & > p {
      margin: 0px;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
    }
    & > .label {
       font-size:14px;
      color:$text-regular;
    }
    & > .sub-label {
      font-size:12px;
      color:$info;
    }
  }
  .infinite-list-tip{
    font-size:12px;
    text-align: center;
    color:$text-regular;
  }
</style>
