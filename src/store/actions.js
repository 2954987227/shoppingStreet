import {ADD_COUNTER, ADD_TO_CART} from "./mutation-types";

export default {
  addCart(context, payLoad) {
    //查找之前数组是否有该商品
    // let goods = null
    // for(let item of state.cartList){
    //   if(item.iid === payLoad.iid){
    //     goods = item
    //     break
    //   }
    // }

    return new Promise((resovle, reject) => {
      let goods = context.state.cartList.find(item => item.iid === payLoad.iid)

      if(goods){
        context.commit(ADD_COUNTER, goods)
        resovle('商品数量加一')
      }else{
        payLoad.count = 1
        context.commit(ADD_TO_CART, payLoad)
        resovle('添加新商品')
      }
    })
  }
}
