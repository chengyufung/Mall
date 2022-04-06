<template>
    <div class="tab-control">
        <div v-for="(item,index) in titles" 
        :key="item.index" 
        :class="{active: index === currentIndex}" 
        @click="itemClick(index)">
            <span>{{item}}</span>
        </div>
    </div>
</template>
<script>
export default {
    name: 'TabControl',
    props: {
            // 这里不用插槽？因为和分类页面都是显示的文字，没有其他功能，没有必要使用插槽
        // 只需要别人在使用的时候传递文字就行了
        // 然后根基你传了几个文字、文字叫什么，再显示几个
        titles: {
            type: Array,
            default() {
                return []
            }
        }
    },
    data() {
        return {
            currentIndex: 0,
        }
    },
    methods: {
        itemClick(index) {
            this.currentIndex = index;
            // 将点击事件传出去
            this.$emit('tabClick', index);
        }
    }
}
</script>
<style scoped>
.tab-control {
    display: flex;
    background-color: #fff;
}
.tab-control > div {
    flex: 1;
    text-align: center;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
}
.active > span {
    padding-bottom: 5px;
    color: deeppink;
    border-bottom: 3px solid deeppink;
}
</style>