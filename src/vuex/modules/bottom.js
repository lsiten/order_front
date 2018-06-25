import api from '../../fetch/modules/ws'
import * as types from '../types'
const state = {
  shoppingBasket: [],
  deleteBasket: [],
  total: 0,
  notes: '',
  AllPrice: 0,
  showBottom: true,
  bottomType: '',
  isInit: false
}
const getters = {
  bottom_get_shopping_basket: state => state.shoppingBasket,
  bottom_get_delete_basket: state => state.deleteBasket,
  bottom_get_total: state => state.total,
  bottom_get_all_price: state => state.AllPrice,
  bottom_get_notes: state => state.notes,
  bottom_get_show_bottom: state => state.showBottom,
  bottom_get_isinit: state => state.isInit,
  bottom_get_bottom_type: state => state.bottomType
}

const mutations = {
  [types.BOTTOM_ADD_FOODS_BASKET] (state, food) {
    let hasFood = false
    let sum = 0
    let AllPrice = 0
    let shopLength = state.shoppingBasket.length
    for (let i = 0; i < shopLength; i++) {
      let item = state.shoppingBasket[i]
      if (item.id === food.id) {
        hasFood = true
        if (food.num > 0) {
          state.shoppingBasket.splice(i, 1, food)
        } else {
          state.shoppingBasket.splice(i, 1)
          state.deleteBasket.push(JSON.parse(JSON.stringify(food)))
          continue
        }
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
    state.deleteBasket = state.shoppingBasket.slice(0)
    state.shoppingBasket = []
  },
  [types.BOTTOM_SET_FOODS_BASKET] (state, basket) {
    state.shoppingBasket = basket
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
      if (item && item.id === food.id) {
        state.deleteBasket.splice(i, 1)
      }
    }
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
  [types.BOTTOM_UPDATE_ORDER_NOTES] (state, notes) {
    state.notes = notes
  },
  [types.BOTTOM_UPDATE_INIT_BASKET] (state, status) {
    state.isInit = status
  }
}

const actions = {
  bottom_add_basket ({commit}, data) {
    if (data.send) {
      let param = JSON.parse(JSON.stringify(data))
      param.food = JSON.stringify(param.food)
      api.wsAddFood(param)
      delete data.send
    }
    commit(types.BOTTOM_ADD_FOODS_BASKET, data.food)
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
  bottom_change_basket_item ({commit}, data) {
    commit(types.BOTTOM_CHANGE_FOODS_BASKET, data.food)
    return new Promise((resolve, reject) => {
      if (data.send) {
        let param = JSON.parse(JSON.stringify(data))
        param.food = JSON.stringify(param.food)
        delete data.send
        api.wsAddFood(param).then(data => {
          resolve(data)
        }).catch(err => {
          reject(err)
        })
      } else {
        resolve()
      }
    })
  },
  bottom_delete_basket_item ({commit}, food) {
    commit(types.BOTTOM_CHANGE_DELETE_BASKET, food)
    return new Promise((resolve, reject) => {
      resolve()
    })
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
