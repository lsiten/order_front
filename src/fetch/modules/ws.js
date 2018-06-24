import fetch from '../api'
export default {
  /* 绑定客户端 */
  wsInitClient (params) {
    return fetch('/message/index', params)
  },
  wsAddFood (params) {
    return fetch('/message/addFood', params)
  },
  wsOffLineClient (params) {
    return fetch('/message/offline', params)
  },
  wsSubmitOrder (params) {
    return fetch('/message/addOrder', params)
  }
}
