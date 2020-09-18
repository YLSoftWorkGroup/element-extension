<template>
  <div>
    我是一个新页面===============================

    <yl-page-header separator="/"  >
      <yl-page-header-item link="http://www.baidu.com">收料管理</yl-page-header-item>
      <yl-page-header-item to="/base">点收单</yl-page-header-item>
      <yl-page-header-item>编辑</yl-page-header-item>
     <template v-slot:tool>
        <el-button size="mini"  type="text" @click="_back">
          返回
        </el-button>
     </template>
  </yl-page-header>
  </div>
</template>
<script type="text/babel">  
  export default {
    data () {
      return {
      }
    },
    methods:{
      _back(){
        console.log('返回')
      }
    },
    mounted(){
    }
  }
</script>   
<style scoped>
</style>