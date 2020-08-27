<template>
    <div class="wrapper">

      <step :current="current" :list="list"></step>
        <!--<el-steps :active="active" finish-status="success" style="margin-top: 20px 0;">
            <el-step title="基本信息"></el-step>
            <el-step title="在线支付"></el-step>
            <el-step title="支付成功"></el-step>
        </el-steps>-->
        <order-info></order-info>
        <!--<recommend :recList = recList></recommend>-->
    </div>
</template>
<script>
  import step from '@/components/step'
import OrderInfo from './module/OrderInfo'
// import Recommend from './module/Recommend'
export default {
  name: 'YuDing',
  components: {
    step,
    OrderInfo: OrderInfo
  },
  data () {
    return {
      list: ['第一步: 基本信息', '第二步: 付款'],
      active: 0,
      recList: [{
        'image': 'http://pavo.elongstatic.com/i/Hotel120_120/nw_000dDf0L.jpg',
        'name': '太原富力万达文华酒店',
        'price': '200'
      }]
    }
  }
}
</script>
<style lang="scss" scope>
    .wrapper{
        overflow: hidden;
    }
</style>
