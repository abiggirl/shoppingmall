<template>
    <div class="cart">
        <nav-bar>
            <template v-slot:center >
                <div class="nav-bar"> 购物车({{$store.state.cartList.length}}) </div> 
            </template>
        </nav-bar>
         <scroll class="scroll" ref="scroll">
            <contents  v-for="(item, index) in $store.state.cartList" :key="index" :product="item"></contents>
        </scroll>
        <cart-buttom-bar class="cart-buttom-bar"></cart-buttom-bar>

    </div>    
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue'
import Scroll from "components/common/scroll/Scroll.vue";

import Contents from "./childComps/Contents.vue";
import CartButtomBar from './childComps/CartButtomBar.vue'

// import { mapGetters } from "vuex";

export default {
    name: "Cart",
    components: {
        NavBar,
        Scroll,
        Contents,
        CartButtomBar

    },
    computed: {
        // ...mapGetters([
        //     'cartCount'
        // ])
    },
    methods: {
      //监听购物车页面刷新，来刷新滚动距离
    //   webupdate(){
    //     this.$refs.scroll.refresh()
    //   }
    },
    activated() {
        this.$refs.scroll.refresh()
        // console.log(111111);
    }

}
</script>

<style scoped>
    
    .cart {
        height: 100vh;
    }
    .nav-bar {
        background-color: var(--color-tint);
        color: #fff;
        z-index: 99;
        position: relative;
        top: 0;
        right: 0;
        left: 0;

    }
     .scroll{
    width: 100%;
    position: absolute;
    top: 44px;
    right: 0;
    left: 0;
    bottom: 89px;
    overflow: hidden;
    }
    .cart-buttom-bar {
        background-color: #eeee;
        height: 40px;
        position: absolute;
        right: 0;
        left: 0;
        bottom: 50px;
        z-index: 9;
    }
</style>