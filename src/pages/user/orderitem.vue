<template>
  <div class="user_item_order">
   <card>
       <div slot="content" class="card-padding-body">
          1111111
      </div>
      <div slot="header" class="card-padding-header">
        <span>{{order.desk_num}}桌</span>
        <spa >￥{{order.total_price}}元</span>
      </div>
   </card>
  </div>
</template>
<script>
import { Card } from 'vux'
export default {
  name: 'user-order-item',
  created () {
    console.log(this.order)
  },
  components: {
    Card
  },
  props: {
    order: {
      type: Object
    }
  }
}
</script>
<style scoped>
.card-padding {
  padding: 15px;
}

.card-padding-header {

}
</style>

