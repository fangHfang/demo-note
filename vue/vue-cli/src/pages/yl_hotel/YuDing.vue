<template>
    <div class="yl-yuding">
      <div class="wrapper">
        <step :current="current"></step>
        <order-info></order-info>
      </div>
    </div>
</template>
<script>
import step from '@/components/step'
import OrderInfo from './module/OrderInfo'
import Recommend from './module/Recommend'
export default {
  name: 'YuDing',
  components: {
    OrderInfo: OrderInfo,
    Recommend: Recommend,
    step
  },
  data () {
    return {
      active: 0,
      recList: [{
        'image': 'http://pavo.elongstatic.com/i/Hotel120_120/nw_000dDf0L.jpg',
        'name': '太原富力万达文华酒店',
        'price': '200'
      }],
      current: 1
    }
  }
}
</script>
<style lang="scss" scope>
    .yl-yuding{
        background: #fff;
      overflow: hidden;
    }
</style>
