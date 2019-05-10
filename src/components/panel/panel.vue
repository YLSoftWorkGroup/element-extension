<template>
  <div class="yl-panel" :style="{'width':width}">
    <div class="header" v-if="showHeader">
      <div class="title" v-if="title">
        <i v-if="icon" :class="icon"></i>
        {{title}}
      </div>
      <slot class="tool"  name="tool">
      </slot> 
    </div>
    <div class="content">
        <slot></slot>
    </div>
  </div>
</template>
<script>
  export default {
    name: "ylPanel",
    props: {
      icon: {
        type: String,
        default: ""
      },
      title: {
        type: String,
        default: ""
      },
      width: {
        type: String,
        default: "100%"
      },
      showHeader:{
        type:Boolean,
        default:true
      }
    },
    methods: {
    },
    mounted(){}
  }
</script>
<style lang="postcss">
@import  '../../styl/var.pcss';
.yl-panel {
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  background: #fff;
  border: 1px solid rgb(221, 230, 238);
  & > .header {
    height: 32px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid rgb(221, 230, 238);
    padding: 0px 5px;
    color:$color-text-regular;
    & > .title {
      font-size: 14px;
      flex: 1;
    }
    .tool > i {
      min-width: 60px;
    }
  }
  &> .content{
      flex:1;
      overflow: auto;
  }
  
}
</style>


