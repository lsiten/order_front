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
  }
}

const actions = {
  ws_bind_client ({commit}, params) {
    return new Promise((resolve, reject) => {
      api.wsInitClient(params).then(data => {
        resolve(data)
        commit(types.WS_STORE_CLIENT_ID, params.client_id)
      }).catch(err => {
        reject(err.msg)
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
