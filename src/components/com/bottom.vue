<template>
  <div class="com-bottom">
    <div class="shopping-basket">
      <div class="shopping-basket-blue">
        <badge v-show="showBadge" :text="totalNum" class="total-badge"></badge>
        <svg class="icon" aria-hidden="true" @click="showBasketDetail">
            <use xlink:href="#xxn-ai66"></use>
        </svg>
      </div>
    </div>
    <div class="food-price">
      ￥<span>{{foodPrice}}</span>
    </div>

    <div class="right-content" v-show="!showSubmit">
      <p>还差￥<span>{{minPrice}}</span>可以买单</p>
    </div>

    <div class="right-content" v-show="showSubmit">
      <div class="submit-button" @click="submitOrder">
        结算
      </div>
    </div>
     <!-- 购物篮详情 -->
     <div v-transfer-dom>
      <popup v-model="showDetail" position="bottom" max-height="100%" :popup-style="{'bottom': '46px', 'z-index': 998}">
        <div class="food-detail-content">
          <div class="food-detail-header-box">
            <span>已选商品</span>
            <span class="clear-food" @click="clearFood">
              <svg class="icon" aria-hidden="true" @click="showBasketDetail">
                <use xlink:href="#xxn-lajitong"></use>
            </svg>清空
            </span>
          </div>
          <div class="food-detail-header-food-item">
            <group>
              <x-number :min='0' v-for="(item, index) in foodsTemp" @input="change(item)" v-bind:key="index" :title="item.name" v-model="item.num"></x-number>
          </group>
          </div>
        </div>
      </popup>
    </div>
  </div>
</template>
<script>
import { Tabbar, TabbarItem, Popup, TransferDom, XNumber, Group, Badge } from 'vux'
import { mapGetters } from 'vuex'
export default {
  name: 'com-bottom',
  directives: {
    TransferDom
  },
  components: {
    Tabbar,
    TabbarItem,
    Popup,
    XNumber,
    Group,
    Badge
  },
  created () {
    if (parseInt(this.totalNum) > 0) {
      this.showBadge = true
    }

    let fTemp = []
    this.basket.map(item => {
      let temp = {
        id: item.id,
        name: item.name,
        num: item.num
      }

      fTemp.push(temp)
    })

    this.foodsTemp = fTemp
  },
  computed: {
    ...mapGetters({
      basket: 'bottom_get_shopping_basket',
      totalNum: 'bottom_get_total'
    })
  },
  data () {
    return {
      foodPrice: 0,
      minPrice: 20,
      showSubmit: true,
      showDetail: false,
      value: 0,
      showBadge: false,
      foodsTemp: []

    }
  },
  methods: {
    showBasketDetail () {
      this.showDetail = !this.showDetail
    },
    submitOrder () {
      console.log(22)
    },
    clearFood () {
      console.log('clear')
    },
    change (food) {
      console.log(food)
    }
  }
}
</script>
<style scoped>
  .com-bottom {
    position: absolute;
    z-index: 999;
    background: rgba(0, 0, 0, .8);
    height: 46px;
    width: 100%;
    bottom: 0;
    left: 0;
    color: #ffffff;
  }
  .shopping-basket {
    background: #000;
    position: absolute;
    width:  50px;
    height: 50px;
    top: -15px;
    left: 15px;
    border-radius: 50%;
    text-align: center;
  }
  .shopping-basket-blue {
    width:  40px;
    height: 40px;
    margin: 5px;
    border-radius: 50%;
    background: #1261d6;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .icon {
     width: 1em; height: 1em;
     vertical-align: -0.15em;
     fill: currentColor;
     overflow: hidden;
     font-size: 20px;
  }

  .food-price {
    margin-left: 80px;
    margin-top: 5px;
    display: inline-block;
  }
  .right-content {
    margin-right: 0px;
    float: right;
  }

  .right-content p {
    margin-top: 5px;
    font-size: 12px;
    margin: 5px 10px;
  }

  .submit-button {
    width: 100px;
    height: 46px;
    line-height: 46px;
    text-align: center;
    background:#2cb909;
    cursor: pointer;
  }


  .food-detail-content {
    padding-bottom: 15px;
  }

  .food-detail-header-box {
    background: #dfdbdb;
    padding: 5px 10px;
    color: #333;
  }
  .clear-food {
    float: right;
  }

  .food-detail-header-food-item {
    min-height: 100px;
    max-height: 400px;
    overflow-y: scroll;
    overflow-x: hidden;
  }


  .total-badge {
    top: 0;
    right: 0;
    position: absolute;
  }
</style>
<style>
  .food-detail-header-food-item .vux-no-group-title {
    margin-top: 0px;
  }
</style>


