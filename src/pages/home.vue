<template>
  <div class="home-index">
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: 'home',
  created () {
    let wx = this._wx
    const permissions = JSON.stringify(['chooseImage'])
    const url = document.location.href
    this.$store.dispatch('getWxConfig', {
      url: encodeURIComponent(this.Trim(url.split('#')[0])),
      jsApiList: permissions
    }).then(data => {
      console.log(data)
      wx.config(data)
    })
    wx.ready(() => {
      console.log(111)
    })
  },
  methods: {
    Trim (str) {
      return str.replace(/(^\/*)|(\/*$)/g, '')
    }
  }
}
</script>
