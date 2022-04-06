<template>
    <div id="home">
        <nav-bar class="home-nav"><template v-slot:center><div>购物中心</div></template></nav-bar>
        <tab-control 
            :titles="['流行','新款','精选']" 
            @tabClick="tabClick" 
            ref="tabControl2"
            class="tab-fixed"
            v-show="isTabFixed"/>
        <scroll class="content" 
        ref="scroll" 
        :probe-type="3"
        @scroll="contentScroll"
        :pull-up-load="true"
        @pullingUp="loadMore">
            <!-- :probe-type="3"需要监听滚动设置回到顶部按钮显示&隐藏 -->
            <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
            <recommend-view :recommends="recommends"/>
            <feature-view />
            <tab-control 
            :titles="['流行','新款','精选']" 
            @tabClick="tabClick" 
            ref="tabControl1"/>
            <!-- <goods-list :goods="goods[currentType].list"/> -->
            <goods-list :goods="showGoods"/>
        </scroll>
        <back-top @click="backTopClick" v-show="isShowBackTop"/>
    </div>
</template>
<script>
// 公共组件引用放一块，业务组件引用放一块，数据方法组件引用放一块
import NavBar from 'components/common/navbar/NavBar.vue'
import TabControl from 'components/content/tabcontrol/TabControl.vue'
import GoodsList from 'components/content/goods/GoodsList.vue'
// import BackTop from 'components/content/backtop/BackTop'
import Scroll from 'components/common/scroll/Scroll'
import emitter from 'common/utils.js'//使用第三方库引入 事件总线
// import { debounce } from 'common/utils'


import HomeSwiper from './childComps/HomeSwiper.vue'
import RecommendView from './childComps/RecommendView.vue'
import FeatureView from './childComps/FeatureView.vue'


import { getHomeMultidata, getHomeGoods } from 'network/home.js'
import { itemListenerMixin, backTopMixin } from 'common/mixins'

