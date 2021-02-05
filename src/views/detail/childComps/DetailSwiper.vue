<template>
  <swiper ref="swiper" v-if="topImages.length" class="detail-swiper">
    <swiper-item v-for="(item, index) in topImages" :key="index">
      <img :src="item" @load="imageLoad">
    </swiper-item>
  </swiper>
</template>

<script>
    import {Swiper, SwiperItem} from 'components/common/swiper'

    export default {
      name: "DetailSwiper",
      components: {
        Swiper,
        SwiperItem
      },
      data() {
        return {
          isLoad: false
        }
      },
      props: {
        topImages: {
          type: Array,
          default() {
            return []
          }
        }
      },
      methods: {
        stopTimer() {
          this.$refs.swiper.stopTimer()
        },
        startTimer() {
          if (this.$refs.swiper) {
            this.$refs.swiper.startTimer()
          }
        },
        imageLoad() {
          if(!this.isLoad){
            this.$emit('imageLoad')
            this.isLoad = !this.isLoad
          }
        }
      }
    }
</script>

<style scoped>
  .detail-swiper {
    height: 300px;
    text-align: center;
  }
</style>
