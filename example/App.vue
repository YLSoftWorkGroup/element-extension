<template>
  <div id="app">
      <router-view />
  </div>
</template>
<script type="text/babel">
  export default {
  }
</script>
<style scoped>
#app{
  height: 100%;
}
.bounce-enter-active {
  animation: bounce-in 1s;
}
.bounce-leave-active {
  animation: bounce-out 1s;
}
</style>
