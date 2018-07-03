<template>
  <!--list-box-->
  <div class="list-list-box">
    <product :item="item" v-for="item in items"></product>
  </div>
  <!--container end-->
</template>
<script>
import product from 'components/product'

export default {
  components: {
    product
  },
  props: {
    items: {
      type: Array,
      required: true
    }
  }
}
</script>
