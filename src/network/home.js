// 封装首页的所有请求，对所有请求URL进行管理，避免请求参数和vue逻辑代码耦合一起
import { request } from 'network/request.js'

export function getHomeMultidata() {
    return request({
        url: '/home/multidata'
    })
}

// 函数调用：
//     压入函数栈（保存着函数调用过程中所有临时变量）
//         函数调用结束（弹出函数栈，释放所有变量）
// function test() {

// }
// test()