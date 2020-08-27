<template>
<div class="heTongDetail">
  <p class="title">旅游委托接待合同 <em>(未生效)</em></p>
  <div class="content">
    <table border class="table-hetong">
      <tbody>
        <tr>
          <td>委托单位：</td>
          <td>{{allInfo.ZuTuan_JiGou}}</td>
        </tr>
        <tr>
          <td>接待单位：</td>
          <td>{{allInfo.JieDai_JiGou}}</td>
        </tr>
      </tbody>
    </table>
    <h3>第一章：接待信息</h3>
    <table border class="table-hetong">
      <tbody>
        <tr>
          <td>线路名称：</td>
          <td>{{allInfo.ResourceName}}</td>
        </tr>
        <tr>
          <td>出发：</td>
          <td>{{allInfo.StartDate}} 乘{{allInfo.ChuFaType}}</td>
        </tr>
        <tr>
          <td>返回：</td>
          <td>{{allInfo.EndDate}} 乘{{allInfo.FanHuiType}}</td>
        </tr>
        <tr>
          <td>人数费用：</td>
          <td>{{price}}</td>
        </tr>
        <tr>
          <td>结算金额：</td>
          <td>合计应付{{jieSuanPrice}}.00元 （结算方式：按合作协议）</td>
        </tr>
        <tr>
          <td>联系人：</td>
          <td>{{allInfo.LianXiRenName}} {{allInfo.LianXiRenTel}}</td>
        </tr>
        <tr>
          <td>备注说明：</td>
          <td>{{allInfo.Remark}}</td>
        </tr>
      </tbody>
    </table>
    <h3>第二章：行程安排</h3>
    <table border class="table-hetong">
      <tbody v-if="allInfo.XingChengType === 1">
        <tr>
          <td>简易行程</td>
          <td v-html="allInfo.XingChengDetail"></td>
        </tr>
      </tbody>
      <tbody v-else-if="allInfo.XingChengType === 0">
        <tr v-for="item in allInfo.XingChengList" :key="item.Num">
          <td>第 {{item.Num}} 天</td>
          <td>
            <span v-for="v in item.AnPai" :key="v">{{v.Decs}}</span>
          </td>
        </tr>
      </tbody>
    </table>
    <h3>第三章：费用说明</h3>
    <table border class="table-hetong">
      <tbody>
        <tr>
          <td>费用包含：</td>
          <td>{{baoHan}}</td>
        </tr>
        <tr>
          <td>费用不含：</td>
          <td>{{noBaoHan}}</td>
        </tr>
      </tbody>
    </table>
    <table border class="table-hetong last">
      <tbody>
        <tr>
          <td>
            <p>组团社(盖章)：{{allInfo.ZuTuan_JiGou}}
              <img class="zhang" :src="allInfo.ZuTuan_GongZhang" />
            </p>
            <p>日期：{{allInfo.ZuTuan_Date}}</p>
          </td>
          <td>
            <p>地接社(盖章)：{{allInfo.JieDai_JiGou}}
              <img class="zhang" :src="allInfo.JieDai_GongZhang" />
            </p>
            <p>日期：{{allInfo.JieDai_Date}}</p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
</template>

<script>
import serverHttp from '@/assets/common/tour.js'
export default {
  name: 'baoXianDetail',
  data () {
    return {
      OrderId: '',
      allInfo: {},
      price: '',
      jieSuanPrice: '',
      baoHan: '',
      noBaoHan: ''
    }
  },
  mounted () {
    this.OrderId = this.$route.query.OrderId || ''
    this.getListData()
  },
  methods: {
    getListData () {
      serverHttp.getContractPerson({
        OrderId: this.OrderId,
        FjType: 0
      }).then(res => {
        if (res.code === 0) {
          this.allInfo = res.data
          let arr = res.data.RenYuan
          if (arr.length === 1 && arr[0].Num !== 0) {
            this.price = arr[0].Name + '' + arr[0].Price + '.00x' + arr[0].Num + '人'
          } else if (arr.length > 1) {
            arr.forEach((item, index) => {
              if (item.Num !== 0 && index !== arr.length - 1) {
                this.price += item.Name + '' + item.Price + '.00x' + item.Num + '人,'
              } else if (item.Num !== 0 && index === arr.length - 1) {
                this.price += item.Name + '' + item.Price + '.00x' + item.Num + '人'
              }
            })
          }
          arr.forEach(item => {
            this.jieSuanPrice += item.Price * item.Num
          })
          let baoHan = res.data.FeiYongBaoHan
          baoHan.forEach((item, index) => {
            if (index === baoHan.length - 1) {
              this.baoHan += item
            } else {
              this.baoHan += item + '+'
            }
          })
          let noBaoHan = res.data.FeiYongBuHan
          noBaoHan.forEach((item, index) => {
            if (index === noBaoHan.length - 1) {
              this.noBaoHan += item
            } else {
              this.noBaoHan += item + '+'
            }
          })
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
  .title{
    padding: 10px 0;
    line-height: 40px;
    text-align: center;
    background-color: #373d41;
    color: #fff;
    font-size: 24px;
    em{
      color: red;
      font-weight: bold;
    }
  }
  .content{
    padding: 20px;
    .small-title{
      font-size: 20px;
      padding-left: 8px;
      margin: 30px 0;
      border-left: 2px solid #f60;
    }
    .table-hetong{
      width: 100%;
      margin-top: 10px;
      margin-bottom: 10px;
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
    h3{
      border: none;
      text-align: center;
      font-size: 13px;
      font-weight: normal;
    }
    .table-hetong.last{
      width: 100%;
      margin-top: 10px;
      margin-bottom: 10px;
      border: 1px solid #e2e2e2;
      tbody{
        tr{
          td{
            width: 50%;
            padding: 5px 6px;
            height: 105px;
            vertical-align: middle;
            word-break: break-all;
            font-size: 14px;
            p{
              line-height: 35px!important;
              text-align: left;
            }
            p:first-child{
              height: 70px;
            }
            p:last-child{
              height: 35px;
            }
          }
          td:first-child{
            width: 50%;
            background: #fff;
            color: #666;
            text-align: left;
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
