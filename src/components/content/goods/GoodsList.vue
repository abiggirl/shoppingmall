<template>
    <div class="goods">
        <goods-list-item v-for="item in goods" :key="item.index" :goods-item="item"></goods-list-item>
    </div>
</template>

<script>
import GoodsListItem from "./GoodsListItem";

export default {
    name: "GoodsList",
    components: {
        GoodsListItem
    },
    props: {
        goods: {
            type: Array,
            dedault() {
              return []
            }
        }
    }
}
</script>

<style scoped>
    .goods {
        display: flex;
        /* 根据宽度显示一行显示几个 */
        flex-wrap: wrap;
        /* 一行均分显示 */
        justify-content: space-around;
        padding: 2px;
    }
</style>