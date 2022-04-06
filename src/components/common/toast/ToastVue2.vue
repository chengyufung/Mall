<template>
    <div class="toast" v-show="isShow">
        <div>{{message}}</div>
    </div>
</template>

<script>
export default {
    name: 'ToastVue2',
    // props: {//用插件 别的组件传的，就不需要作为参数了
    //     message: {
    //         type: String,
    //         default: ''
    //     },
    //     show: {
    //         type: Boolean,
    //         default: false
    //     }
    // },
    data() {
        return {
            message: '',
            isShow: false
        }
    },
    methods: {
        show(message, duration=1000) {//ES6方式 默认值
            // (给某一个参数默认值)原始方式： duration = duration || 1000
            this.isShow = true
            this.message = message
            setTimeout(() => {
                this.message = ''
                this.isShow = false
            }, duration)
        }
    }

    // 对toast弹窗进行封装
    // 效果：直接调用，不再作为子组件引入 注册使用传参等操作…… this.$toast.show('请选择要购买的商品', 1000)
}
</script>

<style scoped>
.toast {
    position: fixed;
    z-index: 9;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background: rgba(0, 0, 0, .8);
    color: #fff;
    font-size: 14px;
    padding: 10px 15px;
    border-radius: 3px;
}
</style>