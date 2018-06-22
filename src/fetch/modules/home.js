import fetch from '../api'
export default {
  /* 获取banner */
  getBanners (params) {
    return fetch('/index/getBanners', params)
  },
  /* 获取食物分类 */
  getCategorys (params) {
    return fetch('/index/getCategorys', params)
  },
  /* 获取食物 */
  getFoods (params) {
    return fetch('/index/getFoods', params)
  }
}
