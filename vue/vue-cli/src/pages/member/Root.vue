<template>
  <div style="background: #fff;">
    <div class="member">
      <div class="left">
        <el-menu
          style="width: 180px"
          :default-active="defaultActive"
          class="el-menu-vertical-demo">
          <el-menu-item key="1" index="1" @click="toLink('memberRoot', '1')"><i style="width: 24px;display: inline-block;height: 18px;margin-right: 5px;"></i>会员首页</el-menu-item>
          <el-submenu  v-for="(item, index) in data" :key="''+(index+2)" :index="''+(index+2)">
            <template slot="title"><i :class="item.icon"></i><span>{{item.name}}</span></template>
            <el-menu-item style="max-width: 180px;min-width: 0;padding-left: 50px" v-for="(child, childIndex) in item.children" :key="(index+2)+'-'+(childIndex+1)" :index="(index+2)+'-'+(childIndex+1)" @click="toLink(child.pathName, (index+2)+'-'+(childIndex+1))">{{child.name}}</el-menu-item>
          </el-submenu>
          <el-menu-item :key="(data.length+2)+''" :index="(data.length+2)+''" @click="loginOut"><i style="width: 24px;display: inline-block;height: 18px;margin-right: 5px;"></i>退出登录</el-menu-item>
        </el-menu>
      </div>
      <div class="right">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Root',
  data () {
    return {
      defaultActive: '1',
      data: [
        {name: '订单中心',
          icon: 'el-icon-document',
          children: [
            {name: '旅游订单', pathName: 'memberTourIndex'},
            {name: '合同订单', pathName: 'memberTourHeTong'},
            {name: '合同打印', pathName: 'memberTourHeTongInfo'},
            {name: '发票订单', pathName: 'memberFaPiaoOrder'},
            {name: '火车订单', pathName: 'memberHuoCheOrder'},
            {name: '机票订单', pathName: 'memberJiPiaoOrder'},
            {name: '酒店订单', pathName: 'memberHotelOrder'},
            {name: '景区订单', pathName: 'memberScenicOrder'}
          ]
        },
        // {name: '我的收藏',
        //   icon: 'el-icon-star-off',
        //   children: [
        //     {name: '旅游收藏', pathName: ''}
        //   ]
        // },
        // {name: '我的点评',
        //   icon: 'el-icon-edit',
        //   children: [
        //     {name: '旅游点评', pathName: ''}
        //   ]
        // },
        {name: '微店管理',
          icon: 'el-icon-edit-outline',
          children: [
            {name: '我的微店', pathName: 'memberMyStore'}
            // {name: '下级微店', pathName: ''},
            // {name: '微店订单', pathName: ''}
          ]
        },
        {name: '我的钱包',
          icon: 'el-icon-bank-card',
          children: [
            {name: '我的余额', pathName: 'memberDemandIndex'},
            {name: '充值记录', pathName: 'memberDemandAdd'},
            {name: '提现记录', pathName: 'memberDemandGet'},
            {name: '余额明细记录', pathName: 'memberDemandMoney'}
          ]
        },
        {name: '账户设置',
          icon: 'el-icon-setting',
          children: [
            {name: '我的资料', pathName: 'memberMyInfo'},
            {name: '修改密码', pathName: 'memberUpdatePass'},
            {name: '银行账户', pathName: 'memberBankCard'},
            {name: '绑定微信', pathName: 'MemberMyBindWeiXin'},
            {name: '电子签名', pathName: 'MemberMySign'},
            {name: '内部消息', pathName: 'MemberMyNotice'}
          ]
        }
      ]
    }
  },
  created () {
  },
  mounted () {
    if (this.$route.name === 'memberIndex') {
      this.defaultActive = '1'
    } else {
      this.defaultActive = localStorage.getItem('pathIndex')
    }
  },
  watch: {
    '$route.name' (val) {
      if (val === 'memberIndex') {
        this.defaultActive = '1'
      }
      if (this.data.length > 0) {
        let pathIndex = ''
        this.data.forEach((item, index) => {
          if (item.pathName && item.pathName === val) {
            pathIndex = index + 2
            this.defaultActive = String(pathIndex)
          } else {
            item.children.forEach((child, childIndex) => {
              if (child.pathName && child.pathName === val) {
                pathIndex = (index + 2) + '-' + (childIndex + 1)
                this.defaultActive = pathIndex
              }
            })
          }
        })
      }
    }
  },
  methods: {
    toLink (pathName, index) {
      this.defaultActive = index
      localStorage.setItem('pathIndex', index)
      if (!pathName) {
        this.$message.warning('该功能暂未开放,敬请期待!')
        return
      }
      this.$router.push({
        name: pathName
      })
    },
    loginOut () {
      this.$confirm('退出登录后数据将清空,是否退出？', '退出', {
        distinguishCancelAndClose: true,
        cancelButtonText: '取消',
        confirmButtonText: '确认'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '退出成功',
          duration: '1500'
        })
        localStorage.clear()
        sessionStorage.clear()
        setTimeout(() => {
          this.$router.push({name: 'login'})
        }, 1500)
      })
    }
  }
}
</script>

<style lang="scss">
  .member {
    width: 1200px;
    margin: 0 auto;
    padding: 20px 0;
    overflow: hidden;

    .left {
      width: 180px;
      float: left;
    }
    .right{
      margin-left: 200px;
    }
  }
</style>
