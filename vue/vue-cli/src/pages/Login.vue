<template>
  <div>
    <Header type="1" :data="siteImgs"></Header>
    <div class="login">
      <el-carousel trigger="click" height="600px">
        <el-carousel-item v-for="(item, index) in banner" :key="index">
          <img style="width: 100%;height: 100%;" :src="item.img" alt="">
        </el-carousel-item>
      </el-carousel>
      <transition name="el-zoom-in-center">
        <div v-show="show" class="login-warpper transition-box">
          <div class="login-box">
            <ul>
              <li><label for="phone">手机号码:</label><el-input v-model="data.UserName" maxlength="11" id="phone" placeholder="手机号码"></el-input></li>
              <li><label for="password">登录密码:</label><el-input v-model="data.Password" type="password" id="password" placeholder="输入密码"></el-input></li>
              <li><span class="title"><el-checkbox v-model="data.checked"></el-checkbox>30天内自动登录</span><span class="fn-right title" @click="forget">忘记密码?</span></li>
              <li><el-button @click="login" :loading="loading">登录</el-button></li>
              <li style="color: #666"><i class="register" @click="toRegister">立即注册</i>，价格优惠、方便快捷、实时高效</li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
// import serverHttp from '@/assets/common/index'
export default {
  name: 'Login',
  components: {Header},
  data () {
    return {
      banner: [
        {img: '/static/banner/banner2.jpg'},
        {img: '/static/banner/banner3.jpg'},
        {img: '/static/banner/banner4.jpg'},
        {img: '/static/banner/banner5.jpg'}
      ],
      show: false,
      data: {
        UserName: '',
        Password: '',
        checked: false
      },
      loading: false
    }
  },
  created () {
    this.show = true
  },
  computed: {
    siteImgs () {
      return this.$store.state.siteImgs
    }
  },
  methods: {
    /**
     * 跳转注册页面
     */
    toRegister () {
      this.$router.push({name: 'register'})
    },
    /**
     * 忘记密码
     */
    forget () {
      this.$router.push({name: 'forget'})
    },
    /**
     * 登录
     */
    login () {
      if (!((this.$regular.phone).test(this.data.UserName))) {
        this.$message.warning('请输入正确的手机号!')
        return false
      }
      this.loading = true
      this.$message.success('登录成功')
      localStorage.setItem('token', '5555')
      setTimeout(() => {
        this.$router.push({name: 'root'})
      }, 1500)
      // serverHttp.login({
      //   UserName: this.data.UserName,
      //   Password: this.data.Password
      // }).then(res => {
      //   console.log(res)
      //   this.loading = false
      //   if (res.code === 0) {
      //     // axios.defaults.headers.common['token'] = res.data
      //     this.$message.success('登录成功')
      //     localStorage.setItem('token', res.data)
      //     setTimeout(() => {
      //       this.$router.push({name: 'root'})
      //     }, 1500)
      //   } else {
      //     this.$message.error(res.msg)
      //   }
      // }).catch(() => {
      //   this.loading = false
      // })
    }
  }
}
</script>

<style lang="scss">
.login{
  position: relative;
  .login-warpper{
    width: 1200px;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    .login-box{
      position: absolute;
      right: 40px;
      top: 120px;
      padding: 40px;
      float: right;
      width: 270px;
      background: #fff;
      z-index: 9999;
      font-size: 14px;
      box-shadow: 0 1px 15px rgba(0,0,0,0.2);
      li{
        margin-bottom: 20px;
        label{
          float: left;
          height: 30px;
          display: inline-block;
          line-height: 30px;
          margin-right: 8px;
        }
        .el-input{
          width: calc(100% - 68px);
          .el-input__inner{
            height: 30px;
          }
        }
        .title{
          line-height: 30px;
        }
        .fn-right:hover{
          color: #F60;
          cursor: pointer;
        }

        .el-checkbox__input{
          margin-top: 2px;
        }
        .el-button{
          width: 100%;
          background: #ff7800;
          color: #fff;
          font-size: 16px;
          border-color: #ff7800;
        }
        .register{
          margin-top: 10px;
          color: #09c;
          font-weight: 700;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
