<template>
  <div class="goods">
      <goods-list-item v-for="item in goods" :key="item.key" :goodsItem="item"/>
  </div>
</template>

<script>
import GoodsListItem from './GoodsListItem.vue'
export default {
    name: 'GoodsList',
    props: {
        goods: {
            type: Array,
            default() {
                return []
            }
        }
    },
    components: {
        GoodsListItem
    }
}
</script>

<style scoped>
.goods {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    /* 均匀排列每个元素 */
}
</style>