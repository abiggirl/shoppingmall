<template>
    <div class="classifi_box">
        <nav-bar>
            <template v-slot:center >
                <div class="nav-bar"> 商品分类 </div> 
            </template>
        </nav-bar>
    </div>
</template>

<script>

 import NavBar from "components/common/navbar/NavBar.vue";

export default {
    name: "Category",
    components: {
        NavBar
    }
}
</script>

<style scoped>
  .nav-bar{
    background: var(--color-tint);
    color: #fff;
  }
</style>