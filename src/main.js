// 2.引入
// import mitt from 'mitt'
import { createApp, VueElement } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

import FastClick from 'fastclick'//解决移动端300ms延迟
import VueLazyload from 'vue-lazyload'//懒加载


// 1.引用(有default可将obj改名为toast)
// import toast from 'components/common/toast'
// 2.安装toast插件(使用Vue.use(toast) 会执行这个对象的install，这个对象是obj的，所以会去执行obj.install)
// Vue.use(toast)

// 3.定义全局属性
// const app = createApp({})
// app.config.globalProperties.$bus = new mitt()


// 设置$bus， Vue实例可以作为事件总线的（利用new出来的Vue实例发射事件&监听事件 scroll.vue）
// Vue2中：Vue.prototype.$bus = new Vue()
// Vue3中prototype以及$on废弃解决办法https://blog.csdn.net/qq_39179734/article/details/120740618
// 解决：
    // 1.安装mitt npm install mitt --save

// createApp(App).config.globalProperties.$toast = toast


// FastClick:   解决移动端300ms延迟
// 步凑：
    // 1.安装fastclick  npm install fastclick --save
    // 2.导入   import FastClick from 'fastclick'
    // 3，调用attach函数
FastClick.attach(document.body);


// lazy-load:   图片懒加载
// createApp(App).use(VueLazyload, {
    // loading: require('./assets/loading-svg/loading-bars.svg'),
    // error: require('./assets/loading-svg/loading-spin.svg'),
    // try: 3//default 1
// })
// VueLazyload 组件中使用：
/* <a href="#"><img v-lazy="require('./assets/images/common/back.png')" :alt="item.productImage"> */
// 需要使用require()的方式图片才会出现


createApp(App).use(store).use(router).mount('#app')
