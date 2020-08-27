<template>
  <div>
    <div class="order-info">
      <div class="panel">
        <div class="panel-title"><i class="chanpin"></i>基本信息</div>
        <div class="panel-content">
          <div class="panel-group">
            <label>订单编号：</label>
            <span>{{yuDingInfo.OrderCode}}</span>
          </div>
          <div class="panel-group">
            <label>线路名称：</label>
            <span>{{yuDingInfo.ResourceName}} (发团日期{{yuDingInfo.StartDate}}至{{yuDingInfo.EndDate}})</span>
          </div>
          <div class="panel-group">
            <label>预定客户：</label>
            <span>{{yuDingInfo.CustomerInfo}}</span>
          </div>
          <div class="panel-group">
            <label>合同编号：</label>
            <span>
              <i @click="getContractInfo">{{yuDingInfo.contractInfo ? yuDingInfo.contractInfo : yuDingInfo.HTCode ? yuDingInfo.HTCode : '生成合同'}}</i>
              <i @click="contactDialog = true">修改合同内容</i>
            </span>
          </div>
        </div>
      </div>
      <div class="panel">
        <div class="panel-title"><i class="ziyuan"></i>合同信息</div>
        <div class="panel-content">
          <div class="panel-group">
            <label>客户签名：</label>
            <span>
              <img v-if="signList.CustomerHasAutograph === 1" :src="signList.CustomerAutograph" style="width: 100px;height: 100px;" alt="">
              <img v-for="(item, index) in signList.QianMingList" :key="index" v-if="item.HasAutograph === 1" :src="item.Autograph" style="width: 100px;height: 100px;" alt="">
              <i style="color: #2a6496;vertical-align: top;cursor: pointer" @click="dialogVisible = true">(分享给游客)</i>
            </span>
          </div>
          <div class="panel-group">
            <label>电子合同：</label>
            <span>
              <i @click="contractLook('', contractInfo.XianLuLeiXing ? contractInfo.XianLuLeiXing : '旅游委托接待合同')">（查看打印合同）</i>
              <template v-if="contractInfo.XianLuLeiXing">
                <i @click="contractLook('/contract/personList')">（附件1：旅游报名表）</i>
                <i @click="contractLook('/contract/tourList')">（附件2：旅游行程单）</i>
                <i @click="contractLook('/contract/book')">（附件3：授权委托书）</i>
                <i @click="contractLook('/contract/changeTuan')">（附件4：转并团书面证明）</i>
                <i @click="contractLook('/contract/FuJia')">（附件5：附加条款）</i>
              </template>
            </span>
          </div>
        </div>
      </div>
      <div class="panel panel-btn">
        <el-button @click="submitOrder(2)">上一步</el-button>
        <el-button @click="submitOrder(4)">下一步</el-button>
      </div>
    </div>
    <!--<div class="content">
      <div class="con-left">
        <ul>
          <li class="lf-con-item">
            <section class="item-header">
              <i class="base-info base-icon1"></i>
              <span>基本信息</span>
            </section>
            <section class="base-allInfo">
              <p><span class="base-all-item">订单编号:</span><span class="base-all-item">{{yuDingInfo.OrderCode}}</span></p>
              <p><span class="base-all-item">线路名称:</span><span class="base-all-item">{{yuDingInfo.ResourceName}} (发团日期{{yuDingInfo.StartDate}}至{{yuDingInfo.EndDate}})</span></p>
              <p><span class="base-all-item">预定客户:</span><span class="base-all-item">{{yuDingInfo.CustomerInfo}}</span></p>
              <p><span class="base-all-item">合同编号:</span><em style="color: #06c;cursor: pointer" @click="getContractInfo">{{yuDingInfo.contractInfo ? yuDingInfo.contractInfo : yuDingInfo.HTCode ? yuDingInfo.HTCode : '生成合同'}}</em> <em style="color: #06c;cursor: pointer" @click="contactDialog = true">修改合同内容</em></p>
            </section>
          </li>
          <li class="lf-con-item">
            <section class="item-header">
              <i class="base-info base-icon2"></i>
              <span>合同信息</span>
            </section>
            <section class="base-allInfo">
              <p>
                <span class="base-all-item">客户签名:</span>
                <span class="base-all-item">
                  <img v-if="signList.CustomerHasAutograph === 1" :src="signList.CustomerAutograph" style="width: 100px;height: 100px;" alt="">
                  <img v-for="(item, index) in signList.QianMingList" :key="index" v-if="item.HasAutograph === 1" :src="item.Autograph" style="width: 100px;height: 100px;" alt="">
                  <i style="color: #2a6496;vertical-align: top;cursor: pointer" @click="dialogVisible = true">(分享给游客)</i>
                  </span>
              </p>
              <p>
                <span class="base-all-item">电子合同:</span>
                <span class="base-all-item" style="color: #06c;cursor: pointer">
                    <i @click="contractLook('', contractInfo.XianLuLeiXing ? contractInfo.XianLuLeiXing : '旅游委托接待合同')">（查看打印合同）</i>
                    <template v-if="contractInfo.XianLuLeiXing">
                      <i @click="contractLook('/contract/personList')">（附件1：旅游报名表）</i>
                      <i @click="contractLook('/contract/tourList')">（附件2：旅游行程单）</i>
                      <i @click="contractLook('/contract/book')">（附件3：授权委托书）</i>
                      <i @click="contractLook('/contract/changeTuan')">（附件4：转并团书面证明）</i>
                      <i @click="contractLook('/contract/FuJia')">（附件5：附加条款）</i>
                    </template>
                  </span>
              </p>
            </section>
          </li>
          <li style="padding: 10px;margin-bottom: 20px; text-align: center">
            <el-button type="warning" @click="submitOrder(2)">上一步</el-button>
            <el-button type="warning" @click="submitOrder(4)">下一步</el-button>
          </li>
        </ul>
      </div>
    </div>-->
    <!--    修改合同-->
    <updateContract title="修改合同" :dialog="contactDialog" @cancel="contactDialog = false" @confirm="contactDialog = false"></updateContract>
    <el-dialog :visible.sync="dialogVisible" width="190px" class="dialog_Sign">
      <img :src="yuDingInfo.QianMing" onerror="this.src = '/static/default.gif'" alt="" style="width: 150px;height: 150px">
    </el-dialog>
  </div>
