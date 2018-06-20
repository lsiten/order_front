<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  created () {
    let wx = this._wx
    const permissions = JSON.stringify(['onMenuShareTimeline', 'onMenuShareAppMessage'])
    const url = document.location.href
    this.$store.dispatch('getWxConfig', {
      url: encodeURIComponent(this.Trim(url.split('#')[0])),
      jsApiList: permissions
    }).then(data => {
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

<style lang="less">
@import '~vux/src/styles/reset.less';

body {
  background-color: #fbf9fe;
}
</style>
