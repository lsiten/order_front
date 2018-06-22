<template>
  <div class="home-foodItem">
    <flexbox>
      <flexbox-item :span="3">
         <x-img :default-src="food.thumb" class="ximg-thumb"></x-img>
      </flexbox-item>
      <flexbox-item>
        <div class="flex-title">{{food.name}}</div>
        <div class="flex-price">￥{{food.price}}元</div>
        <div class="flex-desc">{{food.desc}}</div>
        <div class="flex-number">
          <x-number v-model="foodNumber" button-style="round" :min="0" :max="100"></x-number>
        </div>
      </flexbox-item>
    </flexbox>
  </div>
</template>
<script>
import { Flexbox, FlexboxItem, XImg, XNumber } from 'vux'
export default {
  name: 'home-fooditem',
  props: {
    food: {
      type: Object
    }
  },
  data () {
    return {
      foodNumber: 0
    }
  },
  methods: {
    changeFoodnumber (num) {
      this.foodNumber = num
    }
  },
  watch: {
    foodNumber (value) {
      this.food.num = value
      this.$store.dispatch('bottom_add_basket', this.food)
    }
  },
  created () {
    this.foodNumber = this.food.num || 0
  },
  components: {
    Flexbox,
    FlexboxItem,
    XImg,
    XNumber
  }
}
</script>
<style scoped>
 .home-foodItem {
   margin-top: 5px;
   border-bottom: #e3dede 1px solid;
 }
 .flex-title {
   font-weight: 400;
   font-size: 17px;
   overflow: hidden;
   text-overflow: ellipsis;
   white-space: nowrap;
   word-wrap: normal;
   word-wrap: break-word;
   word-break: break-all;
 }
 .flex-desc {
   color: #999999;
   font-size: 13px;
   line-height: 1.2;
   overflow: hidden;
   text-overflow: ellipsis;
   display: -webkit-box;
   -webkit-box-orient: vertical;
   -webkit-line-clamp: 2;
  }
  .flex-price {
    color: #ca0d0d;
    font-size: 13px;
    line-height: 1.2;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-wrap: normal;
    word-wrap: break-word;
    word-break: break-all;
    margin: 5px 0px;
  }
  .ximg-thumb {
    width: 100px;
    height: 60px;
  }
</style>

