<template>
  <div class="order_info_left hotel-order-box">
    <el-form ref="form" :model="form" label-width="80px">
      <div class="panel">
        <div class="panel_title"><i class="myIcon order"></i>预定信息</div>
        <el-form-item label="景区名称:">
          <span>景区名称</span>
        </el-form-item>
        <el-form-item label="门票类型:">
          <span>门票类型 <router-link to="/jiudian/detail" style="color: #2e9900; text-decoration: none;">重新选择</router-link></span>
        </el-form-item>
        <el-form-item label="游玩日期:">
          <el-input type="text" placeholder="游玩日期"></el-input>
        </el-form-item>
        <el-form-item label="销售价:">
          <el-input type="text" placeholder="销售价"></el-input>
        </el-form-item>
        <el-form-item label="成本价:">
          <el-input type="text" placeholder="成本价"></el-input>
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
        <el-form-item label="销售员工:">
          <span>选择</span>
        </el-form-item>
        <el-form-item label="选择客户:">
          <span>选择</span>
        </el-form-item>
      </div>
      <div class="panel clearfix">
        <div class="panel_title"><i class="myIcon user"></i>入住信息</div>
        <div class="form_group clearfix">
          <label><em>*</em>房间1</label>
          <input type="text" name="" value="" placeholder="填写一位入住人姓名">
          身份证：<input type="text" name="" value="" placeholder="身份证号码">
        </div>
        <div class="form_group clearfix">
          <label><em>*</em>房间2</label>
          <input type="text" name="" value="" placeholder="填写一位入住人姓名">
          身份证：<input type="text" name="" value="" placeholder="身份证号码">
        </div>
        <div class="form_group clearfix">
          <label><em>*</em>房间3</label>
          <input type="text" name="" value="" placeholder="填写一位入住人姓名">
          身份证：<input type="text" name="" value="" placeholder="身份证号码">
        </div>
      </div>
      <div class="panel">
        <div class="panel_title"><i class="myIcon user"></i>联系人</div>
        <el-form-item label="姓名:">
          <el-input v-model="form.name2" readonly></el-input>
        </el-form-item>
        <el-form-item label="联系电话:">
          <el-input v-model="form.phone" readonly></el-input>
        </el-form-item>
        <el-form-item label="备注:">
          <el-input type="textarea" v-model="form.desc" placeholder="备注"></el-input>
        </el-form-item>
      </div>

      <div class="panel">
        <div class="panel_title"><i class="myIcon user"></i>预定收入</div>
        <el-form-item label="结算:">
          <span>实收: ¥0.00, 优惠：</span>
          <input type="text" autocomplete="off" placeholder="金额" class="el-input__inner" style="width: 80px">
        </el-form-item>
        <el-form-item label="备注:">
          <el-input type="textarea" v-model="form.desc" placeholder="备注"></el-input>
        </el-form-item>
      </div>


      <div class="panel">
        <div class="panel_title"><i class="myIcon user"></i>交团支出</div>
        <el-form-item label="供应商:">
          <span>供应商</span>
        </el-form-item>
        <el-form-item label="结算:">
          <span>实收: ¥0.00, 优惠：</span>
          <input type="text" autocomplete="off" placeholder="金额" class="el-input__inner" style="width: 80px">
        </el-form-item>
        <el-form-item label="备注说明:">
          <el-input type="textarea" v-model="form.desc" placeholder="备注说明"></el-input>
        </el-form-item>
      </div>

      <div class="panel order_btn">

        <el-button @click="onSubmit" class="next">提交订单</el-button>
      </div>
    </el-form>
  </div>
</template>
<script>
  export default {
    name: 'viewsYuDing',
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
          desc: ''
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
<style lang="scss" scope>
  .clearfix:before, .clearfix:after{content:"\0020";display:block;height:0;overflow:hidden;}
  .clearfix:after{clear:both;}
  .clearfix{zoom:1;}
  .form_group{position:relative;float:left;margin-bottom:15px;width:100%;line-height: 32px;color:#333;font-size:14px;vertical-align: middle;}
  .form_group.w432{width:432px;}
  .form_group > label{margin-right:5px;float:left;width:90px;text-align: right}
  .form_group > label:after{content: ':';margin:0 5px 0 3px}
  .form_group > label em{margin-right:3px;color: #f00;vertical-align: middle;}
  .form_group > input,.order_price dd input,.form_group > select{position:relative;border:1px solid #ddd;padding:0 8px;width:200px;height:30px;line-height:30px;display: inline-block;background-color:#fff;color:#626773;box-shadow: 0 1px 1px rgba(0,0,0,.075) inset;transition: all .2s ease-in 0s}
  .form_group > input.w150{width: 150px;}
  .form_group > textarea{border:1px solid #ddd;padding:5px 8px;width:715px;height:80px;color:#626773;line-height:23px;resize:none;box-shadow: 0 1px 1px rgba(0,0,0,.075) inset;transition: all .2s ease-in 0s}
  .form_group input:focus,.form_group textarea:focus{border-color: #999}
  .form_group > span.product_title{display:block;font-size:18px;font-weight: 700;line-height:28px;overflow: hidden;color: #666}
  .form_group > span.product_title em{margin-left:10px;font-size: 14px;}
  .form_group > span.space{margin:0 8px;color: #666}
  .form_group > span.price{color: #ff7800;font-size: 18px;}
  .form_group > span.price i{font-size: 16px;}
  .form_group > span.khtext{margin-left:15px;}
  .form_group > span a{color: #09c;}
  .form_group > a{display: inline-block;margin-left:10px;color: #09c;}
  .form_group > a:hover{color: #f60;}
  .form_group > select{width: auto}
  .form_group > input{margin-right:10px;}
  .form_group .select{position:relative;float: left;padding:0 8px;width:200px;height:30px;border:1px solid #ddd;background:#fff;color:#626773;}
  .form_group .select.w150{width: 100px;}
  .form_group .select input{width:164px;line-height:28px;color:#626773;border:none;}
  .form_group .select input.w100{width: 50px;}
  .form_group .select span{position: absolute;top:7px;right:0;width:39px;height:17px;border-left:1px solid #ddd}
  .form_group .select span i{display:block;margin-top:5px;margin-left:12px;width:14px;height:8px;background-position: -286px -8px;}
  .form_group .select.open span i{background-position: -286px 0;}


  .order_info_left{
    overflow: hidden;
    float: left;
    /*width: 880px;*/
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
        }
        i.user {
          background: #53a93f;
        }
      }
      .price{
        color: #ff7800;
        font-size: 18px;
      }
      .el-input__inner{
        width: auto;
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
</style>
