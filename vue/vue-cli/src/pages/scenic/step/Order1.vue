<template>
  <div>
    <div class="order-info">
      <div class="panel">
        <div class="panel-title"><i class="chanpin"></i>基本信息</div>
        <div class="panel-content">
          <div class="panel-group">
            <label>景区名称：</label>
            <span>景区名称</span>
          </div>
          <div class="panel-group">
            <label>游玩日期：</label>
            <el-date-picker
              v-model="value1"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </div>
          <div class="panel-group" v-if="!$route.query.OrderId">
            <label>销售员工：</label>
            <span><i @click="saleDialog = true">选择</i><span>{{baseInfo.SaleUser.UserName}} {{baseInfo.SaleUser.Telephone}} {{baseInfo.SaleUser && baseInfo.SaleUser.JiGou ? '[' +baseInfo.SaleUser.JiGou + ']' : ''}}</span></span>
          </div>
          <div class="panel-group" v-else>
            <label>销售员工：</label>
            <span>{{baseInfo.SaleUser.Desc}}</span>
          </div>
          <div class="panel-group" v-if="!$route.query.OrderId">
            <label>选择客户：</label>
            <span><i @click="passDialog = true">选择</i><span>{{baseInfo.passenger.UserName}} {{baseInfo.passenger.Telephone}} {{baseInfo.passenger && baseInfo.passenger.JiGou ? '[' + baseInfo.passenger.JiGou + ']' : ''}}</span></span>
          </div>
          <div class="panel-group" v-else>
            <label>选择客户：</label>
            <span>{{baseInfo.CustomerInfo}}</span>
          </div>
        </div>
      </div>
      <div class="panel">
        <div class="panel-title"><i class="user"></i>门票信息</div>
        <div class="panel-content">
          <el-table  style="width: 100%" border>
            <el-table-column label="门票类型">成人票</el-table-column>
            <el-table-column label="销售价" width="150" prop="xiaoshoujia">
              <el-input placeholder="销售价"></el-input>
            </el-table-column>
            <el-table-column label="成本价" width="150" prop="chengbenjia">
              <el-input placeholder="成本价"></el-input>
            </el-table-column>
            <el-table-column label="数量" width="200" prop="number">
              <el-input-number v-model="num" @change="handleChange" :min="1" :max="10" label="描述文字"></el-input-number>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="panel">
        <div class="panel-title"><i class="user"></i>联系人信息</div>
        <div class="panel-content">
          <div class="panel-group">
            <label>姓名：</label>
            <el-input v-model="orderSubmit.OrderContact" placeholder="姓名"></el-input>
          </div>
          <div class="panel-group">
            <label>联系电话：</label>
            <el-input v-model="orderSubmit.OrderContactTel" placeholder="联系电话"></el-input>
          </div>
        </div>
      </div>
      <div class="panel">
        <div class="panel-title"><i class="ziyuan"></i>预定收入</div>
        <div class="panel-content">
          <div class="panel-group">
            <label>结算：</label>
            <span>
              实收<strong class="price">¥{{totalPrice}}</strong>，优惠<el-input class="price-txt" v-model="orderSubmit.YouHuiAmount" placeholder="金额"></el-input>
            </span>
          </div>
          <div class="panel-group">
            <label>备注说明：</label>
            <el-input type="textarea" placeholder="备注说明" v-model="orderSubmit.Remark"></el-input>
          </div>
        </div>
      </div>
      <div class="panel">
        <div class="panel-title"><i class="ziyuan"></i>支出成本</div>
        <div class="panel-content">
          <div class="panel-group">
            <label>供应商：</label>
            <span>供应商</span>
          </div>
          <div class="panel-group">
            <label>结算：</label>
            <span>
              <strong class="price">¥{{basePrice}}</strong>，优惠<el-input class="price-txt" v-model="orderSubmit.ZhiChuYouHui" placeholder="金额"></el-input>
            </span>
          </div>
          <div class="panel-group">
            <label>备注说明：</label>
            <el-input type="textarea" placeholder="备注说明" v-model="orderSubmit.ZhiChuRemark"></el-input>
          </div>
        </div>
      </div>
      <div class="panel panel-btn">
        <el-button v-if="!$route.query.OrderId" @click="submitOrder">提交订单</el-button>
      </div>
    </div>

    <!--    销售员选择-->
    <salePerson title="选择销售员" :personDialog="saleDialog" @change="changeSalePerson" @cancel="saleDialog = false" @confirm="saleDialog = false"></salePerson>
    <!--    客户选择-->
    <choosePassenger title="选择客户" :personDialog="passDialog" @change="changePassPerson" @cancel="passDialog = false" @confirm="passDialog = false"></choosePassenger>
  </div>
</template>

