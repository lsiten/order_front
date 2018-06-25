import api from '../../fetch/modules/ws'
import * as types from '../types'
const state = {
  shoppingBasket: [],
  total: 0,
  notes: '',
  AllPrice: 0,
  showBottom: true,
  bottomType: '',
  isInit: false,
  basketChange: false,
  deleteFood: []
}
const getters = {
  bottom_get_shopping_basket: state => state.shoppingBasket,
  bottom_get_total: state => state.total,
  bottom_get_all_price: state => state.AllPrice,
  bottom_get_notes: state => state.notes,
  bottom_get_show_bottom: state => state.showBottom,
  bottom_get_isinit: state => state.isInit,
  bottom_get_bottom_type: state => state.bottomType,
  bottom_get_delete_food: state => state.deleteFood,
  bottom_get_basket_change: state => state.basketChange
}

const mutations = {
  [types.BOTTOM_ADD_FOODS_BASKET] (state, food) {
    let hasFood = false
    let sum = 0
    let AllPrice = 0
    let shopLength = state.shoppingBasket.length
    for (let i = 0; i < shopLength; i++) {
      let item = state.shoppingBasket[i]
      if (item) {
        if (item.id === food.id) {
          hasFood = true
          if (food.num > 0) {
            state.shoppingBasket.splice(i, 1, food)
          } else {
            state.shoppingBasket.splice(i, 1)
            let key = food.id + '_' + food.cate_id
            state.deleteFood.indexOf(key) < 0 && state.deleteFood.push(key)
            continue
          }
        }
        sum += item.num
        AllPrice += item.num * item.price
      }
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
  [types.BOTTOM_SET_FOODS_BASKET] (state, basket) {
    state.shoppingBasket = basket
  },
  [types.BOTTOM_SET_ISCHANGE_BASKET] (state, basketchange) {
    state.basketChange = basketchange
  },
  [types.BOTTOM_SHOW_BOTTOM] (state, showBottom) {
    state.showBottom = showBottom
  },
  [types.BOTTOM_SET_BOTTOM_TYPE] (state, type) {
    state.bottomType = type
  },
  [types.BOTTOM_UPDATE_FOODS_BASKET] (state) {
    let sum = 0
    let AllPrice = 0
    let shopLength = state.shoppingBasket.length
    for (let i = 0; i < shopLength; i++) {
      let item = state.shoppingBasket[i]
      sum += item.num
      AllPrice += item.num * item.price
    }
    state.total = sum
    state.AllPrice = AllPrice
  },
  [types.BOTTOM_CLEAR_DELETE_BASKET] (state) {
    state.deleteFood = []
  },
  [types.BOTTOM_UPDATE_ORDER_NOTES] (state, notes) {
    state.notes = notes
  },
  [types.BOTTOM_UPDATE_INIT_BASKET] (state, status) {
    state.isInit = status
  }
}

const actions = {
  bottom_add_basket ({commit}, data) {
    return new Promise((resolve, reject) => {
      if (data.send) {
        delete data.send
        let param = JSON.parse(JSON.stringify(data))
        param.food = JSON.stringify(param.food)
        api.wsAddFood(param)
      }
      commit(types.BOTTOM_ADD_FOODS_BASKET, data.food)
      resolve()
    })
  },
  bottom_update_basket_total ({commit}) {
    commit(types.BOTTOM_UPDATE_FOODS_BASKET)
  },
  bottom_clear_basket ({commit}, param) {
    commit(types.BOTTOM_CLEAR_FOODS_BASKET)
    return new Promise((resolve, reject) => {
      api.wsclearBasketData(param).then(data => {
        let code = parseInt(data.code)
        if (code === 1) {
          resolve(data.data)
        } else {
          reject(data.msg)
        }
      })
    })
  },
  bottom_clear_delete_basket ({commit}) {
    commit(types.BOTTOM_CLEAR_DELETE_BASKET)
  },
  bottom_set_basket_change ({commit}, ischange) {
    commit(types.BOTTOM_SET_ISCHANGE_BASKET, ischange)
  },
  bottom_set_show ({commit}, showBottom) {
    commit(types.BOTTOM_SHOW_BOTTOM, showBottom)
    return new Promise((resolve, reject) => {
      resolve()
    })
  },
  bottom_set_type ({commit}, type) {
    commit(types.BOTTOM_SET_BOTTOM_TYPE, type)
    return new Promise((resolve, reject) => {
      resolve()
    })
  },
  bottom_submit_order ({commit}, param) {
    return new Promise((resolve, reject) => {
      api.wsSubmitOrder(param).then(data => {
        let code = parseInt(data.code)
        if (code === 1) {
          commit(types.BOTTOM_CLEAR_FOODS_BASKET)
          commit(types.BOTTOM_UPDATE_FOODS_BASKET)
          resolve(data.data)
        } else {
          if (code === 60004) {
            reject(code)
          }
          reject(data.msg)
        }
      })
    })
  },
  // 更新订单备注
  bottom_update_notes ({commit}, notes) {
    commit(types.BOTTOM_UPDATE_ORDER_NOTES)
  },
  // 获取购物车缓存
  bottom_get_basket ({commit}, params) {
    return new Promise((resolve, reject) => {
      api.wsGetBasketData(params).then(data => {
        let code = parseInt(data.code)
        if (code === 1) {
          commit(types.BOTTOM_SET_FOODS_BASKET, data.data)
          commit(types.BOTTOM_UPDATE_FOODS_BASKET)
          resolve(data.data)
        } else {
          reject(data.msg)
        }
      })
    })
  },
  bottom_init_basket ({commit}, isInit) {
    commit(types.BOTTOM_UPDATE_INIT_BASKET, isInit)
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
