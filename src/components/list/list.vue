
<template>
  <yl-flex-box class="yl-list" vertical is-reverse>
    <div slot="flex" v-loading="listloading" element-loading-text="加载中...">
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
      <div style="text-align:right; background:#fff;padding:2px;">
        <el-pagination
          :current-page="input.draw"
          :page-sizes="paginationAttr.pageSizes"
          :page-size="paginationAttr.pageSize"
          :total="listData.count"
          :layout="paginationAttr.layout"
          :background="paginationAttr.background"
          :small="paginationAttr.small"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange" />
      </div>
    </div>
  </yl-flex-box>
</template>

<script type="text/babel">
  export default {
    name: 'YlList',
    data () {
      return {
        pageData: []
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
        type: Object,
        default: function () {
          return {}
        }
      },
      input: {
        type: Object,
        required: true,
        default: function () {
          return {};
        }
      },
      pagination: {
        type: Object,
        default: function () {
          return {
            small: false,
            background: true,
            pageSize: 10,
            pageSizes: [10, 20, 50],
            layout: "sizes, prev, pager, next,  total" // prev, pager, next, jumper, ->, total, slot
          };
        }
      }
    },
    computed: {
      paginationAttr: {
        get () {
          return this.pagination;
        }
      }
    },
    methods: {
      handleSizeChange (val) {
        this.input.limit = val;
        this.input.offset = val * (this.input.draw - 1);
        this.$emit("reload");
      },
      handleCurrentChange (val) {
        this.input.draw = val;
        this.input.offset = this.input.limit * (val - 1);
        this.$emit("reload");
      }
    },
    created () {
      this.input.limit = this.paginationAttr.pageSize;
    },
    watch: {
      listData: function (n, o) {
        let data = n.rows
        if (data.length === this.input.limit) {
          this.pageData = data.slice(0, data.length - 1)
        } else {
          // 处理下一页
          this.pageData = data
        }
      }
    }
  }
</script>
