
<template>
  <yl-flex-box class="yl-listN" vertical  isReverse>
    <div slot="flex"
      v-loading="listloading"
      element-loading-text="加载中...">
      <div v-if="pageData.length" class="yl-list-warpper" :class="wrapClass">
        <div v-for="(item,index) in pageData" :key="index"
          :class="itemWrapClass"
          class="item-warpper">
          <slot :item="item" />
        </div>
      </div>
      <div v-else class="yl-list-nodata">暂无数据</div>
    </div>
    <div slot="fixed">
      <div style="text-align:right; background:#fff;padding:2px 10px;display:flex;justify-content:flex-end;">
        <el-pagination
          :current-page="input.draw"
          :page-size="paginationAttr.pageSize"
          :layout="paginationAttr.layout"
          :background="paginationAttr.background"
          :small="paginationAttr.small"
          :prev-text="paginationAttr.prevText"
          :next-text="paginationAttr.nextText"
          @prev-click="prevClick"
          @next-click="nextClick"
        />
        <div style="color: #606266;font-size: 13px;line-height:32px;">
          第{{ input.draw }}页
        </div>
      </div>
    </div>
  </yl-flex-box>
</template>

<script type="text/babel">
  export default {
    name: 'YlListNext',
    data () {
      return {
        pageData: [],
        nextBtnState: false
      }
    },
    props: {
      wrapClass: {
        type: String,
        default: ''
      },
      itemWrapClass: {
        type: String,
        default: ''
      },
      listloading: {
        type: Boolean,
        default: false
      },
      listData: {
        type: Array,
        default: function () {
          return []
        }
      },
      input: {
        type: Object,
        required: true,
        default: function () {
          return {}
        }
      },
      pagination: {
        type: Object,
        default: function () {
          return {
            small: false,
            background: true,
            pageSize: 11,
            prevText: '上一页',
            nextText: '下一页',
            layout: 'prev,next,slot' // prev, pager, next, jumper, ->, total, slot
          }
        }
      }
    },
    computed: {
      paginationAttr: {
        get () {
          return this.pagination
        }
      }
    },
    methods: {
      prevClick (val) {
        this.$el.getElementsByClassName('btn-prev')[0].disabled = true
        this.input.draw = val
        this.input.offset = (this.input.limit - 1) * (val - 1)
        this.$emit('reload')
      },
      nextClick (val) {
        this.$el.getElementsByClassName('btn-next')[0].disabled = true
        this.input.draw = val
        this.input.offset = (this.input.limit - 1) * (val - 1)
        this.$emit('reload')
      }
    },
    created () {
      this.input.limit = this.paginationAttr.pageSize
    },
    mounted () {
    },
    watch: {
      listData: function (n, o) {
        if (n.length === this.input.limit) {
          this.pageData = n.slice(0, n.length - 1)
          this.$el.getElementsByClassName('btn-next')[0].disabled = false
        } else {
          // 处理下一页
          this.pageData = this.listData
          this.$el.getElementsByClassName('btn-next')[0].disabled = true
        }
        if (this.input.draw === 1) {
          this.$el.getElementsByClassName('btn-prev')[0].disabled = true
        } else {
          this.$el.getElementsByClassName('btn-prev')[0].disabled = false
        }
      }
    }
  }
</script>
