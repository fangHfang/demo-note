<template>
  <div class="orderDetail" v-loading="loading">
    <div class="order-detail-panel">
      <h3 class="order-detail-head">基本信息</h3>
      <div class="order-detail-info">
        <ul class="order-info-ul">
          <li><label>订单编号：</label><span>{{yuDingInfo.OrderCode}} {{yuDingInfo.CustomerInfo}}（订单来源：{{yuDingInfo.LaiYuan}}）</span></li>
          <li><label>线路名称：</label><span>{{yuDingInfo.ResourceName}}</span></li>
          <li><label>发团日期：</label><span>{{yuDingInfo.StartDate}} 至 {{yuDingInfo.EndDate}}</span></li>
          <li><label>预定客户：</label><span>{{yuDingInfo.CustomerInfo}}</span></li>
          <li><label>预订时间：</label><span>2018-05-15 00:00:00</span></li>
          <li><label>联系客户：</label><span>{{yuDingInfo.ContactName}} {{yuDingInfo.ContactTelephone}}</span></li>
          <li><label>备注说明：</label><span>备注说明备注说明备注说明备注说明备注说明备注说明</span></li>
          <li><label>销售部门：</label><span>{{yuDingInfo.saleName}} {{yuDingInfo.saleTel}} 总办，{{yuDingInfo.AddTime}}</span></li>
          <li><label>销售利润：</label><span>应收合计{{yuDingInfo.YingShou}}，成本合计{{yuDingInfo.YingFu}}，利润{{yuDingInfo.LiRun}}</span></li>
          <li><label>订单状态：</label><span>{{orderStatus[yuDingInfo.OrderStatus]}}</span></li>
        </ul>
      </div>
    </div>
    <div class="order-detail-panel">
      <h3 class="order-detail-head">销售收入</h3>
      <div class="order-detail-info">
        <table width="100%" class="order-info-table" cellpadding="0" cellspacing="0" border="0">
          <thead>
          <tr>
            <th>游客信息</th>
            <th width="80">操作</th>
          </tr>
          </thead>
          <tbody>
          <tr class="orderTable">
            <td>
              <p class="itemRow">结算客户：{{yuDingInfo.jieSuanName}} {{yuDingInfo.jieSuanTel}}</p>
              <p class="itemRow">客户账单：{{yuDingInfo.YingFu}}，优惠{{yuDingInfo.ZhiYouHui}}</p>
              <p class="itemRow">应收客户：应收{{yuDingInfo.YingFu}}，已开电子收据{{yuDingInfo.ShouJuAmount}}</p>
            </td>
            <td>
              <p class="itemRow toLink" @click="updateHeTong">合同</p>
              <p class="itemRow toLink" @click="getShouJuList">电子收据</p>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="order-detail-panel">
      <h3 class="order-detail-head">保险信息<span class="toLink" @click="updateBaoXian">立即投保</span></h3>
      <div class="order-detail-info">
        <table width="100%" class="order-info-table" cellpadding="0" cellspacing="0" border="0">
          <thead>
          <tr>
            <th width="50">序</th>
            <th>保单信息</th>
            <th width="80">操作</th>
          </tr>
          </thead>
          <tbody>
          <tr class="orderTable">
            <td class="tx-center">1</td>
            <td>
              <p class="itemRow">保险方案：江泰保险经纪股份有限公司—国内-江泰平安行旅游意外保险-方案一（含边境游）</p>
              <p class="itemRow">参保日期：2019-09-15 至 2019-09-20</p>
              <p class="itemRow">参保人数：2人，名单：赵莹,焦金财</p>
              <p class="itemRow">保 单 号：13379001900537565665</p>
              <p class="itemRow">保时间：2019-09-06 16:02:17</p>
              <p class="itemRow">保单金额：合计8.2 （门店承担）</p>
              <p class="itemRow">结算信息：应付8.2，已结算8.2，未结算0</p>
            </td>
            <td>
              <p class="itemRow toLink">退保</p>
              <p class="itemRow toLink">下载保单</p>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="order-detail-panel">
      <h3 class="order-detail-head">出行人数</h3>
      <div class="order-detail-info">
        <table width="100%" class="order-info-table" cellpadding="0" cellspacing="0" border="0">
          <thead>
          <tr>
            <th>人员类型</th>
            <th class="tx-center" width="100">销售价</th>
            <th class="tx-center" width="100">成本价</th>
            <th width="80">数量</th>
          </tr>
          </thead>
          <tbody>
          <tr class="orderTable" v-for="(item, index) in yuDingInfo.RenYuans" v-if="item.Num !== 0" :key="index">
            <td><p class="itemRow" v-if="item.ModeName">{{item.ModeName}}({{item.ModeDesc}})</p></td>
            <td class="tx-center">{{item.Price}}</td>
            <td class="tx-center">{{item.PriceTH}}</td>
            <td>{{item.Num}}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="order-detail-panel">
      <h3 class="order-detail-head">游客名单<span class="toLink" @click="printing">打印名单</span></h3>
      <div class="order-detail-info">
        <table width="100%" class="order-info-table" cellpadding="0" cellspacing="0" border="0">
          <thead>
          <tr>
            <th class="tx-center" width="50">序</th>
            <th class="tx-center" width="100">姓名</th>
            <th class="tx-center" width="180">身份证</th>
            <th class="tx-center" width="180">护照</th>
            <th>其他证件</th>
            <th width="100">出生日期</th>
          </tr>
          </thead>
          <tbody>
          <tr class="orderTable">
            <td class="tx-center">1</td>
            <td class="tx-center">姓名姓名</td>
            <td class="tx-center">132456789132456798</td>
            <td class="tx-center">132456789132456798</td>
            <td>132456789132456798</td>
            <td>2018-05-15</td>
          </tr>
          <tr class="orderTable">
            <td class="tx-center">2</td>
            <td class="tx-center">姓名姓名</td>
            <td class="tx-center">132456789132456798</td>
            <td class="tx-center">132456789132456798</td>
            <td>132456789132456798</td>
            <td>2018-05-15</td>
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
              <p class="itemRow">【{{jiaoTuan.Type}}】 <em :class="[jiaoTuan.CustomerConfirmStatus=='占位中' ? 'tx-red' : 'tx-green']">{{jiaoTuan.CustomerConfirmStatus}}</em> → <em :class="[jiaoTuan.ConfirmStatus=='未确认' ? 'tx-red' : 'tx-green']">{{jiaoTuan.ConfirmStatus}}</em></p>
              <p class="itemRow">交团编号：{{jiaoTuan.OrderCode}}</p>
              <p class="itemRow">供 应 商：{{jiaoTuan.GongYingShang}}</p>
              <p class="itemRow">交团时间：{{jiaoTuan.TimeDesc}}</p>
              <p class="itemRow">备注说明：{{jiaoTuan.Message}}</p>
              <p class="itemRow">结算信息：应付{{jiaoTuan.YingFu}}，已结算{{jiaoTuan.PayPrice}}，未结算{{jiaoTuan.WeiJieSuan}}</p>
            </td>
            <td>
              <p class="itemRow toLink" @click="settlement">总社结算</p>
              <p class="itemRow toLink" @click="sureDone">确认交团</p>
            </td>
          </tr>
          <tr class="orderTable">
            <td class="tx-center">2</td>
            <td>
              <p class="itemRow">【{{heTong.Type}}】 <em :class="[heTong.OrderZhangStatus ? 'tx-green' : 'tx-red']">{{heTong.OrderZhangStatus?'已':'未'}}盖章</em> → <em :class="[heTong.QianMingStatus ? 'tx-green' : 'tx-red']">{{heTong.QianMingStatus?'已':'未'}}签名</em></p>
              <p class="itemRow">合同编号：{{heTong.HtCode==null?'未生成':heTong.HtCode}}</p>
              <p class="itemRow">成本金额：{{heTong.OrderAmount}}</p>
            </td>
            <td>
              <p class="itemRow toLink" @click="contract">查看合同</p>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="order-detail-btn">
      <a href="javascript:void(0)" class="back" @click="zhanWei">取消订单</a>
      <a href="javascript:void(0)" class="back" @click="updateDetail">修改订单</a>
    </div>
    <el-dialog
    title="电子收据"
    :visible.sync="dialogVisible1"
    width="70%" @close="dialogVisible1 = false">
      <div class="add-content">
        <div class="add-item"><em>收款客户</em><el-input style="width: 260px" placeholder="请输入客户姓名和电话" type="text" v-model="receipt.OrderCustomer"></el-input></div>
        <div class="add-item"><em>收款金额</em><el-input style="width: 120px" type="text" v-model="receipt.Price"></el-input></div>
        <div class="add-item"><em>收款日期</em><el-date-picker
          v-model="receipt.PayTime"
          type="date"
          placeholder="支付日期">
        </el-date-picker></div>
        <div class="add-item">
          <em>收款方式</em>
          <el-radio v-model="receipt.PaySource" label="1">线下转账</el-radio>
          <el-radio v-model="receipt.PaySource" label="3">线上支付</el-radio>
          <el-radio v-model="receipt.PaySource" label="4">余额</el-radio>
          <el-radio v-model="receipt.PaySource" label="6">信用</el-radio>
          <el-radio v-model="receipt.PaySource" label="31">微信</el-radio>
          <el-radio v-model="receipt.PaySource" label="32">支付宝</el-radio>
          <el-radio v-model="receipt.PaySource" label="61">代收</el-radio>
          <el-radio v-model="receipt.PaySource" label="62">代付</el-radio>
          <el-radio v-model="receipt.PaySource" label="63">代收抵消</el-radio>
          <el-radio v-model="receipt.PaySource" label="64">代付抵消</el-radio>
          <el-radio v-model="receipt.PaySource" label="99">对公账户</el-radio>
        </div>
        <div class="add-item"><em>备注说明</em><el-input style="width: calc(100% - 100px)" type="textarea" placeholder="备注说明" v-model="receipt.Remark"></el-input></div>
        <table border style="width: 100%">
          <thead>
          <tr>
            <th class="serial">序</th>
            <th>收款信息</th>
            <th class="make">操作</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item, index) in shouJuList" :key="item.Id">
            <td class="serial">{{index + 1}}</td>
            <td>
              <p>金额：{{item.Price}}
                <span v-if="item.FlagDesc === '作废'" class="zuoFei">【已作废】</span>
              </p>
              <p>业务编号：{{item.OrderCode}}</p>
              <p>收款方式：{{item.PaySourceDesc}}</p>
              <p>收款日期：{{item.PayTime}}</p>
              <p>备注：{{item.Remark}}</p>
              <p>添加时间：{{item.AddTime}}</p>
            </td>
            <td class="make">
              <p @click="feiShouJu(item.Id)" v-if="item.FlagDesc === '正常'">作废</p>
              <p @click="lookShouJu(item)">查看</p>
              <p @click="share(item)">分享</p>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addShouJu">确 定</el-button>
        <el-button @click="dialogVisible1 = false">取 消</el-button>
    </span>
    </el-dialog>
  </div>
