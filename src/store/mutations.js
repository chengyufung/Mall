
// 将 addCounter、 addToCart 抽成常量 (mutation-type.js)

// export default {
//     addCounter(state, payLoad) {
//         payLoad.count++
//     },
//     addToCart(state, payLoad) {
//         state.cartList.push(payLoad)
//     }
// }



// 导入常量
import {
    ADD_COUNTER,
    ADD_TO_CART
} from "./mutation-types"


export default {
    [ADD_COUNTER](state, payload) {
        payload.count++
    },
    [ADD_TO_CART](state, payload) {
        payload.checked = true//让模型发生改变，界面才发生改变
        state.cartList.push(payload)
    }
}