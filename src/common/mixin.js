import {debounce} from "./utils";

export const imgListenerMixin = {
  data() {
    return {
      imgLoadListener: null,
      refresh: null
    }
  },
  mounted() {
    this.refresh = debounce(this.$refs.scroll.refresh, 1000)
    this.imgLoadListener = () => {
      this.refresh()
    }

    this.$bus.$on('itemImageLoad',this.imgLoadListener)

    console.log('mixin...');
  }
}

export const backTopMixim = {
  data() {
    return {
      isShowBackTop: false
    }
  },
  methods: {
    listenerShowBackTop(position){
      this.isShowBackTop = position.y < -1000
    },
    btClick(){
      this.$refs.scroll.scrollTo(0, 0, 500) //500ms内返回顶部
    }
  }
}
