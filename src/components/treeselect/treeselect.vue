<template>
  <div class="yl-treeSelect">
    <el-input
      ref="inputText"
      :style="{width:width}"
      v-popover:selectPanel
      type="text"
      :size="size"
      readonly
      :disabled="disabled"
      :placeholder="placeholder"
      :suffix-icon="suffixIcon"
      :value="currentValue"
    ></el-input>
    <el-popover ref="selectPanel" v-model="selectPanelVisible" placement="bottom-start" :width="popoverWidth" trigger="click">
      <el-scrollbar wrap-class="treepanel" view-class="treepanel_view">
        <div class="el-tree-toolbar" v-if="displaytoolBar">
           <el-button  type="primary" size="mini" round plain @click="_clear">清除</el-button>
           <el-button  type="primary" size="mini" round plain @click="_reset">刷新</el-button>
        </div>
        <el-input
          v-if="filterVisibe"
          placeholder="输入关键字进行过滤"
          v-model="filterText"
          size="small"
          class="filter-style"
        ></el-input>
        <el-tree
          class="elTree"
          ref="treeSelect"
          :lazy="stepByOne"
          :load="loadNode"
          :empty-text="emptyText"
          :data="treeData"
          :expand-on-click-node="false"
          :props="defaultProps"
          :node-key="defaultProps.id"
          :default-expanded-keys="defaultExpandedKeys"
          :filter-node-method="filterNode"
          :render-content="renderContent"
          @node-click.self="handleNodeClick"
        ></el-tree>
      </el-scrollbar>
    </el-popover>
  </div>
</template>

<script type="text/babel">
export default {
  name: "ylTreeselect",
  componentName: "ylTreeselect",
  data() {
    return {
      selectNode: {},
      filterText: "",
      suffixIcon:"el-icon-caret-down",
      emptyText: "暂无数据",
      selectPanelVisible:false
    };
  },
  props: {
    width: {
      type: [String, Number],
      default: "240px"
    },
    treeData: {
      type: Array,
      default: function() {
        return [];
      }
    },
    defaultExpandedKeys: {
      required: false,
      type: Array,
      default: function() {
        return [];
      }
    },
    renderContent:{
      type:Function
    },
    defaultProps: {
      required: false,
      type: Object,
      default: function() {
        return {};
      }
    },
    value: [String, Number], //显示名称
    stepByOne: {
      //是否一次加载一级
      type: Boolean,
      default: false
    },
    defaultText: { //默认文本值
      type: String,
      default: ""
    },
    size: {
      type: String,
      default: "small"
    },
    disabled: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: ""
    },
    filterTextVisibe: {
      type: Boolean,
      default: true
    },
    displaytoolBar: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    popoverWidth: function() {
      return parseInt(this.width.substr(0, this.width.length - 2));
    },
    filterVisibe: {
      get() {
        if (this.stepByOne) {
          return false;
        } else {
          return this.filterTextVisibe;
        }
      }
    },
    currentValue: {
      get() {
         let inputText = ''
        if (this.stepByOne) {
          //异步赋值时，显示名称为传进来的值
          if (this.selectNode.id == undefined) {
            inputText = this.defaultText;
          } else {
            inputText = this.selectNode.name;
          }
        } 
        else if (this.treeData.length) {
          //全部加载
          if (this.selectNode.id == undefined) {
            let text = this.getNodeName(this.treeData, this.value);
            if (this.value != "") {
              inputText = text;
            } else {
              inputText = "";
            }
          } else {
            inputText = this.selectNode.name;
          }
        }
        return inputText 
      }
    }
  },
  methods: {
    handleNodeClick(result) {
      //点击加载
      this.selectNode = result;
      this.$emit("input", this.selectNode.id);
      this.$emit("getCurrentNode", this.selectNode);
      this.selectPanelVisible=false;
    },
    loadNode(node, resolve) {
      if (this.stepByOne) {
          this.$emit("loadNodeEvent", node, resolve);
      }
    },
    _clear() {
      this.$emit("clear", this.selectNode);
    },
    _reset() {
      this.$emit("reload", this.selectNode);
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    },
    getNodeName(data, id) {
      let temp;
      for (let i in data) {
        if (data[i].id == id) {
          return data[i].name;
        } else {
          if (data[i].children != null) {
            temp = data[i].children;
            this.getNodeName(temp, id);
          }
        }
      }
    }
  },
  mounted() {
  },
  watch: {
    selectPanelVisible:function(n){
        if(n){
            this.suffixIcon='el-icon-caret-top'
        }else{
            this.suffixIcon='el-icon-caret-down'
        }
    },
    filterText(val) {
      this.$refs.treeSelect.filter(val);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="postcss" >
@import '../../styl/var.pcss';
.el-tree > .el-tree-node {
  display:inline-block !important;
  min-width: 100%;
  overflow: hidden;
}
.treepanel {
  max-height: 274px;
}
.treepanel_view {
  padding: 6px 0;
  margin: 0;
  box-sizing: border-box;
}
.filter-style.el-input__inner {
  border: 1px solid rgb(191, 203, 217);
}
.el-tree-toolbar {
  height: 25px;
  font-size: 12px;
  text-align: right;
  padding-right: 10px;
  line-height: 25px;
  border: 1px solid #fff;
  background-color: $background-color-base;
}
.el-popover {
  padding: 5px;
}
</style>
