<template>
<div class="yl-toolbar" v-if="isShow"> 
    <slot>
    </slot>
</div>
</template>

<script type="text/babel">
export default {
    name: 'ylToolbar',
    data(){
      return {
        isShow:true,
      }
    },
    mounted(){
    },
    watch:{
        
    }
    
}
</script>

<style lang="postcss"  scoped>
.yl-toolbar{
  padding:4px;
  padding-left: 10px;
  box-sizing:border-box;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgb(221, 230, 238);
  & >*{
    margin: 0px 5px;
  }
}
    
</style>
