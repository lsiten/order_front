const state = {
  shoppingBasket: [
    {
      id: 0,
      name: '托尔斯泰',
      desc: '托尔斯泰托尔斯泰托尔斯泰托尔斯泰',
      thumb: 'https://o5omsejde.qnssl.com/demo/test1.jpg',
      num: 1
    },
    {
      id: 1,
      name: '托尔斯泰1',
      desc: '托尔斯泰托尔斯泰托尔斯泰托尔斯泰',
      thumb: 'https://o5omsejde.qnssl.com/demo/test1.jpg',
      num: 2
    }
  ],
  total: 3
}
const getters = {
  bottom_get_shopping_basket: state => state.shoppingBasket,
  bottom_get_total: state => state.total
}

const mutations = {
}

const actions = {
}

export default {
  state,
  mutations,
  actions,
  getters
}
