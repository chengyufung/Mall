<template>
      <nav-bar>
          <template v-slot:left>
              <div class="back" @click="backClick">
                <img src="~assets/images/common/back.png" alt="">
              </div>
          </template>
          <template v-slot:center>
              <ul class="title">
                  <li v-for="(item,index) in titles"
                   :key="item.key"
                   :class="{active:index === currentIndex}"
                   @click="titleClick(index)">{{item}}</li>
              </ul>
          </template>
      </nav-bar>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue'
export default {
    name: 'DetialNavBar',
    components: {
        NavBar
    },
    data() {
        return {
            titles: ['商品','参数','评论','推荐'],
            currentIndex:0,
        }
    },
    methods: {
        titleClick(index) {
            this.currentIndex = index;
            // 联动效果 点击标题滚动到对应的主题
            this.$emit('titleClick', index)
        },
        backClick() {
            // this.$router.back()
            this.$router.go(-1)
        }
    }
}
</script>

<style scoped>
.back {
    display: flex;
    height: 100%;
}
.back img {
    margin: auto;
    width: 50px;
}
.title {
    display: flex;
}
.title li {
    flex: 1;
    font-size: 14px;
}
.active {
    color: deeppink;
}
</style>