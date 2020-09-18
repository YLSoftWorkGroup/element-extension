<!--
 * @Description: 未描述
 * @Author: danielmlc
 * @Date: 2020-02-16 23:59:04
 * @LastEditTime: 2020-03-02 21:36:23
 -->
<template>
  <div class="yl-tool-bar">
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
