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
                :scroll-bottom-offset = '100'
                @on-scroll-bottom = 'getCateData'
              >
                <div class="food-cate-class">
                  <group title="菜品分类" class="no-margin-top">
                    <cell :class="(index === cateValue) ? 'cate-active' : ''" v-for="(item, index) in cateData" :title="item.name" v-bind:key="index" @click.native="changeCate(index)"></cell>
                  </group>
                </div>
              </scroller>
            </flexbox-item>
            <flexbox-item>
              <scroller
                ref = 'rightFood'
                class="js-scroller-box"
                lock-x
                scrollbarY
                height = '-280'
                :scroll-bottom-offset = '100'
                @on-scroll-bottom = 'getFoodDataMore'
              >
                <div>
                  <group :ref = "'cate_' + item1.id" :title="item1.name" class="white-background" v-for="(item1, index1) in foodData" v-bind:key="index1">
                    <fooditem :ref="'food_' + item2.id + '_' + item2.cate_id" v-show="item1.food.length > 0" v-for="(item2, index2) in item1.food" v-bind:key="index2" :food="item2"></fooditem>
                    <div v-show="!item1.food.length" class="no-data-tips">
                      暂无数据
                    </div>
                  </group>
                </div>
              </scroller>
            </flexbox-item>
          </flexbox>
      </flexbox-item>
    </flexbox>
  </div>
</template>
<script>
import { Flexbox, FlexboxItem, Swiper, Scroller, Group, Cell, querystring } from 'vux'
import fooditem from './fooditem'
import { mapGetters } from 'vuex'
export default {
  name: 'Home-index',
  computed: {
    ...mapGetters({
      swiperdata: 'home_get_banners',
      cate_current_page: 'home_get_cate_current_page',
      cate_page_size: 'home_get_cate_page_size',
      cateData: 'home_get_categorys',
      food_current_page: 'home_get_food_current_page',
      food_page_size: 'home_get_food_page_size',
      foodData: 'home_get_foods',
      foodHasmore: 'home_get_foods_hasmore',
      basket: 'bottom_get_shopping_basket',
      deleteBasket: 'bottom_get_delete_basket'
    })
  },
  created () {
    let params = querystring.parse(window.location.search)
    if (!params.id) {
      this.$router.push({path: '/error'})
      return ''
    }
    this.$store.dispatch('header_set_show_back', false)
    this.$store.dispatch('bottom_set_show', true)
    // 获取banner
    this.$store.dispatch('home_get_banners', {})
    this.getCateData().then(() => {
      let cateData = this.cateData
      let currentCate = cateData[this.cateValue]
      this.getFoods(currentCate)
    })
  },
  watch: {
    basket: {
      deep: true,
      handler: function () {
        let basketLength = this.basket.length
        for (let i = 0; i < basketLength; i++) {
          let basketItem = this.basket[i]
          let refId = 'food_' + basketItem.id + '_' + basketItem.cate_id
          let refDom = this.$refs[refId]
          if (refDom && refDom.length > 0) {
            refDom[0].foodNumber = basketItem.num
          }
        }
      }
    },
    deleteBasket: {
      deep: true,
      handler: function () {
        let deleteBasketLength = this.deleteBasket.length
        for (let i = 0; i < deleteBasketLength; i++) {
          let basketItem = this.deleteBasket[i]
          let refId = 'food_' + basketItem.id + '_' + basketItem.cate_id
          let refDom = this.$refs[refId]
          if (refDom && refDom.length > 0) {
            refDom[0].foodNumber = 0
            this.$store.dispatch('bottom_delete_basket_item', basketItem)
          }
        }
      }
    }
  },
  data () {
    return {
      swiperindex: 0,
      cateValue: 0,
      current_cate: '',
      isLoading: false,
      catePage: {},
      foodScroller: null
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
    },
    getCateData () {
      return new Promise((resolve, reject) => {
        let data = {
          current_page: this.cate_current_page,
          page_size: this.cate_page_size
        }
        this.$store.dispatch('home_get_categorys', data).then(data => {
          resolve()
        }).catch((err) => {
          reject(err)
        })
      })
    },
    changeCate (index) {
      this.cateValue = index
      let cateData = this.cateData
      let currentCate = cateData[index]
      let currentPage = this.catePage[this.cateValue] || {
        curent_page: 1,
        hasMore: true
      }
      this.$store.dispatch('home_init_foods_current_page', currentPage)
      this.getFoods(currentCate).then(() => {
        this.$nextTick(() => {
          let ref = 'cate_' + currentCate.id
          let refDom = this.$refs[ref]
          if (refDom) {
            this.foodScroller.reset({
              top: refDom[0].$el.offsetTop
            })
          }
        })
      })
    },
    getFoods (cateitem) {
      if (this.isLoading) {
        this.isLoading = false
        return new Promise((resolve, reject) => {
          resolve()
        })
      }
      this.isLoading = true
      let data = {
        current_page: this.food_current_page,
        page_size: this.food_page_size,
        cid: cateitem.id
      }
      return new Promise((resolve, reject) => {
        this.$store.dispatch('home_get_foods', {
          data: data,
          cate: cateitem
        }).then(data => {
          this.isLoading = false
          resolve()
        }).catch((err) => {
          reject(err)
        })
      })
    },
    getFoodDebounce () {
      if (this.isLoading) {
        return false
      }
      let cateData = this.cateData
      if (!this.foodHasmore) {
        let index = this.cateValue + 1
        if (index >= cateData.length) {
          return ''
        } else {
          this.catePage[this.cateValue] = {
            curent_page: this.food_current_page,
            hasMore: this.foodHasmore
          }
          let nextPageContent = this.catePage[index]
          if ((nextPageContent && nextPageContent.hasMore) || !nextPageContent) {
            this.cateValue = index
            let currentPage = this.catePage[this.cateValue] || {
              curent_page: 1,
              hasMore: true
            }
            this.$store.dispatch('home_init_foods_current_page', currentPage)
          }
        }
      }

      let currentCate = cateData[this.cateValue]
      this.getFoods(currentCate)
    },
    getFoodDataMore () {
      this.getFoodDebounce()
    }
  },
  mounted () {
    this.foodScroller = this.$refs.rightFood
    let tempDelete = this.deleteBasket.slice(0)
    let deleteBasketLength = this.deleteBasket.length
    if (deleteBasketLength > 0) {
      for (let i = 0; i < deleteBasketLength; i++) {
        let basketItem = tempDelete[i]
        let refId = 'food_' + basketItem.id + '_' + basketItem.cate_id
        let refDom = this.$refs[refId]
        if (refDom && refDom.length > 0) {
          this.$nextTick(() => {
            refDom[0].foodNumber = 0
          })
          this.$store.dispatch('bottom_delete_basket_item', basketItem)
        }
      }
    }
  }
}
</script>
<style>
.no-margin-top .weui-cells__title{
  margin-top: 5px;
}
.cate-active {
  background: rgb(251, 249, 254);
}
.no-data-tips {
  text-align: center;
  font-size: 12px;
  color: #b7b7b7;
  padding: 10px 0;
}
</style>

