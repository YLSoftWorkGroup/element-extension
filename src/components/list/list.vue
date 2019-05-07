
<template>
  <yl-flexbox class="yl-list" vertical  isReverse>
    <div slot="flex" v-loading="listloading" element-loading-text="加载中...">
     <div class="list-warpper" :class="wrapClass">
        <div v-for="(item,index) in pageData" :key="index"
          :class="itemWrapClass"
          class="item-warpper">
          <slot :item="item" />
        </div>
      </div>
      <div v-if="!listData.rows" class="nodata">暂无数据</div>
    </div>
    <div slot="fixed">
      <yl-toolbar>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="input.draw"
          :page-sizes="paginationAttr.pageSizes"
          :page-size="paginationAttr.pageSize"
          :total="listData.count"
          :layout="paginationAttr.layout"
          :background="paginationAttr.background"
          :small="paginationAttr.small"
        ></el-pagination>
      </yl-toolbar>
    </div>
  </yl-flexbox>
</template>

<script type="text/babel">
export default {
  name:'ylList',
  data() {
    return {
    };
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
      default: function() {
        return {};
      }
    },
    input: {
      type: Object,
      required: true,
      default: function() {
        return {};
      }
    },
    pagination: {
      type: Object,
      default: function() {
        return {
          small: false,
          background: true,
          pageSize: 10,
          pageSizes: [10, 20, 50],
          // prevText:'上一页',
          // nextText:'下一页',
          layout: "sizes,prev, pager, next,  total" // prev, pager, next, jumper, ->, total, slot
        };
      }
    }
  },
  computed: {
    paginationAttr: {
      get() {
        return this.pagination;
      }
    }
  },
  methods: {
    handleSizeChange(val) {
      this.input.limit = val;
      this.input.offset = val * (this.input.draw - 1);
      this.$emit("reload");
    },
    handleCurrentChange(val) {
      this.input.draw = val;
      this.input.offset = this.input.limit * (val - 1);
      this.$emit("reload");
    }
  },
  created() {
    this.input.limit = this.paginationAttr.pageSize;
  },
  mounted() {},
  watch: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="postcss"  scoped>
.list-warpper {
  overflow: auto;
  width: 100%;
  height: 100%;
}
.nodata {
  height: 100px;
  text-align: center;
  font-size: 14px;
  padding-top: 80px;
}
</style>