<template>
    <nav-bar class="home-nav">
        <template v-slot:center><div>购物中心</div>
    </template>
    </nav-bar>
</template>
<script>
import NavBar from 'components/common/navbar/NavBar.vue'
import { getHomeMultidata } from 'network/home.js'
// 只有用default导出才能删掉大括号{}
export default {
    name: "Home",
    components: {
        NavBar
    },
    data() {
        return {
            // 将请求过来的数据存储在data
            // result: null,
            banners: [],
            recommend: [],
            dKeyword: [],
            keywords: []
        }
    },
    created() {
        // 1.请求多个数据
        getHomeMultidata().then(res => {
            // this.result = res
            this.banners = res.data.banner.list;
            this.recommend = res.data.recommend.list;
            this.dKeyword = res.data.dKeyword.list;
            this.keywords = res.data.keywords.list;
            console.log(res)
        })
    },
}
</script>
<style scoped>
.home-nav {
    background: greenyellow;
}
</style>