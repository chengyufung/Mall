<template>
    <tab-bar>
      <tab-bar-item path="/home" activeColor="#d81e06">
      <!-- 如果原封不动的传，不需:path -->
      <!-- v-slot:item-icon简写#item-icon -->
        <!-- 将这部分模板片段传入子组件的item-icon插槽中 -->
        <template v-slot:item-icon>
          <img class="img-slot" style="max-width:100%;" src="~assets/images/tabbar/tabbarhome.png" alt="">
        </template>
        <template #item-icon-active>
          <img class="img-slot" src="~assets/images/tabbar/tabbarhome-2.png" alt="">
        </template>
        <template v-slot:item-text>首页</template>
        <!-- ~ 解决文件路径太长（需要webpack.base.conf.js中alias配置并重新run dev） -->
      </tab-bar-item>
      <tab-bar-item path="/category" activeColor="#d81e06">
        <template #item-icon>
          <img class="img-slot" src="~assets/images/tabbar/tabbar-icon-chanpin-default.png" alt="">
        </template>
        <template #item-icon-active>
          <img class="img-slot" src="~assets/images/tabbar/tabbar-icon-chanpin-default-2.png" alt="">
        </template>
        <template v-slot:item-text>分类</template>
      </tab-bar-item>
      <tab-bar-item path="/cart" activeColor="#d81e06">
        <template #item-icon>
            <img class="img-slot" src="~assets/images/tabbar/icontabbarshoppingup.png" alt="">
        </template>
        <template #item-icon-active>
            <img class="img-slot" src="~assets/images/tabbar/icontabbarshoppingup-2.png" alt="">
        </template>
        <template #item-text>购物车</template>
      </tab-bar-item>
      <tab-bar-item path="profile" activeColor="#d81e06">
        <template #item-icon>
          <img class="img-slot" src="~assets/images/tabbar/icontabbarmyup.png" alt="">
        </template>
        <template #item-icon-active>
          <img class="img-slot" src="~assets/images/tabbar/icontabbarmyup-2.png" alt="">
        </template>
        <template #item-text>我的</template>
      </tab-bar-item>
    </tab-bar>
</template>
<script>
    import TabBar from 'components/common/tabbar/TabBar.vue'
    import TabBarItem from 'components/common/tabbar/TabBarItem.vue'
    export default {
        name: 'MainTabBar',
        components: {
            TabBar,TabBarItem
        }
    }
</script>
<style scoped>
.img-slot {
  width: 24px;
  margin-top: 3px;
  vertical-align: middle;
  margin-bottom: 2px;
}
/* 在<template v-slot="item-icon">
给子元素<img>设置样式失败
在组件TabBarItem.vue里设置不了，
需要在当前页面设置才起作用
*/
/* class="img-slot" 错误拼写 img-slog */
</style>