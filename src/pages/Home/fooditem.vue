<template>
  <div>

  </div>
</template>
<script>
export default {
  name: 'home-fooditem',
  props: {
    food: {
      type: Object
    }
  },
  created () {
    console.log(this.food)
  }
}
</script>
