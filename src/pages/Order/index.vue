<template>
  <div class="order-index">
    <group title="已购商品">
      <x-number :min='0' v-for="(item, index) in foodsTemp" @on-change="change(item)" v-bind:key="index" :title="item.name" v-model="item.num"></x-number>
    </group>
    <group>
      <x-textarea title="备注" placeholder='请输入订单备注' v-model="notes"></x-textarea>
    </group>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { XNumber, Group, XTextarea } from 'vux'
export default {
  name: 'order-index',
  data () {
    return {
      foodsTemp: [],
      notes: ''
    }
  },
  computed: {
    ...mapGetters({
      basket: 'bottom_get_shopping_basket'
    })
  },
  components: {
    XNumber,
    Group,
    XTextarea
  },
  created () {
    let fTemp = this._initBasket()
    if (fTemp.length <= 0) {
      this.$router.go(-1)
    }
    this.$store.dispatch('header_set_show_back', true)
    this.$store.dispatch('bottom_set_show', false)
    this.$store.dispatch('bottom_set_type', 'submit')
  },
  destroyed () {
    this.$store.dispatch('bottom_set_type', '')
  },
  watch: {
    basket: {
      deep: true,
      handler: function () {
        this._initBasket()
      }
    },
    notes () {
      if (this.notes.length > 0) {
        this.$store.dispatch('bottom_update_notes', this.notes)
      }
    }
  },
  methods: {
    _initBasket () {
      let fTemp = []
      this.basket.map(item => {
        let temp = JSON.parse(JSON.stringify(item))
        if (temp.num > 0) {
          fTemp.push(temp)
        } else {
          this.$store.dispatch('bottom_change_basket_item', fTemp)
        }
      })
      this.foodsTemp = []
      this.$nextTick(() => {
        this.foodsTemp = fTemp
      })
      return fTemp
    },
    change (food) {
      this.$store.dispatch('bottom_change_basket_item', food)
    }
  }
}
</script>

