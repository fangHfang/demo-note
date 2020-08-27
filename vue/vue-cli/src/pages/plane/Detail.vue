<template>
<div class="plane-detail">
  <step :current="current"></step>
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
              <el-col :span="12">
                <el-checkbox v-model="item.isBaoXian" style="margin-right: 8px"></el-checkbox>是否购买保险 30元/份
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
            <label>备注</label>
            <el-input type="textarea" :rows="2" v-model="contact.remark" placeholder="姓名"></el-input>
          </li>
        </ul>
      </div>
      <el-button type="warning">立即预定</el-button>
    </div>
    <div class="right-con">
      <section class="con1">
        <span>单程</span>
        <span style="margin-right: 20px">2019-07-16出发</span>
        <span>太原-重庆</span>
      </section>
      <section class="con2">
        <span>中国东方航空公司 MU2244</span><span>73E</span>
        <el-popover
          placement="bottom-end"
          width="400"
          trigger="hover">
          <ul class="showNotice">
            <li>
              <label>退票费</label>
              <p>起飞前7天（不含）之前提出退票，收取票面价20%的退票费；起飞前7天（含）至2天（不含）之间提出退票，收取票面价30%的退票费；起飞前2天（含）至4小时（不含）之间提出退票，收取票面价70%的退票费；起飞前4小时（含）之内及起飞后提出退票，收取票面价90%的退票费；</p>
            </li>
            <li>
              <label>退票费</label>
              <p>起飞前7天（不含）之前提出变更，收取票面价10%的变更费；起飞前7天（含）至2天（不含）之间提出变更，收取票面价20%的变更费；起飞前2天（含）至4小时（含）之间提出变更，收取票面价50%的变更费；起飞前4小时（含）之内及起飞后提出变更，收取票面价70%的变更费；</p>
            </li>
            <li>
              <label>签转费</label>
              <p>不得签转</p>
            </li>
          </ul>
          <span slot="reference">退改签</span>
        </el-popover>
      </section>
      <section class="con3">
        <div class="start">
          <p><strong>09:35</strong></p>
          <p>太原武宿机场T2</p>
        </div>
        <div class="start">
          <p>23小时59分</p>
        </div>
        <div class="start">
          <p><strong>11:45</strong></p>
          <p>重庆江北机场T3</p>
        </div>
      </section>
      <section class="con4"><span>成人票价</span><span><i>￥480.00</i> x 1</span></section>
      <section class="con4"><span>儿童票价</span><span><i>￥480.00</i> x 1</span></section>
      <section class="con4"><span>机场税</span><span><i>￥480.00</i> x 1</span></section>
      <section class="con4"><span>燃油税</span><span><i>￥480.00</i> x 1</span></section>
      <section class="con4"><span>保险</span><span><i>￥480.00</i> x 1</span></section>
      <section class="con4"><span>订单总额</span><span>￥<strong>480.00</strong></span></section>
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
      current: 1,
      personList: [
        {name: '', type: '1', isBaoXian: true, number: ''}
      ],
      contact: {
        name: '',
        phone: '',
        remark: ''
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
.plane-detail{
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
      padding: 20px;
      .title{
        margin-bottom: 20px;
        font-size: 20px;
        line-height: 20px;
        font-weight: 700;
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
        li{
          background: #f7f7f7;
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
    .el-button--warning{
      width: 100%;
      background-color: #F60;
      border-color: #F60;
    }
  }
  .right-con{
    width: 410px;
    float: right;
    color: #333;
    background: #fff;
    .con1{
      box-sizing: border-box;
      padding: 20px 20px 0;
      span{
        color: #333;
        font-size: 16px;
        font-weight: 600;
        font-family: "微软雅黑",tahoma,'宋体',Arial,Lucida,Verdana,Helvetica,sans-serif;
      }
      span:first-child{
        margin-right: 8px;
        background: #DFEBFA;
        color: #3D5675;
        padding: 1px 5px;
        border-radius: 2px;
        font-size: 12px;
      }
    }
    .con2{
      color: #849bab;
      box-sizing: border-box;
      padding: 10px 20px 0;
      span{
        margin-right: 16px;
      }
      span:last-child{
        border-bottom: 1px dashed #849bab;
        cursor: help;
        margin-right: 0;
      }
    }
    .con3{
      overflow: hidden;
      margin: 30px 20px 20px;
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
        width: 160px;
        p{
          text-align: center;
          font-size: 12px;
          color: #666;
          position: relative;
          &::before{
            width: 40px;
            height: 1px;
            content: " ";
            background: #ccc;
            position: absolute;
            left: 0;
            top: 50%;
          }
          &::after{
            width: 40px;
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
      box-sizing: border-box;
      height: 38px;
      line-height: 18px;
      padding: 10px 20px;
      background: #fffaee;
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
    .con4:last-of-type{
      padding: 12px 20px 30px;
      border-top: 2px solid #F2F2F2;
      height: 64px;
      line-height: 30px;
      span{
        font-weight: 700;
        font-size: 18px;
      }
      span:last-child{
        color: #FF6913;
        font-size: 26px;
      }
    }
  }
}
</style>
