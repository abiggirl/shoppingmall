// import { ADD_COUNT, ADD_TO_CART } from './mutation-types'
// import { addCount, addToCart } from "./mutations";

export default {
    addCart(context, payload) {
        //payload为新添加的商品
        // let oldProduct = null
        // for(let item of state.cartList) {
        //     if(item.iid === payload.iid) {
        //         oldProduct = item
        //     }
        // }
        return new Promise((resolve, reject) => {
            let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
                //判断oldProduct
            if (oldProduct) {
                // oldProduct.count += 1
                context.commit('addCount', oldProduct)
                resolve('当前商品数量+1！')
            } else {
                // state.cartList.push(payload)
                context.commit('addToCart', payload)
                    // payload.count = 1
                resolve('成功加入购物车！')
            }
        })
    }
}
