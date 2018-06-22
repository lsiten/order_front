import api from '../../fetch/modules/home'
import * as types from '../types'
const state = {
  banners: [],
  category: [],
  foods: [],
  cate_current_page: 1,
  cate_hasmore: true,
  cate_page_size: 10,
  food_current_page: 1,
  food_hasmore: true,
  food_page_size: 10
}
const getters = {
  home_get_banners: state => state.banners,
  home_get_cate_current_page: state => state.cate_current_page,
  home_get_cate_page_size: state => state.cate_page_size,
  home_get_categorys: state => state.category,
  home_get_food_current_page: state => state.food_current_page,
  home_get_food_page_size: state => state.food_page_size,
  home_get_foods: state => state.foods,
  home_get_foods_hasmore: state => state.food_hasmore
}

const mutations = {
  [types.HOME_SET_BANNERS] (state, banners) {
    state.banners = banners
  },
  [types.HOME_SET_CATEGORY] (state, category) {
    let total = category.total
    let AllPage = Math.ceil(total / state.cate_page_size)
    AllPage < state.cate_current_page && (state.cate_hasmore = false)
    state.category = [...state.category, ...category.list]
  },
  [types.HOME_ADD_CATEGORY_PAGE] (state) {
    state.cate_current_page++
  },
  [types.HOME_SET_FOODS] (state, params) {
    let foods = params.data
    let cate = params.cate
    let total = foods.total
    let AllPage = Math.ceil(total / state.food_page_size)
    AllPage < state.food_current_page && (state.food_hasmore = false)
    let hasCate = false
    state.foods.map(item => {
      if (item.id === cate.id) {
        item.food = [...item.food, ...foods.list]
        hasCate = true
      }
    })

    if (!hasCate) {
      let cateItem = {
        id: cate.id,
        name: cate.name,
        food: foods.list || []
      }
      state.foods.push(cateItem)
    }
  },
  [types.HOME_ADD_FOODS_PAGE] (state) {
    state.food_current_page++
  },
  [types.HOME_INIT_FOODS_PAGE] (state, currenPage) {
    state.food_current_page = currenPage.curent_page
    state.food_hasmore = currenPage.hasMore
  }
}

const actions = {
  // 获取banner
  home_get_banners ({commit}, params) {
    return new Promise((resolve, reject) => {
      api.getBanners(params).then(data => {
        let code = parseInt(data.code)
        if (code === 1) {
          commit(types.HOME_SET_BANNERS, data.data)
          resolve(data.data)
        } else {
          reject(data.msg)
        }
      })
    })
  },
  // 获取banner
  home_get_categorys ({commit}, params) {
    return new Promise((resolve, reject) => {
      if (state.cate_hasmore) {
        api.getCategorys(params).then(data => {
          let code = parseInt(data.code)
          if (code === 1) {
            commit(types.HOME_ADD_CATEGORY_PAGE)
            commit(types.HOME_SET_CATEGORY, data.data)
            resolve(data.data)
          } else {
            reject(data.msg)
          }
        })
      }
    })
  },
  // 获取banner
  home_get_foods ({commit}, params) {
    return new Promise((resolve, reject) => {
      if (state.food_hasmore) {
        api.getFoods(params.data).then(data => {
          let code = parseInt(data.code)
          if (code === 1) {
            commit(types.HOME_ADD_FOODS_PAGE)
            commit(types.HOME_SET_FOODS, {data: data.data, cate: params.cate})
            resolve(data.data)
          } else {
            reject(data.msg)
          }
        })
      }
    })
  },
  // 初始化当前食物的page
  home_init_foods_current_page ({commit}, currenPage) {
    commit(types.HOME_INIT_FOODS_PAGE, currenPage)
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
