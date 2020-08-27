<template>
  <div>
    <div class="order-info">
      <div class="panel">
        <div class="panel-title"><i class="chanpin"></i>基本信息</div>
        <div class="panel-content">
          <div class="panel-group">
            <label>订单编号：</label>
            <span>DD123123123</span>
          </div>
          <div class="panel-group">
            <label>景区名称：</label>
            <span>景区名称</span>
          </div>
          <div class="panel-group">
            <label>门票类型：</label>
            <span>成人票（5张）</span>
          </div>
          <div class="panel-group">
            <label>游玩日期：</label>
            <span>2018-05-15</span>
          </div>
          <div class="panel-group">
            <label>预定客户：</label>
            <span>姓名，手机号码</span>
          </div>
        </div>
      </div>
      <div class="panel">
        <div class="panel-title"><i class="ziyuan"></i>向总社付款</div>
        <div class="panel-content">
          <div class="panel-group" v-if="yuDingInfo.JieSuanCustomer&&yuDingInfo.JieSuanCustomer.Desc">
            <label>结算客户：</label>
            <span>王超 13303510000 总办(当前门店)</span>
          </div>
          <div class="panel-group">
            <label>结算信息：</label>
            <span>
              应付 {{yuDingInfo.YingFu}}，已付 {{yuDingInfo.YiFu}} ，未付<strong class="price">¥{{yuDingInfo.WeiFu}}</strong>
            </span>
          </div>
          <div class="panel-group">
            <label>结算金额：</label>
            <el-input v-model="form.Price" placeholder="结算金额" style="width: 100px;"></el-input>
          </div>
          <div class="panel-group">
            <label>结算方式：</label>
            <span>
              <el-radio-group v-model="form.AccountType">
                <el-radio :label="item.AccountType" v-for="(item, index) in payWay" :key="index">{{item.AccountTypeDesc}}</el-radio>
              </el-radio-group>
            </span>
          </div>
          <div class="panel-group" v-if="form.AccountType && form.AccountType === 4">
            <label>可用余额：</label>
            <span>{{payWay.find(v => v.AccountType === form.AccountType).Data}}</span>
          </div>
          <div class="panel-group" v-else>
            <label>账户：</label>
            <el-autocomplete
              class="inline-input"
              v-model="form.name"
              :fetch-suggestions="querySearch"
              placeholder="请选择账户"
              @select="handleSelect"
            ></el-autocomplete>
          </div>
          <div class="panel-group">
            <label>备注说明：</label>
            <el-input type="textarea" placeholder="备注说明" v-model="form.Remark"></el-input>
          </div>
        </div>
      </div>
      <div class="panel panel-btn">
        <el-button @click="submitOrder(2)">上一步</el-button>
        <el-button @click="submit">确认</el-button>
        <el-button @click="toDetail">查看订单详情</el-button>
      </div>
      <div class="panel">
        <div class="panel-title"><i class="ziyuan"></i>向总社付款记录（已提交{{recordData.YiTiJiao}}，已确认{{recordData.YiQueRen}}，未确认{{recordData.WeiQueRen}}）</div>
        <div class="panel-content">
          <el-table :data="recordData.List" style="width: 100%" border v-if="recordData.List">
            <el-table-column label="付款方式" prop="Type" width="140" align="center"></el-table-column>
            <el-table-column label="金额" prop="Price" width="140"></el-table-column>
            <el-table-column label="提交人" v-slot="scope">
              <p v-if="scope.row.AddUser">{{scope.row.AddUser.Desc}}</p>
            </el-table-column>
            <el-table-column label="时间" prop="AddTime"></el-table-column>
            <el-table-column label="状态" prop="number" width="140" align="center">
              <template v-slot="scope">
                <p class="operate" style="color: #8e44ad;" v-if="scope.row.PayStatus === 0">未确认</p>
                <p class="operate" style="color: #20a832;" v-else-if="scope.row.PayStatus === 1">已确认</p>
                <p class="operate" style="color: red;" v-else>已拒绝</p>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="100" align="center">
              <template v-slot="scope">
                <p class="operate" style="color: #06c;" @click="dialog = true;getDetail(scope.row.Id)">申请退款</p>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>

    <!--    申请退款-->
    <el-dialog title="申请退款" width="1000px" :visible.sync="dialog" class="dialog3" @close="handleCancel">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="订单编号">
          {{payDetail.OrderCode}}
        </el-form-item>
        <el-form-item label="产品名称">
          <i>{{payDetail.ResourceName}}</i>
          （发团日期{{payDetail.StartDate}}至 {{payDetail.EndDate}}）
        </el-form-item>
        <el-form-item label="结算客户" v-if="payDetail.JieSuanCustomer&&payDetail.JieSuanCustomer.Desc">
          {{payDetail.JieSuanCustomer.Desc}}
        </el-form-item>
        <el-form-item label="结算信息">
          应付{{payDetail.YingFu}}，已结算{{payDetail.YiJieSuan}}，未结算 <i>{{payDetail.WeiJieSuan}}</i>
        </el-form-item>
        <el-form-item label="退款金额">
          {{payDetail.YiJieSuan}}元
        </el-form-item>
        <el-form-item label="退款方式">
          {{payDetail.FuKuanAccountType}}
        </el-form-item>
        <el-form-item label="退款金额">
          <input class="tuiInput" type="number" ref="doInput" v-model="submitOut.Price" @click="noFuc"> 元
        </el-form-item>
        <el-form-item label="备注说明">
          <el-input type="textarea" v-model="submitOut.Remark" placeholder="备注说明"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitUpdate">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import serverHttp from '@/assets/common/tour'
