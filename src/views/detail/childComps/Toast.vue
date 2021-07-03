<template>
    <div class="alert" v-show="isShow">
      <div class="txt"><span>{{message}}</span></div>
    </div>
</template>

<script>
  export default {
    name: "Toast",
    props: ['isShow', 'message']
  }
</script>

<style scoped>
  .alert{
    width: 50%;
    height: 8%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .alert .txt{
    width: 100%;
    height: 100%;
    background: rgba(0 ,0 , 0, .7);
    text-align: center;
    font-size: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 7px;
  }
  .alert .txt span{
    padding: 8px 10px;
    color: #fff;
  }
</style>
