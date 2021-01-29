<template>
  <tab-bar>
    <tab-bar-item path="/home">
      <div slot="item-icon" class="iconfont icontabbarhome"></div>
      <span slot="item-text">首页</span>
    </tab-bar-item>
    <tab-bar-item path="/category" activeColor="blue">
      <div slot="item-icon" class="iconfont iconTABbar1"></div>
      <span slot="item-text">分类</span>
    </tab-bar-item>
    <tab-bar-item path="/cart" activeColor="green">
      <div slot="item-icon" class="iconfont iconicontabbarshoppingup"></div>
      <span slot="item-text">购物车</span>
    </tab-bar-item>
    <tab-bar-item path="/profile" activeColor="yellow">
      <div slot="item-icon" class="iconfont iconTABbar"></div>
      <span slot="item-text">我的</span>
    </tab-bar-item>
  </tab-bar>
</template>

<script>
  import TabBar from 'components/common/tabbar/TabBar'
  import TabBarItem from 'components/common/tabbar/TabBarItem'

  export default {
      name: "MainTabBar",
      components: {
        TabBar,
        TabBarItem
      }
    }
</script>

<style scoped>

</style>
