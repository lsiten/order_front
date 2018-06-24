<template>
  <div class="user-orderlist">
    <div class="desk-info">
      <div class="desk-num">
        {{desk.num}}桌
      </div>
    </div>
    <div class="order-list">
      <orderitem :order = "item" v-for="(item, index) in orderList" v-bind:key="index"></orderitem>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import orderitem from './orderitem'
export default {
  name: 'user-orderlist',
  components: {
    orderitem
  },
  data () {
    return {
      desk: {}
    }
  },
  created () {
    this.$store.dispatch('header_set_show_back', true)
    this.$store.dispatch('bottom_set_show', false)
    this.$store.dispatch('bottom_set_type', '')
    this.desk = JSON.parse(this.deskInfo)
    this._initData()
  },
  computed: {
    ...mapGetters({
      deskid: 'com_get_desk_id',
      deskInfo: 'com_get_desk_info',
      orderList: 'user_get_order_list'
    })
  },
  methods: {
    //  初始化订单信息
    _initData () {
      let data = {
        deskid: this.deskid
      }
      this.$store.dispatch('user_get_order_list', data)
    }
  }
}
</script>
<style scoped>
  .desk-info {
    width: 100%;
    padding: 15px 0;
    border-bottom: 1px solid #bfbfbb;
  }
  .desk-num {
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
    margin: 15px auto;
    background: #dfcdde;
    border-radius: 50%;
    color: #3e0707;
  }
</style>

