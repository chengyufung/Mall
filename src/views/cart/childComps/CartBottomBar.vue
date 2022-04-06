<template>
  <div class="bottom-bar">
        <check-button class="all-select" @click="checkAll" :isChecked="isCheckedAll"></check-button>
        <span>全选</span>
        <span class="price-total">合计: {{totalPrice}}</span>
        <div class="check-out" @click="goCheck">去计算({{totalCount}})</div>
  </div>
</template>

<script>
import CheckButton from '@/components/content/checkButton/CheckButton.vue'
import { mapGetters } from 'vuex'

export default {
    name: 'CartBottomBar',
    components: {
        CheckButton
    },
    computed: {
        ...mapGetters(['cartList']),
        totalPrice() {
            // 1.使用for循环
            // 2.使用filter
            // return this.$store.state.cartList.filter(item => {
            //     return item.checked
            // })
            return this.cartList.filter(item => {
                return item.checked//checked是否为true，选中的，才参与总价计算
            }).reduce((preValue, item) => {//对剩余的 进行处理(前一个值，item)
                return preValue + parseInt(item.price.substring(1)) * item.count
            }, 0).toFixed(2)//0为初始化值
        },
        totalCount() {
            return this.cartList.filter(item => item.checked).length
        },

        // 全选 状态改变
        // 先从被选数组中查看是否有不被选中的，如果数组有长度，则不是全选
        isCheckedAll() {
            // 1.使用 filter 每一个都要执行
            // if (this.cartList.length === 0) return false
            // return !(this.cartList.filter(item => !item.checked).length)

            // 2.使用 find 查找到某一个元素后 就直接返回了(性能更好)
            if (this.cartList.length === 0) return false//当购物车为空的时候(非全选)
                // 当找到有 没有被选中的 那么isCheckedAll即为 false，前面进行取反
            return !this.cartList.find(item => !item.checked)

            // 3.使用 for 循环遍历
            // if (this.cartList.length === 0) return false
            // for (let item of this.cartList) {
            //     if (!item.checked) {
            //         return false
            //     }
            // }
            // return true
        }
    },
    methods: {
        // 全选点击
        checkAll () {
             if (this.isCheckedAll) {//全部选中
                this.cartList.forEach(item => item.checked = false)
             } else {//部分或全部 不选中
                this.cartList.forEach(item => item.checked = true)
             }

            // let checked = true;
            // if (checked) {
            //     this.cartList.filter(item => {
            //         checked = false
            //         return item.checked = false
            //     })
            // } else if (!checked) {
            //     this.cartList.filter(item => {
            //         checked = true
            //         return item.checked = true
            //     })
            // }
        },
        goCheck() {
            if (!this.isCheckedAll) {
                // this.$toast.show('请选择购买的商品', 1500)
            }
        }
        // 全选：
            // 显示的状态：
                // 判断是否有一个不选中，全选就是不选中
            
            // 点击全选按钮：
                // 如果原来都是选中，点击一次 全部不选中
                // 如果原来都是不选中(某些不选中 即选中一部分)，全部选中
    }
}
</script>

<style scoped>
.bottom-bar {
    height: 40px;
    line-height: 40px;
    background-color: #bbf;
    position: relative;
    display: flex;
}
.price-total {
    padding-left: 10px;
}
.all-select {
    padding-left: 10px;
}
.check-out {
    margin:auto;
    margin-right:0;
    background-color: deeppink;
    padding: 0 10px;
    color: #fff;
}
</style>