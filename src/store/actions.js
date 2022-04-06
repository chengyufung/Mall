// 导入常量
import {
  ADD_COUNTER,
  ADD_TO_CART
} from "./mutation-types"


export default {
  // addCart(context, payLoad) {
  //   let oldProduct = context.state.cartList.find(item => item.iid === payLoad.iid)
  //   if (oldProduct) {
  //     // oldProduct.count += 1
  //     context.commit(ADD_COUNTER, oldProduct)
  //   } else {
  //     payLoad.count = 1
  //     // context.state.cartList.push(payLoad)
  //     context.commit(ADD_TO_CART, payLoad)
  //   }
  // }

// 点击添加到购物车，使用Promise 当添加成功后，条件满足 给与 toast弹窗 反馈
  addCart(context, payLoad) {
    return new Promise((resolve, reject) => {
      let oldProduct = context.state.cartList.find(item => item.iid === payLoad.iid)
      if (oldProduct) {
        // oldProduct.count += 1
        context.commit(ADD_COUNTER, oldProduct)
        resolve('当前商品 数量+1')
      } else {
        payLoad.count = 1
        // context.state.cartList.push(payLoad)
        context.commit(ADD_TO_CART, payLoad)
        resolve('添加了 当前商品')
      }
    })
  }
  // 如果你在vuex里面做了某个操作，要让外界知道，需要用到Promise 



}
