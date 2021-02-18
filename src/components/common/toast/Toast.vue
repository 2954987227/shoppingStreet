<template>
    <div class="toast" v-show="isShow">
      <span>{{message}}</span>
    </div>
</template>

<script>
    export default {
      name: "Toast",
      data() {
        return {
          isShow: false,
          message: ''
        }
      },
      methods: {
        show(message='默认参数', duration=1000) {
          console.log('------');
          this.isShow = true;
          this.message = message;

          setTimeout(() => {
            this.isShow = false;
            this.message = '';
          }, duration)
        }
      }
    }
</script>

<style scoped>
  .toast{
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 999;

    padding: 8px 10px;
    transform: translate(-50%, -50%);

    color: #fff;
    background-color: rgba(0,0,0,0.7);
  }
</style>
