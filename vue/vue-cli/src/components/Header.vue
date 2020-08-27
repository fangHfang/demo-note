<template>
  <div class="header">
    <div class="header-item1" v-if="type === '2'">
      <div>
        <span class="red" @click="login" v-if="!token">登录</span>
        <span class="red" v-if="token">{{userInfo.Name}}</span>
        <span @click="register" v-if="!token">注册</span>
        <span @click="myCenter" v-if="token">个人中心</span>
      </div>
    </div>
    <div class="header-item2">
      <div>
        <span>{{data}}</span>
        <!-- <img :src="item.PicturePath" onerror="this.src = '/static/default.gif'" alt="" v-for="(item, index) in data.slice(0, 3)" :key="index"> -->
      </div>
    </div>
  </div>
</template>

<script>
import serverHttp from '@/assets/common/index'
export default {
  name: 'Header',
  props: {
    type: '',
    data: {
      type: Array,
      defaults: () => []
    }
  },
  data () {
    return {
      token: '',
      userInfo: {}
    }
  },
  created () {
    this.token = localStorage.getItem('token')
    if (this.token) {
      this.getList()
    }
  },
  mounted () {
  },
  methods: {
    getList () {
      serverHttp.getUserInfo({}).then(res => {
        if (res.code === 0) {
          this.userInfo = res.data
          this.$store.commit('setUserInfo', res.data)
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    /**
     * 跳转登录
     */
    login () {
      this.$router.push({name: 'login'})
    },
    /**
     * 跳转注册页
     */
    register () {
      this.$router.push({name: 'register'})
    },
    // 跳转个人中心
    myCenter () {
      this.$router.push({name: 'memberRoot'})
    }
  }
}
</script>

<style lang="scss">
  .red {
    color: #f60;
  }

  .header {
    width: 100%;

    .header-item1 {
      background: #fafafa;
      border-bottom: 1px solid #f1f1f1;
      font-size: 12px;
      line-height: 35px;
      color: #999;

      div {
        width: 1200px;
        margin: 0 auto;

        span {
          margin: 0 0 0 5px;
          cursor: pointer;
        }
      }
    }

    .header-item2 {
      padding: 20px 0;
      background: #fff;
      overflow: hidden;

      div {
        width: 1200px;
        margin: 0 auto;
        img {
          width: 400px;
          height: 80px;
          float: left;
        }

        img:nth-child(2) {
          width: 550px;
        }

        img:last-child {
          width: 250px;
        }
      }

    }
  }
</style>
