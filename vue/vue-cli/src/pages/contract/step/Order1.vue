<template>
  <div>
    <div class="order-info" style="padding-top:20px;">
      <div class="panel">
        <div class="panel-title"><i class="chanpin"></i>基本信息</div>
        <div class="panel-content">
          <div class="panel-group">
            <label>合同类型：</label>
            <span>{{detailData.ContractTypeName}}</span>
          </div>
          <!--<div class="panel-group">
            <label>合同价格：</label>
            <span><strong class="price">¥{{detailData.Price}}</strong>/份</span>
          </div>-->
          <div class="panel-group">
            <label>申请份数：</label>
            <el-input placeholder="申请份数" style="width: 80px" v-model="buyNum"></el-input> 份
          </div>
          <div class="panel-group">
            <label>备注说明：</label>
            <el-input type="textarea" placeholder="备注说明" v-model="Remark"></el-input>
          </div>
          <!--<div class="panel-group">
            <label>应付合计：</label>
            <span><strong class="price">¥{{detailData.Price * buyNum}}</strong></span>
          </div>-->
        </div>
      </div>
      <div class="panel panel-btn">
        <el-button v-if="!$route.query.OrderId" @click="submitOrder">提交订单</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import serverHttp from '@/assets/common/hetong'
export default {
  name: 'Order1',
  data () {
    return {
      detailData: {},
      heTongId: '',
      buyNum: 0,
      Remark: ''
    }
  },
  methods: {
    getDetail () {
      let that = this
      let TypeId = that.heTongId
      serverHttp.GetHeTongTypeInfo({TypeId}).then(res => {
        that.detailData = res.data
      })
    },
    submitOrder () {
      serverHttp.HeTongAdd({ContractTypeId: this.$route.query.id, OrderNum: this.buyNum, Remark: this.Remark}).then(res => {
        console.log(res)
        // this.$router.push({name: 'ContractOrder2', query: {current: 1, id: res.data}})
      })
    }
  },
  mounted () {
    this.heTongId = this.$route.query.id
    this.getDetail()
  }
}
</script>

<style scoped>

</style>
