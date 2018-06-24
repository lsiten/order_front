import * as types from '../types'
import api from '../../fetch/modules/user'
const state = {
  token: '',
  orderList: []
}

const mutations = {
  [types.USER_SET_ORDER_LIST] (state, data) {
    state.orderList = data
  }
}

const getters = {
  user_get_order_list: state => state.orderList
}

const actions = {
  user_get_order_list ({commit}, params) {
    return new Promise((resolve, reject) => {
      api.userGetOrderList(params).then(data => {
        let code = parseInt(data.code)
        if (code === 1) {
          commit(types.USER_SET_ORDER_LIST, data.data)
          resolve(data.data)
        } else {
          reject(data.msg)
        }
      })
    })
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
