<template>
  <swiper class="detial-swiper">
      <!-- 这里class不能设置为swiper，否则报错 -->
        <swiper-item v-for="item in topImages" :key="item.key">
            <img :src="item" alt="">
        </swiper-item>
    </swiper>
</template>

<script>
import { Swiper, SwiperItem } from 'components/common/swiper'
export default {
    name: 'DetialSwiper',
    props: {
        topImages: {
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

        }
    }
}
</script>

<style scoped>
.detial-swiper {
    height: 250px;
    overflow:hidden;
}
.detial-swiper .slide {
    text-align: center;
}
</style>