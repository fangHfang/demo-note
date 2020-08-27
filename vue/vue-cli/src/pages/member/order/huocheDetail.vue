<template>
  <div class="orderDetail" v-loading="loading">
    <div class="order-detail-panel">
      <h3 class="order-detail-head">基本信息</h3>
      <div class="order-detail-info">
        <ul class="order-info-ul" v-if="detailData.Order">
          <li><label>订单编号：</label><span>{{detailData.Order.Code}}（订单来源：{{detailData.Order.LaiYuan}}）</span></li>
          <li><label>产品名称：</label><span>G89  北京西-成都东</span></li>
          <li><label>出发日期：</label><span>1月22日 06:53（耗时：1小时20分钟）</span></li>
          <li><label>返回日期：</label><span>1月22日 08:53</span></li>
          <li><label>座位信息：</label><span>二等座</span></li>
          <li><label>下单时间：</label><span>2015-02-15 15:51:32</span></li>
        </ul>
      </div>
    </div>
    <div class="order-detail-panel">
      <h3 class="order-detail-head">预定信息</h3>
      <div class="order-detail-info" v-if="detailData.YuDing">
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
              <p class="itemRow">订单状态：<em class="tx-red">{{detailData.YuDing.ConfirmStatus}}</em>
              <p class="itemRow">火车票数量：{{detailData.YuDing.Num}}张</p>
              <p class="itemRow" v-if="detailData.YuDing.YuDingUser">预定客户：{{detailData.YuDing.YuDingUser.Desc}}</p>
              <p class="itemRow" v-if="detailData.YuDing.JieSuanUser">结算客户：{{detailData.YuDing.JieSuanUser.Desc}}</p>
              <p class="itemRow" v-if="detailData.YuDing.SaleUser">销售部门：{{detailData.YuDing.SaleUser.Desc}}</p>
              <p class="itemRow">备注说明：{{detailData.YuDing.Remark}}</p>
              <p class="itemRow">客户账单：{{detailData.YuDing.OrderAmount}}，优惠{{detailData.YuDing.YouHui}}</p>
              <p class="itemRow">应收客户：账单金额{{detailData.YuDing.OrderAmount}}，优惠{{detailData.YuDing.YouHui}}，实际应收 {{detailData.YuDing.YingShouAmount}}</p>
            </td>
            <td>
              <p class="itemRow toLink">修改</p>
              <p class="itemRow toLink" @click="orderQuXiao()">取消占位</p>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="order-detail-panel">
      <h3 class="order-detail-head">游客名单</h3>
      <div class="order-detail-info">
        <table width="100%" class="order-info-table" cellpadding="0" cellspacing="0" border="0">
          <thead>
            <tr>
              <th class="tx-center" width="50">序</th>
              <th class="tx-center" width="120">姓名</th>
              <th class="tx-center" width="120">证件类型</th>
              <th style="text-align: left">证件号码</th>
            </tr>
          </thead>
          <tbody v-if="detailData.MingDan">
            <tr class="orderTable" v-for="(item, index) in detailData.MingDan" :key="index">
              <td class="tx-center">{{index + 1}}</td>
              <td class="tx-center">{{item.Name}}【{{item.Type}}】</td>
              <td class="tx-center">{{item.CardType}}</td>
              <td style="text-align: left">{{item.CardNum}}</td>
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
          <tbody v-if="detailData.JiaoTuan">
            <tr class="orderTable">
              <td class="tx-center">1</td>
              <td>
                <p class="itemRow"><em class="tx-red" :class="detailData.JiaoTuan.ConfirmStatus===0?'tx-red':'tx-green'">{{detailData.JiaoTuan.ConfirmStatus===0?'未确认':'占位中'}}</em> → <em :class="detailData.JiaoTuan.CustomerConfirmStatus===0?'tx-red':'tx-green'">{{detailData.JiaoTuan.CustomerConfirmStatus===0?'未':'已'}}确认</em></p>
                <p class="itemRow">交团编号：{{detailData.JiaoTuan.OrderCode}}</p>
                <p class="itemRow" v-if="detailData.JiaoTuan.GongYingShang">供 应 商：{{detailData.JiaoTuan.GongYingShang.Desc}}</p>
                <p class="itemRow">备注说明：{{detailData.JiaoTuan.Remark}}</p>
                <p class="itemRow">结算信息：应付{{detailData.JiaoTuan.YingFu}}，已结算{{detailData.JiaoTuan.PayPrice}}，未结算{{detailData.JiaoTuan.WatPrice}}</p>
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
import serverHttp from '@/assets/common/train'
export default {
  name: 'memberJiPiaoDetail',
  data () {
    return {
      loading: false,
      detailData: {}
    }
  },
  methods: {
    getDetail () {
      serverHttp.GetDetail({OrderId: this.$route.query.id}).then(res => {
        this.detailData = res.data
      })
    },
    orderQuXiao () {
      this.$confirm('此操作将取消订单, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        serverHttp.CancelOrder({OrderId: this.$route.query.id}).then(res => {
          this.$message({
            type: 'success',
            message: res.msg
          })
        })
      })
    }
  },
  mounted () {
    this.getDetail()
  }
}
</script>

<style lang="scss" scoped>
  @import "../scss/common";
  #jipiaoTime{
    display: flex;
    justify-content: space-between;
    .jipiaoActive{
      margin-top: 15px;
      font-size: 13px;
      color: rgb(160, 160, 160);
    }
    .jipiaoDate{
      margin-top: 10px;
      margin-bottom: 15px;
      font-size: 13px;
      color: rgb(160, 160, 160);
      span{
        position: relative;
        padding-right: 10px;
        color: #999;
        font-size: 12px;
        display: inline-block;
        margin-right: 10px;
      }
      span:after {
        content: "";
        position: absolute;
        width: 1px;
        top: 4px;
        bottom: 3px;
        right: 0;
        background: #dde4ed;
      }
    }
    .jipiaoDate span:last-child:after {
        content: "";
        display: none;
      }
  }
  .timeHead{
    font-weight: bold;
    font-size: 16px;
    margin-bottom: 12px;
  }
  .jipiaoFanHui{
    padding-top: 24px;
    margin-top: 24px;
    border-top: 1px solid rgb(221, 228, 237);
  }
</style>
