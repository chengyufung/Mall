<template>
    <div class="comment" v-if="Object.keys(comment).length !== 0">
        <div class="comment-title">
            <span>用户评价</span>
            <a href="#">更多</a>
        </div>
        <div class="comment-item">
            <div class="user">
                <img :src="comment.user.avatar" alt />
                <span>{{ comment.user.uname }}</span>
            </div>
            <div class="content">
                <p>{{ comment.content }}</p>
                <p>
                    <span>{{showDate}}</span>
                    {{ comment.style }}
                </p>
                <div class="comment-img">
                    <img v-for="item in comment.images" :key="item" :src="item" alt="">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { timeFormat,formatDate } from "common/utils";
export default {
    name: "DetialComment",
    props: {
        comment: {
            type: Object,
            default() {
                return {};
            }
        }
    },
    // comment.created 时间戳，需要进行过滤，vue3 取消了filter属性，使用computed 处理
    computed: {
        showDate(value) {
            // console.log(timeFormat(this.comment.created * 1000))
            // 1.将时间戳转成Date对象
            const date = new Date(this.comment.created * 1000);

            // 2.将date进行格式化
            return formatDate(date, 'yyyy-MM-dd')
        }
    }
};
</script>

<style scoped>
.comment-title {
    display: flex;
    font-size: 14px;
    padding: 10px 0;
}
.comment-title span {
    margin: auto;
    margin-left: 10px;
}
.comment-title a {
    margin: auto;
    margin-right: 10px;
}
.user {
    padding: 0 10px 10px;
}
.user img {
    border-radius: 100%;
    width: 50px;
    vertical-align: middle;
}
.user span {
    vertical-align: middle;
    margin-left: 10px;
}
.content {
    padding: 0 10px 10px;
    font-size: 14px;
    color: #666;
}
.content p {
    margin-bottom: 5px;
}
.comment-img img {
    width: 60px;
    margin-right: 5px;
}
</style>