<template>
  <div class="tourIndex" v-loading="loading">
    <el-form :inline="true" :model="searchForm" class="demo-form-inline">
      <el-form-item label="操作权限">
        <el-select v-model="searchForm.sysPower" placeholder="请选择操作权限">
          <el-option label="全部" value="4"></el-option>
          <el-option label="分管部门" value="3"></el-option>
          <el-option label="本部门" value="2"></el-option>
          <el-option label="我的" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="订单编号">
        <el-input v-model="searchForm.orderCode" placeholder="订单编号"></el-input>
      </el-form-item>
      <el-form-item label="合同编号">
        <el-input v-model="searchForm.hTCode" placeholder="合同编号"></el-input>
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
    <el-table :data="list" row-class-name="orderTable">
      <el-table-column label="合同信息">
        <template slot-scope="scope">
          <p class="itemRow toLink title text-over-hidden" @click="orderDetail(scope.row)">{{scope.row.ContractTypeName}}</p>
          <p class="itemRow">购买份数：{{scope.row.OrderNum}}</p>
        </template>
      </el-table-column>
      <el-table-column prop="OrderCode" align="center" label="订单编号" width="250"></el-table-column>
      <!--<el-table-column label="订单金额" align="center" width="130">
        <template slot-scope="scope">
          <span class="price"><em>¥</em>{{scope.row.Price}}</span>
        </template>
      </el-table-column>
      <el-table-column label="付款状态" align="center" width="130">
        <template slot-scope="scope">
          <strong>{{scope.row.PayPrice===scope.row.Price?'已付款':'未付款'}}</strong>
        </template>
      </el-table-column>-->
      <el-table-column label="审核状态" align="center" width="130">
        <template slot-scope="scope">
          <strong>{{scope.row.ConfirmStatus===1?'已审核':'未审核'}}</strong>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="130">
        <template slot-scope="scope">
          <p class="itemRow toLink" @click="orderDetail(scope.row)">订单详情</p>
          <p class="itemRow toLink" @click="orderQuXiao(scope.row)">删除订单</p>
        </template>
      </el-table-column>
    </el-table>
    <!--<div class="noData" v-else>
      <img src="/static/noresult.png" alt="">
      <span>暂无相关信息</span>
    </div>-->
    <pager :pager="pager" @changePage="changePage"></pager>
  </div>
</template>

<script>
import serverHttp from '@/assets/common/hetong'
export default {
  name: 'tourOrder',
  data () {
    return {
      statusGroup: [
        {name: '全部', num: 88, type: '0'},
        // {name: '待支付', num: 28, type: '1'},
        {name: '已审核', num: 28, type: '1'},
        {name: '未审核', num: 33, type: '2'}
      ],
      activeName: 'all',
      searchForm: {
        sysPower: '',
        orderCode: '',
        hTCode: ''
      },
      restaurants: [],
      restaurantsXian: [],
      pager: {
        pageSize: 10,
        page: 1,
        total: ''
      },
      loading: false,
      list: []
    }
  },
  methods: {
    orderDetail (item) {
      this.$router.push({name: 'memberTourHeTongDetail', query: {id: item.Id}})
    },
    getList (Mode) {
      this.loading = true
      let Page = this.pager.page
      let SysPower = this.searchForm.sysPower
      let OrderCode = this.searchForm.orderCode
      let HTCode = this.searchForm.hTCode
      serverHttp.GetListPageForB2B({Page, Mode, SysPower, OrderCode, HTCode}).then(res => {
        this.loading = false
        this.list = res.data.List
        this.pager.total = res.data.Count
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
    onSubmit () {
      console.log(this.searchForm)
    },
    changePage (val) {
      this.pager.page = val
      this.getList()
    },
    // 取消订单
    orderQuXiao (item) {
      this.$confirm('此操作将删除订单, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除订单成功!'
        })
      })
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
