<!--
 * @Description: 未描述
 * @Author: danielmlc
 * @Date: 2020-02-16 23:59:04
 * @LastEditTime: 2020-03-02 21:31:57
 -->
<template>
  <div class="yl-page-header">
    <div class="title">
      <slot />
    </div>
    <div class="tool">
      <slot name="tool" />
    </div>
  </div>
</template>

<script type="text/babel">
  export default {
    name: 'YlPageHeader',
    props: {
      separator: {
        type: String,
        default: '/'
      }
    },
    data () {
      return {}
    },
    mounted () {}
  }
</script>

