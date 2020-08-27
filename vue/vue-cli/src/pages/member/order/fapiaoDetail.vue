<template>
  <div class="orderDetail" v-loading="loading">
    <div class="order-detail-panel">
      <h3 class="order-detail-head">基本信息</h3>
      <div class="order-detail-info">
        <ul class="order-info-ul">
          <li><label>订单编号：</label><span>{{allData.OrderCode}}</span></li>
          <li><label>发票项目：</label><span>{{allData.ResourceName}}</span></li>
        </ul>
      </div>
    </div>
    <div class="order-detail-panel">
      <h3 class="order-detail-head">预定信息</h3>
      <div class="order-detail-info">
        <table width="100%" class="order-info-table" cellpadding="0" cellspacing="0" border="0">
          <thead>
          <tr>
            <th>预定信息</th>
            <th width="80">操作</th>
          </tr>
          </thead>
          <tbody>
          <tr class="orderTable">
            <td v-if="allData.YuDing">
              <p class="itemRow">订单状态：
                <em :class="allData.YuDing.IsConfirmStatus === true?'tx-green':'tx-red'">
                  {{allData.YuDing.IsConfirmStatus === true?'已确认':'未确认'}}
                </em>
                 →
                <em :class="allData.YuDing.FuKuanStatus === true?'tx-green':'tx-red'">
                   {{allData.YuDing.FuKuanStatus === true?'已付款':'未付款'}}
                </em>
                 →
                <em :class="allData.YuDing.SuoDingStatus === 1?'tx-green':'tx-red'">
                  {{allData.YuDing.SuoDingStatus === 1?'已锁定':'未锁定'}}
                </em>
              </p>
              <p class="itemRow">预定客户：{{allData.YuDing.Customer.Desc}}</p>
              <p class="itemRow">开票类型：{{allData.YuDing.ChengBenType}}</p>
              <p class="itemRow">开票金额：{{allData.YuDing.Price}}</p>
              <p class="itemRow">备注说明：{{allData.YuDing.Remark}}</p>
              <p class="itemRow">销售部门：{{allData.YuDing.SaleUser.Desc}}</p>
              <p class="itemRow">结算信息：应付{{allData.YuDing.Price}}，已结算{{allData.YuDing.PayPrice}}，未结算{{allData.YuDing.WatPrice}}</p>
            </td>
            <td>
              <p class="itemRow toLink" @click="settlement">查看明细</p>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="order-detail-panel">
      <h3 class="order-detail-head">发票信息</h3>
      <div class="order-detail-info">
        <table width="100%" class="order-info-table" cellpadding="0" cellspacing="0" border="0">
          <thead>
          <tr>
            <th class="tx-center" width="50">序</th>
            <th class="tx-center" width="180">开票日期</th>
            <th>发票号码</th>
            <th width="80">金额</th>
          </tr>
          </thead>
          <tbody>
          <tr class="orderTable">
            <td class="tx-center">1</td>
            <td class="tx-center">2018-05-15 00:00:00</td>
            <td>FP00123465468</td>
            <td>100</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import serverHttp from '@/assets/common/fapiao'
export default {
  data () {
    return {
      allData: {},
      loading: true
    }
  },
  mounted () {
    this.getDetail()
  },
  methods: {
    getDetail () {
      this.loading = true
      serverHttp.GetDetail({OrderId: this.$route.query.id}).then(res => {
        this.loading = false
        this.allData = res.data
        console.log(res)
      })
    },
    settlement () {
      console.log(11)
    }
  }
}
</script>

<style lang="scss">
  @import "../scss/common";
</style>
