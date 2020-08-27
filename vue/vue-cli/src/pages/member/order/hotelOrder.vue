<template>
  <div class="tourIndex" v-loading="loading">
    <el-form :inline="true" :model="searchForm" class="demo-form-inline">
      <el-form-item label="操作权限">
        <el-select v-model="searchForm.jurisdiction" placeholder="请选择操作权限">
          <el-option label="全部" value="0"></el-option>
          <el-option label="分管部门" value="1"></el-option>
          <el-option label="本部门" value="2"></el-option>
          <el-option label="我的" value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="订单编号">
        <el-input placeholder="订单编号" v-model="searchForm.orderCode"></el-input>
      </el-form-item>
      <el-form-item label="关键字">
        <el-input  placeholder="酒店名称" v-model="searchForm.keyword"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="getOrder">搜索</el-button>
      </el-form-item>
    </el-form>
    <el-tabs v-model="activeName">
      <el-tab-pane :name="item.type" v-for="(item, index) in statusGroup" :key="index">
        <span slot="label" @click="getOrder(item.type)">{{item.name}} <i style="color: #f60;">{{item.num}}</i></span>
      </el-tab-pane>
    </el-tabs>
    <el-table :data="allData" row-class-name="orderTable" v-loading="loading">
      <el-table-column label="酒店信息" v-slot="scope">
        <p class="itemRow toLink title">{{scope.row.ResourceName}}</p>
        <p class="itemRow">入住日期：{{scope.row.OrderStartDate}} 至 {{scope.row.OrderEndDate}}</p>
        <p class="itemRow">房间数量：{{scope.row.OrderNum}}</p>
      </el-table-column>
      <el-table-column label="订单编号" align="center" width="190" v-slot="scope">
        <p class="itemRow">{{scope.row.OrderCode}}</p>
      </el-table-column>
      <el-table-column label="订单金额" align="center" width="130" v-slot="scope">
        <span class="price"><em>¥</em>{{scope.row.FinalAmount}}</span>
      </el-table-column>
      <el-table-column label="订单状态" align="center" width="130" v-slot="scope">
        <strong>{{scope.row.ConfirmStatus}}</strong>
      </el-table-column>
      <el-table-column label="操作" align="center" width="130" v-slot="scope">
        <p class="itemRow toLink" @click="orderDetail(scope.row.Id)">订单详情</p>
        <p class="itemRow toLink" @click="orderQuXiao(scope.row.Id)">取消订单</p>
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
import serverHttp from '@/assets/common/hotel'
export default {
  name: 'memberTourHeTongInfo',
  data () {
    return {
      statusGroup: [
        {name: '全部', num: 88, type: '0'},
        {name: '待支付', num: 28, type: '11'},
        {name: '待审核', num: 33, type: '1'},
        {name: '已通过', num: 11, type: '2'},
        {name: '已拒绝', num: 22, type: '44'},
        {name: '已取消', num: 11, type: '5'}
      ],
      searchForm: {
        jurisdiction: '',
        orderCode: '',
        keyword: ''
      },
      allData: [],
      pager: {
        pageSize: 10,
        page: 1,
        total: ''
      },
      loading: false,
      activeName: ''
    }
  },
  methods: {
    orderDetail (id) {
      this.$router.push({name: 'memberHotelDetail', query: {id}})
    },
    orderQuXiao () {
      this.$confirm('此操作将取消订单, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '取消订单成功!'
        })
      }).catch(() => {
      })
    },
    changePage (page) {
      this.pager.page = page
      this.getOrder()
    },
    getOrder (Mode) {
      this.loading = true
      let Page = this.pager.page
      let OrderCode = this.searchForm.orderCode
      let Keyword = this.searchForm.keyword
      serverHttp.GetList({Page, OrderCode, Keyword, Mode}).then(res => {
        this.loading = false
        this.allData = res.data.List
        this.pager.total = res.data.Count
      })
    }
  },
  mounted () {
    this.getOrder()
  }
}
</script>

<style lang="scss">
  @import "../scss/common";
</style>
