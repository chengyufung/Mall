<template>
<!-- ref一般绑定给子组件 -->
  <div class="wrapper" ref="wrapper">
      <div class="content">
            <slot></slot>
      </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
// import Pullup from '@better-scroll/pull-up'
// BScroll.use(Pullup)//快删掉它，否则将触发两次上拉加载
export default {
    name: 'Scroll',
    props: {
        // 需求不同不写死，将它定义为一个属性，根据需要调用
        probeType: {
            type: Number,
            default: 0
        },
        pullUpLoad: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            scroll: null,
        }
    },
    mounted() {
        // document.querySelector('.wrapper')这样做不是很好，同名会混乱
        // 1.创建BScroll对象
        this.scroll = new BScroll(this.$refs.wrapper, {
            // click无论是否设置为true，<button>元素都可以被点击
            // 但是<div>元素必须设置为true才能监听点击
            click: true,
            probeType: this.probeType,//不用写死（根据需要/不需要监听）根据传入的值
            pullUpLoad: this.pullUpLoad
            
        });
        // 2.监听滚动位置
        // 添加一个判断 严谨
        if (this.probeType === 2 || this.probeType === 3) {
            this.scroll.on('scroll', (position) => {
                // 自定义scroll事件，将position传出去
                this.$emit('scroll', position)
            })
        }
        
        // 3.监听上拉事件 滚动到底部
        // 做判断，在这个条件下才进行
        if (this.pullUpLoad) {
            this.scroll.on('pullingUp', () => {
                // console.log('触发 pullingUp 上拉加载更多！')
                this.$emit('pullingUp')//触底，将这个方法传出去
                // 当上拉加载完毕后，需要调用此方法告诉 better-scroll 数据已加载，不然只会执行一次
                this.scroll.finishPullUp();
            })    
        }
        

    // Better-Scroll可滚动区域BUG
    // 问题产生：
        // better-scroll再决定有多少区域可以滚动时，是根据scrollerHeight属性决定
        // scrollerHeight属性是根据放better-scroll的content中子组件的高度
        // 但是我们的首页中，刚开始在计算scrollerHeight属性时，是没有将图片计算在内的，所以计算出来的高度是错误地
        // 后来图片加载进来之后有了新的高度，但是scrollerHeight属性并没有进行更新，所以滚动出现了问题
    // 解决：
        // 监听每一张图片是否加载完成，只要有一张图片加载完成，就执行一次refresh()
            // 如何监听图片加载完了？
                // 原生js监听图片：img.onload=function(){}
                // Vue中监听图片：@load="方法"  (GoodsListItem.vue组件内)
            // 调用scroll.refresh()
                // 通过事件总线，(main.js 设置事件总线Vue.prototype.$bus = new Vue())
                // 在GoodsListItem.vue发送事件，
                    // this.$bus.$emit('itemImageLoad')
                // 在home.vue里面接收事件(created组件创建完就监听)
                    // this.$bus.on('itemImageLoad')



        // 图片加载完了调用refresh()
        // 你如何知道图片已经加载完了？
            // 
    },
    methods: {
        // 逻辑与 this.scroll && this.scroll不为null，才执行后边的
        // 封装回到顶部方法
        // time=300默认  ES6语法
        scrollTo(x, y, time=300) {
            this.scroll && this.scroll.scrollTo(x, y, time)
        },
        // 上拉加载完成后 调用此方法 方可下次上拉加载
        // finishPullUp() {
        //     this.scroll.finishPullUp()
        // },
        // 图片加载完成后，对高度等进行刷新（否则无法滚动）
        refresh() {
            // 逻辑与，这边模板创建完成，但是scroll.vue里的scroll还未挂载上去（因为图片加载太快），会报refresh错误
            this.scroll && this.scroll.refresh();
            // console.log('调用refreshHHHHHHHHHHHH')
        },
        // 完成上拉加载更多
        finishPullUp() {
            this.scroll && this.scroll.finishPullUp();
        },
        // 保存离开时的位置
        getScrollY() {
            return this.scroll ? this.scroll.y : 0
        }
    }
}
</script>
<style scoped>

</style>