// 只有用default导出才能删掉大括号{}
export default {
    name: "Home",
    components: {
        NavBar,
        HomeSwiper,
        RecommendView,
        FeatureView,
        TabControl,
        GoodsList,
        Scroll,
        // BackTop
    },
    data() {
        return {
            // 将请求过来的数据存储在data
            banners: [],
            recommends: [],
            goods: {//流行、新款、精选
                //(保存数据）数据模型设计好后 ，将请求到的数据塞到此处
                // 默认情况下将各项的第一页请求下来用于展示（第二页后 需要上拉加载后）
                'pop': {page: 0, list: []},
                'new': {page: 0, list: []},
                'sell': {page: 0, list: []},
            },
            currentType: 'pop',
            // isShowBackTop: false,
            tabOffsetTop: 0,
            isTabFixed: false,
            saveY: 0,
            // itemImgListener: null,//图片监听方法(抽出来的)
        }
    },
    mixins: [ itemListenerMixin, backTopMixin ],
    computed: {
        showGoods() {
                // <goods-list :goods="goods[currentType].list"/>进行处理
                // 因为goods[currentType].list太长了
            return this.goods[this.currentType].list
        }  
    },
    created() {//组件创建完就执行，详细逻辑不要写在此(放在methods内，这里调用)
        // 1.请求多个数据
        this.getHomeMultidata();
        // 请求商品数据
        this.getHomeGoods('pop');
        this.getHomeGoods('new');
        this.getHomeGoods('sell');

        // 不要在created里面使用this.$refs，未挂载上去可能取不到
    },
    // destroyed() {//destroyed拼写错误
    //     console.log('destroyed!')
    // },
    activated() {
        // 活跃
        // <keep-alive><router-view>让Home不要随意销毁掉
        // 让HOME保持原来的状态（点击底部tab切换路由后，切换回来页面还是原来位置）
            // 离开时保存一个位置信息saveY
            // 进来时，将位置设置为原来保存的位置信息saveY即可
        // console.log('activated!')
        // 在进来的时候 回到 离开时保存的位置
        this.$refs.scroll.scrollTo(0, this.saveY, 0);
        // 当滚动到保存的位置时，对scroll进行一次刷新(防止点回来不能滚动或者位置错误)
        this.$refs.scroll.refresh();
    },
    deactivated() {
        // console.log('deactivated!')
        // 在离开的时候 获取位置 进行保存
        // this.saveY = this.$refs.scroll.scroll.y
        // 1.保存y值
        this.saveY = this.$refs.scroll.getScrollY()

        // 2.取消全局事件监听
        // 当进入到详情页时，对首页进行销毁(此时首页就不需要监听了，离开首页就设置取消)
        // this.$bus.$off('itemImgLoad')后面需要传入要取消的监听的函数，否则全部取消
        emitter.off('itemImgLoad', this.itemImgListener)

    },
    mounted() {
        // 使用 mixins混入 之后 以下公共内容在mixins.js了
        // better-scroll监听图片是否加载完成（组件创建完就开始监听）
        // const refresh = this.debounce(this.$refs.scroll.refresh, 200)

        // 将防抖函数debounce放在utils.js里使用
        // const refresh = debounce(this.$refs.scroll.refresh, 50)

        // 对监听的时间进行保存
        // this.itemImgListener = () => {
        //     refresh()
        // }

        // emitter.on('itemImgLoad', this.itemImgListener)

        // emitter.on('itemImgLoad', () => {
            // console.log('组件创建完成开始监听，图片已经更新，进行refresh()')
            // 问题：图片连续加载如30次，refresh()执行频率过高
            // 解决：在1s内，如果有多次调用只调用1次（防抖函数）
            // 防抖debounce  节流throttle
            // 防抖函数起作用的过程：
                // 如果我们直接执行refresh，那么refresh函数会被执行30次
                // 可以将refresh函数传入到debounce函数中，生成一个新的函数
                // 之后在调用非常频繁的时候，就是用新生成的函数
                // 而新生成的函数并不会非常频繁的调用，如果下一次执行来的非常快，那么会将上一次取消掉
            // this.$refs.scroll.refresh()
            // refresh()
        // })

        // setTimeout(() => {
            // 异步函数，在下一次事件循环时才执行（它会放在后面执行，即使未写延迟时间）
        // })

        // this.$bus.$on('itemImgLoad', () => {
        //     console.log('通过事件总线 监听到图片更新！')
        // })

        // 获取tabControl的offsetTop
        // 所有的组件都由一个属性$el，用于获取组件中的元素
        // console.log(this.$refs.tabControl1.$el)//<div class="tab-control">此刻offsetTop数据错误，因为虽然组件挂载上去但是图片可能还未加载出来
        // this.tabOffsetTop = this.$refs.tabControl.tabOffsetTop
        // emitter.on('swiperImageLoad', () => {
        //     console.log('接收到swiper图片加载完毕！')
        // })
    },
    methods: {
        // 防抖函数(函数，延迟时间) utils.js
        // debounce(func, delay) {
        //     let timer = null;

        //     return function(...args) {
        //         if (timer) clearTimeout(timer)//判断timer是否有值，将之前的timer清除掉
        //             // 如果你有接下来下一件事，那么将之前timer赶紧清除掉
        //         timer = setTimeout(() => {
        //             func.apply(this, args)
        //         }, delay)
        //     }
        // },
        // 事件监听
        tabClick(index) {
            // 根据index动态决定 <goods-list :goods="goods['pop'].list"/>goods[type]类型
            // this.goods[type] = 1;
            switch(index) {
                case 0:
                    this.currentType = 'pop'
                    break
                case 1:
                    this.currentType = 'new'
                    break
                case 2:
                    this.currentType = 'sell'
                    break
            }
            // 解决吸顶后tab切换同步
            this.$refs.tabControl1.currentIndex = index;
            this.$refs.tabControl2.currentIndex = index;
        },
        // 网络请求
        getHomeMultidata() {
            getHomeMultidata().then(res => {
                this.banners = res.data.banner.list;
                this.recommends = res.data.recommend.list;
                // console.log(res)
            })
        },
        getHomeGoods(type) {
            const page = this.goods[type].page + 1;
            getHomeGoods(type, page).then(res => {
                // console.log(res.data.sort)
                // console.log(res.data.list)
                // 将一个数组，放在另外一个数组
                // ...扩展运算符
                this.goods[type].list.push(...res.data.list);
                this.goods[type].page += 1;//多了一组数据后将页数+1

                // 需要条件才触发
                // 上拉加载完成后调用finishPullUp()才能进行下次上拉加载
                // console.log(this.goods[type].page)
                // console.log('page:' + page)
                // if (page > 1) {
                //     this.$refs.scroll.finishPullUp();
                // }
            })
        },

        // 返回顶部 混入 注释掉
        // backTopClick() {
            // this.$refs.scroll.scroll.scrollTo(0, 0, 500)
            // this.$refs.scroll.scrollTo(0, 0, 500)
        // },
        // 监听滚动位置，动态设置返回顶部按钮显示&隐藏
        contentScroll(position) {
            // console.log(position)
            // 从position中取出y值，它是负的
            // this.isShowBackTop = (-position.y) > 1000
            this.listenShowBackTop(position)//混入

            // 根据tabControl的offsetTop设置吸顶效果
            this.isTabFixed = (-position.y) > this.tabOffsetTop
        },
        // 上拉加载更多
        loadMore() {
            // 流行、新款、精选 对当前curentType进行加载更多
            // BUG：看你图片加载的快慢，如果图片加载的快，不会卡顿，加载的慢高度就计算的不准确出现bug
            // 1.先监听图片是否加载完成
            this.getHomeGoods(this.currentType);
            // this.$refs.scroll.finishPullUp();
            // console.log('首页，加载更多！')
            // 2.调用this.$refs.scroll.scroll.refresh()进行刷新
            // debounce(this.$refs.scroll.refresh, 50)
            // this.$refs.scroll.refresh()
        },
        // TabControl滚动后吸顶效果
        swiperImageLoad() {
            this.tabOffsetTop = this.$refs.tabControl1.$el.offsetTop;
            // console.log('tabOffsetTop offsetTop: ' + this.$refs.tabControl1.$el.offsetTop)
        }
    },
    destroyed() {//destroyed拼写错误
        console.log('destroyed!')
    }
}
</script>
<style scoped>
#home {
    position: relative;
    height: 100vh;
}
.content {
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
    overflow:hidden;
}
.home-nav {
    background: greenyellow;
    /* 在使用浏览器原生滚动时，为了让导航不跟随一起滚动 */
    /* position: fixed; */
    left: 0;
    right: 0;
    top: 0;
    z-index: 5;
}
    /* 在正常未达到该位置之前，position默认值未static */
    /* 当达到这个值，position变为fixed */
    /* 兼容性有问题 */
    /* position: sticky;
    top: 44px;
    z-index: 5; */
.tab-fixed {
    position: relative;
    z-index: 9;
}
</style>