<template>
    <ul class="recommend">
        <li v-for="item in recommends" :key="item.index">
            <a :href="item.link">
                <img :src="item.image" alt="">
                <span>{{item.title}}</span>
            </a>
        </li>
    </ul>
</template>
<script>
export default {
    name: 'RecommendView',
    props: {
        recommends: {
            type: Array,
            function() {
                return []
            }
        }
    }
}
</script>
<style scoped>
.recommend {
    display:flex;
    padding: 20px 10px 30px;
    border-bottom: 10px solid #eee;
}
.recommend li {
    flex: 1;
    text-align:center;
    font-size: 14px;
}
.recommend a img {
    width: 65px;
    margin-bottom:10px;
}
.recommend a span {
    color: #666;
    display:block;
}
</style>

