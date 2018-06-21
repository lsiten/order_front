<template>
  <div class="home-index" style="height:100%;">
    <view-box ref="viewBox" body-padding-bottom="46px" body-padding-top="46px">
      <l-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:100;"></l-header>
      <router-view></router-view>
      <l-bottom slot="bottom"></l-bottom>
    </view-box>
  </div>
</template>
<script>
import lHeader from '../components/com/header'
import lbottom from '../components/com/bottom'
import { ViewBox } from 'vux'
export default {
  name: 'home',
  components: {
    'l-header': lHeader,
    'l-bottom': lbottom,
    ViewBox
  },
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
