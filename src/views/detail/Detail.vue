<template>
    <div id="detail">
      <detail-nav-bar class="detail-nav-bar"/>
      <scroll class="content" ref="scroll" :pullUpLoad="true">
        <detail-swiper :topImages="topImages" @imageLoad="load"/>
        <detail-base-info :goods="goods"/>
        <DetailShopInfo :shop="shop"/>
        <detail-goods-info :detail-info="detailInfo" @imageLoad="load"/>
        <detail-param-info :paramInfo="paramInfo"/>
      </scroll>
    </div>
</template>

<script>
    import DetailNavBar from './childComps/DetailNavBar'
    import DetailSwiper from './childComps/DetailSwiper'
    import DetailShopInfo from './childComps/DetailShopInfo'
    import DetailBaseInfo from './childComps/DetailBaseInfo'
    import DetailGoodsInfo from './childComps/DetailGoodsInfo'
    import DetailParamInfo from './childComps/DetailParamInfo'

    import Scroll from 'components/common/scroll/Scroll'


    import {getDetail, Goods, Shop, GoodsParam} from "network/detail";

    export default {
      name: "Detail",
      components: {
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        Scroll,
        DetailGoodsInfo,
        DetailParamInfo
      },
      data() {
        return {
          iid: null,
          topImages: [],
          goods: {},
          shop: {},
          detailInfo: {},
          paramInfo: {}
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
        })
      },
      mounted() {

      },
      methods: {
        load() {
          this.$refs.scroll.refresh()
        }
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
    height: calc(100% - 44px);
    /*position: absolute;*/
    /*top: 44px;*/
    /*bottom: 0;*/
    /*left: 0;*/
    /*right: 0;*/
  }
</style>
