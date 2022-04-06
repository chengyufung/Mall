<template>
    <div class="cart-list">
        <scroll class="content" ref="scroll">
            <cart-list-item v-for="item in cartList" :key="item" :product="item" />
        </scroll>
        <cart-bottom-bar></cart-bottom-bar>
    </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll"
import { mapGetters } from "vuex"
import CartListItem from "./CartListItem.vue"
import CartBottomBar from './CartBottomBar.vue'

export default {
    name: 'CartList',
    components: {
        Scroll,
        CartListItem,
        CartBottomBar
    },
    computed: {
        ...mapGetters(['cartList'])
    },
    activated() {
        // 解决购物车内容 从无到有 better-scroll 可滚动高度 问题
        this.$refs.scroll.refresh()   
    }
}
</script>

<style scoped>
.cart-list {
    height: calc(100% - 44px - 49px - 40px);
}
.content {
    height: 100%;
    overflow: hidden;
}
.content > div:last-child {
    border: 0;
}
</style>