<template>
  <div class="yl-page-header">
    <div class="title" v-if="title">
      <i v-if="icon" :class="icon"></i>
      {{title}}
    </div>
    <slot class="tool"  name="tool">
    </slot>  
  </div>
</template>

<script type="text/babel">

export default {
  name: "ylPageheader",
  data() {
    return {};
  },
  props: {
    title: {
      type: String,
      default: ""
    },
    icon: {
      type: String,
      default: ""
    }
  },
  mounted() {},
  watch: {}
};
</script>

<style lang="postcss"  scoped>
@import  '../../styl/var.pcss';
.yl-page-header {
  padding: 4px 10px;
  height: 36px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  background: #fff;
  border-bottom: 1px solid rgb(221, 230, 238);
  color:$color-text-primary;
  & > .title {
    font-size: 14px;
    font-weight: 600;
    flex:1;
  }
  & > .tool {
    min-width: 60px;
  }
}
</style>