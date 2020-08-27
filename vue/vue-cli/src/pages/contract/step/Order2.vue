<template>
  <div>
    <div class="order-info">
      <div class="panel">
        <div class="panel-title"><i class="chanpin"></i>基本信息</div>
        <div class="panel-content">
          <div class="panel-group">
            <label>订单编号：</label>
            <span>{{detailData.OrderCode}}</span>
          </div>
          <div class="panel-group">
            <label>合同类型：</label>
            <span>{{detailData.ContractTypeName}}</span>
          </div>
          <div class="panel-group">
            <label>购买份数：</label>
            <span>{{detailData.OrderNum}}份</span>
          </div>
        </div>
      </div>
      <div class="panel">
        <div class="panel-title"><i class="ziyuan"></i>向总社付款</div>
        <div class="panel-content">
          <div class="panel-group">
            <label>结算客户：</label>
            <span v-if="detailData.SaleUser">{{detailData.SaleUser.Desc}}</span>
          </div>
          <div class="panel-group">
            <label>结算信息：</label>
            <span>
              应付 {{detailData.YingShouAmount}}，已付 {{detailData.SubmitPrice}} ，未付<strong class="price">¥{{detailData.WatPrice}}</strong>
            </span>
          </div>
          <div class="panel-group">
            <label>结算金额：</label>
            <el-input placeholder="结算金额" style="width: 100px;"></el-input>
          </div>
          <div class="panel-group">
            <label>结算方式：</label>
            <span>
              <el-radio-group v-model="form.AccountType">
                <el-radio :label="item.AccountType" v-for="(item, index) in payWay" :key="index">{{item.AccountTypeDesc}}</el-radio>
              </el-radio-group>
            </span>
          </div>
          <div class="panel-group">
            <label>账户：</label>
            <!-- <el-autocomplete
              class="inline-input"
              v-model="form.name"
              :fetch-suggestions="querySearch"
              placeholder="请选择账户"
              @select="handleSelect"
            ></el-autocomplete> -->
          </div>
          <div class="panel-group">
            <label>备注说明：</label>
            <el-input type="textarea" placeholder="备注说明" v-model="form.Remark"></el-input>
          </div>
        </div>
      </div>
      <div class="panel panel-btn">
        <el-button @click="submitOrder(0)">上一步</el-button>
        <el-button @click="fukuan">确认</el-button>
        <el-button>查看订单详情</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import serverHttp from '@/assets/common/hetong'
export default {
  name: 'Order2',
  data () {
    return {
      form: {
        AccountType: '',
        AccountId: '',
        Price: '',
        Remark: '',
        name: ''
      },
      payWay: [],
      detailData: {}
    }
  },
  methods: {
    submitOrder (type) {
      this.$router.push({name: 'ContractOrder1', query: {current: type, id: this.$route.query.id}})
    },
    getDetail () {
      serverHttp.GetDetail({OrderId: this.$route.query.id}).then(res => {
        this.detailData = res.data
      })
    },
    fukuan () {
      serverHttp.FuKuan({}).then(res => {
        console.log(res)
      })
    }
  },
  mounted () {
    this.getDetail()
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
