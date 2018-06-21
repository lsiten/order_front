<template>
  <div style="height:100%;">
     <flexbox orient='vertical'>
      <flexbox-item>
        <swiper :list="swiperdata" v-model="swiperindex" @on-index-change="onIndexChange"></swiper>
      </flexbox-item>
      <flexbox-item>
        
          <flexbox>
            <flexbox-item :span="3" style="background: #fff;">
              <scroller
                ref = 'leftCate'
                lock-x
                scrollbarY
                :bounce = 'false'
                height = '-280'
              >
                <div class="food-cate-class">
                  <group title="菜品分类" class="no-margin-top">
                    <cell v-for="(item, index) in cateData" :title="item.value" v-bind:key="index"></cell>
                  </group>
                </div>
              </scroller>
            </flexbox-item>
            <flexbox-item>
              <scroller
                ref = 'rightFood'
                lock-x
                scrollbarY
                height = '-280'
              >
                <div >
                  <fooditem v-for="(item1, index1) in foodData" v-bind:key="index1" :food="item1"></fooditem>
                </div>
              </scroller>
            </flexbox-item>
          </flexbox>
      </flexbox-item>
    </flexbox>
  </div>
</template>
<script>
import { Flexbox, FlexboxItem, Swiper, Scroller, Group, Cell } from 'vux'
import fooditem from './fooditem'
const data = [{
  url: 'javascript:',
  img: 'https://static.vux.li/demo/1.jpg',
  title: '送你一朵fua'
}, {
  url: 'javascript:',
  img: 'https://static.vux.li/demo/5.jpg',
  title: '送你一次旅行',
  fallbackImg: 'https://static.vux.li/demo/3.jpg'
}]

const cateData = [
  {
    key: 0,
    value: '托尔斯泰'
  },
  {
    key: 1,
    value: '托尔斯泰1'
  },
  {
    key: 2,
    value: '托尔斯泰2'
  }
]

const foodData = [
  {
    id: 0,
    name: '托尔斯泰',
    desc: '托尔斯泰托尔斯泰托尔斯泰托尔斯泰'
  },
  {
    id: 1,
    name: '托尔斯泰1',
    desc: '托尔斯泰托尔斯泰托尔斯泰托尔斯泰'
  },
  {
    id: 2,
    name: '托尔斯泰2',
    desc: '托尔斯泰托尔斯泰托尔斯泰托尔斯泰'
  }
]
export default {
  name: 'Home-index',
  data () {
    return {
      swiperdata: data,
      swiperindex: 0,

      cateData: cateData,
      cateValue: 0,

      foodData: foodData
    }
  },
  watch: {
    cateValue (value) {
      console(value)
    }
  },
  components: {
    Flexbox,
    FlexboxItem,
    Swiper,
    Scroller,
    Group,
    Cell,
    fooditem
  },
  methods: {
    onIndexChange (index) {
      console.log(index)
    }
  }
}
</script>
<style>
.no-margin-top .weui-cells__title{
  margin-top: 5px;
}
</style>

