<template>
  <div class="orderDetail" v-loading="loading">
    <div class="order-detail-panel">
      <h3 class="order-detail-head">基本信息</h3>
      <div class="order-detail-info">
        <ul class="order-info-ul">
          <li><label>订单编号：</label><span>{{detailData.OrderCode}}（订单来源：{{detailData.LaiYuan}}）</span></li>
          <li><label>产品名称：</label><span>{{detailData.Name}}</span></li>
          <li><label>出发日期：</label><span>{{detailData.StartDate}}</span></li>
          <li><label>返回日期：</label><span>{{detailData.EndDate}}</span></li>
          <li><label>销售利润：</label><span>应收合计{{detailData.YingShou}}，成本合计{{detailData.ZongE}}，利润{{detailData.LiRun}}</span></li>
          <li><label>下单时间：</label><span>{{detailData.AddTime}}</span></li>
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
              <p class="itemRow">订单状态：<em class="tx-red">{{CustomerConfirmStatus[detailData.CustomerConfirmStatus]}}</em> → <em class="tx-red">{{ConfirmStatus[detailData.ConfirmStatus]}}</em> → <em class="tx-green" :class="detailData.FuKuanStatus === true? 'tx-green' : 'tx-red'">{{detailData.FuKuanStatus === true? '已付款' : '未付款'}}</em> → <em :class="detailData.OrderSuoDing === 1? 'tx-green' : 'tx-red'">{{detailData.OrderSuoDing === 1? '已锁定' : '未锁定'}}</em></p>
              <p class="itemRow">机票数量：{{detailData.Num}}张</p>
              <p class="itemRow" v-if="detailData.ContactUser">联系客户：{{detailData.ContactUser.Desc}}</p>
              <p class="itemRow" v-if="detailData.YouKe">预定客户：{{detailData.YouKe.Desc}}</p>
              <p class="itemRow" v-if="detailData.JiSuanUser">结算客户：{{detailData.JiSuanUser.Desc}}</p>
              <p class="itemRow" v-if="detailData.SaleUser">销售部门：{{detailData.SaleUser.Desc}}</p>
              <p class="itemRow">备注说明：{{detailData.Remark}}</p>
              <p class="itemRow">客户账单：200，优惠100</p>
              <p class="itemRow">应收客户：账单金额{{detailData.OrderAmount}}，优惠{{detailData.YouHui}}，实际应收 {{detailData.ZongE}}</p>
            </td>
            <td>
              <p class="itemRow toLink">修改</p>
              <p class="itemRow toLink" @click="quXiaoOrder">取消占位</p>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="order-detail-panel" v-if="jipiaoData">
      <h3 class="order-detail-head" v-if="jipiaoData[0]">机票信息({{jipiaoData[0].DepartcityName}}-{{jipiaoData[0].ArrivecityName}})</h3>
      <div class="order-detail-info">
        <h3 class="timeHead" v-if="jipiaoData[0]">{{jipiaoData[0].riqi}} {{jipiaoData[0].week}}</h3>
        <el-timeline v-if="jipiaoData[0]">
          <el-timeline-item :timestamp="jipiaoData[0].DepartTime+' '+jipiaoData[0].DepartcityName+' '+jipiaoData[0].Depart_city" placement="top">
            <el-card>
              <div id="jipiaoTime">
                <div>
                  <p class="jipiaoActive">飞行</p>
                  <p class="jipiaoDate">{{jipiaoData[0].FX_Hours}}小时{{jipiaoData[0].FX_Minutes}}分钟</p>
                </div>
                <div>
                  <h3>{{jipiaoData[0].AirName}}{{jipiaoData[0].Aircode}}{{jipiaoData[0].FlightNum}}</h3>
                  <p class="jipiaoDate"><span>{{jipiaoData[0].Food==='-'?'无':'有'}}餐食</span></p>
                </div>
                <div>
                  <span></span>
                </div>
              </div>
            </el-card>
          </el-timeline-item>
          <el-timeline-item  :timestamp="jipiaoData[0].ArriveTime+' '+jipiaoData[0].ArrivecityName+' '+jipiaoData[0].Arrive_city" placement="top">
          </el-timeline-item>
        </el-timeline>
        <div class="jipiaoFanHui">
          <h3 class="timeHead" v-if="jipiaoData[1]">{{jipiaoData[1].riqi}} {{jipiaoData[1].week}}</h3>
          <el-timeline v-if="jipiaoData[1]">
            <el-timeline-item :timestamp="jipiaoData[1].DepartTime+' '+jipiaoData[1].DepartcityName+' '+jipiaoData[1].Depart_city" placement="top">
              <el-card>
                <div id="jipiaoTime">
                  <div>
                    <p class="jipiaoActive">飞行</p>
                    <p class="jipiaoDate">{{jipiaoData[1].FX_Hours}}小时{{jipiaoData[1].FX_Minutes}}分钟</p>
                  </div>
                  <div>
                    <h3>{{jipiaoData[1].AirName}}{{jipiaoData[1].Aircode}}{{jipiaoData[1].FlightNum}}</h3>
                    <p class="jipiaoDate"><span>{{jipiaoData[1].Food==='-'?'无':'有'}}餐食</span></p>
                  </div>
                  <div>
                    <span></span>
                  </div>
                </div>
              </el-card>
            </el-timeline-item>
            <el-timeline-item :timestamp="jipiaoData[1].ArriveTime+' '+jipiaoData[1].ArrivecityName+' '+jipiaoData[1].Arrive_city" placement="top">
            </el-timeline-item>
          </el-timeline>
        </div>
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
          <tbody>
          <tr class="orderTable" v-for="(item, index) in mingDanData" :key="index">
            <td class="tx-center">{{index + 1}}</td>
            <td class="tx-center">{{item.Name}}【{{item.RenYuanLeixingName}}】</td>
            <td class="tx-center">{{item.ZhengJianName}}</td>
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
              <p class="itemRow">
                <em class="tx-red">{{CustomerConfirmStatus[detailData.CustomerConfirmStatus]}}</em> → <em class="tx-red">{{ConfirmStatus[detailData.ConfirmStatus]}}</em>
              </p>
              <p class="itemRow">交团编号：{{detailData.OrderCode}}</p>
              <p class="itemRow" v-if="detailData.CaoZuo">供 应 商：<i v-if="detailData.CaoZuo.GongYingShang">{{detailData.CaoZuo.GongYingShang.Desc}}</i></p>
              <p class="itemRow">备注说明：{{detailData.Remark}}</p>
              <p class="itemRow">结算信息：应付{{detailData.YingFu}}，已结算{{detailData.SubmitPrice}}，未结算{{detailData.YingShou}}</p>
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
import serverHttp from '@/assets/common/jipiao'
export default {
  name: 'memberJiPiaoDetail',
  data () {
    return {
      loading: false,
      detailData: {},
      ConfirmStatus: ['未确认', '已确认', '已拒绝', '已取消'],
      CustomerConfirmStatus: ['占位中', '确认预定', '审核拒绝', '取消占位'],
      weekData: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      jipiaoData: [],
      mingDanData: []
    }
  },
  methods: {
    getDetail () {
      this.loading = true
      serverHttp.GetDetail({OrderId: this.$route.query.id}).then(res => {
        this.loading = false
        this.detailData = res.data
      })
    },
    getMingXi () {
      serverHttp.GetDetails({OrderId: this.$route.query.id}).then(res => {
        res.data.forEach(item => {
          let week = new Date(item.StartDate)
          item.week = this.weekData[week.getDay() - 1]
          let dataArr = item.StartDate.split('-')
          item.riqi = Number(dataArr[1]) + '月' + Number(dataArr[2]) + '日'
        })
        this.jipiaoData = res.data
      })
    },
    getMingDan () {
      serverHttp.GetMingDans({OrderId: this.$route.query.id}).then(res => {
        this.mingDanData = res.data
      })
    },
    quXiaoOrder () {
      this.$confirm('此操作将取消订单, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        serverHttp.CanCelOrder({OrderId: this.$route.query.id}).then(res => {
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
    this.getMingXi()
    this.getMingDan()
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
