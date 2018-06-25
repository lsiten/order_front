<template>
  <div class="user_item_order">
   <card>
       <div slot="content" class="card-padding-body">
          <div class="box-foods">
            <div class="item-food" v-for="(item, index) in foodList" v-bind:key="index">
              <flexbox>
                <flexbox-item :span="3"><div class="flex-thumb"><img :src="item.thumb"/></div></flexbox-item>
                <flexbox-item>
                  <div class="flex-content">
                    <div class="flex-title">{{item.name}}</div>
                    <div class="flex-price">¥{{item.price}}元</div>
                    <div class="flex-desc">{{item.desc}}</div>
                  </div>
                </flexbox-item>
              </flexbox>
            </div>
          </div>
          <div class = "food-notes"></div>
      </div>
      <div slot="header" class="card-padding-header">
        <span class="num">{{order.desk_num}}桌</span>
        <div class="pull-right">
          <span class="time">{{order.create_time}}</span>
          <span class="price">/￥{{order.total_price}}元</span>
        </div>
      </div>
      <div slot="footer" class="card-padding-footer">
        <x-button class="pull-right" mini type="primary" @click.native="pay_order">支付</x-button>
      </div>
   </card>
  </div>
</template>
<script>
import { Card, Flexbox, FlexboxItem, XButton } from 'vux'
export default {
  name: 'user-order-item',
  data () {
    return {
      foodList: []
    }
  },
  created () {
    this.foodList = JSON.parse(this.order.foods)
  },
  components: {
    Card, Flexbox, FlexboxItem, XButton
  },
  props: {
    order: {
      type: Object
    }
  },
  methods: {
    pay_order () {
      console.log(this.order)
    }
  }
}
</script>
<style scoped>
.pull-right {
  float: right;
}
.card-padding {
  padding: 15px;
}

.user_item_order {
  padding-top: 20px;
  background: #fff;
}
.item-food {
  margin-top: 10px;
  background: #fafafa;
  padding: 5px;
}

.card-padding-header {
  padding: 5px;
  border-bottom: 1px solid #e6e6e6;
}

.card-padding-header .num {
  font-size: 17px;
  font-weight: 400;
}

.card-padding-header .time, .card-padding-header .price{
  font-size: 12px;
}

.card-padding-header .price{
  color: #ca0d0d;
  font-weight: 700;
}

.flex-content {
  margin-left: 10px;
}

.flex-title {
  font-weight: 400;
  border-bottom: 1px solid #f5f5f5;
  font-size: 17px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
  word-wrap: break-word;
  word-break: break-all;
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

.flex-thumb {
  width: 100px;
  height: 60px;
}

.flex-thumb img{
  width: 100%;
  height: 100%;
}

.card-padding-footer {
  padding: 5px;
  overflow: hidden;
  border-bottom: 1px solid #e6e6e6;
  border-top: 1px solid #e6e6e6;
}
</style>

