<template>
    <div class="bottom-bar">
      <div class="check-content">
        <check-button class="check-button"
                      :is-checked="isCheckedAll"
                      @click.native="checkClick"/>
        <span>全选</span>
      </div>

      <div class="price">
        <span>合计：{{totalPrice}}</span>
      </div>

      <div class="calculate">
        <span>去计算({{checkLength}})</span>
      </div>
    </div>
</template>

<script>
    import CheckButton from './CheckButton'

    import {mapGetters} from 'vuex'

    export default {
      name: "BottomBar",
      data() {
        return {
          // totalPrice: 0
        }
      },
      components: {
        CheckButton
      },
      computed: {
        ...mapGetters({
          list: 'getCartList'
        }),
        totalPrice() {
          return '￥' + this.list.filter(item => {
            return item.checked
          }).reduce((value, item) => {
            return value + item.price * item.count
          }, 0).toFixed(2)
        },
        checkLength() {
          return this.list.filter(item => item.checked).length
        },
        isCheckedAll() {
          if(this.list.length === 0) return false
          return !this.list.find(item => !item.checked)
        }
      },
      methods: {
        checkClick() {
          if(this.isCheckedAll){
            this.list.forEach(item => item.checked = false)
          }else{
            this.list.forEach(item => item.checked = true)
          }
        }
      }
    }
</script>

<style scoped>
  .bottom-bar {
    display: flex;

    height: 40px;
    line-height: 40px;
    font-size: 14px;

    background-color: #eee;



  }

  .check-content {
    display: flex;
    align-items: center;
    margin-left: 10px;
    width: 60px;
  }

  .check-button {
    width: 18px;
    height: 18px;
    line-height: 20px;
    margin-right: 5px;
  }

  .price {
    margin-left: 30px;
    flex: 1;
  }

  .calculate {
    width: 80px;
    text-align: center;

    color: #ffffff;
    background-color: #ff5777;
  }
</style>
