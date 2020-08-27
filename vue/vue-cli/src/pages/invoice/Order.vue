<template>
  <div class="order-content">
    <div class="wrapper">
      <div class="order-info">
        <div class="panel" style="margin-top:15px;">
          <div class="panel-title"><i class="chanpin"></i>基本信息</div>
          <div class="panel-content">
            <div class="panel-group">
              <label>发票项目：</label>
              <span>{{detailData.Name}}</span>
            </div>
            <div class="panel-group">
              <label>开票金额：</label>
              <el-input placeholder="开票金额"></el-input>
            </div>
            <div class="panel-group">
              <label>销售员工：</label>
              <span><i>选择</i><span>姓名，手机号码</span></span>
            </div>
            <div class="panel-group">
              <label>选择客户：</label>
              <span><i>选择</i><span>姓名，手机号码</span></span>
            </div>
            <div class="panel-group">
              <label>开票类型：</label>
              <span>
                <el-radio-group >
                  <el-radio :label="0">无成本票</el-radio>
                  <el-radio :label="1">有成本票</el-radio>
                  <el-radio :label="2">订单成本</el-radio>
                </el-radio-group>
              </span>
            </div>
            <div class="panel-group">
              <label>成本金额：</label>
              <el-input placeholder="成本金额"></el-input>
            </div>
            <div class="panel-group">
              <label>订单编号：</label>
              <span><i>选择</i><span>DD132456，DD1324564</span></span>
            </div>
          </div>
        </div>
        <div class="panel">
          <div class="panel-title"><i class="ziyuan"></i>支出成本</div>
          <div class="panel-content">
            <div class="panel-group">
              <label>应付合计：</label>
              <span>
                <strong class="price">¥123123</strong>
              </span>
            </div>
            <div class="panel-group">
              <label>税费承担：</label>
              <span>
                <el-radio-group>
                  <el-radio label="1">门店承担</el-radio>
                  <el-radio label="2">总社利润中扣除</el-radio>
                </el-radio-group>
              </span>
            </div>
            <div class="panel-group">
              <label>实际应付：</label>
              <span>
                <strong class="price">¥123123</strong>
              </span>
            </div>
            <div class="panel-group">
              <label>备注说明：</label>
              <el-input type="textarea" placeholder="备注说明" ></el-input>
            </div>
          </div>
        </div>
        <div class="panel panel-btn">
          <el-button>提交订单</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import serverHttp from '@/assets/common/fapiao'
export default {
  name: 'Order',
  data () {
    return {
      ResourceId: '',
      detailData: {}
    }
  },
  methods: {
    getDetailInfo () {
      let ResourceId = this.ResourceId
      let that = this
      serverHttp.GetDetailInfo({ResourceId}).then(res => {
        that.detailData = res.data
      })
    }
  },
  mounted () {
    this.ResourceId = this.$route.query.id
    this.getDetailInfo()
  }
}
</script>

<style lang="scss">
  @import "../../assets/order";
</style>