</template>

<script>
import serverHttp from '@/assets/common/tour'
import orderHttp from '@/assets/common/order'
import QRCode from 'qrcodejs2'
export default {
  name: 'tourDetail',
  data () {
    return {
      // 订单信息
      yuDingInfo: {},
      OrderId: '',
      orderStatus: ['未确认', '已确认', '已拒绝', '已取消'],
      // 电子收据弹框信息
      value: '',
      receipt: {OrderCustomer: '', PaySource: 99, OrderId: ''},
      listData: [],
      type: [{id: 2, name: '交团'}, {id: 34, name: '合同'}, {id: 3, name: '保险'}],
      // 成本信息
      jiaoTuan: {},
      heTong: {},
      // 客户审核状态
      customerConfirmStatus: ['占位中', '已预定', '审核拒绝', '取消占位'],
      // 审核状态
      confirmStatus: ['未确认', '已确认', '已拒绝', '已取消'],
      dialogVisible1: false,
      loading: false,
      shouJuList: []
    }
  },
  mounted () {
    this.OrderId = this.$route.query.OrderId
    this.receipt.OrderId = this.$route.query.OrderId
    if (this.OrderId) {
      this.getYuDingInfo()
    }
    this.getDetail()
  },
  methods: {
    // 获取下单成功后的预定信息
    getYuDingInfo () {
      this.loading = true
      serverHttp.GetYuDingInfo({
        OrderId: this.OrderId
      }).then(res => {
        this.loading = false
        if (res.code === 0) {
          let data = res.data
          data.renYuanNum = 0
          for (let i = 0; i < data.RenYuans.length; i++) {
            data.renYuanNum += data.RenYuans[i].Num
          }
          data.jieSuanName = data.JieSuanCustomer.UserName
          data.saleName = data.SaleUser.UserName
          data.saleTel = data.SaleUser.Telephone
          data.jieSuanTel = data.JieSuanCustomer.Telephone
          // 处理成本数据
          let jiaoTuan = data.ChengBen[0]
          let heTong = data.ChengBen[1]
          for (let i = 0; i < this.type.length; i++) {
            if (this.type[i].id === jiaoTuan.Type) {
              jiaoTuan.Type = this.type[i].name
            } else if (this.type[i].id === heTong.Type) {
              heTong.Type = this.type[i].name
            }
          }
          jiaoTuan.CustomerConfirmStatus = this.customerConfirmStatus[jiaoTuan.CustomerConfirmStatus]
          jiaoTuan.ConfirmStatus = this.confirmStatus[jiaoTuan.ConfirmStatus]
          this.jiaoTuan = jiaoTuan
          this.heTong = heTong
          this.yuDingInfo = data
          this.receipt.OrderCustomer = this.yuDingInfo.CustomerInfo
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 跳转修改页
    updateDetail () {
      this.updateInfo()
      this.$router.push({name: 'tourOrder', query: {date: this.yuDingInfo.StartDate, OrderId: this.$route.query.OrderId, id: this.yuDingInfo.ResourceId}})
    },
    // 跳转保险页
    updateBaoXian () {
      this.updateInfo()
      this.$router.push({name: 'tourOrder3', query: {...this.$route.query, current: 2}})
    },
    updateHeTong () {
      this.$router.push({name: 'tourOrder4', query: {...this.$route.query, current: 3}})
    },
    // 打印名单
    printing () {
      this.$router.push({name: 'contractPrinting', query: {OrderId: this.$route.query.OrderId, OrderCode: this.yuDingInfo.OrderCode, CustomerInfo: this.yuDingInfo.CustomerInfo}})
    },
    // 取消占位
    zhanWei () {
      this.$confirm('此操作将取消订单, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        orderHttp.CustomerCancel({OrderId: this.OrderId}).then(res => {
          if (res.code === 0) {
            this.$message({
              type: 'success',
              message: '取消订单成功!'
            })
            this.getYuDingInfo()
          } else {
            this.$message({
              type: 'error',
              message: res.msg
            })
          }
        })
      }).catch(() => {})
    },
    // 总社结算
    settlement () {
      this.updateInfo()
      this.$router.push({name: 'tourOrder5', query: {...this.$route.query, current: 4}})
    },
    // 确认交团
    sureDone () {
      let str = this.jiaoTuan.WeiJieSuan === 0 ? '订单已全部结算，确定要交团吗？' : '订单有未结算款，需要占用您的信用额度' + this.jiaoTuan.WeiJieSuan + '元，确定要交团吗？'
      this.$confirm(str, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        serverHttp.JiaoTuan({OrderId: this.OrderId}).then(res => {
          if (res.code === 0) {
            this.$message({
              type: 'success',
              message: '交团成功!'
            })
          } else {
            this.$message({
              type: 'error',
              message: res.msg
            })
          }
        })
      }).catch(() => {})
    },
    // 查看合同
    contract () {
      this.updateInfo()
      this.$router.push({name: 'tourOrder4', query: {...this.$route.query, current: 3}})
    },
    // 获取收据列表
    getShouJuList () {
      this.dialogVisible1 = true
      serverHttp.GetShouJuList({OrderId: this.OrderId}).then(res => {
        if (res.code === 0) {
          this.shouJuList = res.data
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 添加收据
    addShouJu () {
      // this.dialogVisible1 = false
      let date = new Date(this.receipt.PayTime)
      this.receipt.PayTime = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
      orderHttp.AddShouJu(this.receipt).then(res => {
        if (res.code === 0) {
          this.$message.success('添加成功')
          this.receipt = {OrderCustomer: '', PaySource: 99, OrderId: this.$route.query.OrderId}
          this.receipt.OrderCustomer = this.yuDingInfo.CustomerInfo
          this.getYuDingInfo()
          this.getShouJuList()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 作废收据
    feiShouJu (id) {
      this.$confirm('作废后不能恢复，确定要作废吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        orderHttp.CancelShouJu({OrderId: this.OrderId, ShouJuId: id}).then(res => {
          this.getShouJuList()
          this.$message({
            type: 'success',
            message: '作废成功!'
          })
        })
      })
    },
    // 查看收据详情
    lookShouJu (item) {
      this.$router.push({name: 'contractReceipt', query: {OrderId: this.OrderId, ShouJuId: item.Id, PayTime: item.PayTime}})
    },
    // 分享电子收据
    share (item) {
      this.$alert('<div id="qrcode" ref="qrcode"></div>', '分享', {
        dangerouslyUseHTMLString: true,
        closeOnClickModal: true,
        showConfirmButton: false,
        customClass: 'image'
      })
      this.$nextTick(() => {
        document.getElementById('qrcode').innerHTML = ''
        this.qrcode(item)
      })
    },
    qrcode (item) {
      let id = item.Id
      let qrcode = new QRCode('qrcode', {
        width: 150,
        height: 150,
        text: 'http://localhost:8080/#/hetong/receipt?OrderId=' + this.OrderId + '&ShouJuId=' + id + '&PayTime=' + item.PayTime
        // colorDark : '#000',
        // colorLight : '#fff'
      })
      qrcode.name = '123'
    },
    // 保存订单信息
    updateInfo () {
      localStorage.setItem('updateInfo', JSON.stringify({date: this.yuDingInfo.StartDate, OrderId: this.$route.query.OrderId, id: this.yuDingInfo.ResourceId}))
    },
    getDetail () {
      orderHttp.GetDetail({OrderId: this.$route.query.OrderId}).then(res => {
        console.log(res)
      })
    }
  }
}
</script>

<style lang="scss">
@import "../scss/common";
</style>
