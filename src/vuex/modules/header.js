const state = {
  leftOption: {
    showBack: false, // 是否显示返回文字
    backText: '返回', // 返回文字
    preventGoBack: false // 是否阻止返回
  },
  title: '小仙女',
  showMore: false,
  clickMore: () => {
    console.log('click more')
  },
  clickBack: () => {
    console.log('click back')
  },
  clickTitle: () => {
    console.log('click title')
  },
  gotoCenter: () => {
    console.log('click center')
  }
}
const getters = {
  header_get_left_option: state => state.leftOption,
  header_get_title: state => state.title,
  header_get_showMore: state => state.showMore,
  header_get_clickMore: state => state.clickMore,
  header_get_clickBack: state => state.clickBack,
  header_get_clickTitle: state => state.clickTitle,
  header_get_gotoCenter: state => state.gotoCenter
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
