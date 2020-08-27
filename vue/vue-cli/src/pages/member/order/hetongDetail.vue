<template>
  <div class="orderDetail" v-loading="loading">
    <div class="order-detail-panel">
      <h3 class="order-detail-head">基本信息</h3>
      <div class="order-detail-info">
        <ul class="order-info-ul">
          <li><label>订单编号：</label><span>{{detailData.OrderCode}}</span></li>
          <li><label>合同类型：</label><span>{{detailData.ContractTypeName}}</span></li>
          <li><label>合同份数：</label><span>{{detailData.OrderNum}}份<!--（{{detailData.Price}}.00元/份）--></span></li>
          <li><label>备注说明：</label><span>备注说明</span></li>
          <li><label>销售员工：</label><span v-if="detailData.SaleUser">{{detailData.SaleUser.Desc}}</span></li>
          <!--<li><label>结算信息：</label><span>应收合计{{detailData.YingShouAmount}}，已结算{{detailData.YiFu}}，未结算<em class="tx-red">{{detailData.WeiFu}}</em></span></li>-->
          <li><label>审核状态：</label><span><em class="tx-green" :class="detailData.ConfirmStatus===1?'tx-green':'tx-red'">{{detailData.ConfirmStatus===1?'已审核':'未审核'}}</em></span></li>
        </ul>
      </div>
    </div>
    <div class="order-detail-panel">
      <h3 class="order-detail-head">合同信息</h3>
      <div class="order-detail-info">
        <table width="100%" class="order-info-table" cellpadding="0" cellspacing="0" border="0">
          <thead>
          <tr>
            <th class="tx-center" width="50">序</th>
            <th>合同信息</th>
            <th width="80">状态</th>
          </tr>
          </thead>
          <tbody>
          <tr class="orderTable" v-for="(item, index) in detailData.HTResources" :key="index">
            <td class="tx-center">{{index+1}}</td>
            <td><p class="itemRow">合同编号：{{item.HtCode}}</p></td>
            <td><p class="itemRow" :class="item.UseStatus===1?' tx-green':' tx-red'">{{item.UseStatus===1?'已使用':'未使用'}}</p></td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import serverHttp from '@/assets/common/hetong'
export default {
  data () {
    return {
      loading: false,
      detailData: {},
      status: ['待支付', '已审核', '未审核']
    }
  },
  methods: {
    getDetail () {
      this.loading = true
      serverHttp.GetDetail({OrderId: this.$route.query.id}).then(res => {
        this.loading = false
        this.detailData = res.data
        console.log(this.detailData)
      })
    }
  },
  mounted () {
    this.getDetail()
  }
}
</script>

<style lang="scss">
  @import "../scss/common";
</style>
