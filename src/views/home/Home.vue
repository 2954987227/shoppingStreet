<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="nav-bar-center">购物街</div>
    </nav-bar>
    <tab-control :titles="tabControlTitles"
                 @tabClick="tabClick"
                 ref="tabControl02"
                 class="fixed"
                 v-show="isTabFixed"/>
    <scroll class="home-content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <home-swiper :banners="banners" ref="hSwiper" @imageLoad="swiperImageLoad"/>
      <recommend-view :recommends="recommends"/>
      <feature-view/>
      <tab-control :titles="tabControlTitles" @tabClick="tabClick" ref="tabControl01"/>
      <goods-list :goods="showGoodsList"></goods-list>
    </scroll>
    <!--组件标签使用@click必须加native-->
    <back-top @click.native="btClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendView from './childComps/RecommendView'
  import FeatureView from './childComps/FeatureView'

  import NavBar from 'components/common/navBar/NavBar'
  import TabControl from 'components/content/tabControl/TabControl'
  import GoodsList from 'components/content/goods/GoodsList'
  import Scroll from 'components/common/scroll/Scroll'
  import BackTop from 'components/content/backTop/BackTop'

  import {getHomeMultidata, getHomeGoods} from "network/home";
  import {debounce} from "common/utils/debounce";


  export default {
    name: "Home",
    components: {
      HomeSwiper,
      RecommendView,
      FeatureView,

      NavBar,
      TabControl,
      GoodsList,
      BackTop,
      Scroll,
    },
    data() {
      return {
        banners: [],
        recommends: [],
        goodsList: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []}
        },
        tabControlTitles: ['流行', '新款', '精选'],
        currentType:'pop',
        // Scroll
        isShowBackTop: false,
        offsetTop: 0,
        isTabFixed:false,
        saveY: 0
      }
    },
    created() {
      this.getHomeMultidata()
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')


    },
    mounted() {
      const refresh = debounce(this.$refs.scroll.refresh, 20)
      this.$bus.$on('itemImageLoad', () => {
        refresh()
      })


    },
    destroyed() {
      console.log('destroyed');
    },
    methods: {
      /**
       * 网络请求相关
       */
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          console.log(res);
          this.banners = res.data.banner.list
          this.recommends = res.data.recommend.list
        })
      },
      getHomeGoods(type) {
        const page = this.goodsList[type].page + 1
        getHomeGoods(type, page).then(res => {
          console.log(res);
          const goodsList = res.data.list
          this.goodsList[type].list.push(...goodsList)
          this.goodsList[type].page += 1
        }).catch(err => {
          console.log(type + '请求失败');
        })
      },

      /**
       * 事件监听相关
       */
      tabClick(index) {
        // console.log(index);
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
        this.$refs.tabControl02.currentIndex = index
        this.$refs.tabControl01.currentIndex = index
      },
      btClick(){
        this.$refs.scroll.scrollTo(0, 0, 500) //500ms内返回顶部
      },
      contentScroll(position) {
        this.isShowBackTop = position.y < -1000

        this.isTabFixed = position.y < -this.offsetTop
      },
      loadMore() {
        this.getHomeGoods(this.currentType)
        this.$refs.scroll.finishPullUp()
      },
      swiperImageLoad() {
        //利用offsetTop属性达到吸顶效果
        //所有组件都有一个$el属性，用于获取组件中元素（标签）
        //element.offsetTop 返回当前元素的相对垂直偏移位置的偏移容器
        this.offsetTop = this.$refs.tabControl01.$el.offsetTop
        console.log(this.offsetTop);
      }

    },
    computed: {
      showGoodsList() {
        console.log('showGoodsList...');
        return this.goodsList[this.currentType].list
      }
    },
    activated: function () {
      // this.$refs.hSwiper.startTimer()

      this.$refs.scroll.scrollTo(0, this.saveY, 0)
      this.$refs.scroll.refresh()
    },
    deactivated: function () {
      // this.$refs.hSwiper.stopTimer()

      this.saveY = this.$refs.scroll.getScrollY()
    },
  }
</script>

<style scoped>
  #home {
    /*padding-top: 44px;*/

    /*视口高度相对屏幕高100%*/
    height: 100vh;
    /*position: relative;*/
  }

  .home-nav {
    background-color: deeppink;
    color: white;

    /*position: fixed;
    left: 0;
    right: 0;
    top: 0;

    z-index: 5;*/
  }

  .fixed {
    position: relative;
    z-index: 5;
  }

  /*.tab-control {
    position: sticky;
    top: 43px;
  }*/

  .home-content {
    overflow: hidden;

    /*height: 400px;*/
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;


  }

  /*.content {
    height: calc(100% - 93px);
    overflow: hidden;

    margin-top: 44px;
  }*/

</style>
