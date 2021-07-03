<template>
    <div id="detail">
        <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="detailNav"></detail-nav-bar>
        <scroll class="content" ref="scroll" @scroll="contentScroll" :probe-type="3">
            <!-- 标签不区分大小写，传入值要用短划线 -->
            <detail-swiper :top-images="topImages"></detail-swiper>
            <detail-base-info :goods="goods"></detail-base-info>
            <detail-shop-info :shop="shop"></detail-shop-info>
            <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
            <detail-param-info :param-info="paramInfo" ref="param"></detail-param-info>
            <comments :comment-info='commentInfo' ref="comments"></comments>
            <goods-list :goods='recommends' ref="recommends"></goods-list>
        </scroll>
        <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
        <back-top  @click.native="BackTopClick" v-show="backUp_isShow"></back-top>
        <toast v-show="isShow" :message="message"/>
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
import DetailBottomBar from "./childComps/DetailBottomBar.vue";
import Toast from "./childComps/Toast.vue"

import Scroll from 'components/common/scroll/Scroll.vue'
import GoodsList from 'components/content/goods/GoodsList.vue'
import BackTop from "components/content/BackTop.vue";

import {getDetail, Goods, Shop, GoodsParam, getRecommend} from 'network/detail.js'
import {debounce} from 'common/debounce.js'
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
        DetailBottomBar,
        Toast,
        Scroll,
        GoodsList,
        BackTop
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
            recommends:[],
            themeTopYs:[],
            getThemeTopY: null,
            currentIndex: 0,
            backUp_isShow: false,
            isShow: false,
            message: ''
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

            // //获取参数等组件的位置
            // this.$nextTick(()=> {   //等到组件渲染完毕执行，DOM已经渲染完成，但是图片没有
            //     this.themeTopYs.push(0)
            //     this.themeTopYs.push(this.$refs.param.$el.offsetTop)
            //     this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
            //     this.themeTopYs.push(this.$refs.recommends.$el.offsetTop)
            //     console.log(this.themeTopYs);
            // })
        })
        //请求推荐数据
        getRecommend().then(res => {
            this.recommends = res.data.list
        })

        this.getThemeTopY = debounce( () => {
            this.themeTopYs = []
            this.themeTopYs.push(0)
            this.themeTopYs.push(this.$refs.param.$el.offsetTop)
            // console.log(this.$refs.param.$el);
            this.themeTopYs.push(this.$refs.comments.$el.nextElementSibling.offsetTop)
            // console.log(this.$refs.comments.$el.nextElementSibling);
            this.themeTopYs.push(this.$refs.recommends.$el.offsetTop)
            // console.log(this.themeTopYs);
        }, 100)
    },
    mounted() {
        
    },
    methods: {
        imageLoad() {
            this.$refs.scroll.refresh()
            this.getThemeTopY()
        },
        //tabbar点击
        titleClick(index) {
            this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200)
        },
        contentScroll(position) {
            const positionY = -position.y 
            //for(let i in this.themeTopYs)   i为字符串形式
            //根据滚动显示tabbar高亮内容
            let length = this.themeTopYs.length
            for(let i = 0; i < length; i++) {
                if(this.currentIndex !== i && ((i < length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1]) || (i === length - 1 && positionY >= this.themeTopYs[i]))) {
                    this.currentIndex = i
                    this.$refs.detailNav.currentIndex = this.currentIndex
                }
            }
            //判断返回顶部按钮的隐藏和出现
            this.backUp_isShow = (-position.y) > 1000
   
        },
         //点击返回顶部
        BackTopClick(){
            this.$refs.scroll.scroll.scrollTo(0,0,500)
        },
        //加入购物车
        addToCart() {
            //获取商品展示信息
            const product = {}
            product.image = this.topImages[0]
            product.title = this.goods.title
            product.desc = this.goods.desc
            product.price = this.goods.realPrice
            product.iid = this.iid
            product.count = 1
            //将商品添加到购物车
            this.$store.dispatch('addCart', product).then(res => {
                //显示加入购物车成功弹窗
                this.isShow = true
                this.message = res
                setTimeout(() => this.isShow = false, 2000)
            })
            // console.log(this.$store.state.cartList);
            
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
        height: calc(100% - 93px);
    }
</style>