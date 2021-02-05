<template>
    <div class="goods" @click="itemClick">
      <img :src="item.show.img" @load="imageLoad">
      <div class="goods-info">
        <p>{{item.title}}</p>
        <span class="price">¥{{item.price}}</span>
        <span class="collect">{{item.cfav}}</span>
      </div>
    </div>
</template>

<script>
    export default {
      name: "GoodsListItem",
      props: {
        item: {
          type: Object,
          default() {
            return {}
          }
        }
      },
      methods: {
        imageLoad() {
          this.$bus.$emit('itemImageLoad')
        },
        itemClick() {
          // this.$router.push('/detail/'+this.item.iid)
          this.$router.push({
            path: 'detail',
            query: {iid: this.item.iid}
          })
        }
      }
    }
</script>

<style scoped>
  .goods {
    padding-bottom: 40px;
    position: relative;

    width: 48%;
  }
  .goods img {
    width: 100%;
    border-radius: 5px;
  }

  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  /*让文字一行显示，超出部分用...*/
  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: red;
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }

  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: 0;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>
