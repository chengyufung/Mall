<template>
    <div id="detial">
        <detial-nav-bar class="detial-nav" @titleClick="titleClick" ref="nav"></detial-nav-bar>
        <scroll class="content" ref="scroll" @scroll="contentScroll" :probe-type="3">
            <!-- <ul>
                <li v-for="item in $store.state.cartList" :key="item.index">{{item}}
                    <h4>价格~{{item.price}}</h4>
                </li>
            </ul> -->
            <detial-swiper :top-images="topImages" />
            <detial-base-info :goods="goods" />
            <detial-shop-info :shop="shop" />
            <detial-goods-info :detial-info="detialInfo" @imageLoad="imageLoad" />
            <detial-param-info ref="params" :param-info="paramInfo" />
            <detial-comment ref="comment" :comment="comment" />
            <goods-list ref="recommend" :goods="recommendInfo"/>
        </scroll>
        <detial-bottom-bar @addCart="addToCart" />
        <back-top @click="backTopClick" v-show="isShowBackTop"/>
        <!-- <toast :message="toastMsg" :show="toastShow" /> -->
    </div>
</template>

<script>
import DetialNavBar from "./childComps/DetialNavBar.vue";
import DetialSwiper from "./childComps/DetialSwiper.vue";
import DetialBaseInfo from "./childComps/DetialBaseInfo.vue";
import DetialShopInfo from "./childComps/DetialShopInfo.vue";
import DetialGoodsInfo from "./childComps/DetialGoodsInfo.vue";
import DetialParamInfo from "./childComps/DetialParamInfo.vue";
import DetialComment from "./childComps/DetialComment.vue";
import GoodsList from "components/content/goods/GoodsList";
import DetialBottomBar from './childComps/DetialBottomBar.vue';
// import Toast from 'components/common/toast/Toast';

import Scroll from "components/common/scroll/Scroll";
import { getDetial, Goods, Shop, GoodsParam, getRecommend } from "network/detial.js";
import emitter from "common/utils";
import { debounce } from "common/utils";
import { itemListenerMixin, backTopMixin } from "common/mixins"

import { mapActions } from "vuex"

