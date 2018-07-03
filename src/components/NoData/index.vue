<template>
  <div class="no-data" v-if="items.length <= 0">
    <img src="../../assets/no-data.png">
    <div class="gray text-center msg title-3">暂时没有数据哦！</div>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true
    }
  }
}
</script>
