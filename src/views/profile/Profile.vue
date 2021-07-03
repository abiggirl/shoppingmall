<template>
    <div class="personal_box">
      <nav-bar>
          <template v-slot:center >
              <div class="nav-bar"> 个人中心</div> 
          </template>
      </nav-bar>
      <profile-item/>
      <profile-money/>
      <space/>
      <public-lists/>
    </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";
import NavBar from "components/common/navbar/NavBar";
import Space from "./childComps/Space";
import ProfileItem from "./childComps/ProfileItem.vue";
import ProfileMoney from "./childComps/ProfileMoney.vue";
import PublicLists from "./childComps/PublicLists";
export default {
    name: "Profile",
     components: {
      Scroll,
      NavBar,
      Space,
      ProfileItem,
      ProfileMoney,
      PublicLists
    }

}
</script>

<style scoped>
    .personal_box{
    width: 100%;
    height:100vh;
  }
  .nav-bar{
    width: 100%;
    color: #fff;
    background: var(--color-tint);
  }

</style>