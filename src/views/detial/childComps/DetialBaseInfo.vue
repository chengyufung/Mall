<template>
<!-- 判断一个对象是否为空对象 -->
 <!-- v-if="Object.keys(goods).length !== 0" -->
  <div class="base-info" v-if="Object.keys(goods).length !== 0">
      <div class="info-title">{{goods.title}}</div>
      <div class="info-price">
          <span class="n-price">{{goods.newPrice}}</span>
          <span class="o-price">{{goods.oldPrice}}</span>
          <span class="discount">{{goods.discount}}</span>
      </div>
      <div class="info-other">
          <span>{{goods.columns[0]}}</span>
          <span>{{goods.columns[1]}}</span>
          <span>{{goods.services[goods.services.length-1].name}}</span>
      </div>
      <div class="info-services">
          <!-- <div v-for="n in 10">{{n}}</div> -->
          <!-- <div v-for="index in 10" :key="index">{{index}}</div> -->

          <span v-for="index in goods.services.length-1" :key="index">
              <img :src="goods.services[index-1].icon" alt="">
              <span>{{goods.services[index-1].name}}</span>
          </span>
      </div>
  </div>
</template>

<script>
export default {
    name: 'DetialBaseInfo',
    props: {
        goods: {
            type: Object,
            default() {
                return {}
            }
        }
    },
    watch: {
        // goods: {
        //     immediate: true,
        //     handler(newValue, oldValue) {
        //         console.log('对象所有属性监听')
        //     },
        //     deep: true
        // }
    },
    created() {
        // console.log(this.goods)
    },
    mounted() {
        // 问题：打印为空{}
        // 原因：父组件获取数据，子组件使用props接收数据时，子组件执行mounted的时候，父组件还没有返回数据，而且mounted只执行一次，这是props中接收的数据为空，所以就是个空{}
        // 解决：添加判断
        // console.log(this.goods)
        // console.log(Object.keys(this.goods).length)
        // setTimeout(() => {
        //     console.log(this.goods)
        // }, 3000)
    }
}
</script>

<style scoped>
.base-info {
    /* padding: 0 5px; */
}
.info-title {
    font-size: 14px;
    margin: 10px 5px;
}
.info-price {
    margin: 0 5px 5px;
}
.n-price {
    font-size: 16px;
    color: deeppink;
}
.o-price {
    color: #167;
    text-decoration: line-through;
    font-size: 12px;
    padding: 0 2px;
}
.discount {
    color: #fff;
    border-radius: 10px;
    background: deeppink;
    font-size: 13px;
    padding: 0px 8px;
}
.info-other {
    display: flex;
    border-bottom: 1px solid #ccc;
    padding: 5px;
}
.info-other span:first-child {
    margin-left: 0;
}
.info-other span:last-child {
    margin-right: 0;
}
.info-other span {
    font-size: 12px;
    color:#167;
    margin:auto;
}
.info-services {
    padding: 20px 5px;
    display: flex;
    box-shadow: 0 1px 5px rgb(100 100 100 / 10%);
}
.info-services span:first-child {
    margin-left: 0;
}
.info-services span:last-child {
    margin-right: 0;
}
.info-services span {
    margin:auto;
}
.info-services img {
    width: 22px;
    vertical-align:middle;
}
.info-services span > span {
    color:#666;
    font-size: 13px;
    vertical-align: middle;
}
</style>