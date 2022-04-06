// 封装弹窗 toast 组件

// 按照什么样的方式将这个组件用起来呢？
// 做法：把内容封装在一个插件里面，然后安装这个插件，一旦安装这个插件 就将这个组件创建出来，并且在一开始的时候 就给它添加到body里面，然后再 this.$toast.show(msg, delay)的时候， 只是将它显示出来

import ToastVue2 from './ToastVue2.vue'
import { createApp, VueElement } from 'vue'

const app = createApp({})

// 1.创建obj并导出
const obj = {}
// 安装toast插件(使用Vue.use(toast) 会执行这个对象的install，这个对象是obj的，所以会去执行obj.install)
// 3.执行obj.install 将需要的东西预备好
obj.install = function(Vue) {//install在执行时会默认传过来vue参数

    // 4.ToastVue2.vue进行配置

    // 5.拿到Toast对象，将$el放上去
    // document.body.appendChild(Toast.$el)//这种方式不行, 不是节点类型(当执行install函数的时候，Total.$el还未进行挂载)
    // 普通做法：
        // a.创建组件构造器
        // const toastConstructor = Vue.extend(Toast)
            // 注：Vue2 有Vue.extend()
               // Vue3 使用createApp
        // const toastConstructor = createApp(Toast)


        // b.通过new的方式，根据组件构造器，可以创建出来一个组件对象
        // const toast = new toastConstructor()

        // c.将组件对象，手动的挂载在某一个元素上
        // toast.$mount(document.createElement('div'))//vue2方式
        Vue.createApp(Toast).mount(document.createElement('div'))//vue3方式


        // d.toast.$el 对应的就是div
        document.body.appendChild(Toast.$el)

    

        // Vue.prototype.$toast = Toast//vue2方式 Vue.prototype 替换为 config.globalProperties
        app.config.globalProperties.$toast = Toast//Vue3 方式

        // (这样就将这个对象放在了原型上，但是这个对象有模板 需要显示内容(未添加到body上))

}

export default obj

// 2.在main.js导入 使用