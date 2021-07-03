<template>
  <div class="cart-buttom-bar">
      <div class="check-all">
        <check-button class="check-button" :is-Checked="isCheckedAll" @click.native="checkClick"></check-button>
        <span>全选</span>
      </div>
      <div class="price">
          合计：{{totalPrice}}
      </div>
      <div class="calculate">结算({{checkedGoods}}) </div>
  </div>
</template>

<script>
import CheckButton from "components/content/CheckButton.vue";

export default {
    name: "CartButtomBar",
    components: {
        CheckButton
    },
    computed: {
        totalPrice() {
            return '￥' + this.$store.state.cartList.filter(item => {
                return item.checked
            }).reduce((preValue, item) => {
                return item.price * item.count + preValue
            }, 0).toFixed(2)
        },
        checkedGoods() {
            return this.$store.state.cartList.filter(item => item.checked).reduce((preValue, item) => {
                return item.count + preValue
            }, 0)
        },
        isCheckedAll() {
            if(this.$store.state.cartList.length === 0) return false
            return !this.$store.state.cartList.find(item => !item.checked)
        }
    },
    methods: {
        checkClick() {
            if (this.isCheckedAll) {
                this.$store.state.cartList.forEach(element => {
                    element.checked = false
                });
            } else {
                this.$store.state.cartList.forEach(element => {
                    element.checked = true
                })
            }
        }
    }
}
</script>

<style scoped>
    .cart-buttom-bar {
        display: flex;
        align-items: center;
    }
    .check-all {
        height: 100%;
        display: flex;
        align-items: center;
        width: 70px;
    }
    .check-button {
        margin-left: 10px;
        margin-right: 5px;
    }
    .price {
        margin-left: 15px;
        flex: 1;
    }
    .calculate {
        align-items: center;
        text-align: center;
        height: 40px;
        line-height: 40px;
        width: 90px;
        background-color: salmon;
        color: #fff;
        font-size: 18px;
    }
</style>