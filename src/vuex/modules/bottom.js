import * as types from '../types'
const state = {
  shoppingBasket: [],
  deleteBasket: [],
  total: 0,
  AllPrice: 0
}
const getters = {
  bottom_get_shopping_basket: state => state.shoppingBasket,
  bottom_get_delete_basket: state => state.deleteBasket,
  bottom_get_total: state => state.total,
  bottom_get_all_price: state => state.AllPrice
}

const mutations = {
  [types.BOTTOM_ADD_FOODS_BASKET] (state, food) {
    let hasFood = false
    let sum = 0
    let AllPrice = 0
    let shopLength = state.shoppingBasket.length
    for (let i = 0; i < shopLength; i++) {
      let item = state.shoppingBasket[i]
      if (item.id === food.id && food.num > 0) {
        state.shoppingBasket.splice(i, 1, food)
        hasFood = true
      }
      sum += item.num
      AllPrice += item.num * item.price
    }
    if (!hasFood && food.num > 0) {
      state.shoppingBasket.push(food)
      sum += food.num
      AllPrice += food.num * food.price
    }

    state.total = sum
    state.AllPrice = AllPrice
  },
  [types.BOTTOM_CLEAR_FOODS_BASKET] (state) {
    state.total = 0
    state.AllPrice = 0
    state.shoppingBasket = []
  },
  [types.BOTTOM_CHANGE_FOODS_BASKET] (state, food) {
    let sum = 0
    let AllPrice = 0
    let shopLength = state.shoppingBasket.length
    for (let i = 0; i < shopLength; i++) {
      let item = state.shoppingBasket[i]
      if (item && item.id === food.id) {
        if (food.num <= 0) {
          state.shoppingBasket.splice(i, 1)
          state.deleteBasket.push(JSON.parse(JSON.stringify(food)))
        } else {
          state.shoppingBasket.splice(i, 1, JSON.parse(JSON.stringify(food)))
          sum += food.num
          AllPrice += food.num * food.price
        }
      } else if (item) {
        sum += item.num
        AllPrice += item.num * item.price
      }
    }
    state.total = sum
    state.AllPrice = AllPrice
  },
  [types.BOTTOM_CHANGE_DELETE_BASKET] (state, food) {
    let shopLength = state.deleteBasket.length
    for (let i = 0; i < shopLength; i++) {
      let item = state.deleteBasket[i]
      if (item.id === food.id) {
        state.deleteBasket.splice(i, 1)
      }
    }
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
  },
  bottom_change_basket_item ({commit}, food) {
    commit(types.BOTTOM_CHANGE_FOODS_BASKET, food)
    return new Promise((resolve, reject) => {
      resolve()
    })
  },
  bottom_delete_basket_item ({commit}, food) {
    commit(types.BOTTOM_CHANGE_DELETE_BASKET, food)
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