export default {
  name: 'Order2',
  data () {
    return {
      // 预定信息
      yuDingInfo: {},
      baseData: [],
      recordData: '',
      form: {
        AccountType: '',
        AccountId: '',
        Price: '',
        Remark: '',
        name: ''
      },
      submitOut: {
        Price: '',
        Remark: ''
      },
      dialog: false,
      // 支付方式
      payWay: [],
      // 订单详情
      payDetail: ''
    }
  },
  created () {
    this.OrderId = this.$route.query.OrderId
    if (this.OrderId) {
      this.getYuDingInfo()
      this.getList()
      this.getData()
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
          this.form.Price = res.data.WeiFu
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 上一步
    submitOrder (type) {
      this.$router.push({name: 'HotelOrder2'})
    },
    // 获取基本信息
    getList () {
      serverHttp.GetPayList({
        OrderId: this.OrderId
      }).then(res => {
        if (res.code === 0) {
          this.recordData = res.data
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 获取支付信息
    getData () {
      serverHttp.GetPayConfigs({
        OrderId: this.OrderId
      }).then(res => {
        if (res.code === 0) {
          this.payWay = res.data
          if (res.data.length > 0) {
            this.form.AccountType = res.data[0].AccountType
          }
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 输入匹配账户信息
    querySearch (queryString, cb) {
      let arr = this.payWay.find(v => v.AccountType === this.form.AccountType).Data
      if (arr.length > 0) {
        arr.forEach(v => {
          this.$set(v, 'value', v.Desc)
        })
      }
      var restaurants = arr
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter (queryString) {
      return (restaurant) => {
        return (restaurant.Desc.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    handleSelect (item) {
      this.form.AccountId = item.Id
    },
    // 提交
    submit () {
      if (!this.form.Price || this.form.Price <= 0) {
        this.$message.warning('请填写正确的支付金额')
        return
      }
      if (this.form.AccountType === 1 && !this.form.AccountId) {
        this.$message.warning('请选择账户')
        return
      }
      this.form.Price = Number(this.form.Price)
      serverHttp.AddPay({
        OrderId: this.OrderId,
        ...this.form
      }).then(res => {
        if (res.code === 0) {
          this.form = {
            AccountType: '',
            AccountId: '',
            Price: '',
            Remark: '',
            name: ''
          }
          this.getYuDingInfo()
          this.getList()
          this.getData()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    getDetail (id) {
      serverHttp.GetPay({
        OrderId: this.OrderId,
        FinanceId: id
      }).then(res => {
        if (res.code === 0) {
          this.payDetail = res.data
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    toDetail () {
      window.open('#/member/tourDetail?OrderId=' + this.OrderId, '_blank')
    },
    submitUpdate () {
      if (!this.submitOut.Price || this.submitOut.Price <= 0) {
        this.$message.warning('请填写正确的退款金额')
        return
      }
      serverHttp.TuiPay({
        OrderId: this.OrderId,
        FinanceId: this.payDetail.FuKuanId,
        ...this.submitOut
      }).then(res => {
        if (res.code === 0) {
          this.dialog = false
          this.handleCancel()
          this.getList()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    handleCancel () {
      this.dialog = false
      this.submitOut = {
        Price: '',
        Remark: ''
      }
    },
    noFuc () {
      if (this.$refs.doInput.value <= 0) {
        this.$refs.doInput.value = 0
      }
    }
  }
}
</script>

<style lang="scss">
.base-money{
  p{
    margin-bottom: 15px;
  }
}
.tuiInput{
  height: 30px !important;
  line-height: 30px;
  -webkit-appearance: none;
  background-color: #FFF;
  background-image: none;
  border-radius: 4px;
  border: 1px solid #DCDFE6;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  color: #606266;
  display: inline-block;
  font-size: inherit;
  height: 40px;
  line-height: 40px;
  outline: 0;
  padding: 0 15px;
  -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
  transition: border-color .2s cubic-bezier(.645,.045,.355,1);
  width: 80px;
}
.tuiInput:hover{
  border: 1px solid rgb(175, 176, 177);
}
</style>
