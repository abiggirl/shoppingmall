<template>
    <swiper>
        <swiper-item v-for="item in banners" v-bind:key="item.index">
            <a :href="item.link">
                <img :src="item.image" alt="">
            </a>
        </swiper-item>
    </swiper>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper";


export default {
    name: "HomeSwiper",
    props: {
        banners: {
            type: Array,
            default() {
                return []
            }
        }
    },
    components: {
        Swiper,
        SwiperItem
    }
}
</script>

<style scoped>


 a img {
    width: 100%;
    height: 100%;
    margin: 0;
    /* height: 120px; */
  }
</style>