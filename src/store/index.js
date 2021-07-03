import { createStore } from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'


const state = {
    cartList: [],
    //购物车中每个商品的勾选情况
    // YESorNo: [],

}
export default createStore({
    state,
    mutations,
    //mutations中的每个方法尽量只完成单一事件，它唯一的意义就是修改state的状态
    actions,
    getters,
    modules: {}
})
