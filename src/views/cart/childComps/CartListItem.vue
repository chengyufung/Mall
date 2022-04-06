<template>
    <div class="product">
        <check-button class="choose-item" @click="checkBar" :isChecked="product.checked" />
        <div class="info-item">
            <img :src="product.image" alt="">
            <div class="info-item-right">
                <p class="desc">{{product.desc}}</p>
                <p class="title">{{product.title}}</p>
                <div class="item-num clear-fix">
                    <span class="price">{{product.price}}</span>
                    <span class="count">x{{product.count}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton"

export default {
    name: 'CartListItem',
    props: {
        product: {
            type: Object,
            default () {
                return {}
            }
        }
    },
    components: {
        CheckButton,
    },
    data() {
        return {
            checkItem: false,
        }
    },
    methods: {
        checkBar() {
            this.product.checked = !this.product.checked
        }
    }
}
</script>

<style scoped>
.product {
    border-bottom: 1px solid #333;
    padding: 10px 5px;
}
.choose-item {
    vertical-align: middle;
    display: inline-block;
    padding-right: 5px;;
}
.info-item {
    vertical-align: middle;
        display: inline-block;
    width: calc(100% - 30px);
}
.info-item > img {
    border-radius: 3px;
    vertical-align: middle;
    width: 80px;
}
.info-item-right {
    display: inline-block;
    vertical-align: middle;
    width: calc(100% - 80px);
    padding: 8px;
    box-sizing: border-box;
}
.info-item-right > p {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.desc {
    font-size: 15px;
}
.title {
    font-size: 13px;
    padding: 10px 0 15px;
}
.item-num {
    /* padding-top: 15px; */
}
.price {
    color: deeppink;
    font-size: 15px;
}
.count {
    float: right;
    font-size: 14px;
}
</style>