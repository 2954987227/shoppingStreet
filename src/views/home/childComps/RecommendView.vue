<template>
    <div class="recommend">
      <div v-for="(recommend, index) in recommends" :key="index" class="recommend-item">
        <a :href="recommend.link">
          <img :src="recommend.image"/>
          <div>{{recommend.title}}</div>
        </a>
      </div>
    </div>
</template>

<script>
    export default {
        name: "RecommendView",
        props: {
          recommends: {
            type: Array,
            default() {
              return []
            }
          }
        }
    }
</script>

<style scoped>
  .recommend {
    display: flex;
    padding: 10px 0 20px;
    border-bottom: 10px solid #eee;
  }

  .recommend-item {
    flex: 1;
    text-align: center;
    font-size: 12px;
  }

  .recommend-item img {
    width: 70px;
    height: 70px;
    margin-bottom: 10px;
  }
</style>
