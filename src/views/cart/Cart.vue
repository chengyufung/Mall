<template>
    <div class="cart">
        <nav-bar class="nav-bar">
            <template v-slot:center>
                <!-- <div>购物车({{$store.state.cartList.length}})</div> -->
                <div>购物车({{cartLength}})</div>
                <!-- <div>购物车({{length}})</div> -->
            </template>
        </nav-bar>
        <cart-list />
    </div>    
</template>
<script>
import NavBar from 'components/common/navbar/NavBar.vue'
import CartList from './childComps/CartList.vue'
import { mapGetters } from "vuex"
// mapGetters 辅助函数 仅仅是江store中国的getter映射到局部计算属性

export default {
    name: "Cart",
    components: {
        NavBar,
        CartList
    },
    computed: {
        // cartLength() {
        //     // return this.$store.state.cartList.length
            
        //     // 当拿 cartLength 次数比较多，可以将它封装成getter
        //     return this.$store.getters.cartLength
        // }

        // 转化 为computed属性：
        // 引用 mapGetters 将getters中的直接转成这里的computed属性，就不用写上边的代码了
        ...mapGetters(['cartLength', 'cartList']),
        // 自定义转化后的名称 如 length cartLength ...mapGetters数组(一一对应) 对象(自定义名称) 
        // ...mapGetters({
        //     length: 'cartLength'
        // })
    }
}
</script>
<style scoped>
.cart {
    height: 100vh;
}
.nav-bar {
    background-color: greenyellow;
}
</style>