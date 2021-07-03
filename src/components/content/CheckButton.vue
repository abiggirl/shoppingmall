<template>
  <div class="check-button" :class="{check: isChecked}">
      <img src="~assets/img/cart/tick.svg" alt="">
  </div>
</template>

<script>
export default {
    name: 'CheckButton',
    props: {
        isChecked: {
            type: Boolean,
            default: true
        }
    }
}
</script>

<style scoped>
    .check-button {
        border-radius: 50%;
        border: 2px solid #aaa;
    }
    .check {
        border-color: pink;
        background-color: pink;

    }
    img {
        width: 19px;
        height: 14px;
    }
</style>