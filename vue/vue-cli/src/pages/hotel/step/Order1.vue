<template>
  <div>
    <div class="order-info">
      <div class="panel">
        <div class="panel-title"><i class="chanpin"></i>基本信息</div>
        <div class="panel-content">
          <div class="panel-group">
            <label>酒店名称：</label>
            <span>{{baseInfo.ResourceName}}</span>
          </div>
          <div class="panel-group">
            <label>入住日期：</label>
            <el-date-picker
              v-model="value1"
              type="daterange"
              range-separator="至"
              @change="selectDate"
              start-placeholder="入住日期"
              end-placeholder="离店日期">
            </el-date-picker>
            <em>共{{num}}天</em>
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
        <div class="panel-title"><i class="user"></i>房间信息<div class="add-box"><span class="add" @click="addOrderDetail('1')">增加</span></div></div>
        <div class="panel-content">
          <el-table :data="orderSubmit.OrderRenYuans" style="width: 100%">
            <el-table-column prop="type" label="类型" v-slot="scope">
              <el-select v-model="scope.row.ModeId" placeholder="请选择" style="text-align: center;" v-if="baseInfo.Rooms">
                <el-option
                  v-for="item in baseInfo.Rooms"
                  :key="item.Id"
                  :label="item.JDRoomType"
                  :value="item.Id">
                </el-option>
              </el-select>
            </el-table-column>
            <el-table-column prop="price" label="销售价" v-slot="scope" width="120">
              <p><el-input type="number" v-model="scope.row.Price"></el-input></p>
            </el-table-column>
            <el-table-column prop="price" label="成本价" v-slot="scope" width="120">
              <p><el-input type="number" v-model="scope.row.THPrice"></el-input></p>
            </el-table-column>
            <el-table-column prop="date" label="数量" v-slot="scope" width="200">
              <el-input-number v-model="scope.row.Num" :min="0" size="small" :max="10" label="数量"></el-input-number>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="panel">
        <div class="panel-title"><i class="user"></i>联系人信息</div>
        <div class="panel-content">
          <div class="panel-group">
            <label>姓名：</label>
            <el-input v-model="orderSubmit.ContactName" placeholder="姓名"></el-input>
          </div>
          <div class="panel-group">
            <label>联系电话：</label>
            <el-input v-model="orderSubmit.ContactTel" placeholder="联系电话"></el-input>
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
              <strong class="price">¥{{basePrice}}</strong>，优惠<el-input class="price-txt" v-model="orderSubmit.ZhiYouHui" placeholder="金额"></el-input>
            </span>
          </div>
          <div class="panel-group">
            <label>备注说明：</label>
            <el-input type="textarea" placeholder="备注说明" v-model="orderSubmit.ZhiRemark"></el-input>
          </div>
        </div>
      </div>
      <div class="panel panel-btn">
        <el-button v-if="!$route.query.OrderId" @click="submitOrder">提交订单</el-button>
      </div>
    </div>

    <!--<div class="content">
      <div class="con-left">
        <ul>
          <li class="lf-con-item">
            <section class="item-header">
              <i class="base-info base-icon1"></i>
              <span>基本信息</span>
              {{baseInfo.businessType}}
            </section>
            <section class="base-allInfo">
              &lt;!&ndash;                <p><span class="base-all-item">订单编号:</span><span class="base-all-item">DLY1903071203066952538</span></p>&ndash;&gt;
              <p><span class="base-all-item">酒店名称:</span><span class="base-all-item">酒店名称</span></p>
              <p><span class="base-all-item">房间类型:</span><span class="base-all-item">单人间<router-link to="/jiudian/detail" style="color: #2e9900;margin-left:10px;">重新选择</router-link></span></p>
              <p><span class="base-all-item">入住日期:</span>
                <span class="base-all-item">
                  <el-date-picker
                    v-model="value1"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                  </el-date-picker>
                </span>
              </p>
              <p><span class="base-all-item">销售价:</span>
                <span class="base-all-item">
                  <el-input v-model="input" placeholder="销售价"></el-input>
                </span>
              </p>
              <p><span class="base-all-item">成本价:</span>
                <span class="base-all-item">
                  <el-input v-model="input" placeholder="成本价"></el-input>
                </span>
              </p>
              <p v-if="!$route.query.OrderId"><span class="base-all-item">销售员工:</span><span class="base-all-item"><i style="color: #06c;cursor: pointer;margin-right: 10px;" @click="saleDialog = true">选择</i> {{baseInfo.SaleUser.UserName}} {{baseInfo.SaleUser.Telephone}} {{baseInfo.SaleUser && baseInfo.SaleUser.JiGou ? '[' +baseInfo.SaleUser.JiGou + ']' : ''}}</span></p>
              <p v-else><span class="base-all-item">销售员工:</span><span class="base-all-item">{{baseInfo.SaleUser.Desc}}</span></p>
              <p v-if="!$route.query.OrderId"><span class="base-all-item">选择客户:</span><span class="base-all-item"><i style="color: #06c;cursor: pointer;margin-right: 10px;" @click="passDialog = true">选择</i> {{baseInfo.passenger.UserName}} {{baseInfo.passenger.Telephone}} {{baseInfo.passenger && baseInfo.passenger.JiGou ? '[' + baseInfo.passenger.JiGou + ']' : ''}}</span></p>
              <p v-else><span class="base-all-item">选择客户:</span><span class="base-all-item">{{baseInfo.CustomerInfo}}</span></p>
            </section>
          </li>
          <li class="lf-con-item">
            <section class="item-header">
              <i class="base-info base-icon6"></i>
              <span>联系人信息</span>
            </section>
            <section>
              <el-form ref="form" :rules="rules" :model="orderSubmit" label-width="90px">
                <el-form-item label="姓名:" prop="OrderContact" style="margin-bottom: auto">
                  <el-input v-model="orderSubmit.OrderContact" placeholder="姓名" style="width: 220px;"></el-input>
                </el-form-item>
                <el-form-item label="联系电话:" prop="OrderContactTel" style="margin-bottom: auto">
                  <el-input v-model="orderSubmit.OrderContactTel" placeholder="联系电话" style="width: 220px;"></el-input>
                </el-form-item>
              </el-form>
            </section>
          </li>
          <li class="lf-con-item">
            <section class="item-header">
              <i class="base-info base-icon1"></i>
              <span>预定收入</span>
            </section>
            <section>
              <el-form ref="form" :model="orderSubmit" label-width="90px">
                <el-form-item label="结算:" prop="name">
                  实收: <strong style="color: red;font-size: 16px;">¥{{totalPrice}}</strong>,  优惠: <el-input v-model="orderSubmit.YouHuiAmount" placeholder="金额" style="width: 60px;"></el-input>
                </el-form-item>
                <el-form-item label="备注说明:">
                  <el-input type="textarea" v-model="orderSubmit.Remark" placeholder="备注说明" style="width: 715px;height: 80px"></el-input>
                </el-form-item>
              </el-form>
            </section>
          </li>
          <li class="lf-con-item">
            <section class="item-header">
              <i class="base-info base-icon2"></i>
              <span>交团支出</span>
            </section>
            <section>
              <el-form ref="form" :model="orderSubmit" label-width="90px">
                <el-form-item label="供应商:" prop="name">供应商供应商供应商供应商</el-form-item>
                <el-form-item label="结算:" prop="name">
                  <strong style="color: red;font-size: 16px;">¥{{basePrice}}</strong>,  优惠: <el-input v-model="orderSubmit.ZhiChuYouHui" placeholder="金额" style="width: 60px;"></el-input>
                </el-form-item>
                <el-form-item label="备注说明:">
                  <el-input type="textarea" v-model="orderSubmit.ZhiChuRemark" placeholder="备注说明" style="width: 715px;height: 80px"></el-input>
                </el-form-item>
              </el-form>
            </section>
          </li>
          <li class="lf-con-next tx-center" style="overflow: hidden">
            &lt;!&ndash;              <span>订单金额: <i>￥<em>2500</em></i></span>&ndash;&gt;
            <p @click="submitOrder" v-if="!$route.query.OrderId">提交订单</p>
          </li>
        </ul>
      </div>
    </div>-->
    <!--    销售员选择-->
    <salePerson title="选择销售员" :personDialog="saleDialog" @change="changeSalePerson" @cancel="saleDialog = false" @confirm="saleDialog = false"></salePerson>
    <!--    客户选择-->
    <choosePassenger title="选择客户" :personDialog="passDialog" @change="changePassPerson" @cancel="passDialog = false" @confirm="passDialog = false"></choosePassenger>
  </div>
