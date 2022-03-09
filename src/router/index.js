import { createRouter, createWebHistory } from 'vue-router'

// import Vue from 'vue'
// import { createApp } from 'vue'
// import VueRouter from 'vue-router'
const Home = () => import('../views/home/Home.vue')
const Cart = () => import('../views/cart/Cart.vue')
const Category = () => import('../views/category/Category.vue')
const Profile = () => import('../views/profile/Profile.vue')


// vue-router重写push方法，解决相同路径跳转报错
// const changePush = VueRouter.prototype.push;
// VueRouter.prototype.push = function(location) {
//   return changePush.call(this, location).catch(err => err);
// }
// 重写replace
// const changeReplace = VueRouter.prototype.replace;
// VueRouter.prototype.replace = function(location) {
//   return changePush.call(this, location).catch(err => err);
// }

// 1.安装插件
// Vue.use(createRouter)
// 2.创建router
const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/category',
    component: Category
  },
  {
    path: '/cart',
    component: Cart
  },
  {
    path: '/profile',
    component: Profile
  }
]
const router = new createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
// 3.导出路由
export default router

// const routes = [
//   // {
//   //   path: '/',
//   //   name: 'home',
//   //   component: HomeView
//   // },
//   // {
//   //   path: '/about',
//   //   name: 'about',
//   //   // route level code-splitting
//   //   // this generates a separate chunk (about.[hash].js) for this route
//   //   // which is lazy-loaded when the route is visited.
//   //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
//   // }
// ]

// const router = createRouter({
//   history: createWebHistory(process.env.BASE_URL),
//   routes
// })

// export default router
