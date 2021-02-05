<template>
    <div class="tab-control">
      <div v-for="(item, index) in titles" :key="index"
           class="tab-control-item"
           :class="{active: currentIndex === index}"
           @click="itemClick(index)">
        <span>{{item}}</span>
      </div>
    </div>
</template>

<script>
    export default {
        name: "TabControl",
        data() {
          return {
            currentIndex: 0
          }
        },
        props: {
          titles: {
            type: Array,
            default() {
              return []
            }
          }
        },
        methods: {
          itemClick(index) {
            this.currentIndex = index
            this.$emit('tabClick', index)
          }
        }
    }
</script>

<style scoped>
  .tab-control {
    display: flex;
    text-align: center;
    font-size: 15px;
    height: 40px;
    line-height: 40px;
    background-color: #fff;

    z-index: 5;
  }

  .tab-control-item {
    flex: 1;
  }

  .active {
    color: red;
  }

  .active span {
    padding: 5px;
    border-bottom: 2px solid red;
  }
</style>
