import {ADD_COUNTER, ADD_TO_CART} from "./mutation-types";

export default {
  //mutations中尽量让每个方法功能单一
  [ADD_COUNTER](state, payLoad) {
    payLoad.count += 1
  },
  [ADD_TO_CART](state, payLoad) {
    payLoad.checked = true
    state.cartList.push(payLoad)
  }
}
