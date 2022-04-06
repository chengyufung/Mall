<template>
  <div class="shop-info">
      <div class="shop-top">
          <img :src="shop.logo" alt="">
          <span>{{shop.name}}</span>
      </div>
      <div class="shop-middle">
          <div class="middle-left">
              <div>
                  <div>{{shopSells}}</div>
                <p>总销量</p>
              </div>
              <div>
                  <div>{{shop.goodsCount}}</div>
                  <p>全部宝贝</p>
              </div>
          </div>
          <i class="line"></i>
          <div class="middle-right">
              <ul>
                  <li v-for="item in shop.score" :key="item">
                      <span>{{item.name}}</span>
                      <i :class="{betters:item.isBetter}">{{item.score}}</i>
                      <i v-if="item.isBetter" class="deeppinkbgc">高</i>
                      <i v-else>低</i>
                  </li>
              </ul>
          </div>
      </div>
      <div class="shop-bottom">
          <div class="enter-shop">进店逛逛</div>
      </div>
  </div>
</template>

<script>
export default {
    name: 'DetialShopInfo',
    props: {
        shop: {
            type: Object,
            default() {
                return {}
            }
        }
    },
    computed: {
        // 过万处理
        shopSells() {
            if (this.shop.sells >= 10000) {
                return (this.shop.sells / 10000).toFixed(2) + '万'
            } else {
                return this.shop.sells
            }
        }
    }
}
</script>

<style scoped>
.shop-top {
    padding-top: 30px;
}
.shop-top img {
    margin: 0 5px;
    width: 50px;
    vertical-align:middle;
}
.shop-top span {
    vertical-align: middle;
    font-size: 18px;
}


.shop-bottom {
    margin: 20px 10px 25px;
}
.enter-shop {
    color:#868686;
    background-color:#bbf;
    width: 120px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    margin: auto;
    border-radius: 5px;
}
.line {
    width: 1px;
    height: 40px;
    background:#333;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
}
.shop-middle {
    display: flex;
    position: relative;
    margin-top: 20px;
}
.middle-left {
    display: flex;
    width: 50%;
}
.middle-left > div {
    margin:auto;
    text-align: center;
    font-size: 12px;
}
.middle-right {
    width: 50%;
    display: flex;
    font-size: 13px;
}
.middle-right ul {
    margin:auto;
}
.middle-right li {
    margin-bottom: 10px;
}
.middle-right .betters {
    color:deeppink;
}
.middle-right i {
    margin-left: 5px;
    color:green;
}
.middle-right .deeppinkbgc {
    background: deeppink !important;
}
.middle-right i:last-child {
    color: #fff;
    background-color: green;
}
</style>