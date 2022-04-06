import { request } from 'network/request.js'
// 详情页
export function getDetial(iid) {
    return request({
        url: '/detail',
        params: {
            iid
        }
    })
}


// 详情-商品推荐数据
export function getRecommend() {//已经在详情页内请求 不用传iid
    return request({
        url: '/recommend'
    })
}


// ES5 定义class
// function person() {}


// ES6里面 定义class
// class person {
    // constructor(name, age)构造函数
    // this.name = name;
    // this.age = age;
// }
// 意思：创建一个person类
// const p = new personalbar('郑宇锋', 18)
// 这样就创建出一个p对象了（包含name，age值）



// (将接口里杂乱无章的数据 整合成一个对象，然后再给组件传递数据的时候 只传递这一个对象)
// （组件拿到数据就只需要面向一个对象开发了）
export class Goods {
    constructor(itemInfo, columns, services) {
        this.title = itemInfo.title
        this.desc = itemInfo.desc
        this.newPrice = itemInfo.price
        this.oldPrice = itemInfo.oldPrice
        this.discount = itemInfo.discountDesc
        this.columns = columns
        this.services = services
        this.realPrice = itemInfo.lowNowPrice
    }
}

// const g = new Goods()
// g.title = ...
// 数据就可以从g这里获取了（将原来3个对象itemInfo columns services放在了一个对象上）
// 到时候就可以将这一个对象g传过去，让组件面向这一个对象进行开发了
// 面向对象封装思想：
    // 把很多从服务器返回的数据 先封装在一个类里面，再来创建对应这个类的对象，然后用这个对象传到下一层组件里面，用这个组件进行展示


    // 判断一个对象是否为空对象(没有key)
    // const obj = {}
    // Object.keys(obj).length !== 0


export class Shop {
    constructor(shopInfo) {
        this.logo = shopInfo.shopLogo;
        this.name = shopInfo.name;
        this.fans = shopInfo.cFans;
        this.sells = shopInfo.cSells;
        this.score = shopInfo.score;
        this.goodsCount = shopInfo.cGoods;
    }
}

// 商品参数
export class GoodsParam {
    constructor(info, rule) {
        this.infos = info.set;
        this.sizes = rule.tables;
        this.image = info.images ? info.images[0] : '';//images可能没有值（某些商品有，某些商品没有）
    }
}