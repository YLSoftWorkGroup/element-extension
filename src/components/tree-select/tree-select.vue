<!--
 * @Description: 未描述
 * @Author: danielmlc
 * @Date: 2019-10-12 12:20:18
 * @LastEditTime: 2020-03-03 18:03:37
 -->
<template>
  <div class="yl-tree-select">
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
      :disabled="disabled"
      placement="bottom-start"
      :width="popoverWidth"
      trigger="click">
      <div v-if="displaytoolBar" class="el-select-panel-toolbar">
        <el-button size="mini" icon="el-icon-refresh" circle @click="_reset" />
        <el-button size="mini" icon="el-icon-close" circle @click="_clear" />
      </div>
      <el-input
        v-if="filterVisibe"
        v-model="filterText"
        placeholder="输入关键字进行过滤"
        size="small"
        clearable
        class="filter-style"
      />
      <el-scrollbar wrap-class="selectpanel" view-class="selectPanel_view">
        <div class="select-list-panel">
          <el-tree
            ref="treeSelect"
            class="elTree"
            :lazy="stepByOne"
            :load="loadNode"
            :data="treeData"
            :expand-on-click-node="false"
            :props="defaultProps"
            :node-key="defaultProps.id"
            :default-expanded-keys="defaultExpandedKeys"
            :filter-node-method="filterNode"
            :render-content="renderContent"
            @node-click.self="handleNodeClick" />
        </div>
      </el-scrollbar>
    </el-popover>
  </div>
</template>

<script type="text/babel">
  export default {
    name: 'YlTreeSelect',
    props: {
      width: {
        type: [String],
        default: '100%'
      },
      panelWidth: {
        type: [String],
        default: ''
      },
      treeData: {
        type: Array,
        default: function () {
          return []
        }
      },
      defaultExpandedKeys: {
        required: false,
        type: Array,
        default: function () {
          return []
        }
      },
      renderContent: {
        type: Function
      },
      defaultProps: {
        required: false,
        type: Object,
        default: function () {
          return {
            label: 'label',
            children: 'children',
            disabled: 'disabled',
            isLeaf: 'isLeaf'
          }``
        }
      },
      value: [String, Number], // 显示名称
      stepByOne: {
        // 是否一次加载一级
        type: Boolean,
        default: false
      },
      defaultText: { // 默认文本值
        type: String,
        default: ''
      },
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
      filterTextVisibe: {
        type: Boolean,
        default: false
      },
      displaytoolBar: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        selectNode: {},
        filterText: '',
        suffixIcon: 'el-icon-caret-down',
        selectPanelVisible: false,
        inputText: ''
      }
    },
    computed: {
      popoverWidth: function () {
        if (this.panelWidth) {
          return parseInt(this.panelWidth.substr(0, this.panelWidth.length - 2))
        }
        return parseInt(this.width.substr(0, this.width.length - 2))
      },
      filterVisibe: {
        get () {
          if (this.stepByOne) {
            return false
          } else {
            return this.filterTextVisibe
          }
        }
      },
      currentValue: {
        get () {
          if (this.stepByOne) {
            // 异步赋值时，显示名称为传进来的值
            if (this.selectNode.id == undefined) {
              this.inputText = this.defaultText
            } else {
              this.inputText = this.selectNode[this.defaultProps.label]
            }
          } else if (this.treeData.length) {
            // 全部加载
            if (this.selectNode.id == undefined) {
              const text = this.getNodeName(this.treeData, this.value)
              if (this.value != '') {
                this.inputText = text
              } else {
                this.inputText = ''
              }
            } else {
              this.inputText = this.selectNode[this.defaultProps.label]
            }
          }
          return this.inputText
        },
        set (value) {
          if (!value) {
            this.selectNode = {}
          }
        }
      }
    },
    watch: {
      selectPanelVisible: function (n) {
        if (n) {
          this.suffixIcon = 'el-icon-caret-up'
        } else {
          this.suffixIcon = 'el-icon-caret-down'
        }
      },
      filterText (val) {
        this.$refs.treeSelect.filter(val)
      }
    },
    methods: {
      handleNodeClick (result) {
        // 点击加载
        this.selectNode = result
        this.$emit('input', this.selectNode.id)
        this.$emit('getCurrentNode', this.selectNode)
        this.selectPanelVisible = false
      },
      loadNode (node, resolve) {
        if (this.stepByOne) {
          this.$emit('loadNodeEvent', node, resolve)
        }
      },
      _clear () {
        this.currentValue = ''
        this.$emit('input', '')
        this.$emit('clear')
      },
      _reset () {
        this.$emit('reload', this.selectNode)
      },
      filterNode (value, data) {
        if (!value) return true
        return data[this.defaultProps.label].indexOf(value) !== -1
      },
      getNodeName (data, id) {
        let temp
        for (const i in data) {
          if (data[i].id == id) {
            return data[i][this.defaultProps.label]
          } else {
            if (data[i].children != null) {
              temp = data[i].children
              this.getNodeName(temp, id)
            }
          }
        }
      }
    }
  }
</script>
