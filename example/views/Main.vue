<template>
  <div class="main">
    <div class="header">
      <div class="title">yl-component 组件库文档</div>
    </div>
    <div class="content">
      <el-menu :default-active="defaultActive" router class="menu">
        <template v-for="(item, index) in menuData">
          <el-submenu :index="item.url" v-if="item.children" :key="index">
            <template slot="title">
              <i :class="item.icon" />
              <span>{{item.menuName}}</span>
            </template>
            <el-menu-item :index="iitem.url" v-for="(iitem, iindex) in item.children" :key="iindex">
              <i :class="iitem.icon" />
              <span slot="title">{{ iitem.menuName }}</span>
            </el-menu-item>
          </el-submenu>
          <el-menu-item v-else :index="item.url" :key="index">
            <i :class="item.icon" />
            <span slot="title">{{item.menuName}}</span>
          </el-menu-item>
        </template>
      </el-menu>
      <div class="page">
        <transition name="fade">
          <router-view />
        </transition>
      </div>
    </div>
  </div>
</template>
<script>
  import menuList from './data/menuData.json'
  export default {
    data () {
      return {
        defaultActive: '/base'
      }
    },
    computed: {
      menuData: {
        get () {
          return menuList
        }
      }
    },
    methods: {
    },
    mounted () {
      if (this.$route.path) {
        this.defaultActive = this.$route.path
      } else {
        this.defaultActive = menuList[0].url
      }
    }
  }
</script>

<style lang="postcss" scoped>
  .main {
    height: 100%;
    width: 100%;
    & > .header {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      height: 55px;
      background: #e6a23c;
      & > .title {
        height: 100%;
        line-height: 55px;
        color: #fff;
        font-size: 18px;
        font-weight: 600;
        padding-left: 20px;
      }
    }
    & .menu {
      position: absolute;
      left: 0;
      top: 55px;
      bottom: 0px;
      width: 180px;
      overflow: auto;
    }
    & .page {
      position: absolute;
      right: 0;
      left: 180px;
      top: 55px;
      bottom: 0px;
      overflow: auto;
      padding: 20px 30px;
      box-sizing: border-box;
    }
  }
</style>
