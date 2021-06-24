<template>
    <div id="home">
        <nav-bar class="home-nav">
            <template v-slot:center>首页</template>
        </nav-bar>
        <tab-control :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tabControl1" class="tab-control" v-show="isTabFixed"></tab-control>
        <scroll class="content" ref="scroll" :probe-type="3" @scroll='contentScroll' :pull-up-load="true" @pullingUp="loadMore">
            <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
            <recommend-view :recommends="recommends"></recommend-view>
            <feature-view></feature-view>
            <tab-control :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tabControl2"></tab-control>
            <goods-list :goods="showGoods"></goods-list>
        </scroll>
        <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>      
    </div>  
</template>

<script>
import  NavBar  from "components/common/navbar/NavBar.vue";
import TabControl from "components/content/TabControl.vue";
import GoodsList from "components/content/goods/GoodsList.vue";
import Scroll from "components/common/scroll/Scroll.vue";
import BackTop from "components/content/BackTop.vue";

import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";


import { getHomeMultidata, getHomeGoods } from "network/home.js";
import { debounce } from "common/debounce.js";

export default {
    name: "Home",
    components: {
        NavBar,
        TabControl,
        GoodsList,
        Scroll,
        BackTop,
        HomeSwiper,
        RecommendView,
        FeatureView,
    },
    data() {
        return {
            banners: [],
            recommends: [],
            goods: {
                'pop': {page: 0, list: []},
                'new': {page: 0, list: []},
                'sell': {page: 0, list: []}
            },
            currentType: 'pop',
            isShowBackTop: false,
            tabOffsetTop: 0,
            isTabFixed: false,
            saveY: 0
        }
    },
    computed: {
        showGoods: function() {
            return this.goods[this.currentType].list
        }
    },
    activated() {
        this.$refs.scroll.scrollTo(0, this.saveY, 0)
        this.$refs.scroll.refresh()
    },
    deactivated() {
        this.saveY = this.$refs.scroll.getScrollY()
    },
    created() {
        // 请求banners,recommends数据
        this.getHomeMultidata(),
        //请求商品数据
        this.getHomeGoods('pop'),
        this.getHomeGoods('new'),
        this.getHomeGoods('sell')
        
    },
    mounted() {
        const refresh = debounce(this.$refs.scroll.refresh, 200)
        //监听item中image加载完成
        this.$bus.$on('itemImageLoad', () => {
            refresh()
        })
        
    },
    methods: {
        //
        //事件监听相关方法
        //
        //防抖函数
        // debounce(func, delay) {
        //     let timer = null
        //     return function (...args) {
        //         if(timer) clearTimeout(timer)
        //         timer = setTimeout(() => {
        //             func.apply(this, args)
        //         }, delay)
        //     }
        // },
        tabClick(index) {
            // console.log(index);
            switch(index) {
                case 0:
                    this.currentType = 'pop'
                    break
                case 1:
                    this.currentType = 'new'
                    break
                case 2:
                    this.currentType = 'sell'
                    break
            }
            this.$refs.tabControl1.currentIndex = index
            this.$refs.tabControl2.currentIndex = index
        },
        backClick() {
            this.$refs.scroll.scrollTo(0,0, 500)
        },
        contentScroll(position) {
            // console.log(position);
            //判断backTop是否显示
            this.isShowBackTop = -position.y > 1000
            //判断tabControl是否吸顶(position:fixed)
            this.isTabFixed = (-position.y) > this.tabOffsetTop
        },
        loadMore() {
            this.getHomeGoods(this.currentType)
        },
        swiperImageLoad() {
            //获取tabControl的offsetTop
        //所有组件都有一个属性$el:用于获取组件中的元素
            this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
        },
        //
        //
        //网络请求相关方法
        getHomeMultidata() {
            getHomeMultidata().then(res => {
                // console.log(res);
                this.banners = res.data.banner.list;
                this.recommends = res.data.recommend.list
        })
        },
        getHomeGoods(type) {
            const page = this.goods[type].page +1
            getHomeGoods(type, page).then(res => {
            // console.log(res);
            this.goods[type].list.push(...res.data.list)
            this.goods[type].page += 1

            this.$refs.scroll.finishPullUp()
        })
        }
    }
}
</script>

<style scoped>
    #home {
        /* padding-top: 44px; */
        height: 100vh;
        position: relative;
    }
    .home-nav {
        background-color: var(--color-tint);
        color: #fff;
        /* position: fixed;
        left: 0;
        right: 0;
        top: 0;
        z-index: 9; */
    }
    
    .content {
        overflow: hidden;

        position: absolute;
        top: 44px;
        bottom: 49px;
        left: 0;
        right: 0;
    }
    .tab-control {
        /* 相对定位还会保持原来的位置，并且z-index只对定位的元素有效 */
        position: relative;
        z-index: 9;
    }
</style>