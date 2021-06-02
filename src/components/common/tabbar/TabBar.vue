<template>
   <div id="tab-bar">
       <slot></slot>
    </div>
</template>

<script>
// import TabBarItem from "./TabBarItem";

export default {
    name: "TabBar",
    components: {
        // TabBarItem
    }
}
</script>

<style scoped>
  #tab-bar {
    display: flex;
    background-color: #f6f6f6;
    height: 49px;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    box-shadow: 0 -2px rgba(0, 0, 0, .05);
  }
  
</style>
