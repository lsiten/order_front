<template>
  <div class="user-orderlist">
    <div class="desk-info" ref="desk_info">
      <div class="word-cloud" ref="word_cloud">

      </div>
      <div class="desk-num">
        {{desk.num}}号桌
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
import Js2wordcloud from 'js2wordcloud'
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
  mounted () {
    let contaner = this.$refs.word_cloud
    let wc = new Js2wordcloud(contaner)
    wc.setOption({
      tooltip: {
        show: true
      },
      list: [
        ['我饿了', 60], ['小仙女', 80], ['谈笑风生', 80], ['生活不易', 70], ['天马行空', 70], ['请吃我', 60],
        ['我要学习了', 80], ['开开心心上学去', 80], ['玉树临风', 70], ['酒肉穿肠子过', 70], ['佛祖心中坐', 60], ['菩提本无树', 60],
        ['明镜亦非台', 80], ['本来无一物', 80], ['何处染尘埃', 70], ['一昭文化', 70], ['这个好吃', 60], ['我喜欢这家店', 60]
      ],
      color: '#15a4fa'
    })
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
    border-bottom: 1px solid #bfbfbb;
    position: relative;
  }
  .desk-num {
    position: absolute;
    top: 50px;
    left: 50%;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
    transform:translateX(-50px);
    background: #dfcdde;
    border-radius: 50%;
    color: #3e0707;
  }

  .word-cloud {
    width: 100%;
    height: 200px;
  }
</style>

