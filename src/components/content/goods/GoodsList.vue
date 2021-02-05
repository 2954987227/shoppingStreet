<template>
    <div class="goods-list">
      <goods-list-item v-for="(item, index) in goods" :key="index" :item="item"/>
    </div>
</template>

<script>
    import GoodsListItem from './GoodsListItem'

    export default {
        name: "GoodsList",
        props: {
          goods: {
            type: Array,
            default() {
              return []
            }
          },
          currentType: String
        },
        components: {
          GoodsListItem
        }
    }
</script>

<style scoped>
  .goods-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;

    padding: 3px;
  }
</style>
