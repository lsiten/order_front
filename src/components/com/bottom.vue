<template>
  <div class="com-bottom">
    bottom
  </div>
</template>
<script>
import { Tabbar, TabbarItem } from 'vux'
export default {
  name: 'com-bottom',
  components: {
    Tabbar,
    TabbarItem
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
</style>

