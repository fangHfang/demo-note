<template>
<div class="tourIndex" v-loading="loading">
  <el-form :inline="true" :model="searchForm" class="demo-form-inline">
    <el-form-item label="操作权限">
      <el-select v-model="searchForm.power" placeholder="请选择操作权限">
        <el-option label="全部" value="0"></el-option>
        <el-option label="分管部门" value="1"></el-option>
        <el-option label="本部门" value="2"></el-option>
        <el-option label="我的" value="3"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="订单编号">
      <el-input v-model="searchForm.orderCode" placeholder="订单编号"></el-input>
    </el-form-item>
    <el-form-item label="关键字">
      <el-input v-model="searchForm.keyword" placeholder="线路名称"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="success" @click="getList">搜索</el-button>
    </el-form-item>
  </el-form>
  <el-tabs v-model="activeName">
    <el-tab-pane :name="item.type" v-for="(item, index) in statusGroup" :key="index">
      <span slot="label" @click="getList(item.type)">{{item.name}} <i style="color: #f60;">{{item.num}}</i></span>
    </el-tab-pane>
  </el-tabs>
  <el-table :data="allData" row-class-name="orderTable" v-if="allData.length>0">
    <el-table-column label="产品信息" v-slot="scope">
        <p class="itemRow toLink title text-over-hidden" @click="orderDetail(scope.row)" :title="scope.row.Name">{{scope.row.Name}}</p>
        <p class="itemRow">发团日期：{{scope.row.StartDate}}</p>
        <p class="itemRow">出游人数：{{scope.row.Num}}</p>
    </el-table-column>
    <el-table-column prop="OrderCode" align="center" label="订单编号" width="190"></el-table-column>
    <el-table-column label="订单金额" align="center" width="130" v-slot="scope">
      <span class="price"><em>¥</em>{{scope.row.OrderAmount}}</span>
    </el-table-column>
    <el-table-column label="订单状态" align="center" width="130" v-slot="scope">
      <strong>{{scope.row.CustomerConfirmStatus}}</strong>
    </el-table-column>
    <el-table-column label="操作" align="center" width="130" v-slot="scope">
      <p class="itemRow toLink" @click="orderDetail(scope.row)">订单详情</p>
      <p class="itemRow toLink" v-if="scope.row.ConfirmStatus != 3" @click="orderQuXiao(scope.row)">取消订单</p>
    </el-table-column>
  </el-table>
  <div class="noData" v-else>
    <img src="/static/noresult.png" alt="">
    <span>暂无相关信息</span>
  </div>
  <pager :pager="pager" @changePage="changePage"></pager>
</div>
</template>

<script>
import serverHttp from '@/assets/common/order'
export default {
  name: 'tourOrder',
  data () {
    return {
      statusGroup: [
        {name: '全部', num: 88, type: ''},
        {name: '待支付', num: 28, type: '1'},
        {name: '待审核', num: 33, type: '3'},
        {name: '已通过', num: 11, type: '11'},
        {name: '已拒绝', num: 22, type: '22'}
      ],
      status: ['待支付', '待审核', '已通过', '已取消', '已拒绝'],
      allData: [],
      activeName: 'all',
      searchForm: {
        power: '',
        orderCode: '',
        keyword: ''
      },
      restaurants: [],
      restaurantsXian: [],
      pager: {
        pageSize: 10,
        page: 1,
        total: ''
      },
      loading: false
    }
  },
  methods: {
    orderDetail (item) {
      this.$router.push({name: 'memberTourDetail', query: {OrderId: item.Id}})
    },
    getList (Mode) {
      this.loading = true
      let Page = this.pager.page
      let OrderCode = this.searchForm.orderCode
      let Keyword = this.searchForm.keyword
      let Power = this.searchForm.power
      serverHttp.GetList({Page, Mode, OrderCode, Keyword, Power}).then(res => {
        this.loading = false
        this.pager.total = res.data.Count
        let data = res.data.List
        for (let i = 0; i < data.length; i++) {
          data[i].CustomerConfirmStatus = this.status[data[i].CustomerConfirmStatus]
        }
        this.allData = data
      })
    },
    querySearch (queryString, cb) {
      var restaurants = this.restaurants
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      cb(results)
    },
    createFilter (queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    querySearchXian (queryString, cb) {
      var restaurants = this.restaurantsXian
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      cb(results)
    },
    handleSelect (queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    handleSelectXian (queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    handleIconClick (ev) {
      console.log(ev)
    },
    handleIconClickXian (ev) {
      console.log(ev)
    },
    loadAll () {
      return [
        { 'value': '订单编号' },
        { 'value': '订单编号' },
        { 'value': '订单编号' }
      ]
    },
    loadAllXian () {
      return [
        { 'value': '海南6天5晚四星纯玩豪华之旅' },
        { 'value': '五台山2天1晚四星纯玩豪华之旅' },
        { 'value': '北京4天3晚四星纯玩豪华之旅' }
      ]
    },
    changePage (val) {
      this.pager.page = val
      this.getList()
    },
    // 取消订单
    orderQuXiao (item) {
      this.$confirm('此操作将取消订单, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        serverHttp.CustomerCancel({OrderId: item.Id}).then(res => {
          if (res.code === 0) {
            this.$message({
              type: 'success',
              message: '取消订单成功!'
            })
            this.getList()
          } else {
            this.$message({
              type: 'error',
              message: res.msg
            })
          }
        })
      }).catch(() => {})
    }
  },
  created () {
    this.getList()
  },
  mounted () {
    this.restaurants = this.loadAll()
    this.restaurantsXian = this.loadAllXian()
  }
}
</script>

<style lang="scss">
@import "../scss/common";
</style>
