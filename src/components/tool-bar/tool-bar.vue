<!--
 * @Description: 未描述
 * @Author: danielmlc
 * @Date: 2020-02-16 23:59:04
 * @LastEditTime: 2020-02-27 14:43:13
 -->
<template>
  <div class="yl-tool-bar g-border-b-solid">
    <div class="more">
      <div v-if="more" class="more-lable" @click="_display">
        <i class="el-icon-filesearch" /> {{ display }}
      </div>
      <div v-if="display == '隐藏'" class="more-content">
        <slot name="more" />
      </div>
    </div>
    <!-- <div v-if="display == '隐藏'" class="divider" /> -->
    <div class="filter">
      <slot name="filter" />
    </div>
    <div v-if="divider" class="divider" />
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
  padding: $layout-gap-b $layout-gap-l;
  background: $background-color-l;
  font-size: $font-size-13;
  color: $text-primary;
  height:auto;
  display: flex;
  flex-direction: column;
  & >>> .el-form-item {
    margin-bottom: $layout-gap-b;
  }
  & > .filter {
    height:auto;
    /* padding: $layout-gap-b 0px; */
  }
  & > .divider {
    border-bottom: 1px solid $border-color-l;
    margin:  $layout-gap-b 0px;
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
