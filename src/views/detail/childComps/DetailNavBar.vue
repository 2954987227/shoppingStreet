<template>
  <div class="detail-nav-bar">
    <nav-bar>
      <div slot="nav-bar-left" class="back"  @click="backClick">
        <img src="~assets/img/common/back.svg">
      </div>
      <div slot="nav-bar-center" class="titles">
        <div v-for="(item, index) in this.titles"
             :key="index" class="title-item"
             :class="{active : currentIndex === index}"
             @click="itemClick(index)">{{item}}</div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
    import NavBar from 'components/common/navBar/NavBar'

    export default {
      name: "DetailNavBar",
      components: {
        NavBar
      },
      data() {
        return {
          titles: ['商品', '参数', '评论', '推荐'],
          currentIndex: 0
        }
      },
      methods: {
        itemClick(index) {
          this.currentIndex = index
        },
        backClick() {
          this.$router.back()
        }
      }
    }
</script>

<style scoped>
  .titles {
    display: flex;
    font-size: 14px;
  }

  .title-item {
    flex: 1;
  }

  .active {
    color: red;
  }

  .back img{
    padding-top: 11px;

    width: 20px;
    height: 20px;
  }
</style>
