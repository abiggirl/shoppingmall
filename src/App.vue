<template>
  <div id="app">
    <router-view></router-view>
    <main-tab-bar></main-tab-bar>
  </div>
</template>

<script>
  import MainTabBar from "components/content/MainTabBar.vue";
  // import router from "./router/index.js"
  export default {
    name: 'App',
    // router,
    components: {
      MainTabBar
    }
  }
</script>

<style>
  @import url(./assets/css/base.css);
</style>
