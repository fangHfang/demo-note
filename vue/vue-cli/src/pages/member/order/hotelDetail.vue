<template>
  <div class="orderDetail" v-loading="loading">
    <div class="order-detail-panel">
      <h3 class="order-detail-head">基本信息</h3>
      <div class="order-detail-info">
        <ul class="order-info-ul">
          <li><label>订单编号：</label><span>{{detailData.OrderCode}}（订单来源：{{detailData.LaiYuan}}）</span></li>
          <li><label>酒店名称：</label><span>{{detailData.ResourceName}}</span></li>
          <li><label>入住日期：</label><span>{{detailData.OrderStartDate}} 至 {{detailData.OrderEndDate}}</span></li>
          <li><label>销售利润：</label><span>应收合计{{detailData.YingShou}}，成本合计{{detailData.YingFu}}，利润{{detailData.LiRun}}</span></li>
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
            <td>
              <p class="itemRow">订单状态：<em :class="detailData.CustomerConfirmStatus===0?'tx-red':'tx-green'">{{detailData.CustomerConfirmStatus===0?'未确认':'占位中'}}</em> → <em :class="detailData.ChengBenConfirmStatus===0?'tx-red':'tx-green'">{{detailData.ChengBenConfirmStatus===0?'未确认':'已确认'}}</em> → <em :class="detailData.FuKuanStatus===0?'tx-red':'tx-green'">{{detailData.FuKuanStatus===0?'未付款':'已付款'}}</em> → <em :class="detailData.OrderSuoDing===0?'tx-red':'tx-green'">{{detailData.OrderSuoDing===0?'未锁定':'已锁定'}}</em></p>
              <p class="itemRow">房间数量：{{detailData.OrderNum}}间</p>
              <p class="itemRow" v-if="detailData.CustomerContactUser">联系客户：{{detailData.CustomerContactUser.Desc}}</p>
              <p class="itemRow" v-if="detailData.Customer">预定客户：{{detailData.Customer.Desc}}</p>
              <p class="itemRow" v-if="detailData.OrderJieSuanCustomer">结算客户：{{detailData.OrderJieSuanCustomer.Desc}}</p>
              <p class="itemRow" v-if="detailData.SaleJiGou">销售部门：{{detailData.SaleJiGou.Desc}}</p>
              <p class="itemRow">备注说明：{{detailData.Message}}</p>
              <p class="itemRow">客户账单：{{detailData.ZhangDanPrice}}，优惠{{detailData.OrderYouHuiAmount}}</p>
              <p class="itemRow">应收客户：账单金额{{detailData.ZhangDanPrice}}，优惠{{detailData.YouHui}}，实际应收 {{detailData.YingFu}}</p>
            </td>
            <td>
              <p class="itemRow toLink" @click="updateDetail">修改</p>
              <p class="itemRow toLink">取消占位</p>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="order-detail-panel">
      <h3 class="order-detail-head">房间信息</h3>
      <div class="order-detail-info">
        <table width="100%" class="order-info-table" cellpadding="0" cellspacing="0" border="0">
          <thead>
            <tr>
              <th>房间类型</th>
              <th class="tx-center" width="100">销售价</th>
              <th class="tx-center" width="100">成本价</th>
              <th width="80">数量</th>
            </tr>
          </thead>
          <tbody v-if="detailData.RoomDetail">
            <tr class="orderTable" v-for="(item, index) in detailData.RoomDetail" :key="index">
              <td>{{item.RoomName}}</td>
              <td class="tx-center">{{item.Price}}</td>
              <td class="tx-center">{{item.ChenBen}}</td>
              <td>{{item.Num}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="order-detail-panel">
      <h3 class="order-detail-head">入住名单</h3>
      <div class="order-detail-info">
        <table width="100%" class="order-info-table" cellpadding="0" cellspacing="0" border="0">
          <thead>
            <tr>
              <th class="tx-center" width="50">序</th>
              <th class="tx-center" width="120">姓名</th>
              <th style="text-align: left">证件号码</th>
            </tr>
          </thead>
          <tbody v-if="detailData.MingDan">
            <tr class="orderTable" v-for="(item, index) in detailData.MingDan" :key="index">
              <td class="tx-center">{{index+1}}</td>
              <td class="tx-center">{{item.XingMing}}</td>
              <td style="text-align: left">{{item.ZhengJian}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="order-detail-panel">
      <h3 class="order-detail-head">成本信息</h3>
      <div class="order-detail-info">
        <table width="100%" class="order-info-table" cellpadding="0" cellspacing="0" border="0">
          <thead>
          <tr>
            <th class="tx-center" width="50">序</th>
            <th>安排信息</th>
            <th width="80">操作</th>
          </tr>
          </thead>
          <tbody>
          <tr class="orderTable">
            <td class="tx-center">1</td>
            <td>
              <p class="itemRow"><em :class="detailData.CBCustomerConfirmStatus===0?'tx-red':'tx-green'">{{detailData.CBCustomerConfirmStatus===0?'未确认':'占位中'}}</em> → <em :class="detailData.ChengBenConfirmStatus===0?'tx-red':'tx-green'">{{detailData.ChengBenConfirmStatus===0?'未确认':'已确认'}}</em></p>
              <p class="itemRow">交团编号：{{detailData.JiaoTuanCode}}</p>
              <p class="itemRow" v-if="detailData.GongYingShang">供 应 商：{{detailData.GongYingShang.Desc}}</p>
              <p class="itemRow">备注说明：{{detailData.Message}}</p>
              <p class="itemRow">结算信息：应付{{detailData.YingFu}}，已结算{{detailData.SubmitPrice}}，未结算{{detailData.ZhangDanPrice}}</p>
            </td>
            <td>
              <p class="itemRow toLink">总社结算</p>
              <p class="itemRow toLink">确认预订</p>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import serverHttp from '@/assets/common/hotel'
export default {
  name: 'memberHotelDetail',
  data () {
    return {
      loading: false,
      detailData: {}
    }
  },
  methods: {
    updateDetail () {
      this.$router.push({name: 'HotelOrder1'})
    },
    getDetail () {
      serverHttp.GetDetail({Id: this.$route.query.id}).then(res => {
        console.log(res)
        this.detailData = res.data
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
