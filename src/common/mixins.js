// 混入 (两个组价间 公共代码)
import { debounce } from "common/utils"
import emitter from "common/utils"
import BackTop from 'components/content/backtop/BackTop'

export const itemListenerMixin = {
    data () {
        return {
            itemImgListener: null
        }
    },
    mounted () {
        const refresh = debounce(this.$refs.scroll.refresh, 50);
        this.itemImgListener = () => {
            refresh()
        }
        emitter.on('itemImgLoad', this.itemImgListener)
    }
}

export const backTopMixin = {
    data() {
        return {
            isShowBackTop: false,
        }
    },
    components: {
        BackTop
    },
    methods: {
        // 返回顶部
        backTopClick() {
            this.$refs.scroll.scrollTo(0, 0, 500)
        },
        listenShowBackTop (position) {
            this.isShowBackTop = (-position.y) > 1000
        }
    }
}