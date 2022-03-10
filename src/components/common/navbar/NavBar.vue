<template>
    <div class="nav-bar">
        <div class="left"><slot name="left"></slot></div>
        <div class="center"><slot name="center"></slot></div>
        <div class="right"><slot name="right"></slot></div>
    </div>
</template>
<script>
export default {
    name: 'NavBar'
}
</script>
<style scoped>
.nav-bar {
    display: flex;
    text-align: center;
    box-shadow: 0 1px 1px rgba(100, 100, 100, .1);
    height: 44px;
    line-height: 44px;
    /* line-height可以直接撑起来，不用设置height(需要有内容) */
}
.left {
    width: 10%;
    /* background: greenyellow; */
}
.center {
    flex: 1;
    /* background: goldenrod; */
}
.right {
    width: 10%;
    /* background: yellowgreen; */
}
</style>