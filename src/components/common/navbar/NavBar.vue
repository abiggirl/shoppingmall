<template>
  <div class="nav-bar">
      <div class="left"><slot name="left"></slot></div>
      <div class="center"><slot name="center"></slot></div>
      <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
export default {
    name: "NavBar"
}
</script>

<style scoped>
    .nav-bar {
        display: flex;
        height: 44px;
        line-height: 44px;
        text-align: center;
        /* background-color: rgb(190, 47, 47); */
    }
    .left, .right {
        width: 60px;
        /* background-color: rgb(75, 182, 146); */
    }
    .center {
        flex: 1;
    }
</style>