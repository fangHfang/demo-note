<template>
  <div>
    <div class="yl_order_info_left hotel-order-box">
      <el-form ref="form" :model="form" label-width="80px">
        <div class="panel">
          <div class="panel_title"><i class="myIcon order"></i>预定信息</div>
          <el-form-item label="入离时间:">
            <el-input v-model="form.startDate" placeholder="开始时间" readonly></el-input> --
            <el-input v-model="form.endDate" placeholder="结束时间" readonly></el-input>
            <span> 共1晚 </span>
          </el-form-item>
          <el-form-item label="房间数量:">
            <el-select v-model="form.region" placeholder="1">
              <el-option label="1" value="1"></el-option>
              <el-option label="2" value="2"></el-option>
              <el-option label="3" value="3"></el-option>
              <el-option label="4" value="4"></el-option>
              <el-option label="5" value="5"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="房费总计:">
            <span class="price">￥709.36</span>
          </el-form-item>
        </div>
        <div class="panel">
          <div class="panel_title"><i class="myIcon user"></i>入住信息</div>
          <el-form-item label="房间1:">
            <el-input v-model="form.name" placeholder="请填写一位入住人姓名"></el-input>
            <el-select class="sex-select" v-model="form.sex" placeholder="1">
              <el-option label="男" value="1"></el-option>
              <el-option label="女" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="姓名:">
            <el-input v-model="form.name2"></el-input>
          </el-form-item>
          <el-form-item label="联系电话:">
            <el-input v-model="form.phone" type="number"></el-input>
          </el-form-item>
          <el-form-item label="备注:">
            <el-input type="textarea" v-model="form.desc" placeholder="备注"></el-input>
          </el-form-item>
        </div>
        <div class="panel order_btn">
          <router-link to="/jiudiansanfang/detail" style="color: #2e9900; text-decoration: none;">&lt;&lt;重新选择房型</router-link>
          <el-button @click="onSubmit" class="next">提交订单</el-button>
        </div>
      </el-form>
    </div>
    <div class="yl_order_right">
      <img src="/static/banner/banner2.jpg" alt="">
      <div class="yl_hotel_info">
        <p class="title">太原富力万达文华酒店</p>
        <p class="address">解放路169号</p>
        <p class="title" style="font-size: 16px;margin-top: 5px">高级豪华双床房</p>
        <p class="info">
          <span>所在楼层: </span>16-21
          <span>房间床型: </span>16-21
        </p>
        <p class="info">
          <span>备注: </span>双床、16-21楼、42平米、免费WIFI、可入住2人
        </p>
      </div>
      <div class="totalPrice">
        <span>费用总额: </span> <i>￥805.55</i>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'YuDing',
  data () {
    return {
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      form: {
        name: '',
        name2: '张三',
        phone: '15735184176',
        data: '',
        region: '',
        desc: '',
        startDate: '2019-4-17',
        endDate: '2019-8-16',
        sex: '1'
      }
    }
  },
  methods: {
    onSubmit () {
      console.log('提交订单')
    }
  }
}
</script>
<style lang="scss">
    .yl_order_info_left{
        overflow: hidden;
        float: left;
        width: 880px;
        .panel{
            padding: 25px 25px 10px;
            margin-bottom: 20px;
            font-size: 13px;
            background: #fff;
            border: 1px solid #eee;
            border-top: 2px solid #ddd;
            .panel_title {
                position: relative;
                margin-bottom: 25px;
                padding-left: 63px;
                background: #f8f8f8;
                font-size: 20px;
                line-height: 43px;
                zoom: 1;
                i{
                    position: absolute;
                    left: 0;
                    top: 0;
                    display: block;
                    width: 43px;
                    height: 43px;
                    background: #fa0;
                  &:before{
                    content: " ";
                    width: 30px;
                    height: 30px;
                    top: 7px;
                    left: 6px;
                    position: absolute;
                    background: url("/static/all.png") no-repeat;
                  }
                }
                .order {
                    background: #fa0;
                  &:before{
                    top: 8px;
                    left: 7px;
                    height: 32px;
                    background-position: -195px -182px;
                  }
                }
                .user {
                  background: #53a93f;
                  &:before{
                    top: 6px;
                    left: 7px;
                    height: 33px;
                    background-position: -161px -178px;
                  }
                }
            }
            .price{
                color: #ff7800;
                font-size: 18px;
            }
            .el-input{
              width: auto;
            }
            .el-input__inner{
                width: auto;
                height: 32px;
                line-height: 30px;
            }
            .el-textarea__inner{
                border: 1px solid #ddd;
                padding: 5px 8px;
                width: 715px;
                height: 80px;
                color: #626773;
                line-height: 23px;
                resize: none;
            }
            .el-form-item{
              margin-bottom: 5px;
              .el-date-editor{
                .el-range-separator{
                  line-height: 25px;
                }
                .el-range__icon{
                  line-height: 22px;
                }
              }
            }
            .sex-select{
              display: inline-block;
              margin-left: 10px;
              .el-input__inner{
                width: 80px;
              }
            }
        }
        .order_btn{
            position: relative;
            margin-top: 20px;
            padding: 15px;
            background: #fffceb;
            border: 1px solid #ffdbb2;
            overflow: hidden;
            line-height: 36px;
            .next{
                float: right;
                background: #ff7800;
                color: #fff;
            }
        }
    }
  .yl_order_right{
    float: right;
    width: 300px;
    img{
      width: 100%;
      height: 188px;
    }
    .yl_hotel_info{
      border: 1px solid #eee;
      border-bottom: none;
      padding-bottom: 10px;
      .title{
        padding: 0 15px;
        font-size: 17px;
        color: #333;
        line-height: 32px;
      }
      .address{
        padding: 0 15px 8px;
        color: #999;
        line-height: 20px;
        border-bottom: 1px solid #eee;
      }
      .info{
        padding: 0 15px;
        span{
          color: #999;
          line-height: 25px;
        }
      }
    }
    .totalPrice{
      background: #fffceb;
      border-top: 1px solid #ffdbb2;
      color: #666;
      padding: 15px 12px;
      line-height: 60px;
      span{
        font-size: 16px;
        font-weight: 700;
      }
      i{
        font-size: 23px;
        font-weight: 700;
        color: #f60;
        margin-left: 8px;
      }
    }
  }
</style>
