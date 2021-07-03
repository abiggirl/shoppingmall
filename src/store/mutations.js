// import { ADD_COUNT, ADD_TO_CART } from './mutation-types'


export default {
    //1.将商品添加进购物车
    addToCart(state, payLoad) {
        payLoad.checked = true
        state.cartList.push(payLoad)
    },
    //2.重复商品数量加一
    addCount(state, payload) {
        payload.count += 1
    },

}
