<template>
  <div class="goods-item" @click="itemClick">
      <img :src="showImage" alt="" @load="imageLoad">
      <!-- 通过@load监听图片是否已经加载完成 -->
      <div class="goods-info">
          <p>{{goodsItem.title}}</p>
          <div>
                <span>{{goodsItem.price}}</span>
                <span>{{goodsItem.cfav}}</span>
          </div>
      </div>
  </div>
</template>

<script>
import emitter from 'common/utils.js'
export default {
    name: 'GoodsListItem',
    props: {
        goodsItem: {
            type: Object,
            default() {
                return {}
            }
        }
    },
    computed: {
        showImage() {
            // 当前页面图片 或者 详情页推荐数据图片
            return this.goodsItem.image || this.goodsItem.show.img;
            // return this.goodsItem.show.img || this.goodsItem.image;//报错
        }
    },
    methods: {
        // 监听图片是否已将加载完成
        imageLoad() {
            emitter.emit('itemImgLoad')
            // this.$bus.$emit('itemImgLoad')
            // console.log('监听到图片加载完成，goodslistitem 发射！')


    // 需求：当详情页中推荐 图片加载完成后，除了首页刷新之外，详情页也需要刷新 (公用一个组件)

            // 方法1：通过路由方式 判断 (监听自己的全局事件)
            // if (this.$route.path.indexOf('/home')) {
            //     emitter.emit('homeitemImgLoad')
            // } else if (this.$route.path.indexOf('/detial')) {
            //     emitter.emit('detialitemImgLoad')
            // }

            // 方法2：通过 mixins混入
            // 首页、详情页 都使用 emitter.emit('itemImgLoad')，当进入到详情页时，对首页进行销毁(此时首页就不需要监听了，离开首页就设置取消)





        },
        itemClick() {
            // 路由跳转传递参数2种方式：
                // 1.动态路由 拼接上id（路由index.js）：path: '/Detial/:iid'
            this.$router.push('/detail/' + this.goodsItem.iid)
                // 2.使用query传参
            // this.$router.push({
            //     path: '/detial',
            //     query: {
            //         iid: xxx
            //     }
            // })
        }
    }
}
</script>

<style scoped>
.goods-item {
    width: 47%;
    margin:auto;
    margin-top: 15px;
}
.goods-item img {
    border-radius: 5px;
    width: 100%;
}
.goods-info {
    color: #bfbfbf;
    font-size: 14px;
}
.goods-info > p {
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
}
.goods-info div {
    text-align: center;
}
.goods-info div span:first-child {
    color: #d4237a;
    margin-right:15px;
}
.goods-info div span:last-child {
    position: relative;
}
.goods-info div span:last-child::before {
    position: absolute;
    left: -12px;
    top: 3px;
    content: '';
    width: 14px;
    height: 14px;
    background: url('~assets/images/home/collection.png') 0 0/14px 14px;
}
</style>