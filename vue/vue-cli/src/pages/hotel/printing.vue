<template>
<div class="heTongDetail">
  <div class="content" id="printing">
    <p class="title">游客名单</p>
    <div class="dingDan">
      <div class="box">
        <span>订单编号：</span>
        <span>LY20190809-7-028-003，</span>
        <span>游客联系人：{{CustomerInfo}}</span>
      </div>
    </div>
    <table border style="width: 100%">
      <thead>
        <tr>
          <th>序</th>
          <th>游客信息</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in listData" :key="item.Id">
          <td>{{item.num}}</td>
          <td>
            <p>姓名：{{item.XingMing}}（{{item.Sex}}）</p>
            <p>身份证号：{{item.ShenFenZhengNum}}</p>
            <p>护照：{{item.HuZhaoHaoMa}}</p>
            <p>其他证件：{{item.QiTaHaoMa}}</p>
            <p>出生日期：{{item.BirthDate}}</p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="printP">
    <el-button class="printBtn" type="primary" v-print="'#printing'">立即打印</el-button>
  </div>
</div>
</template>

<script>
import serverHttp from '@/assets/common/tour'
export default {
  data () {
    return {
      listData: [],
      OrderId: '',
      OrderCode: '',
      LianXiName: '',
      LianXiTel: ''
    }
  },
  created () {
    this.OrderId = this.$route.query.OrderId
    this.OrderCode = this.$route.query.OrderCode
    this.CustomerInfo = this.$route.query.CustomerInfo
    this.getMingDans()
  },
  methods: {
    getMingDans () {
      serverHttp.GetMingDans({OrderId: this.OrderId}).then(res => {
        if (res.code === 0) {
          if (res.data.length > 0) {
            let listData = res.data
            listData.forEach((item, index) => {
              item.num = index + 1
            })
            this.listData = listData
          }
        } else {
          this.$message.error(res.msg)
        }
      })
    }
  }
}
</script>

<style lang="scss">
.heTongDetail{
  background: #fff;
  .blue{
    color: #06c;
    cursor: pointer;
    line-height: 60px;
  }
  .content{
    .title{
      padding: 10px 0;
      line-height: 40px;
      text-align: center;
      background-color: #373d41;
      color: #fff;
      font-size: 24px;
    }
    padding: 10px;
    table{
    border: 1px solid #ddd;
    td:first-child{
      width: 30px;
    }
    thead{
      tr{
        th{
          background: #f0f0f0;
          height: 30px;
          font-size: 13px;
          font-weight: normal;
        }
      }
    }
      tr{
        td, th{
          padding: 6px 15px;
          line-height: 20px;
          font-size: 13px;
          font-weight: normal;
          p{
            margin-top: 10px;
          }
        }
      }
    }
    .dingDan{
      margin: 0 10px;
      padding: 10px;
      border-bottom: 1px solid #ddd;
      position: relative;
      margin-bottom: 20px;
      .box{
        margin: 5px 0;
        padding-left: 10px;
        line-height: 23px;
        border-left: 3px solid #88b7e0;
      }
    }
  }
  .printP{
    text-align: center;
  }
}
</style>
