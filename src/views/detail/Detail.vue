<template>
    <div id="detail">
        <detail-nav-bar class="detail-nav"></detail-nav-bar>
        <scroll class="content" ref="scroll">
            <detail-swiper :top-images="topImages"></detail-swiper>
            <detail-base-info :goods="goods"></detail-base-info>
            <detail-shop-info :shop="shop"></detail-shop-info>
            <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
            <detail-param-info :param-info="paramInfo"></detail-param-info>
            <comments :comment-info='commentInfo'></comments>
            <goods-list :goods='recommends'></goods-list>
        </scroll>
    </div>  
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar.vue'
import DetailSwiper from "./childComps/DetailSwiper.vue";
import DetailBaseInfo from './childComps/DetailBaseInfo.vue'
import DetailShopInfo from './childComps/DetailShopInfo.vue'
import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue'
import DetailParamInfo from './childComps/DetailParamInfo.vue'
import Comments from "./childComps/Comments.vue";

import Scroll from 'components/common/scroll/Scroll.vue'
import GoodsList from 'components/content/goods/GoodsList.vue'

import {getDetail, Goods, Shop, GoodsParam, getRecommend} from 'network/detail.js'
export default {
    name: 'Detail',
    components: {
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        DetailGoodsInfo,
        DetailParamInfo,
        Comments,
        Scroll,
        GoodsList
    },
    data() {
        return {
            iid: null,
            topImages: [],
            goods: {},
            shop: {},
            detailInfo: {},
            paramInfo: {},
            commentInfo: {},
            recommends:[]
        }
    },    
    created() {
        this.iid = this.$route.params.iid
        //根据iid请求数据
        getDetail(this.iid).then(res => {
            const data = res.result
            //获取顶部图片轮播数据
            this.topImages = data.itemInfo.topImages
            //获取商品信息
            this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
            //获取店铺信息
            this.shop = new Shop(data.shopInfo)
            //商品详情数据
            this.detailInfo = data.detailInfo
            //参数信息
            this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
            //评论信息
            if(data.rate.cRate !== 0) {
                this.commentInfo = data.rate.list[0]
            }
        })
        //请求推荐数据
        getRecommend().then(res => {
            this.recommends = res.data.list
        })
    },
    methods: {
        imageLoad() {
            this.$refs.scroll.refresh()
        }
    }
}
</script>

<style scoped>
    #detail {
        position: relative;
        z-index: 9;
        background-color: #fff;
        height: 100vh;
    }
    .detail-nav {
        position: relative;
        z-index: 9;
        background-color: #fff;
    }
    .content {
        height: calc(100% - 44px);
    }
</style>