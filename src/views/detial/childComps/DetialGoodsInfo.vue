<template>
    <div v-if="Object.keys(detialInfo).length !== 0" class="goods-info">
        <div class="info-desc clear-fix">
            <div class="start"></div>
            <div class="desc">{{detialInfo.desc}}</div>
            <div class="end"></div>
        </div>
        <div class="info-key">{{detialInfo.detailImage[0].key}}</div>
        <div class="info-list">
            <img v-for="item in detialInfo.detailImage[0].list" :key="item.index" :src="item" @load="imageLoad" alt="">
        </div>
    </div>
</template>

<script>
export default {
    name: 'DetialGoodsInfo',
    props: {
        detialInfo: {
            type: Object,
            default() {
                return {}
            }
        }
    },
    data() {
        return {
            counter: 0,//记录图片加载几张了
            imagesLength: 0//图片张数，默认为0，然后watch监听
        }
    },
    methods: {
        imageLoad() {
            // 添加判断，图片加载完后只回调一次
                // 判断所有的图片都加载完了，那么进行一次回调就好了
                // this.counter += 1
                // 当所有图片都加载了，进行一次回调
            if (++this.counter === this.imagesLength) {
                this.$emit('imageLoad')
            }
        }
    },
    watch: {
        // 获取图片张数
        // 设置默认为0，然后监听图片长度变化，一旦变化就获取最新的长度 赋值给imagesLength，
        detialInfo() {
            this.imagesLength = this.detialInfo.detailImage[0].list.length
        }
    }
}
</script>

<style scoped>
.goods-info {
    border-top: 5px solid #bbf;
    padding-top: 15px;
    font-size: 14px;
}
.start, .end {
    width: 100px;
    height: 4px;
    background: #bbf;
    margin: 0 10px;
}
.start {
    position: relative;
}
.start:before {
    content: '';
    background: #bbf;
    width: 5px;
    height: 5px;
    position: absolute;
    left: 0;
    top: -5px;
}
.end {
    float: right;
    position: relative;
}
.end:after {
    content: '';
    background: #bbf;
    width: 5px;
    height: 5px;
    position: absolute;
    right: 0;
    top: -5px;
}
.desc {
    margin: 10px;
}
.info-key {
    margin: 10px;
}
.info-list {
    text-align: center;
}
</style>