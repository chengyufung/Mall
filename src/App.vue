<template>
    <!-- 在Vue3报错 -->
    <!-- <keep-alive>
        <router-view></router-view>
    </keep-alive> -->
    <!-- 详情页不需要保存状态，每次进入都是新的数据，故将它排除 -->
    <router-view v-slot="{ Component }">
      <keep-alive exclude="Detial">
        <component :is="Component" />
      </keep-alive>
    </router-view>
<!-- keep-alive 具有缓存的作用，在组件切换过程中将状态保利叜内存中，防止重复渲染DOM，减少加载时间及性能消耗，提高用户体验 -->
<!-- <keep-alive> 包裹动态组件时，会缓存不活动的组件实例，而不是销毁它们 -->
    <!-- 新写法 解决（Vue3中<keep-alive>报错）： -->
    <!-- <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component">
      </keep-alive>
    </router-view> -->

  <!-- <router-view v-slot="{ Component }">
    <transition v-if="$route.meta.keepAlive">
      <component :is="Component" />
    </transition>
    <transition v-if="!$route.meta.keepAlive">
      <component :is="Component" />
    </transition>
  </router-view> -->

    <!-- <router-view/> -->
    <main-tab-bar/>
</template>

<script>
import MainTabBar from 'components/content/maintab/MainTabBar.vue'
export default {
  components: { MainTabBar },
  name: 'App',
}
</script>
<style>
@import "assets/css/base.css";
</style>
