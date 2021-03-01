<template>
    <div id="cart">
      <nav-bar class="cart-nav">
        <div slot="nav-bar-center">购物车({{length }})</div>
      </nav-bar>
      <cart-list/>
      <bottom-bar/>
    </div>
</template>

<script>
    import NavBar from 'components/common/navBar/NavBar'

    import CartList from './childComps/CartList'
    import BottomBar from './childComps/BottomBar'

    import {mapGetters} from 'vuex'

    export default {
      name: "Cart",
      components: {
        NavBar,
        CartList,
        BottomBar
      },
      computed: {
        ...mapGetters({
          length: 'getCartLength'
        })
      }
    }
</script>

<style scoped>
  #cart {
    height: 100vh;
  }
  .cart-nav {
    background-color: deeppink;
    color: white;
  }

  .bottom-bar {

  }
</style>
