<template>
<div class="train-detail">
  <step :current="current" :list="['第一步: 基本信息', '第二步: 在线支付', '第三步: 支付成功']"></step>
  <div class="content">
    <div class="left-con">
      <div class="lc-box">
        <p class="title">乘客信息</p>
        <ul class="ck-info">
          <li v-for="(item, index) in personList" :key="index">
            <p style="margin-bottom: 8px;font-size: 14px">第{{index+1}}位乘客-成人票 <span style="color: #2577e3;margin-left: 6px;cursor: pointer" @click="deletePerson">删除</span></p>
            <el-row :gutter="20" style="margin-bottom: 15px">
              <el-col :span="12">
                <el-input type="text" placeholder="姓名,请与登机证件姓名保持一致" v-model="item.name"></el-input>
              </el-col>
            </el-row>
            <el-row :gutter="20" style="margin-bottom: 15px">
              <el-col :span="12">
                <el-select style="width: 100px;float: left;height: 32px" v-model="item.type" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <el-input style="float: right;width: calc(100% - 110px);" type="number" placeholder="证件号码" v-model="item.number"></el-input>
              </el-col>
            </el-row>
          </li>
          <el-row>
            <el-button icon="el-icon-plus">添加乘客</el-button>
            <el-button icon="el-icon-plus">添加同行儿童</el-button>
          </el-row>
        </ul>
      </div>
      <div class="lc-box">
        <p class="title">联系人</p>
        <ul class="lxr-info">
          <li>
            <label>姓名</label>
            <el-input type="text" v-model="contact.name" placeholder="姓名"></el-input>
          </li>
          <li>
            <label>手机号码</label>
            <el-input type="number" v-model="contact.phone" placeholder="请输入正确的手机号以接收出票通知信息"></el-input>
          </li>
          <li>
            <label>预定说明</label>
            <el-input type="textarea" :rows="2" v-model="contact.remark"></el-input>
          </li>
        </ul>
      </div>
      <div class="lc-box">
        <p class="title"><el-checkbox v-model="contact.checked">是否同意无座</el-checkbox></p>
      </div>
      <div class="notice-plane">
        <p style="color: #666">点击预订表示您已阅读并同意 <i style="color: #2577e3;cursor: pointer">《火车票信息服务协议》</i> <i style="color: #2577e3;cursor: pointer">《预订须知》</i></p>
        <el-button type="warning">立即预定</el-button>
      </div>
    </div>
    <div class="right-con">
      <section class="con1">
        <span style="margin-right: 20px">2019-07-16出发</span>
        <span>Z22</span>
        <section class="con3">
          <div class="start">
            <p><strong>09:35</strong></p>
            <p>太原</p>
          </div>
          <div class="start">
            <p>23小时59分</p>
          </div>
          <div class="start">
            <p><strong>11:45</strong></p>
            <p>北京西</p>
          </div>
        </section>
        <section>
          已选: 硬卧
        </section>
      </section>
      <section class="con4"><span>成人票价</span><span><i>￥480.00</i> x 1</span></section>
      <section class="con4"><span>儿童票价</span><span><i>￥240.00</i> x 1</span></section>
      <section class="con4"><span>操作费</span><span><i>￥5.00</i> x 1</span></section>
      <section class="con4"><span>订单总额</span><span>￥<strong>480.00</strong></span></section>
      <section class="con5">
        <div class="train-notice">温馨提示</div>
        <p>因火车票实名制购买规定，我司只为真实的消费者代购火车票，我方有权在核实购票人身份时，要求客户提供身份证复印件核实购票人的身份，购票人身份核实通过后，才能完成购票，退票及退款，否则我司不提供售后服务。若行为严重违反铁路机关相关规定的，我司将主动配合公安机关进行查处。</p>
        <div class="moreNoticeInfo" :style="[{'height': height}]">
          <p>自取票（预售期为30天）：<br/>22:55-6:00支付完成，6：30前回复是否有票。<br/>6:00-22:55支付完成，支付成功后15分钟内回复是否出票成功。</p>
          <p>送票上门、VIP取票（预售期28天）：<br/>00:00-08:00支付完成，9点前回复是否有票；<br/>08:00-16:00支付完成，1小时内回复是否有票；<br/>16:00-24:00支付完成，最晚次日9:00前回复；<br/>预售期外的订单，预售期当天18:30前回复；<br/>送票上门、VIP取票不提供退改签，您可前往火车站进行退改签服务。</p>
          <p>极速预订服务仅针对套餐用户，选择套餐后携程将为您极速代购，或者您可以通过自己12306的账号购票，无需购买套餐。</p>
          <p>短信通知您，因运营商网关延迟可能导致您无法及时接收短信，请到我的订单中跟踪出票情况。</p>
          <p>支付成功并非100%有票，如不能出票，1-3个工作日退款至您的支付账户。</p>
          <p>如遇列车停运，请最晚在发车前30分钟进行线上退票，我司将退回全款。如果已经取出车票或者列车已过发车时间，请您务必在5日内（含出发日）前往车站退票，全款将按支付渠道退回。</p>
          <p>由我司提供的套餐等服务类产品，出行前支持无理由退款，出行后不支持退款。</p>
        </div>
        <div class="viewAll" v-if="height===0" @click="height = auto">
          查看全部 <i class="el-icon-arrow-down"></i>
        </div>
        <div class="viewAll" v-else @click="height = 0">
          收起更多 <i class="el-icon-arrow-up"></i>
        </div>
      </section>
    </div>
  </div>
</div>
</template>

