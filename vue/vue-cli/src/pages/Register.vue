<template>
    <div style="background: #fff;height: 100vh">
      <Header type="1"></Header>
      <div class="register">
        <ul :class="['time-line', {'success-time': step === 2}]">
          <li>填写注册信息</li>
          <li>注册成功</li>
        </ul>
        <div v-if="step === 1">
          <el-form ref="form" class="form-submit" :model="form" :rules="rules" label-width="80px">
            <el-form-item label="手机号码" prop="name">
              <el-input v-model="form.name"></el-input>
              <i>手机号码作为登录账号</i>
            </el-form-item>
            <el-form-item label="姓名" prop="name">
              <el-input v-model="form.name"></el-input>
              <i>请输入真实姓名</i>
            </el-form-item>
            <el-form-item label="登录密码" prop="name">
              <el-input type="password" v-model="form.name"></el-input>
              <i>6-18位数字,字母和特殊符号组合, 区分大小写</i>
            </el-form-item>
            <el-form-item label="确认密码" prop="name">
              <el-input type="password" v-model="form.name"></el-input>
              <i></i>
            </el-form-item>
            <el-form-item label="验证码" prop="name">
              <el-input v-model="form.name"></el-input>
              <i></i>
            </el-form-item>
            <el-form-item label="" style="color: #666;">
              <p style="font-size: 12px;line-height: 12px">
                <input type="checkbox" style="margin-right: 8px" v-model="form.checked" />我已阅读并同意 <em style="color: #09c">《网站服务协议》</em>
              </p>
            </el-form-item>
            <el-form-item label="">
              <el-button @click="submit">同意服务条款并注册</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div v-else>
          <div class="success-submit">
            <i class="success-btn"></i>
            <div>
              <p class="title1">恭喜您,已成功注册!</p>
              <p class="title2">用户名为: <i>15735046300</i> <el-button @click="login">立即登录</el-button></p>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import Header from '@/components/Header.vue'
export default {
  name: 'Register',
  components: {Header},
  data () {
    return {
      step: 1,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
        checked: true
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submit () {
      this.$message({
        type: 'success',
        message: '注册成功'
      })
      this.step = 2
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
.register{
  width: 1000px;
  margin: 0 auto;
  padding: 20px 0;
  .time-line{
    position: relative;
    height: 64px;
    background: url("/static/m-nav.png") no-repeat 100%;
    background-position: 0 -274px;
    li{
      padding-top: 30px;
      float: left;
      width: 300px;
      height: 34px;
      line-height: 24px;
      text-align: center;
      color: #999;
      font-size: 16px;
      margin-left: 200px;
      position: relative;
    }
    li:last-child{
      margin-left: 0;
    }
    li:first-child{
      color: #50b400;
      font-weight: 700;
    }
  }
  .success-time{
    background-position: 0 -336px;
    li:first-child{
      color: #999;
      font-weight: normal;
    }
    li:last-child{
      color: #50b400;
      font-weight: 700;
    }
  }
  .form-submit{
    padding: 40px 0 0 250px;
    .el-input{
      width: 300px;
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
      letter-spacing: .5px;
      font-size: 16px;
      padding: 10px 50px;
      margin-top: 20px;
    }
  }

  .success-submit{
    padding: 200px 0 200px 250px;
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
</style>
