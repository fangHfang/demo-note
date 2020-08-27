<template>
  <div class="forgetPass">
    <Header type="1"></Header>
    <div class="forgetPass-index">
      <ul :class="['img-step', {'step1': step === 1}, {'step2': step === 2}, {'step3': step === 3}, {'step4': step === 4}]">
        <li>找回账号</li>
        <li>验证身份</li>
        <li>重置密码</li>
        <li>完成</li>
      </ul>
      <div class="forgetPass-content">
        <div v-if="step === 1">
          <el-form ref="form" class="form-submit" :model="form" :rules="rules" label-width="80px">
            <el-form-item label="手机号码" prop="name">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="验证码" prop="name">
              <el-input v-model="form.name" style="width: 118px;margin-right: 20px"></el-input>
              <img src="/static/code.jpg" style="width: 130px;height: 35px" alt="">
              <i></i>
            </el-form-item>
            <el-form-item label="">
              <el-button @click="next(2)">下一步</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div v-else-if="step === 2">
          <el-form ref="form" class="form-submit" :model="form" :rules="rules" label-width="80px">
            <el-form-item label="找回方式">
              <span>邮箱找回密码</span>
            </el-form-item>
            <el-form-item label="邮箱号码">
              <span>961872220</span>
            </el-form-item>
            <el-form-item label="验证码" prop="name">
              <el-input v-model="form.name" style="width: 118px;margin-right: 20px"></el-input>
              <el-button style="width: 130px;height: 35px;line-height: 30px;padding: 0;margin-top: 0">获取验证码</el-button>
              <i></i>
            </el-form-item>
            <el-form-item label="">
              <el-button @click="next(3)">下一步</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div v-else-if="step === 3">
          <el-form ref="form" class="form-submit" :model="form" :rules="rules" label-width="80px">
            <el-form-item label="新密码">
              <el-input v-model="form.pass" type="password"></el-input>
            </el-form-item>
            <el-form-item label="确认密码">
              <el-input v-model="form.newpass" type="password"></el-input>
            </el-form-item>
            <el-form-item label="">
              <el-button @click="next(4)">下一步</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div v-else>
          <div class="success-submit">
            <i class="success-btn"></i>
            <div>
              <p class="title1">您已成功修改密码!</p>
              <p class="title2">用户名为: <i>15735046300</i> <el-button @click="login">立即登录</el-button></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
export default {
  name: 'Forget',
  components: {Header},
  data () {
    return {
      step: 1,
      form: {
        name: '',
        pass: '',
        newpass: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      rules: {
        name: [
          { required: false, message: '请输入活动名称', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    /**
     * 下一步
     * @param value
     */
    next (value) {
      this.step = value
    },
    /**
     * 登录
     */
    login () {
      this.$router.push({name: 'login'})
    }
  }
}
</script>

<style lang="scss">
.forgetPass{
  background: #fff;
  .forgetPass-index{
    width: 1000px;
    margin: 0 auto;
    padding: 20px 0;
    .img-step{
      position: relative;
      height: 64px;
      margin-top: 20px;
      background: url("/static/m-nav.png") no-repeat 100%;
      background-position: 0 -26px;
      li{
        padding-top: 30px;
        float: left;
        width: 196px;
        height: 34px;
        line-height: 24px;
        text-align: center;
        color: #333;
        font-size: 16px;
      }
      li:first-child{
        margin-left: 90px;
      }
    }
    .step1{
      li:first-child{
        color: #2e9900;
        font-weight: 700;
      }
    }
    .step2{
      background-position: 0 -88px;
      li:nth-child(2), li:first-child{
        color: #2e9900;
        font-weight: 700;
      }
    }
    .step3{
      background-position: 0 -150px;
      li:nth-child(3), li:nth-child(2), li:first-child{
        color: #2e9900;
        font-weight: 700;
      }
    }
    .step4{
      background-position: 0 -210px;
      li{
        color: #2e9900;
        font-weight: 700;
      }
    }
  }
  .forgetPass-content{
    padding-left: 250px;
    margin-top: 40px;
    .form-submit{
      padding: 40px 0 40px 0;
      .el-input{
        width: 270px;
        float: left;
      }
      i{
        float: left;
        margin-left: 10px;
        color: #999;
        font-size: 12px;
      }
      .el-button{
        background: #ff7800;
        border-color: #ff7800;
        color: #fff;
        width: 250px;
        letter-spacing: .5px;
        font-size: 16px;
        margin-top: 20px;
        /*padding: 10px 50px;*/
      }
    }

    .success-submit{
      padding: 100px 0 200px 0;
      overflow: hidden;
      .success-btn{
        background: url('/static/m-nav.png') no-repeat 100%;
        background-position: 0 -400px;
        margin: 10px 15px 0 100px;
        width: 40px;
        height: 40px;
        float: left;
      }
      .title1{
        font-weight: 700;
        font-size: 16px;
      }
      .title2{
        margin-top: 10px;
        font-size: 14px;
        i{
          color: #ff7800;
          font-size: 18px;
          font-family: Arial,sans-serif;
        }
      }
      .el-button{
        background: #ff7800;
        border-color: #ff7800;
        color: #fff;
        margin-left: 20px;
        font-size: 16px;
        padding: 8px 20px;
      }
    }
  }
}
</style>
