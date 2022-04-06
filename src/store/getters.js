export default {
    cartLength(state) {
        return state.cartList.length
    },
    // 想要将 getters cartLength 直接转成 cart.vue 中的计算属性

    cartList(state) {
        return state.cartList
    }
}