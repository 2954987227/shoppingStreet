<template>
    <div id="detail">
      <detail-nav-bar class="detail-nav-bar"
                      @getTitleIndexClick="getTitleIndexClick"
                      ref="navBar"
                      :titles="['商品', '参数', '评论', '推荐']"
                      :current-index="titleCurrentIndex"/>
      <scroll class="content"
              ref="scroll"
              :pull-upLoad="true"
              :probe-type="3"
              @scroll="contentScroll">
        <detail-swiper :top-images="topImages" @imageLoad="oneLoad"/>
        <detail-base-info :goods="goods"/>
        <DetailShopInfo :shop="shop"/>
        <detail-goods-info :detail-info="detailInfo" @imageLoad="moreLoad"/>
        <detail-param-info ref="params" :paramInfo="paramInfo" @imageLoad="oneLoad"/>
        <detail-comment-info ref="comment" :comment-info="commentInfo"/>
        <goods-list ref="recommend" :goods="recommendInfo"/>
      </scroll>
      <detail-bottom-bar @addToCart="addToCart"/>
      <back-top @click.native="btClick" v-show="isShowBackTop"/>
      <!--<toast :show="show" :message="message"/>-->
    </div>
</template>

<script>
    import DetailNavBar from './childComps/DetailNavBar'
    import DetailSwiper from './childComps/DetailSwiper'
    import DetailShopInfo from './childComps/DetailShopInfo'
    import DetailBaseInfo from './childComps/DetailBaseInfo'
    import DetailGoodsInfo from './childComps/DetailGoodsInfo'
    import DetailParamInfo from './childComps/DetailParamInfo'
    import DetailCommentInfo from './childComps/DetailCommentInfo'
    import DetailBottomBar from './childComps/DetailBottomBar'


    import Scroll from 'components/common/scroll/Scroll'
    import GoodsList from 'components/content/goods/GoodsList'
    import BackTop from 'components/content/backTop/BackTop'
    // import Toast from 'components/common/toast/Toast'



    import {getDetail, Goods, Shop, GoodsParam, getRecommendInfo} from "network/detail";
    import {imgListenerMixin, backTopMixim} from "common/mixin";
    import {debounce} from "common/utils";

    import {mapActions} from 'vuex'

    export default {
      name: "Detail",
      components: {
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        Scroll,
        DetailGoodsInfo,
        DetailParamInfo,
        DetailCommentInfo,
        GoodsList,
        DetailBottomBar,
        BackTop,
        // Toast
      },
      data() {
        return {
          iid: null,
          topImages: [],
          goods: {},
          shop: {},
          detailInfo: {},
          paramInfo: {},
          commentInfo: {},
          recommendInfo: [],
          titleOffsetTop: [],
          titleRefresh: null,
          titleCurrentIndex: 0,
          // message: '',
          // show: false
        }
      },
      created() {
        this.iid = this.$route.query.iid

        getDetail(this.iid).then(res => {
          console.log(res);
          const data = res.result

          //获取轮播图图片
          this.topImages = data.itemInfo.topImages

          //获取商品信息
          this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

          //获取店铺信息
          this.shop = new Shop(data.shopInfo)

          //获取商品信息
          this.detailInfo = data.detailInfo

          //保存参数信息
          this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

          //获取评论信息
            this.commentInfo = data.rate.list[0]
        })

        getRecommendInfo().then(res => {
          console.log(res);
          this.recommendInfo = res.data.list
        })

      },
      mounted() {
        // this.$nextTick(() => {
        //   this.titleOffsetTop = []
        //   this.titleOffsetTop.push(0)
        //   this.titleOffsetTop.push(this.$refs.params.$el.offsetTop)
        //   this.titleOffsetTop.push(this.$refs.comment.$el.offsetTop)
        //   this.titleOffsetTop.push(this.$refs.recommend.$el.offsetTop)
        // })
        this.titleRefresh = debounce(() => {
          if(this.$refs.params && this.$refs.comment && this.$refs.recommend)
            this.$nextTick(() => {
              this.titleOffsetTop = []
              this.titleOffsetTop.push(0)
              this.titleOffsetTop.push(this.$refs.params.$el.offsetTop)
              this.titleOffsetTop.push(this.$refs.comment.$el.offsetTop)
              this.titleOffsetTop.push(this.$refs.recommend.$el.offsetTop)
              this.titleOffsetTop.push(Number.MAX_VALUE)
              console.log(this.titleOffsetTop);
            })
        },1000)
      },
      mixins: [imgListenerMixin, backTopMixim],
      methods: {
        ...mapActions(['addCart']),
        oneLoad() {
          this.$refs.scroll.refresh()
        },
        getTitleIndexClick(index) {
          this.$refs.scroll.scrollTo(0, -this.titleOffsetTop[index], 100)
        },
        moreLoad() {
          this.refresh()
          this.titleRefresh()
        },
        contentScroll(position) {
          this.listenerShowBackTop(position)

          const length = this.titleOffsetTop.length
          const positionY = -position.y

          for(let i = 0; i < length; i++){
            let offsetTop = this.titleOffsetTop[i]
            if(this.titleCurrentIndex !== i && positionY >= offsetTop && positionY < this.titleOffsetTop[i+1]){
              this.titleCurrentIndex = i
              break;
            }
          }
        },
        addToCart() {
          const product = {}
          product.image = this.topImages[0]
          product.title = this.goods.title
          product.desc = this.goods.desc
          product.price = this.goods.nowPrice
          product.iid = this.iid

          this.addCart(product).then(res => {
            // this.show = true
            // this.message = res
            //
            // setTimeout(() => {
            //   this.show = false
            // }, 1000)
            // console.log(this.$toast);
            console.log(res);
            this.$toast.methods.show(res, 10000)

          })

          // this.$store.dispatch('addCart', product).then(res => {
          //   console.log(res);
          // })
        }
      },
      destroyed() {
        this.$bus.$off('itemImageLoad',this.imgLoadListener)
      }
    }
</script>

<style scoped>
  #detail {
    height: 100vh;
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .detail-nav-bar {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .content {
    height: calc(100% - 44px - 58px);
    background-color: #fff;
    overflow: hidden;
    /*position: absolute;*/
    /*top: 44px;*/
    /*bottom: 0;*/
    /*left: 0;*/
    /*right: 0;*/
  }
</style>
