// 公共方法

// 使用第三方库 引入事件总线 https://blog.csdn.net/weixin_43933771/article/details/119020674
import mitt from 'mitt'
const emitter = mitt()
export default emitter

// 防抖
export function debounce(func, delay) {
    let timer = null;
    return function(...args) {
        if (timer) clearTimeout(timer)//判断timer是否有值，将之前的timer清除掉
            // 如果你有接下来下一件事，那么将之前timer赶紧清除掉
        timer = setTimeout(() => {
            func.apply(this, args)
        }, delay)
    }
}

// 格式化时间(如何将 时间戳 转成 时间格式化字符串 ？常用)
// 1.将时间戳转化成Date对象 (获取 年 月 日)
// cosnt date = new Date(time * 1000)
// 2.将date进行格式化，转成对应的字符串
    // date.getYear() + date.getMonth() + 1
    // fmt.format(date, 'yyyy-MM-dd hh:mm:ss') 年-月-日 时：分：秒
export function timeFormat(time) {
    let date = new Date(time * 1000);
    let month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
    let currentDate = date.getDate() < 10 ? "0" + getDate() : date.getDate();
    let hh = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    let mm = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    return date.getFullYear() + "-" + month + "-" + currentDate + " " + hh + ":" + mm;
}

// 封装格式化时间方法，在DetialComment.vue调用
export function formatDate(date, fmt) {
    // 正则表达式（字符串匹配 多规则）
    // 1.获取年份
    // y 匹配 year 年
    // + 一个或者多个 2019(yyyy) 19(yy)
    // y* 0个或者多个y
    // y? 0个或者1个y
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
        // 拿到yyyy 将 RegExp.$1 替换成后面的结果
        // substr(4 - RegExp.$1.length) 根据yyyy的个数进行截取
    }
    let o = {
        'M+': date.getMonth() + 1,//M Month  m minutes
        'd+': date.getDate(),
        'h+': date.getHours(),//h 12小时 / H 24小时制
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    };
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + '';
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
        }
    }
    return fmt;
}
function padLeftZero (str) {
    // 对时间不足两位数的前边加0 如：3:3:3  03:03:03
    return ('00' + str).substr(str.length);
}