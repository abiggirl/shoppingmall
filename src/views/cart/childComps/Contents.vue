<template>
    <div class="contents">
      <div class="each_good">

        <!-- <div class="points">
          <div class="point" >
            <img src="~assets/img/cart/no.png" alt="" >
            <img src="~assets/img/cart/yes.png" alt="">
          </div>
        </div> -->
        <div class="check-img">
          <check-button :is-checked="product.checked" @click.native="checkClick"></check-button>
        </div>
        <div class="img">
          <img :src="product.image" alt="" >
        </div>

        <div class="other_content">

          <div class="title">{{product.title}}</div>
          <div class="desc">{{product.desc}}</div>
          <div class="price_count">
            <div class="price">￥{{product.price}}</div>
            <div class="count">x{{product.count}}</div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import CheckButton from "components/content/CheckButton.vue";

  export default {
    name: "Contents",
    data(){
      return{
      }
    },
    props: {
      product: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    components: {
      CheckButton,
    },
    methods: {
      //托管给Vuex监听购物车勾选点击事件
      // pointClick(index){
      //   this.$store.commit('changeYESorNo', index)
      // },
      //判断勾选框的状态
      // JudgePoint(index){
      //   for(let i of this.$store.state.YESorNo){
      //     if(i.index === index){return i.isShow}
      //   }
      // },
      //购物车页面加入商品，监听页面刷新
    //   goodsLoad(){
    //     //页面发生刷新后向父元素发送事件告知页面刷新，刷新better-scroll滚动距离
    //     this.$emit('webupdate')
    // //     //每次加入商品，就初始化好它的勾选框状态
    // //     this.$store.commit('resetYESorNo')
    //   },
    // },
    // updated() {
    //   //监听购物车全选框的实时状态
    //   this.$store.commit('allpointsisshow')
    // },
      //监听勾选框
      checkClick() {
        this.product.checked = !this.product.checked
      }
    }
  }
</script>

<style scoped>
  .contents{
    width: 100%;
  }
  .each_good{
    display: flex;
    height: 130px;
    padding-bottom: 5px;
    padding-top: 5px;
    border-bottom: 3px solid #eee;
  }
  /* .points{
    flex: 1;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .point{
    width: 80%;
  }
  .point img{
    width: 100%;
  } */
  .check-img {
    width: 28px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .img{
    flex: 2;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .other_content{
    flex: 5;
  }
  .img img{
    width: 100%;
    height: 100%;
    border-radius: 10px;
  }
  .other_content{
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    position: relative;
  }
  .title, .desc{
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .title{
    padding: 12px 8px;
    color: #000;
  }
  .desc{
    font-size: 14px;
    padding: 5px 8px;
  }
  .price_count{
    width: 100%;
    height: 30px;
    position: absolute;
    bottom: 0;
  }
  .price{
    float: left;
    margin-left: 5px;
    color: red;
    font-size: 18px;
  }
  .count{
    float: right;
    margin-right: 5px;
  }
</style>
