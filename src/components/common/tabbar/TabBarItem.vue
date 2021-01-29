<template>
  <div class="tab-bar-item" @click="itemClick" :style="activeStyle">
    <slot name="item-icon">
      <div class="iconfont icontabbarhome"></div>
    </slot>
    <slot name="item-text">
      <span>首页</span>
    </slot>
  </div>
</template>

<script>
    export default {
      name: "TabBarItem",
      data() {
        return {
          //isActive: true
        }
      },
      props: {
        path: String,
        activeColor: {
          style: String,
          default: 'red'
        }
      },
      computed: {
        isActive() {
          return this.$route.path.indexOf(this.path) != -1
        },
        activeStyle() {
          return this.isActive ? {color: this.activeColor} : {}
        }
      },
      methods: {
        itemClick() {
          this.$router.replace(this.path)
        }
      }
    }
</script>

<style scoped>
  .tab-bar-item {
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 14px;
  }

  .tab-bar-item .iconfont {
    font-size: 24px;
    margin-top: 3px;
    margin-bottom: -2px;

  }
/*

  .active {
    color: red;
  }
*/

</style>