</template>

<script>
import updateContract from '@/components/updateContract'
import serverHttp from '@/assets/common/tour'
export default {
  name: 'Order2',
  components: {updateContract},
  data () {
    return {
      contactDialog: false,
      // 预定信息
      yuDingInfo: '',
      OrderId: '',
      contractInfo: '',
      signList: '',
      dialogVisible: false
    }
  },
  created () {
    this.OrderId = this.$route.query.OrderId
    if (this.OrderId) {
      this.getYuDingInfo()
      this.GetSign()
    }
  },
  methods: {
    // 获取下单成功后的预定信息
    getYuDingInfo () {
      serverHttp.GetYuDingInfo({
        OrderId: this.OrderId
      }).then(res => {
        if (res.code === 0) {
          this.yuDingInfo = res.data
          this.getList()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 上一步/下一步
    submitOrder (type) {
      if (type === 2) {
        this.$router.push({name: 'tourOrder3', query: {...this.$route.query, current: type}})
      } else {
        this.$router.push({name: 'tourOrder5', query: {...this.$route.query, current: type}})
      }
    },
    // 生成合同编号
    getContractInfo () {
      if (!this.yuDingInfo.contractInfo) {
        serverHttp.AddHeTongCode({
          OrderId: this.OrderId
        }).then(res => {
          if (res.code === 0) {
            this.getList()
          } else {
            this.$message.error(res.msg)
          }
        })
      }
    },
    // 获取合同信息
    getList () {
      serverHttp.getContractPerson({
        OrderId: this.OrderId,
        FjType: 0
      }).then(res => {
        if (res.code === 0) {
          this.$set(this.yuDingInfo, 'contractInfo', res.data.HeTongCode)
          this.contractInfo = res.data
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    /**
     * 跳转合同
     */
    contractLook (path, type) {
      let url = ''
      if (!path) {
        if (type === '国内游') {
          url = '#/contract/GN'
        } else if (type === '出境游') {
          url = '#/contract/GJ'
        } else if (type === '台湾') {
          url = '#/contract/TW'
        } else if (type === '周边游') {
          url = '#/contract/index'
        } else if (type === '旅游委托接待合同') {
          url = '#/contract/WT'
        } else {
          this.$message.warning('暂无此订单合同!')
        }
      } else {
        url = '#' + path
      }
      window.open(url + '?OrderId=' + this.OrderId, '_blank')
    },
    /**
     * 获取签名
     */
    GetSign () {
      serverHttp.GetSign({
        OrderId: this.OrderId
      }).then(res => {
        if (res.code === 0) {
          this.signList = res.data
        } else {
          this.$message.error(res.msg)
        }
      })
    }
  }
}
</script>

<style lang="scss">
.dialog_Sign{
  margin-top: 20vh;
  .el-dialog__header{
    padding: 0;
    color: #fff;
    .el-dialog__close{
      display: none;
    }
  }
  .el-dialog__body{
    padding: 20px;
  }
}
</style>
