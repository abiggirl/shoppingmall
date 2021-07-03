<template>
    <nav-bar>
        <template v-slot:left class="back">
            <div @click="backClick">
                <img src="~assets/img/common/back.svg" alt="">
            </div>
        </template>
        <template v-slot:center >
            <div class="center">
                <div v-for="(item, index) in titles"  :key="item.index" class="title-item" :class="{active: index === currentIndex}" @click="titleClick(index)">
                    {{item}}
                </div>
            </div> 
        </template>
    </nav-bar>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'

  export default {
    name: "DetailNavBar",
    components: {
      NavBar
    },
    data() {
      return {
        titles: ['商品', '参数', '评论', '推荐'],
        currentIndex: 0
      }
    },
    methods: {
      titleClick(index) {
        this.currentIndex = index
        this.$emit('titleClick', index)
      },
      backClick() {
        //   console.log(this.$router);
        this.$router.go(-1)
      }
    }
  }
</script>

<style scoped>
  .center {
    display: flex ;
  }

  .title-item {
    flex: 1;
    font-size: 13px;
  }
  .active {
    color: var(--color-high-text)
  }

  .back img {
    margin-top: 12px;
  }
</style>
