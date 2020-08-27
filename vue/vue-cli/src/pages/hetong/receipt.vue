<template>
  <div style="background: #fff;height: 100vh;overflow-y: scroll">
    <div class="content">
      <h1>电子收款收据</h1>
      <p>收款编号：{{data.Code}}</p>
      <table cellspacing="0" cellpadding="0">
        <tr>
          <td class="title">购买方名称</td>
          <td>{{data.OrderCustomer}}</td>
        </tr>
        <tr>
          <td class="title">购买产品</td>
          <td>{{data.ResourceName}}</td>
        </tr>
        <tr>
          <td class="title">收款金额</td>
          <td>{{data.Price}}元<span v-if="data.Flag === 1">【{{data.PaySourceDesc}}】</span>
            <span v-else-if="data.Flag === 0">【已作废】</span>
          </td>
        </tr>
        <tr>
          <td class="title">备注</td>
          <td>{{data.Remark}}</td>
        </tr>
        <tr>
          <td class="title">销售方</td>
          <td>{{saleUser}}</td>
        </tr>
        <tr>
          <td class="title">收款时间</td>
          <td>{{PayTime}}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import orderHttp from '@/assets/common/order.js'
export default {
  data () {
    return {
      OrderId: '',
      ShouJuId: '',
      data: {},
      saleUser: '',
      PayTime: ''
    }
  },
  created () {
    this.OrderId = this.$route.query.OrderId || ''
    this.ShouJuId = this.$route.query.ShouJuId || ''
    this.PayTime = this.$route.query.PayTime || ''
    this.getShouJuDetail()
  },
  methods: {
    getShouJuDetail () {
      orderHttp.GetShouJuDetail({OrderId: this.OrderId, ShouJuId: this.ShouJuId}).then(res => {
        if (res.code === 0) {
          this.data = res.data
          this.saleUser = res.data.SaleUser.Desc
        } else {
          this.$message.error(res.msg)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  * {
    margin: 0;
    padding: 0;
  }
  .content{
    position: relative;
    margin: 50px auto;
    width: 700px;
    h1{
      text-align: center;
      font-size: 36px;
      font-weight: bold !important;
    }
    p{
      margin-top: 20px;
      text-align: center;
      font-size: 16px;
    }
    table{
      margin: 20px auto;
      width: 700px;
      border: solid #ccc;
      border-width: 1px 0 0 1px;
      font-size: 14px;
      tr{
        .title{
          width: 120px;
          text-align: center;
        }
        td{
          padding: 0 5px;
          line-height: 38px;
          border: solid #ccc;
          border-width: 0 1px 1px 0;
          span{
            color: #f00;
            font-size: 15px;
            font-weight: 600;
          }
        }
      }
    }
  }
</style>
