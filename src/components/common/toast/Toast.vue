<template>
    <div class="toast" v-show="isShow">
        <div>{{message}}</div>
    </div>
</template>

<script>
import { ref, onMounted } from "vue";
export default {
    name: 'Toast',
    props: {
        message: {
            type: String,
            default: ''
        },
        show: {
            type: Boolean,
            default: true
        }
    },
    setup() {
        // let message = ref("")
        // // 监听父组件传过来的值，使用props.message接收index.js文件中vm.component.props.message传过来的值
        // watch(() => props.message, (newVal, oldVal) => {
        //     message.value = newVal
        // })
        // return {
        //     message
        // }

        const visible = ref(false)
        onMounted(() => {
            visible.value = true
        })
        return { visible }
    },
    
    // data() {
    //     return {
    //         message: '',
    //         isShow: false
    //     }
    // },
    // methods: {
    //     show(message, duration=1000) {//ES6方式 默认值
    //         // (给某一个参数默认值)原始方式： duration = duration || 1000
    //         this.isShow = true
    //         this.message = message
    //         setTimeout(() => {
    //             this.message = ''
    //             this.isShow = false
    //         }, duration)
    //     }
    // }

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