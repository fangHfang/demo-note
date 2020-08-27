<template>
<div class="baoXianDetail">
  <p class="title">保险方案详情</p>
  <div class="content">
    <table border class="table-baoXian" v-if="data.BxResult">
      <tbody>
        <tr>
          <td>保险名称：</td>
          <td>{{data.BxResult.productName}}</td>
        </tr>
        <tr>
          <td>保险公司名称：</td>
          <td>{{data.BxResult.insuranceCompanyName}}</td>
        </tr>
        <tr>
          <td>最大承保天数：</td>
          <td>{{data.BxResult.maxDays}}</td>
        </tr>
        <tr>
          <td>保额：</td>
          <td>{{data.BxResult.sumInsured}}</td>
        </tr>
        <tr>
          <td>产品介绍：</td>
          <td><div v-html="data.BxResult.introduction"></div></td>
        </tr>
        <tr>
          <td>投保须知：</td>
          <td><div v-html="data.BxResult.notice"></div></td>
        </tr>
        <tr>
          <td>保险条款：</td>
          <td>
            <div v-html="data.BxResult.clause"></div>
          </td>
        </tr>
      </tbody>
    </table>
    <p class="small-title">价格明细</p>
    <el-table v-if="data.BxResult" :data="data.BxResult.prices" style="width: 100%;margin-bottom: 20px" border stripe :span-method="objectSpanMethod">
      <el-table-column prop="type" label="年龄段" width="180" v-slot="scope">
        <p v-if="scope.row.maxAge > 0">{{scope.row.minAge}}-{{scope.row.maxAge}}岁</p>
        <p v-else>{{scope.row.minAge}}岁以上</p>
      </el-table-column>
      <el-table-column prop="day" label="时间段" width="180" v-slot="scope">
        <p>{{scope.row.minDay}}-{{scope.row.maxDay}}</p>
      </el-table-column>
      <el-table-column prop="price" label="价格(元)" v-slot="scope">
        <p>{{scope.row.price}}</p>
      </el-table-column>
    </el-table>
  </div>
</div>
</template>

<script>
import serverHttp from '@/assets/common/tour'
export default {
  name: 'baoXianDetail',
  data () {
    return {
      data: {
      },
      list: [
        {type: '0-69', day: '1-1', price: '1.38'},
        {type: '0-69', day: '1-1', price: '1.38'},
        {type: '0-69', day: '1-1', price: '1.38'},
        {type: '0-69', day: '1-1', price: '1.38'},
        {type: '0-69', day: '1-1', price: '1.38'}
      ]
    }
  },
  created () {
    this.getPrice()
  },
  methods: {
    getPrice () {
      serverHttp.GetBaoXianInfo({
        OrderId: this.$route.query.OrderId,
        ResourceId: this.$route.query.BaoXianOrderId,
        GysId: this.$route.query.GysId
      }).then(res => {
        if (res.code === 0) {
          this.data = res.data
          this.data.BxResult.introduction = this.HTMLDecode(res.data.BxResult.introduction)
          this.data.BxResult.notice = this.HTMLDecode(res.data.BxResult.notice)
          this.data.BxResult.clause = this.HTMLDecode(res.data.BxResult.clause)
          console.log(this.data.BxResult.clause)
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    HTMLDecode (text) {
      var temp = document.createElement('div')
      temp.innerHTML = text
      var output = temp.innerText || temp.textContent
      temp = null
      return output
    },
    objectSpanMethod ({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (rowIndex % 5 === 0) {
          return {
            rowspan: 5,
            colspan: 1
          }
        } else {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      }
    }
  }
}
</script>

<style lang="scss">
.baoXianDetail{
  background: #fff;
  .blue{
    color: #06c;
    cursor: pointer;
    line-height: 60px;
  }
  .title{
    padding: 10px 0;
    line-height: 40px;
    text-align: center;
    background-color: #373d41;
    color: #fff;
    font-size: 24px;
  }
  .content{
    padding: 20px;
    .small-title{
      font-size: 20px;
      padding-left: 8px;
      margin: 30px 0;
      border-left: 2px solid #f60;
    }
    .table-baoXian{
      width: 100%;
      border: 1px solid #e2e2e2;
      tbody{
        tr{
          td{
            padding: 5px 6px;
            height: 40px;
            line-height: 40px;
            vertical-align: middle;
            word-break: break-all;
            font-size: 14px;
            p{
              line-height: 40px!important;
            }
          }
          td:first-child{
            width: 120px;
            background: #f5f5f5;
            color: #000;
            text-align: right;
          }
          td:last-child{
            color: #666;
          }
        }
      }
    }
  }
}
</style>
