<template>
  <div>
    <x-header
      style="background-color:#000;"
      :left-options = 'leftOption'
      :title = 'title'
      :showMore = 'showMore'
      @clickMore = 'clickMore'
      @clickBack = 'clickBack'
      @clickTitle = 'clickTitle'
    >
    <div slot="right" v-show="showCenter">
      <svg class="icon" aria-hidden="true" @click="gotoCenter">
          <use xlink:href="#xxn-user"></use>
      </svg>
    </div>
    </x-header>
  </div>
</template>
<script>
import { XHeader } from 'vux'
import {mapGetters} from 'vuex'
export default {
  name: 'com-header',
  components: {
    XHeader
  },
  computed: {
    ...mapGetters({
      leftOption: 'header_get_left_option',
      title: 'header_get_title',
      showMore: 'header_get_showMore',
      clickMore: 'header_get_clickMore',
      clickBack: 'header_get_clickBack',
      clickTitle: 'header_get_clickTitle',
      showCenter: 'header_get_showCenter',
      gotoCenter: 'header_get_gotoCenter'
    })
  },
  created () {
    if (this.showCenter) {
      this.$store.dispatch('header_set_goto_center', () => {
        this.$router.push({
          name: 'orderlist'
        })
      })
    }
  }
}
</script>
<style scoped>
  .icon {
     width: 1em; height: 1em;
     vertical-align: -0.15em;
     fill: currentColor;
     overflow: hidden;
     font-size: 20px;
  }
</style>