export default {
    name: "Detial",
    components: {
        DetialNavBar,
        DetialSwiper,
        DetialBaseInfo,
        DetialShopInfo,
        Scroll,
        DetialGoodsInfo,
        DetialParamInfo,
        DetialComment,
        GoodsList,//详情页推荐 使用的是goods组件 就不用再新建一个组件了
        DetialBottomBar,
        // Toast,
    },
    data() {
        return {
            iid: null,
            topImages: [],
            goods: {},
            shop: {},
            detialInfo: {},
            paramInfo: {},
            comment: {},
            recommendInfo: [],
            // itemImgListener: null,
            themesTopY: [],
            getThemesTopY: null,
            currentIndex: 0,
            // toastMsg: '',
            // toastShow: false
        };
    },
    mixins: [ itemListenerMixin, backTopMixin ],
    created() {
        // 1.保存传入的iid
        this.iid = this.$route.params.iid;
        // console.log(this.iid);
        // 2.根据iid请求详情数据
        getDetial(this.iid).then((res) => {
            // console.log("getDetial res: ");
            // console.log(res);
            const data = res.result;
            // 1.获取顶部图片轮播数据
            this.topImages = data.itemInfo.topImages;
            // console.log(this.topImages)

            // 2.获取商品信息
            // (将接口里杂乱无章的数据 整合成一个对象，然后再给组件传递数据的时候 只传递这一个对象)
            // （组件拿到数据就只需要面向一个对象开发了）
            this.goods = new Goods(
                data.itemInfo,
                data.columns,
                data.shopInfo.services
            );
            // console.log(this.goods);

            // 3.创建店铺信息对象
            this.shop = new Shop(data.shopInfo);
            // console.log(this.shop);

            // 4.获取商品详情
            this.detialInfo = data.detailInfo;
            // console.log(this.detialInfo);

            // 5.获取商品参数
            this.paramInfo = new GoodsParam(
                data.itemParams.info,
                data.itemParams.rule
            );
            // console.log(this.paramInfo);

            // 6.获取商品评论
            if (data.rate.cRate !== 0) {
                this.comment = data.rate.list[0];
                // console.log(this.comment);
            }
        });

        // 7.获取商品推荐
        getRecommend().then(res => {
            this.recommendInfo = res.data.list
            // console.log('商品推荐:')
            // console.log(this.recommendInfo)
        })

        // 8.给 getThemesTopY 赋值  (对给 this.themesTopY 赋值操作 进行防抖)
        this.getThemesTopY = debounce(() => {
            this.themesTopY = [];
            this.themesTopY.push(0);
            this.themesTopY.push(this.$refs.params.$el.offsetTop);
            this.themesTopY.push(this.$refs.comment.$el.offsetTop);
            this.themesTopY.push(this.$refs.recommend.$el.offsetTop);
            // console.log(this.themesTopY)
            this.themesTopY.push(Number.MAX_VALUE)//向数组末尾 添加最大值 用于区间判断
        }, 100)
    },
    mounted() {
        // 使用 mixins混入 之后 以下公共内容在mixins.js了
        // const refresh = debounce(this.$refs.scroll.refresh, 50);

        // 对方法进行抽取 保存
        // this.itemImgListener = () => {
        //     refresh()
        // }

        // 对 itemImgLoad 进行监听
        // emitter.on('itemImgLoad', this.itemImgListener)

        // emitter.on('itemImgLoad', () => {
        //     refresh()
        // })


    // 在 home.vue detial.vue 都有这些代码：
        // const refresh = debounce(this.$refs.scroll.refresh, 50);
        // this.itemImgListener = () => {
        //     refresh()
        // }
        // emitter.on('itemImgLoad', this.itemImgListener)
    // 于是使用 mixin混入 将各组件公共代码 抽取 (这里不能用ES6  extends 继承，这里是两个对象)

    },
    updated() {
        // console.log(111) 
    },
    methods: {
        ...mapActions(['addCart']),
        imageLoad() {
            this.$refs.scroll.refresh();

        // 在此处，详情里的图片加载完成后这里回调
        // 所以此时图片加载完毕，可以获取offsetTop

            // 将数据传给子组件后，子组件拿到数据 需要渲染 更新DOM 会等一会儿
            this.$nextTick(() => {//下一帧 数据传过去后 再执行此回调函数 保证$el 拿到
                // 刷新 根据最新的数据，对应的DOM已经是被渲染出来了，
                // 但是图片还未被加载出来(目前获取到的offsetTop不包含其中的图片)
                // offsetTop值不对的时候，都是因为图片问题
            // 选择在图片加载完成后的回调方法里进行offsetTop获取
                // this.themesTopY = [];
                // this.themesTopY.push(0);
                // this.themesTopY.push(this.$refs.params.$el.offsetTop);
                // this.themesTopY.push(this.$refs.comment.$el.offsetTop);
                // this.themesTopY.push(this.$refs.recommend.$el.offsetTop);
                // console.log(this.themesTopY)

                this.getThemesTopY()
            })
        },

        // a.点击顶部(tab 商品 参数 评论 推荐)， 滚动到对应主题部分位置
        titleClick(index) {
            // console.log(index)
            this.$refs.scroll.scrollTo(0, -this.themesTopY[index]+44, 100)
        },

        // b.滚动内容，显示对应(tab 商品 参数 评论 推荐) 标题
        contentScroll(position) {
            // console.log(position)
            // 1.获取y值
            const positionY = -position.y;

            // 2.positionY 和主题中的值进行对比
                //思路： themesTopY: [0, 7938, 9120, 9452]
                    // positionY 在 0-7938 间 index = 0
                    // positionY 在 =7938-9120 间 index = 1
                    // positionY 在 9120-9452 间 index = 2

                    // positionY >= 9452  index = 3

            // 方法1：
            // for (let i in this.themesTopY) {
            //     console.log(i)//问题1：这里 i是string，如果i+1 字符串+数字 会不对
            //         // 解决：
            //             // 1. i*1
            //             // 2. parseInt(i)
            //     if (positionY > this.themesTopY[i] && positionY < thisthemesTopY[i + 1]) {
                    
            //     }
            //     //  问题2：最后一个进行了i+1 会取不到
            //             // 解决：将前两种 和 第三种 分开判断
            //             // if (() || ()) {}
            // }

            // 2.positionY 和主题中的值进行对比
            // 方法2：
            let length = this.themesTopY.length;
            // for(let i = 0; i < length; i++) {

            //     // if ((i < length - 1 && positionY > this.themesTopY[i] && positionY < this.themesTopY[i + 1]) || (i === length - 1 && positionY > this.themesTopY[i])) {
            //     //     console.log(i);
            //     //     // 在data中定义 currentIndex 用于保存i
            //     //     this.currentIndex = i;
            //     // }

            //     // 先判断 currentIndex 是否一致，然后再赋值
            //     if (this.currentIndex !== i && ((i < length - 1 && positionY >= this.themesTopY[i] && positionY < this.themesTopY[i + 1]) || (i === length - 1 && positionY >= this.themesTopY[i]))) {
            //         this.currentIndex = i;
            //         // 3.将这个 currentIndex 传入到 title里面(DetialNavBar) 对应标题显示 颜色
            //         this.$refs.nav.currentIndex = this.currentIndex;
            //     }
            // }

            // 普通做法：
                // 条件成立： this.currentIndex = i
                // 条件一：防止赋值的过程 过于频繁
                            // this.currentIndex !== i
                // 条件二： 
                            // ((i < length - 1 && positionY >= this.themesTopY[i] && positionY < this.themesTopY[i + 1]) || (i === length - 1 && positionY >= this.themesTopY[i])))
                            // 将条件二 拆分：
                            // 条件1：判断区间在0和某个数字之间(i < length-1)   (i < length - 1 && positionY >= this.themesTopY[i] && positionY < this.themesTopY[i + 1])
                            // 条件2：判断大于等于1(i === length-1)   (i === length - 1 && positionY >= this.themesTopY[i]))
            
        // 将判断条件进行简化：
            // hack做法：
                // 区间判断去除最后一次
                // 将 themesTopY: [0, 7938, 9120, 9452, Number.MAX_VALUE] 后面添加一个非常大的值   // positionY 在 9452 和 非常大 的值 之间  index = 3
            for (let i = 0; i < length - 1; i++) {// 最后这一层不需要遍历
                if (this.currentIndex !== i && (positionY >= this.themesTopY[i] && positionY < this.themesTopY[i + 1])) {
                    this.currentIndex = i;
                    this.$refs.nav.currentIndex = this.currentIndex;
                }
            }

            // 返回顶部 混入
            this.listenShowBackTop(position)
        },
        // 添加到购物车
        addToCart() {
            // 1.获取商品信息(需要购物车展示的信息)
            const product = {}
            product.image = this.topImages[0];
            product.desc = this.goods.desc;
            product.title = this.goods.title;
            product.price = this.goods.oldPrice;
            product.iid = this.iid;
            // 2.将商品添加到购物车(Vuex)
            // this.$store.commit('addCart', product);//调用mutations 里面的addCart方法

            // 将判断逻辑卸载actions里之后 分发
            // this.$store.dispatch('addCart', product);

            // 点击 添加到购物车，里面会执行一些操作，当操作成功后才是添加成功 方可显示弹窗toast
                // (我如何知道有没有完成操作？) Promise > resolve
                // dispatch 会返回一个 Promise  vuex > actions.js addCart直接返回一个new Promise
            // this.$store.dispatch('addCart', product).then(res => {//这种是调用vuex 中 actions 的方法
            //     console.log(res)//res 为addCart resolve传过来的
            // })

            //这种看起来 是调自己的方法，(这里没有这个方法，需要映射过来) ...mapActions 映射到 methods 里面
            this.addCart(product).then(res => {
                // console.log(res)
                // this.toastShow = true
                // this.toastMsg = res
                // setTimeout(() => {
                //     this.toastShow = false
                //     this.toastMsg = ''
                // }, 1500)


    // 使用插件方式，不适用toas.vue组件方式
                // console.log(res)
                // this.$toast.show(res, 1500)

            })

            

// (如果你在vuex里面做了某个操作，要让外界知道，需要用到Promise)
        }
    },
    // detial.vue这个页面没有做 <keep-alive> 缓存，所以不使用deactivated
    destroyed() {
        emitter.off('itemImgLoad', this.itemImgListener)
    },

    // 笔记：
    // 需求： 联动效果 点击标题滚动到对应的主题
    // 1.在detial中监听标题的点击，获取到index
    // 2.滚动到对应的主题部分
            // 问题：在哪里才能获取到正确的offsetTop？
            // 1.created 肯定不行，压根不能获取元素
            // 2.mounted 也不行，数据还未获取到
            // 3.updated DOM还没有被渲染完
            // 4.$nextTick 也不行，因为图片的高度还没有被计算在内
        // 解决：在图片加载完成后的回调里，获取的高度才是正确的
};
</script>

<style scoped>
#detial {
    position: relative;
    z-index: 9;
    background: #fff;
    /* color:burlywood */
    height: 100vh;
    overflow: hidden;
}
.detial-nav {
    background-color: #fff;
    position: relative;
    z-index: 9;
}
.content {
    height: calc(100% - 44px - 49px);
}
</style>