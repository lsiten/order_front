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
import { ViewBox, querystring } from 'vux'
import { mapGetters } from 'vuex'
export default {
  name: 'home',
  components: {
    'l-header': lHeader,
    'l-bottom': lbottom,
    ViewBox
  },
  created () {
    let params = querystring.parse(window.location.search)
    if (!params.id) {
      this.$router.push({path: '/error'})
      return ''
    }
    this.$store.dispatch('com_check_desk_id', params.id).then(data => {
      this._initData()
    }).catch(msg => {
      this.$router.push({path: '/error',
        query: {
          errorMsg: msg
        }}
      )
      return ''
    })
  },
  destroyed () {
    this.$store.dispatch('com_clear_desk_info')
  },
  methods: {
    Trim (str) {
      return str.replace(/(^\/*)|(\/*$)/g, '')
    },
    _initData () {
      this._initWx()
      this._initWebsock()
    },
    _initWx () {
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
    _initWebsock () {
      let wsUrl = 'ws://xxn.lsiten.cn:2346'
      let ws = new window.WebSocket(wsUrl)
      ws.onmessage = (e) => {
        let data = JSON.parse(e.data)
        switch (data.type) {
          case 'ping':
            ws.send('{"type":"ping"}')
            break
          case 'init':
            let params = {
              client_id: data.client_id,
              deskid: this.deskid
            }
            this.$store.dispatch('ws_bind_client', params)
            break
          case 'addfood':
            let food = JSON.parse(data.data)
            this.$store.dispatch('bottom_add_basket', {
              food: food,
              send: false
            })
            this.$store.dispatch('bottom_set_basket_change', true)
            break
          case 'addorder':
            console.log(data)
            break
        }
      }
      ws.onclose = () => {
        let params = {
          client_id: this.client_id,
          deskid: this.deskid
        }
        this.$store.dispatch('ws_offline_client', params)
        ws.close() // 关闭TCP连接
      }
    }
  },
  computed: {
    ...mapGetters({
      deskid: 'com_get_desk_id'
    })
  }
}
</script>
