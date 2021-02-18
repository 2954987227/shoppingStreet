<template>
    <div class="wrapper" ref="wrapper">
      <div class="content">
        <slot></slot>
      </div>
    </div>
</template>

<script>
    import BScroll from 'better-scroll'

    export default {
      name: "Scroll",
      data() {
        return {
          scroll: null
        }
      },
      props: {
        probeType: {
          type: Number,
          default: 0
        },
        pullUpLoad: {
          type: Boolean,
          default: false
        }
      },
      mounted() {
        this.scroll = new BScroll(this.$refs.wrapper, {
          probeType: this.probeType,
          click: true,
          pullUpLoad: this.pullUpLoad
        })

        //监听滑动位置
        this.scroll.on('scroll', position => {
          this.$emit('scroll', position)
        })

        //监听上拉加载更多
        this.scroll.on('pullingUp', () => {
          this.$emit('pullingUp')
        })
      },
      methods: {
        //跳转到指定位置
        scrollTo(x, y, time=300){//默认300ms
          this.scroll && this.scroll.scrollTo(x, y, time)
        },
        //连续上拉加载更多
        finishPullUp() {
          this.scroll && this.scroll.finishPullUp()
        },
        //重新计算内容高度
        refresh() {
          console.log('refresh...');
          this.scroll && this.scroll.refresh()
        },
        getScrollY() {
          return this.scroll ? this.scroll.y : 0
        }
      }
    }
</script>

<style scoped>
  /*.content {*/
    /*height: 4800px;*/
  /*}*/
</style>
