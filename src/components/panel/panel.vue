<!--
 * @Description: 未描述
 * @Author: danielmlc
 * @Date: 2020-02-16 23:59:04
 * @LastEditTime: 2020-03-02 21:34:00
 -->

<template>
  <div class="yl-panel" :style="{'width':width}">
    <div v-if="showHeader" class="header">
      <div class="header-content">
        <div v-if="title" class="title">
          <i v-if="icon" :class="icon" />
          {{ title }}
        </div>
        <div class="tool">
          <slot name="tool" />
        </div>
      </div>
    </div>
    <div class="content">
      <slot />
    </div>
  </div>
</template>
<script>
  export default {
    name: 'YlPanel',
    props: {
      icon: {
        type: String,
        default: ''
      },
      title: {
        type: String,
        default: ''
      },
      width: {
        type: String,
        default: '100%'
      },
      showHeader: {
        type: Boolean,
        default: true
      }
    },
    mounted () {},
    methods: {
    }
  }
</script>
