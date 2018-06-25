import api from '../../fetch/modules/ws'
import * as types from '../types'
const state = {
  client_id: ''
}
const getters = {
  ws_get_client_id: state => state.client_id
}
const mutations = {
  [types.WS_STORE_CLIENT_ID] (state, id) {
    state.client_id = id
  },
  [types.WS_CLEAR_CLIENT_ID] (state) {
    state.client_id = ''
  }
}

const actions = {
  // 绑定客户端
  ws_bind_client ({commit}, params) {
    return new Promise((resolve, reject) => {
      api.wsInitClient(params).then(data => {
        resolve(data)
        commit(types.WS_STORE_CLIENT_ID, params.client_id)
      }).catch(err => {
        reject(err.msg)
      })
    })
  },
  // 下线
  ws_offline_client ({commit}, params) {
    return new Promise((resolve, reject) => {
      api.wsOffLineClient(params).then(data => {
        resolve(data)
        commit(types.WS_CLEAR_CLIENT_ID)
      }).catch(err => {
        reject(err.msg)
      })
    })
  },
  // 删除food
  ws_remove_food ({commit}, params) {
    return new Promise((resolve, reject) => {
      let data = JSON.parse(JSON.stringify(params))
      data.food = JSON.stringify(data.food)
      api.wsAddFood(data).then(data => {
        let code = parseInt(data.code)
        if (code === 1) {
          resolve(data)
        } else {
          reject(data.msg)
        }
      }).catch(err => {
        reject(err)
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
