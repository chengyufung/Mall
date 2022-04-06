import { createStore } from 'vuex'
import mutations from "./mutations"
import actions from "./actions"
import getters from "./getters"
import state from "./state"

// const state = {
//   cartList: []
// }
export default createStore({
  state,
  mutations,
  actions,
  getters,
  // state: {
  //   cartList: []
  // },
  // getters: {
  // },
  // mutations: {
    // mutations 目的： 修改state中的状态
    // mutations 中的每个方法 尽可能完成的事件比较单一，因此 将addCart放在了actions里面
    // addCart(state, payload) {
      // payLoad 新添加的商品
      
      // 方法1：使用for循环
      // 2.判断新添加的商品是否已经存在购物车里面了(对比id)
      // let oldProduct = null;
      // for(let item of state.cartList) {
      //   if (item.iid === payLoad.iid) {
      //     oldProduct = item;
      //   }
      // }

       
      // 方法2：使用indexOf
      // addCart(state, payLoad) {
      //   let index = state.cartList.indexOf(payLoad)
      //   if (index === -1) {
      //     let oldProduct = state.cartList[index]
      //     oldProduct.count += 1
      //   } else {
      //     payLoad.count = 1
      //     state.cartList.push(payLoad)
      //   }
      // }
      

      // 方法3：使用find()
      // 查找之前数组中是否有该商品
    //   let oldProduct = state.cartList.find(item => item.iid === payLoad.iid)

    //   // 判断oldProduct是否有值
    //   if (oldProduct) {
    //     oldProduct.count += 1;//如果原来有商品，数量+1
    //   } else {
    //     payLoad.count = 1;//如果没有，数量变为1
    //     state.cartList.push(payLoad)
    //   }
    // }

  // 在mutations里面的addCart方法，可能是将商品数量+1 也可能是添加新的商品，为了使目的单一 放在actions里面

    // 对原来的任务进行了分发 到这两个任务上
    // addCounter(state, payLoad) {
    //   payLoad.count++
    // },
    // addToCart(state, payLoad) {
    //   state.cartList.push(payLoad)
    // }
  // },
  // 有判断逻辑放到actions里面
  // actions: {
  //   addCart(context, payLoad) {
  //     let oldProduct = context.state.cartList.find(item => item.iid === payLoad.iid)
  //     if (oldProduct) {
  //       // oldProduct.count += 1
  //       context.commit('addCounter', oldProduct)
  //     } else {
  //       payLoad.count = 1
  //       // context.state.cartList.push(payLoad)
  //       context.commit('addToCart', payLoad)
  //     }
  //   }
  // },
  modules: {
  }
})
