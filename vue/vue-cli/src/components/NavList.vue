<template>
  <div class="navList">
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect"
        background-color="#3aa400" text-color="#fff" active-text-color="#fff">
      <el-menu-item  key="1" index="1" @click="toLink('/')">首页</el-menu-item>
      <template v-for="(item, dataIndex) in data">
        <el-submenu :index="''+(dataIndex+2)" :key="dataIndex+2" v-if="item.ChildItems&&item.ChildItems.length>0">
          <template slot="title">{{item.Name}}</template>
          <el-menu-item :index="(dataIndex+2)+'-'+(childIndex+1)" v-for="(child, childIndex) in item.ChildItems"
                        :key="childIndex" @click="toLink(item.Controller, child.Id)">{{child.Name}}
          </el-menu-item>
        </el-submenu>
        <el-menu-item  :key="dataIndex+2" :index="''+(dataIndex+2)" v-else @click="toLink(item.Controller, item.Id)">{{item.Name}}</el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'NavList',
  data () {
    return {
      activeIndex: '0'
    }
  },
  props: {
    data: {
      type: Array
    }
  },
  created () {
    let path = window.location.hash
    let fluentPath = path.split('/')
    if (!fluentPath[2]) {
      this.activeIndex = '1'
    } else {
      setTimeout(() => {
        this.findItem(this.data, fluentPath[1])
      }, 1000)
    }
  },
  methods: {
    handleSelect (key) {
      this.activeIndex = key
      if (key.indexOf('-') > -1) {
        localStorage.setItem('Index.vue', key.split('-')[1])
      } else {
        localStorage.setItem('Index.vue', '')
      }
    },
    toLink (pathName, Id) {
      let url = ''
      if (pathName === '/') {
        url = '/'
      } else {
        url = '/' + pathName + '/index'
      }
      this.$router.push({
        path: url, query: {id: Id}
      })
    },
    findItem (arr, name) {
      let index = localStorage.getItem('Index.vue')
      for (let i in arr) {
        if (arr[i].Controller === name) {
          if (!index) {
            this.activeIndex = String(Number(i) + 2)
            return
          }
          if (index) {
            this.activeIndex = String(Number(i) + 2) + '-' + index
            return
          }
        }
      }
    }
  }
}
</script>

<style lang="scss">
  .navList {
    width: 100%;
    height: 50px;
    background: #3aa400;
    overflow: hidden;

    .el-menu-demo {
      width: 1200px;
      margin: 0 auto;
    }

    .el-submenu .el-submenu__title,.el-menu-item{
      height: 50px;
      line-height: 50px;
    }
    .el-submenu__title i {
      color: #fff;
    }

    .el-menu-item {
      padding: 0 10px;
    }
  }
</style>
