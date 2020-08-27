<template>
  <div class="order-content">
    <div class="wrapper">
      <step :current="current" :list="list"></step>
      <div class="order-info">
        <div class="panel">
          <div class="panel-title"><i class="chanpin"></i>基本信息</div>
          <div class="panel-content">
            <div class="panel-group">
              <label>订单编号：</label>
              <span>DD13213513</span>
            </div>
            <div class="panel-group">
              <label>线路名称：</label>
              <span>线路名称线路名称线路名称线路名称</span>
            </div>
            <div class="panel-group">
              <label>销售员工：</label>
              <span>姓名，手机号码</span>
            </div>
            <div class="panel-group">
              <label>预订客户：</label>
              <span>姓名，手机号码</span>
            </div>
          </div>
        </div>
        <div class="panel">
          <div class="panel-title"><i class="renshu"></i>出行人数</div>
          <div class="panel-content">
            <el-table :data="OrderRenYuans" style="width: 100%">
              <el-table-column label="类型" width="200">
                成人（75岁以上）
              </el-table-column>
              <el-table-column label="销售价" width="120">
                <p>100</p>
              </el-table-column>
              <el-table-column label="成本价" width="120">
                <p>100</p>
              </el-table-column>
              <el-table-column label="人数" width="200">
                <p>100</p>
              </el-table-column>
              <el-table-column label="备注">
                <p>123</p>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <div class="panel">
          <div class="panel-title"><i class="ziyuan"></i>附加资源</div>
          <div class="panel-content">
            <el-table :data="OrderRenYuans" style="width: 100%">
              <el-table-column label="类型" width="200">
                成人（75岁以上）
              </el-table-column>
              <el-table-column label="销售价" width="120">
                <p>100</p>
              </el-table-column>
              <el-table-column label="成本价" width="120">
                <p>100</p>
              </el-table-column>
              <el-table-column label="人数" width="200">
                <p>100</p>
              </el-table-column>
              <el-table-column label="备注">
                <p>123</p>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <div class="panel">
          <div class="panel-title"><i class="ziyuan"></i>结算信息</div>
          <div class="panel-content">
            <div class="panel-group">
              <label>供应商：</label>
              <span>供应商供应商供应商供应商</span>
            </div>
            <div class="panel-group">
              <label>结算：</label>
              <span>应付100，已付100，未付<strong class="price">100</strong></span>
            </div>
          </div>
        </div>
        <div class="panel panel-btn">
          <el-button @click="prev">上一步</el-button>
          <el-button @click="next">确认交团</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import step from '@/components/step'
import serverHttp from '@/assets/common/tour'

export default {
  name: 'Order1',
  components: {step},
  data () {
    return {
      list: ['第一步: 产品', '第二步: 预订', '第三步: 名单', '第四步: 保险', '第五步: 合同', '第六步: 交团'],
      current: 5,
      linetype: 1,
      OrderRenYuans: [{}, {}],
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: '',
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
          this.orderSubmit.OrderRenYuans.push({
            ModeId: '456d36bce4564304b73c27ed4a789ec2',
            Price: item.Price,
            THPrice: item.Price,
            Num: 0
          })
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
    changeType (e) {
      this.linetype = e
    },
    // 获取预定基本信息
    getBaseData () {
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
    submitOrder (type) {
      this.submit(type)
      window.scrollTo({
        'top': 0,
        'behavior': 'smooth'
      })
    },
    prev () {
      this.$router.push({name: 'LuRuDingDan5'})
    },
    next () {
      this.$router.push({name: 'memberTourHeTongInfo'})
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

<style lang="scss">
  @import "../../assets/order";

  .base-money {
    p {
      margin-bottom: 15px;
    }
  }

  .tuiInput {
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
    -webkit-transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
    transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
    width: 80px;
  }

  .tuiInput:hover {
    border: 1px solid rgb(175, 176, 177);
  }
</style>
