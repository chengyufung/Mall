<template>
    <swiper>
        <swiper-item v-for="item in banners" :key="item.index">
            <a :href="item.link" class="banner-link">
                <img :src="item.image" alt="" @load="imageLoad">
            </a>
        </swiper-item>
    </swiper>
</template>
<script>
// 在swiper.js中将两个组件作为对象导出，这里就可以写在一起了
// import Swiper from 'components/common/swiper/Swiper.vue'
// import SwiperItem from 'components/common/swiper/SwiperItem.vue'
import {Swiper, SwiperItem} from 'components/common/swiper'


export default {
    name: 'HomeSwiper',
    props: {
        banners: {//bug? 你忘记写banners了，？？？你给谁定义了
            type: Array,
            default() {
                return []
            }
        }
    },
    components: {
        Swiper,
        SwiperItem
    },
    data() {
        return {
            isLoad: false//定义变量 记录之前是否发出过事件
        }
    },
    methods: {
        // 将监听到的图片加载完成信息发送出去
        imageLoad() {
            // emitter.emit('swiperImageLoad')//此处不用emitter库，因为直接发送给父组件

            // （只执行第一次）
            // 通过监听轮播图图片是否加载出来，然后计算tabControloffsetTop高度，设置吸顶效果
            // 不用每次加载都发送（仅第一次加载出来发送一次就可以了）
            if (!this.isLoad) {//如果还没有加载，就发出事件，发出之后将isLoad设置为true
                this.$emit('swiperImageLoad')
                this.isLoad = true
            }
        }
    }
}
</script>
<style scoped>
.banner-link {
    display: block;
}
.banner-link img {
    display: block;
    margin: 0 auto;
}
</style>