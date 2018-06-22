import * as types from '../types'
const state = {
  shoppingBasket: [],
  total: 0,
  AllPrice: 0
}
const getters = {
  bottom_get_shopping_basket: state => state.shoppingBasket,
  bottom_get_total: state => state.total,
  bottom_get_all_price: state => state.AllPrice
}

const mutations = {
  [types.BOTTOM_ADD_FOODS_BASKET] (state, food) {
    let hasFood = false
    let sum = 0
    let AllPrice = 0
    state.shoppingBasket.map(item => {
      if (item.id === food.id) {
        item.num = food.num
        hasFood = true
      }
      sum += item.num
      AllPrice += item.num * item.price
    })
    if (!hasFood) {
      state.shoppingBasket.push(food)
      sum += food.num
      AllPrice += food.num * food.price
    }

    state.total = sum
    state.AllPrice = AllPrice
  },
  [types.BOTTOM_CLEAR_FOODS_BASKET] (state, food) {
    state.total = 0
    state.AllPrice = 0
    state.shoppingBasket = []
  }
}

const actions = {
  bottom_add_basket ({commit}, food) {
    commit(types.BOTTOM_ADD_FOODS_BASKET, food)
  },
  bottom_clear_basket ({commit}, food) {
    commit(types.BOTTOM_CLEAR_FOODS_BASKET)
    return new Promise((resolve, reject) => {
      resolve()
    })
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