</template>

<script>
import serverHttp from '@/assets/common/hotel'
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
        listData: [{
          num: '房间1',
          XingMing: '王小虎',
          ShenFenZhengNum: '12345678913246578'
        }, {
          num: '房间2',
          XingMing: '王小虎',
          ShenFenZhengNum: '12345678913246578'
        }, {
          num: '房间3',
          XingMing: '',
          ShenFenZhengNum: ''
        }],
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
        ZhiYouHui: 0,
        ZhiRemark: '',
        OrderDetails: [],
        OrderRenYuans: [],
        OrderFuJias: [],
        StartDate: '',
        EndDate: ''
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
      tourDatePrice: [],
      // -----------------------------
      value1: '',
      num: 0
    }
  },
  created () {
    this.getData()
    this.orderSubmit.ResourceId = this.$route.query.id
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
    getData () {
      // 预定信息
      serverHttp.GetYuDing({
        ResourceId: this.$route.query.id
      }).then(res => {
        if (res.code === 0) {
          if (res.code === 0 && res.data) {
            this.baseInfo = {
              ...this.baseInfo,
              ...res.data
            }
            console.log(this.baseInfo)
            this.orderSubmit.SaleUserId = this.baseInfo.SaleUser.Id
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
      // this.$router.push({name: 'HotelOrder2'})
      console.log(this.orderSubmit)
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
    },
    selectDate (data) {
      this.orderSubmit.StartDate = this.value1[0].getFullYear() + '-' + (this.value1[0].getMonth() + 1 < 10 ? '0' + (this.value1[0].getMonth() + 1) : this.value1[0].getMonth()) + '-' + (this.value1[0].getDate() < 10 ? '0' + this.value1[0].getDate() : this.value1[0].getDate())
      this.orderSubmit.EndDate = this.value1[1].getFullYear() + '-' + (this.value1[1].getMonth() + 1 < 10 ? '0' + (this.value1[1].getMonth() + 1) : this.value1[1].getMonth()) + '-' + (this.value1[1].getDate() < 10 ? '0' + this.value1[1].getDate() : this.value1[1].getDate())
      this.num = (data[1].getTime() - data[0].getTime()) / (24 * 3600 * 1000)
    }
  },
  mounted () {
    // console.log(this.baseInfo)
  }
}
</script>

<style scoped>

</style>
