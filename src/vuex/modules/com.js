import api from '../../fetch/modules/com'
import * as types from '../types'
const state = {
  main: 0,
  deskId: localStorage.getItem('lsiten_desk_id') || 0
}
const getters = {
  com_get_desk_id: state => state.deskId
}

const mutations = {
  DECREMENT_MAIN_COUNTER (state) {
    state.main--
  },
  INCREMENT_MAIN_COUNTER (state) {
    state.main++
  },
  [types.COM_SET_DESK_ID] (state, id) {
    state.deskId = id
    localStorage.setItem('lsiten_desk_id', id)
  },
  [types.COM_STORE_DESK_INFO] (state, data) {
    localStorage.setItem('lsiten_desk_info', JSON.stringify(data))
  },
  [types.COM_CLEAR_DESK] (state) {
    localStorage.removeItem('lsiten_desk_info')
    localStorage.removeItem('lsiten_desk_id')
  }
}

const actions = {
  getWxConfig ({ commit }, param) {
    // do something async
    return new Promise((resolve, reject) => {
      api.getWxConfig(param).then(data => {
        let code = parseInt(data.code)
        if (code === 1) {
          resolve(data.data)
        } else {
          reject(data.msg)
        }
      })
    })
  },
  com_check_desk_id ({ commit }, param) {
    return new Promise((resolve, reject) => {
      api.checkDeskId({deskid: param}).then(data => {
        let code = parseInt(data.code)
        if (code === 1) {
          commit(types.COM_SET_DESK_ID, param)
          commit(types.COM_STORE_DESK_INFO, data.data)
          resolve(data.data)
        } else {
          reject(data.msg)
        }
      })
    })
  },
  com_clear_desk_info ({ commit }) {
    commit(types.COM_CLEAR_DESK)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
