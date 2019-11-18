<!--
 * @Description: 未描述
 * @Author: danielmlc
 * @Date: 2019-10-12 12:20:18
 * @LastEditTime: 2019-10-24 17:30:07
 -->
<template>
  <div class="yl-commonSelect">
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
      :value="currentValue"></el-input>
    <el-popover ref="selectPanel" :disabled="panelDisabled" v-model="selectPanelVisible"  placement="bottom-start" :width="popoverWidth"
      trigger="click">
      <div class="el-select-panel-toolbar" v-if="displaytoolBar">
        <el-button  size="mini" icon="el-icon-refresh" circle @click="_reload"></el-button>
        <el-button  size="mini" icon="el-icon-close" circle @click="_clear"></el-button>
        <slot name="extendComs"></slot>
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
      <el-scrollbar wrap-class="selectpanel" view-class="selectpanel_view" v-if="selectPanelVisible">
        <div class="select-list-panel"
         v-infinite-scroll="loadData"
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
                  @click = "_nodeClick(node)">
                  <p class="label"> {{ node[defaultProps.label] }} </p>
                  <p class="sub-label" v-if="defaultProps.subLabel"> {{ node[defaultProps.subLabel] }} </p>
                  <p class="sub-label" v-if="defaultProps.nextLabel"> {{ node[defaultProps.nextLabel] }} </p>
              </li>
            </template>
          </ul>
          <p class="infinite-list-tip" v-if="listLoading">加载中...</p>
          <p class="infinite-list-tip" v-if="noData">没有更多了</p>
          <!-- <p class="infinite-list-tip" v-if="!listData.length">暂无数据</p> -->
        </div>
      </el-scrollbar>
    </el-popover>
  </div>
</template>

<script type="text/babel">
  let searchTimer
  export default {
    name: "ylCommonselect",
    data () {
      return {
        selectNode: {},
        filterText: "",
        suffixIcon: "el-icon-caret-down",
        selectPanelVisible: false,
        inputText:'',
        listLoading:false,
        listData:[],
        inputAutofocus:false,
        is0:true
      };
    },
    props: {
      pageData: {
        type: Array,
        default: function(){
          return []
        }
      },
      width: {
        type: [String],
        default: "240px"
      },
      defaultProps: {
        required: true,
        type: Object,
        default: function () {
          return {
            label: "label",
            subLabel: "subLabel",
            nextLabel: "nextLabel",
            id: "id"
          }
        }
      },
      value: [String, Number], //显示名称
      size: {
        type: String,
        default: "small"
      },
      disabled: {
        type: Boolean,
        default: false
      },
      panelDisabled: {
        type: Boolean,
        default: false
      },
      placeholder: {
        type: String,
        default: ""
      },
      filterVisibe: {
        type: Boolean,
        default: true
      },
      filterPlaceholder:{
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
      infiniteScroll:{
        type: Object,
        default: function(){
          return {
            disabled:false,
            delay:200,
            distance:5,
            immediate:false
          }
        }
      }
    },
    computed: {
      popoverWidth: function () {
        return parseInt(this.width.substr(0, this.width.length - 2));
      },
      currentValue: {
        get () {
          if(this.selectNode.id){
            this.inputText = this.selectNode[this.defaultProps.label];
          }else{
            this.inputText = this.defaultText
          }
          return this.inputText
        },
        set(value){
           if(!value){
            this.selectNode = {}
          }
        }
      },
      noData:{
        get(){
          return this.pageData.length === 0 && !this.is0
        }
      },
      infiniteDisabled:{
        get(){
          return this.listLoading || this.noData 
        }
      }
    },
    methods: {
      loadData() {
        let _this = this
        _this.listLoading = true
        _this.$emit('load', this.filterText)
      },
      _clear(){
         this.currentValue=''
         this.$emit("input", '');
         this.$emit("clear");
      },
      _reload(event,keyWord){
        let _this = this
        _this.listLoading = true
        _this.is0 = true
        _this.listData = []
        _this.$emit('reload',keyWord || this.filterText)
      },
      _filterText(val){
       if (searchTimer) clearTimeout(searchTimer)
        searchTimer = setTimeout(() => {
          this._reload(null,val)
        }, 500)
      },
      _nodeClick(node){
        this.selectNode = node;
        this.$emit("input", this.selectNode.id);
        this.$emit("getCurrentNode", this.selectNode);
        this.selectPanelVisible = false;
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
      pageData:function(n,o){
        this.listLoading = false
        this.is0 = false
        this.listData.push(...n)
      }
    },
    mounted(){
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
      background:$background-color-base;
    }
    & > p {
      margin: 0px;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
    }
    & > .label {
       font-size:14px;
      color:$color-text-regular;
    }
    & > .sub-label {
      font-size:12px;
      color:$color-info;
    }
  }
  .infinite-list-tip{
    font-size:12px;
    text-align: center;
    color:$color-text-regular;
  }
</style>