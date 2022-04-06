<template>
    <h1>分类</h1>
    <div class="wrapper" ref="wrapper">
        <ul class="content">
        <li>分类列表1</li>
        <li>分类列表2</li>
        <li>分类列表3</li>
        <li>分类列表4</li>
        <li>分类列表5</li>
        <li>分类列表6</li>
        <li>分类列表7</li>
        <li>分类列表8</li>
        <li>分类列表9</li>
        <li>分类列表10</li>
        <li>分类列表11</li>
        <li>分类列表12</li>
        <li>分类列表13</li>
        <li>分类列表14</li>
        <li>分类列表15</li>
        <li>分类列表16</li>
        <li>分类列表17</li>
        <li>分类列表18</li>
        <li>分类列表19</li>
        <li>分类列表20</li>
        <li>分类列表21</li>
        <li>分类列表22</li>
        <li>分类列表23</li>
        <li>分类列表24</li>
        <li>分类列表25</li>
        <li>分类列表26</li>
        <li>分类列表27</li>
        <li>分类列表28</li>
        <li>分类列表29</li>
        <li>分类列表30</li>
        <li>分类列表31</li>
        <li>分类列表32</li>
        <li>分类列表33</li>
        <li>分类列表34</li>
        <li>分类列表35</li>
        <li>分类列表36</li>
        <li>分类列表37</li>
        <li>分类列表38</li>
        <li>分类列表39</li>
        <li>分类列表40</li>
        <li>分类列表41</li>
        <li>分类列表42</li>
        <li>分类列表43</li>
        <li>分类列表44</li>
        <li>分类列表45</li>
        <li>分类列表46</li>
        <li>分类列表47</li>
        <li>分类列表48</li>
        <li>分类列表49</li>
        <li>分类列表50</li>
        <li>分类列表51</li>
        <li>分类列表52</li>
        <li>分类列表53</li>
        <li>分类列表54</li>
        <li>分类列表55</li>
        <li>分类列表56</li>
        <li>分类列表57</li>
        <li>分类列表58</li>
        <li>分类列表59</li>
        <li>分类列表60</li>
        <li>分类列表61</li>
        <li>分类列表62</li>
        <li>分类列表63</li>
        <li>分类列表64</li>
        <li>分类列表65</li>
        <li>分类列表66</li>
        <li>分类列表67</li>
        <li>分类列表68</li>
        <li>分类列表69</li>
        <li>分类列表70</li>
        <li>分类列表71</li>
        <li>分类列表72</li>
        <li>分类列表73</li>
        <li>分类列表74</li>
        <li>分类列表75</li>
        <li>分类列表76</li>
        <li>分类列表77</li>
        <li>分类列表78</li>
        <li>分类列表79</li>
        <li>分类列表80</li>
        <li>分类列表81</li>
        <li>分类列表82</li>
        <li>分类列表83</li>
        <li>分类列表84</li>
        <li>分类列表85</li>
        <li>分类列表86</li>
        <li>分类列表87</li>
        <li>分类列表88</li>
        <li>分类列表89</li>
        <li>分类列表90</li>
        <li>分类列表91</li>
        <li>分类列表92</li>
        <li>分类列表93</li>
        <li>分类列表94</li>
        <li>分类列表95</li>
        <li>分类列表96</li>
        <li>分类列表97</li>
        <li>分类列表98</li>
        <li>分类列表99</li>
        <li>分类列表100</li>
        </ul>
    </div>
    
</template>
<script>
import BScroll from 'better-scroll'
export default {
    name: "Category",
    data() {
        return {
            scroll: null,
        }
    },
    // created组件创建完之后调用，还未挂载模板上
    created() {//在created里不能去取元素，否则undefined、null
        // let wrapper = document.querySelector('.wrapper');
        // new BScroll(wrapper, {

        // })
    },
    mounted() {
        // 在挂载完后使用better-scroll
        // this.scroll = new BScroll(document.querySelector('.wrapper'))
        this.scroll = new BScroll(this.$refs.wrapper, {
            // 想要实时监听滚动位置，需要给它传参数 
            // (probe侦测)
            // probeType: 0 //默认0不侦测 1也不侦测实时位置
            // probeType: 2 //2在手指滚动过程中侦测，手指离开后的惯性滚动过程中不侦测
            probeType: 3,    //只要是滚动 都侦测
            click: true,
            pullUpLoad: true,//上拉加载更多（设置此属性后进行监听）

        })

        // 默认情况下，BScroll是不可以实时监听滚动位置的
        // 实时监听better-scroll滚动到什么位置
        this.scroll.on('scroll', (position) => {
            // console.log(position)
        })
        // position就实时记录了当前滚动到了哪里了


        // 监听上拉加载更多
        this.scroll.on('pullingUp', () => {
            // 监听到这个事件后 回调这个函数
            console.log('上拉加载更多')

            // 发送网络请求，请求更多页数据

            // 等数据请求完成，并且将新数据展示出来之后
            // 调用finishPullUp()以可以执行下次上拉加载
            // this.scroll.finishPullUp()

            setTimeout(() => {//设置定时器防止连续上拉加载
                this.scroll.finishPullUp()
            }, 2000)
        })

        // 对better-scroll进行封装，封装成一个组件.vue，以后哪里需要用到better-scroll直接使用封装的组件
        // 而不是哪里需要用到better-scroll就在哪里引用它
    }
}
</script>
<style scoped>
.wrapper {
    height: 300px;
    border:1px solid #999;
    overflow: hidden;
    /* overflow-y:scroll; */
    /* 这种方式滚动，在移动端会非常卡顿，改为使用better-scroll */
}
</style>