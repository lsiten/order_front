<template>
  <div style="padding-top: 46px">
    <l-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:100;"></l-header>
    <msg :title="title" :description="description" :icon="icon"></msg>
  </div>
</template>
<script>
import lHeader from '../components/com/header'
import { Msg } from 'vux'
export default {
  name: 'error',
  components: {
    'l-header': lHeader,
    Msg
  },
  created () {
    this.$store.dispatch('header_set_show_center', false)
    let params = this.$route.query
    params.errorMsg && (this.title = params.errorMsg)
  },
  data () {
    return {
      description: '必须要有卓号',
      title: '参数错误',
      icon: 'warn'
    }
  }
}
</script>

