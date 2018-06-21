<template>
  <div style="height:100%;">
     <flexbox orient='vertical'>
      <flexbox-item>
        <swiper :list="swiperdata" v-model="swiperindex" @on-index-change="onIndexChange"></swiper>
      </flexbox-item>
      <flexbox-item>
        
          <flexbox>
            <flexbox-item :span="3">
              <scroller
                ref = 'leftCate'
                lock-x
                scrollbarY
                :bounce = 'false'
                height = '-280'
              >
                <div>
                  <group title="菜品分类">
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
                <div>
                  <p>111111111</p>
                  <p>111111111</p>
                  <p>111111111</p>
                  <p>111111111</p>
                  <p>111111111</p>
                  <p>111111111</p>
                  <p>111111111</p>
                  <p>111111111</p>
                  <p>111111111</p>
                  <p>111111111</p>
                  <p>111111111</p>
                  <p>111111111</p>
                  <p>111111111</p>
                  <p>111111111</p>
                  <p>111111111</p>
                  <p>111111111</p>
                  <p>111111111</p>
                  <p>111111111</p>
                  <p>111111111</p>
                  <p>111111111</p>
                  <p>111111111</p>
                  <p>111111111</p>
                  <p>111111111</p>
                  <p>111111111</p>
                  <p>111111111</p>
                  <p>111111111</p>
                  <p>111111111</p>
                  <p>111111111</p>
                  <p>111111111</p>
                  <p>111111111</p>
                  <p>111111111</p>
                  <p>111111111</p>
                  <p>111111111</p>
                  <p>111111111</p>
                  <p>111111111</p>
                  <p>111111111</p>
                  <p>111111111</p>
                  <p>111111111</p>
                  <p>111111111</p>
                  <p>111111111</p>
                  <p>111111111</p>
                  <p>111111111</p>
                  <p>111111111</p>
                  <p>111111111</p>
                  <p>111111111</p>
                  <p>111111111</p>
                  <p>111111111</p>
                  <p>111111111</p>
                  <p>111111111</p>
                  <p>111111111</p>
                  <p>111111111</p>
                  <p>111111111</p>
                  <p>111111111</p>
                </div>
              </scroller>
            </flexbox-item>
          </flexbox>
      </flexbox-item>
    </flexbox>
  </div>
</template>
<script>
import { Flexbox, FlexboxItem, Swiper, Scroller, Group, Radio } from 'vux'
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
export default {
  name: 'Home-index',
  data () {
    return {
      swiperdata: data,
      swiperindex: 0
    }
  },
  components: {
    Flexbox,
    FlexboxItem,
    Swiper,
    Scroller,
    Group,
    Radio
  },
  methods: {
    onIndexChange (index) {
      console.log(index)
    }
  }
}
</script>
<style scoped>
</style>