<script>
import serverHttp from '@/assets/common/tour'
export default {
  name: 'Order1',
  data () {
    return {
      // 基础数据
      baseInfo: {
        OrderId: '',
        OrderCode: '',
        SaleUser: {
          JiGou: ''
        },
        GongYingShang: {
          JiGou: ''
        },
        JiHeList: [],
        passenger: {
          UserName: '',
          Telephone: '',
          JiGou: ''
        }
      },
      businessType: [],
      tuanSan: [],
      // 提交数据
      orderSubmit: {
        JiHeId: '',
        ResourceId: '',
        OrderType: '',
        OrderLeiXing: '',
        StartDate: '',
        // 销售员工Id
        SaleUserId: '',
        CustomerType: '',
        CustomerId: '',
        CustomerJiGouId: '',
        CustomerBuMend: '',
        OrderContact: '',
        OrderContactTel: '',
        YouHuiAmount: 0,
        Remark: '',
        DaiType: 0,
        DaiPrice: 0,
        ZhiChuYouHui: 0,
        ZhiChuRemark: '',
        OrderDetails: [],
        OrderRenYuans: [],
        OrderFuJias: []
      },
      // 订单信息
      yuDingInfo: {},
      passDialog: false,
      saleDialog: false,
      rules: {
        OrderContact: [
          {required: true, message: '', trigger: 'blur'}
        ],
        OrderContactTel: [
          {required: true, message: '', trigger: 'blur'}
        ]
      },
      tourDatePrice: []
    }
  },
  created () {
    this.getBaseData()
    this.getData()
    this.orderSubmit.ResourceId = this.$route.query.id
    this.orderSubmit.StartDate = this.$route.query.date
    // if (this.$route.query.price) {
    //   this.orderSubmit.OrderRenYuans.push({ModeId: '456d36bce4564304b73c27ed4a789ec2', Price: this.$route.query.price, THPrice: this.$route.query.price, Num: 0})
    // }
    this.tourDatePrice = JSON.parse(localStorage.getItem('tourDatePrice'))
    if (this.tourDatePrice) {
      this.tourDatePrice.forEach(item => {
        if (this.orderSubmit.StartDate === item.Date) {
          this.orderSubmit.OrderRenYuans.push({ModeId: '456d36bce4564304b73c27ed4a789ec2', Price: item.Price, THPrice: item.Price, Num: 0})
        }
      })
    }
  },
  computed: {
    // 总价
    totalPrice () {
      var str = 0
      if (this.orderSubmit.OrderRenYuans.length > 0) {
        this.orderSubmit.OrderRenYuans.forEach(v => {
          str += (Number(v.Num) * Number(v.Price))
        })
      }
      if (this.orderSubmit.OrderFuJias.length > 0) {
        this.orderSubmit.OrderFuJias.forEach(v => {
          str += (Number(v.Num) * Number(v.Price))
        })
      }
      return (str - Number(this.orderSubmit.YouHuiAmount)).toFixed(2) || str
    },
    // 成本价
    basePrice () {
      var str = 0
      if (this.orderSubmit.OrderRenYuans.length > 0) {
        this.orderSubmit.OrderRenYuans.forEach(v => {
          str += (Number(v.Num) * Number(v.THPrice))
        })
      }
      if (this.orderSubmit.OrderFuJias.length > 0) {
        this.orderSubmit.OrderFuJias.forEach(v => {
          str += (Number(v.Num) * Number(v.THPrice))
        })
      }
      return (str - Number(this.orderSubmit.ZhiChuYouHui)).toFixed(2) || str
    }
  },
  methods: {
    // 获取预定基本信息
    getBaseData () {
      // 业务类型
      serverHttp.GetEnumByYeWuLeiXing({}).then(res => {
        if (res.code === 0) {
          if (res.code === 0 && res.data) {
            this.businessType = res.data.List
            this.orderSubmit.OrderLeiXing = this.businessType[0].Value
          }
        } else {
          this.$message.error(res.msg)
        }
      })
      // 团散类型
      serverHttp.GetEnumByTuanSanLeiXing({}).then(res => {
        if (res.code === 0) {
          if (res.code === 0 && res.data) {
            this.tuanSan = res.data.List
            this.orderSubmit.OrderType = this.tuanSan[0].Value
          }
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    getData () {
      // 预定信息
      serverHttp.GetYuDing({
        ResourceId: this.$route.query.id,
        Date: this.$route.query.date
      }).then(res => {
        if (res.code === 0) {
          if (res.code === 0 && res.data) {
            this.baseInfo = {
              ...this.baseInfo,
              ...res.data,
              date: this.$route.query.date
            }
            console.log(this.baseInfo)
            this.orderSubmit.SaleUserId = this.baseInfo.SaleUser.Id
            if (this.$route.query.OrderId) {
              this.getYuDingInfo()
            }
          }
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 选择销售员工
    changeSalePerson (item) {
      this.baseInfo.SaleUser.UserName = item.Name
      this.baseInfo.SaleUser.Telephone = item.Telephone
      this.baseInfo.SaleUser.JiGou = item.BuMen
      this.orderSubmit.SaleUserId = item.Id
      this.saleDialog = false
    },
    // 选择客户
    changePassPerson (item) {
      if (item.type !== '1') {
        this.baseInfo.passenger.JiGou = item.JiGou
        this.orderSubmit.CustomerJiGouId = item.JiGouId
      }
      this.baseInfo.passenger.UserName = item.UserName
      this.baseInfo.passenger.Telephone = item.Telephone
      this.orderSubmit.CustomerType = item.type
      this.orderSubmit.CustomerId = item.Id
      this.passDialog = false
    },
    // 增加出行人数或者附加资源
    addOrderDetail (type) {
      if (type === '1') {
        this.orderSubmit.OrderRenYuans.push({Mode: '', ModeId: '', Price: '', THPrice: '', Num: 0, Remark: ''})
      } else {
        this.orderSubmit.OrderFuJias.push({Mode: '', ModeId: '', Price: '', THPrice: '', Num: 0, Remark: ''})
      }
    },
    /**
     * 下一步/上一步
     * @param type
     */
    submitOrder () {
      this.$router.push({name: 'ScenicOrder2'})
    },
    // 提交订单 -- 下单
    submit (type) {
      if (!this.orderSubmit.SaleUserId) {
        this.$message.warning('请选择销售员工')
        return
      }
      if (!this.baseInfo.OrderId) {
        if (!this.orderSubmit.CustomerId && !this.orderSubmit.CustomerType) {
          this.$message.warning('请选择客户')
          return
        }
      }

      if (!this.orderSubmit.OrderContact || !this.orderSubmit.OrderContactTel) {
        this.$message.warning('请完善联系人信息')
        return
      }
      if (this.orderSubmit.OrderRenYuans.length > 0) {
        this.orderSubmit.OrderRenYuans.forEach(child => {
          if (child.ModeId) {
            this.$set(child, 'Mode', this.baseInfo.RenYuan.data.xianlu_renyuan.find(item => item.Id === child.ModeId).Pid)
          }
        })
      }
      if (this.orderSubmit.OrderFuJias.length > 0) {
        this.orderSubmit.OrderFuJias.forEach(child => {
          if (child.ModeId) {
            this.$set(child, 'Mode', this.baseInfo.ZiYuan.data.xianlu_ziyuan.find(item => item.Id === child.ModeId).Pid)
          }
        })
      }
      if (type === 1) {
        // 新增
        serverHttp.OrderAdd(this.orderSubmit).then(res => {
          if (res.code === 0) {
            this.$message.success('下单成功')
            this.baseInfo.OrderCode = res.data.OrderCode
            this.baseInfo.OrderId = res.data.Id
            this.next()
          } else {
            this.$message.error(res.msg)
          }
        })
      } else {
        serverHttp.OrderEdit(this.orderSubmit).then(res => {
          if (res.code === 0) {
            this.$message.success('修改订单成功')
          } else {
            this.$message.error(res.msg)
          }
        })
      }
    },
    // 获取下单成功后的预定信息
    getYuDingInfo () {
      serverHttp.GetYuDingInfo({
        OrderId: this.$route.query.OrderId
      }).then(res => {
        if (res.code === 0) {
          this.yuDingInfo = res.data
          this.orderSubmit.OrderFuJias = res.data.FuJias
          if (res.data.FuJias.length > 0) {
            this.orderSubmit.OrderFuJias.forEach(v => {
              this.$set(v, 'THPrice', v.PriceTH)
            })
          }
          this.orderSubmit.OrderRenYuans = res.data.RenYuans
          if (res.data.RenYuans.length > 0) {
            this.orderSubmit.OrderRenYuans.forEach(v => {
              this.$set(v, 'THPrice', v.PriceTH)
            })
          }
          this.baseInfo = {
            ...this.baseInfo,
            ...res.data
          }
          this.orderSubmit = {
            ...this.orderSubmit,
            ...res.data
          }
          this.baseInfo.Title = res.data.ResourceName
          this.baseInfo.date = res.data.StartDate
          this.orderSubmit.OrderContact = res.data.ContactName
          this.orderSubmit.OrderContactTel = res.data.ContactTelephone
          this.orderSubmit.ZhiChuYouHui = res.data.ZhiYouHui
          this.orderSubmit.ZhiChuRemark = res.data.ZhiRemark
          this.orderSubmit.YouHuiAmount = res.data.OrderYouHui
          this.orderSubmit.Remark = res.data.OrderRemark
        } else {
          this.$message.error(res.msg)
        }
      })
    }
  },
  mounted () {
    // console.log(this.baseInfo)
  }
}
</script>

<style scoped>

</style>