<script>
import step from '@/components/step'
export default {
  name: 'detail',
  components: {step},
  data () {
    return {
      height: 0,
      current: 0,
      personList: [
        {name: '', type: '1', isBaoXian: true, number: ''}
      ],
      contact: {
        name: '',
        phone: '',
        remark: '',
        checked: true
      },
      options: [{
        value: '1',
        label: '黄金糕'
      }, {
        value: '2',
        label: '双皮奶'
      }, {
        value: '3',
        label: '蚵仔煎'
      }, {
        value: '4',
        label: '龙须面'
      }]
    }
  },
  methods: {
    deletePerson () {
      this.$confirm('确定要删除吗？', '信息', {
        distinguishCancelAndClose: true,
        confirmButtonText: '确认',
        cancelButtonText: '取消'
      })
        .then(() => {
          this.$message({
            type: 'info',
            message: '保存修改'
          })
        })
        .catch(action => {
          this.$message({
            type: 'info',
            message: action === 'cancel'
              ? '放弃保存并离开页面'
              : '停留在当前页面'
          })
        })
    }
  }
}
</script>

<style lang="scss">
  $green: #3aa400;
.train-detail{
  width: 1200px;
  margin: 0 auto 20px;
  overflow: hidden;
  .left-con{
    width: 760px;
    float: left;
    .el-input{
      width: 340px;
      .el-input__inner{
        height: 30px;
        line-height: 30px;
      }
    }
    .el-select .el-input .el-select__caret{
      line-height: 30px;
    }
    .el-textarea{
      width: 340px;
    }
    .lc-box{
      margin-bottom: 20px;
      background: #fff;
      box-sizing: border-box;
      padding: 20px;
      .title{
        font-size: 20px;
        line-height: 20px;
        font-weight: 700;
      }
      .el-checkbox__input.is-checked+.el-checkbox__label{
          color: #333;
      }
      .el-checkbox__inner{
        transform: scale(1.7, 1.7);
        margin-left: 10px;
        margin-top: -3px;
        &:hover{
          border-color: #3aa400;
        }
      }
      .el-checkbox__input.is-checked .el-checkbox__inner{
        background-color: #3aa400;
        border-color: #3aa400;
      }
      .el-checkbox__label{
        font-size: 20px;
        font-weight: 700;
        color: #333;
      }
      .lxr-info{
        li{
          margin-bottom: 15px;
          label{
            float: left;
            line-height: 32px;
            margin-right: 10px;
            display: inline-block;
            font-size: 14px;
            width: 80px;
            text-align: right;
          }
        }
      }
      .ck-info{
        overflow: hidden;
        margin-top: 15px;
        li{
          background: #F7F7F7;
          padding: 20px;
          margin-bottom: 20px;
          .el-input{
            width: 100%;
          }
        }
        .el-button{
          border-color: $green;
          color: $green;
          &:hover{
            background: $green;
            color: #fff;
          }
        }
      }
    }
    .notice-plane{
      .el-button--warning{
        width: 100%;
        margin-top: 20px;
        background-color: #F60;
        border-color: #F60;
      }
    }
  }
  .right-con{
    width: 410px;
    float: right;
    color: #333;
    background: #fff;
    box-sizing: border-box;
    padding: 0 0 20px;
    .con1{
      background: #e8f4ff;
      padding: 20px;
      margin-bottom: 20px;
      span{
        color: #333;
        font-size: 16px;
        font-weight: 600;
        font-family: "微软雅黑",tahoma,'宋体',Arial,Lucida,Verdana,Helvetica,sans-serif;
      }
    }
    .con3{
      overflow: hidden;
      margin: 30px 0 20px;
      display: flex;
      justify-content: space-between;
      .start{
        float: left;
        width: 105px;
        line-height: 18px;
        p:first-child{
          font-size: 22px;
          margin-bottom: 6px;
          strong{
            font-weight: normal;
          }
        }
      }
      .start:last-child{
        float: right;
        text-align: right;
      }
      .start:nth-child(2){
        width: 120px;
        p{
          text-align: center;
          font-size: 12px;
          color: #666;
          position: relative;
          &::before{
            width: 15px;
            height: 1px;
            content: " ";
            background: #ccc;
            position: absolute;
            left: 0;
            top: 50%;
          }
          &::after{
            width: 15px;
            height: 1px;
            content: " ";
            background: #ccc;
            position: absolute;
            right: 0;
            top: 50%;
          }
        }
      }
    }
    .con4{
      overflow: hidden;
      width: 100%;
      height: 38px;
      line-height: 18px;
      box-sizing: border-box;
      padding: 10px 20px;
      span:first-child{
        float: left;
      }
      span:last-child{
        float: right;
        color: #999;
      }
      i{
        color: #FF6913;
        font-size: 15px;
        margin-right: 5px;
      }
    }
    .con4:nth-last-of-type(2){
      border-top: 2px solid #F2F2F2;
      padding: 12px 0 0;
      margin: 0 20px;
      width: auto;
      height: 52px;
      line-height: 32px;
      span{
        font-weight: 700;
        font-size: 18px;
      }
      span:last-child{
        color: #FF6913;
        font-size: 26px;
      }
    }
    .con5{
      margin-top: 20px;
      padding: 0 20px;
      overflow: hidden;
      .moreNoticeInfo{
        overflow: hidden;
        transition: all 1s ease;
      }
      p{
        position: relative;
        margin-left: 15px;
        line-height: 20px;
        &::before{
          content: " ";
          left: -10px;
          top: 7px;
          width: 4px;
          height: 4px;
          background: #ccc;
          position: absolute;
        }
      }
      .train-notice{
        font-size: 14px;
        font-weight: 700;
        margin-bottom: 8px;
      }
      .viewAll{
        border-top: 1px solid #EBEBEB;
        text-align: center;
        line-height: 40px;
        margin-top: 10px;
        cursor: pointer
      }
    }
  }
}
</style>
