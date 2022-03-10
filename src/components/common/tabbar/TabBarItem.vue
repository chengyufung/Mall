<template>
    <div class="tab-bar-item" @click="itemClick">
        <div v-if="!isActive"><slot name="item-icon"></slot></div>
        <div v-else><slot name="item-icon-active"></slot></div>
        <!-- <div :class="{active: isActive}"><slot name="item-text"></slot></div> -->
        <div :style="activeStyle"><slot name="item-text"></slot></div>
    </div>
</template>
<script>
export default {
    name: "TabBarItem",
    props: {
        path: String,
        activeColor: {
            type: String,
            default: '#d81e06'
        }
    },
    data() {
        return {
            // isActive: true
        }
    },
    computed: {
        isActive() {
            return this.$route.path.indexOf(this.path) !== -1
            // this.$route.path 最活跃路由的path
            // indexOf(this.path) 判断它里面是否有这个item的path（props的path）
            // (当它!==-1的时候就path匹配)

            // A indexOf(B) !== -1
            // 表示从A里面 找到B !== -1
            // 从A里面 未找到B == -1
        },
        activeStyle() {
            return this.isActive ? {color: this.activeColor} : {}
        }
    },
    methods: {
        itemClick() {
            this.$router.replace(this.path);//不能返回
            // 看需求是否返回
            // this.$router.push();//可以返回
        }
    }
}
</script>
<style scoped>
.tab-bar-item {
  flex: 1;/*均匀分配元素*/
  height: 49px;
  /* 很多android ios设置tabbar高度49px */
  text-align: center;
}
/* .img-slot {
    width: 24px;
    margin-top: 3px;
    vertical-align: middle;
    margin-bottom: 2px;
} */

/* .active {
    color:#d81e06;
} */
</style>