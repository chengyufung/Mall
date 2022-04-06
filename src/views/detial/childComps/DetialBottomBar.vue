<template>
    <div class="bottom-bar">
        <ul>
            <li>
                <i class="icon iconfont icon-kefu"></i>
                <p>客服</p>
            </li>
            <li>
                <i class="icon iconfont icon-dianpu"></i>
                <p>店铺</p>
            </li>
            <li>
                <i class="icon iconfont icon-shoucang"></i>
                <p>收藏</p>
            </li>
        </ul>
        <div class="bar-right">
            <div class="cart" @click="addToCart">加入购物车</div>
            <div class="bug">购买</div>
        </div>
    </div>
</template>

<script>
export default {
    name: "DetialBottomBar",
    methods: {
        // 点击添加到购物车
        addToCart() {
            this.$emit('addCart')
        }
    }
};
</script>

<style scoped>
.bottom-bar {
    height: 49px;
    background-color: #bbf;
    position: relative;
    /* bottom: 49px; */
    font-size: 14px;
}
.bottom-bar ul {
    display: inline-flex;
    width: calc(100% - 180px);
    vertical-align: middle;
}
.bottom-bar ul li {
    flex: 1;
    text-align: center;
}
.iconfont {
    font-size: 24px;
}
.bar-right {
    display: inline-flex;
    height: 100%;
    width: 180px;
    line-height: 49px;
}
.bar-right div {
    flex: 1;
    text-align: center;
}
.cart {
    background-color: yellow;
}
.bug {
    background-color: deeppink;
    color: #fff;
}
</style>