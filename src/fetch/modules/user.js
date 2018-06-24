import fetch from '../api'
export default {
  /* 绑定客户端 */
  userGetOrderList (params) {
    return fetch('/user/getOrder', params)
  }
}
