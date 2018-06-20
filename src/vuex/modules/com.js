import api from '../../fetch/modules/com'
const state = {
  main: 0
}

const mutations = {
  DECREMENT_MAIN_COUNTER (state) {
    state.main--
  },
  INCREMENT_MAIN_COUNTER (state) {
    state.main++
  }
}

const actions = {
  getWxConfig ({ commit }, param) {
    // do something async
    return new Promise((resolve, reject) => {
      api.getSignature(param).then(data => {
        let code = parseInt(data.code)
        if (code === 1) {
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
  actions
}
