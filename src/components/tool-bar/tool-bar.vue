<!--
 * @Description: 未描述
 * @Author: danielmlc
 * @Date: 2020-02-16 23:59:04
 * @LastEditTime: 2020-02-19 14:29:38
 -->
<template>
  <div class="yl-tool-bar g-border-b-solid">
    <div class="more">
      <div v-if="more" class="more-lable" @click="_display">
        <i class="el-icon-filesearch" /> {{ display }}
      </div>
      <div class="more-content">
        <slot v-if="display == '隐藏'" name="more" />
      </div>
    </div>
    <div class="filter">
      <slot name="filter" />
    </div>
    <el-divider v-if="divider" />
    <div class="tool">
      <slot />
    </div>
  </div>
</template>

<script type="text/babel">
  export default {
    name: 'YlToolBar',
    props: {
      divider: {
        type: Boolean,
        default: false
      },
      more: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        display: '展开'
      }
    },
    mounted () {
    },
    methods: {
      _initComs () {
      },
      _display () {
        if (this.display === '展开') {
          this.display = '隐藏'
        } else {
          this.display = '展开'
        }
      }
    }
  }
</script>
<style lang="postcss"  scoped>
@import  '../../styl/var.pcss';
.yl-tool-bar {
  box-sizing:border-box;
  padding: $layout-gap-l $layout-gap-l;
  background: $background-color-l;
  font-size: $font-size-14;
  color: $text-primary;
  height:auto;
  display: flex;
  flex-direction: column;
  & >>> .el-form-item {
    margin-bottom: $layout-gap-l;
  }
  & > .filter {
    height:auto;
  }
  & > .more {
    height: auto;
    & > .more-lable {
      font-size: $font-size-12;
      color: $primary;
      text-align: right;
      padding-bottom: $layout-gap-b;
      cursor: pointer;
    }
  }
  & > .tool {
    display:flex;
  }
}

</style>
