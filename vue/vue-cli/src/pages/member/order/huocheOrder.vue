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
        <el-input placeholder="订单编号" v-model="searchForm.code"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="getHuoCheOrder">搜索</el-button>
      </el-form-item>
    </el-form>
    <el-tabs v-model="activeName">
      <el-tab-pane :name="item.type" v-for="(item, index) in statusGroup" :key="index">
        <span slot="label" @click="getHuoCheOrder(item.type)">{{item.name}} <i style="color: #f60;">{{item.num}}</i></span>
      </el-tab-pane>
    </el-tabs>
    <el-table :data="allData" row-class-name="orderTable">
      <el-table-column label="火车票信息">
        <template slot-scope="scope">
          <p class="itemRow toLink title">{{scope.row.ResourceName}}</p>
          <p class="itemRow">出发日期：{{scope.row.OrderStartDate}}</p>
          <p class="itemRow" v-if="scope.row.KeHu">乘客信息：{{scope.row.KeHu.Desc}}</p>
        </template>
      </el-table-column>
      <el-table-column label="订单编号" align="center" width="190">
        <template slot-scope="scope">
          <p class="itemRow">{{scope.row.OrderCode}}</p>
        </template>
      </el-table-column>
      <el-table-column label="订单金额" align="center" width="130">
        <template slot-scope="scope">
          <span class="price"><em>¥</em>{{scope.row.WatPrice}}</span>
        </template>
      </el-table-column>
      <el-table-column label="订单状态" align="center" width="130">
        <template slot-scope="scope">
          <strong>{{ConfirmStatus[scope.row.ConfirmStatus]}}</strong>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="130">
        <template slot-scope="scope">
          <p class="itemRow toLink" @click="orderDetail(scope.row.Id)">立即支付</p>
          <p class="itemRow toLink" @click="orderDetail(scope.row.Id)">订单详情</p>
          <p class="itemRow toLink" @click="orderQuXiao(scope.row.Id)">取消订单</p>
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
import serverHttp from '@/assets/common/train'
export default {
  name: 'memberHuoCheOrder',
  data () {
    return {
      statusGroup: [
        {name: '全部', num: 88, type: '0'},
        {name: '待支付', num: 28, type: '5'},
        {name: '待出票', num: 33, type: '11'},
        {name: '已出票', num: 11, type: '12'},
        {name: '已配送', num: 22, type: '1'},
        {name: '已签收', num: 44, type: '2'},
        {name: '已取消', num: 56, type: '4'}
      ],
      searchForm: {
        jurisdiction: '',
        code: ''
      },
      allData: [],
      pager: {
        page: 1,
        total: ''
      },
      loading: false,
      activeName: '',
      ConfirmStatus: ['未确认', '已确认', '已拒绝', '已取消']
    }
  },
  methods: {
    orderDetail (id) {
      this.$router.push({name: 'memberHuoCheDetail', query: {id}})
    },
    orderQuXiao (id) {
      this.$confirm('此操作将取消订单, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        serverHttp.CancelOrder({OrderId: this.$route.query.id}).then(res => {
          this.$message({
            type: 'success',
            message: res.msg
          })
        })
      })
    },
    changePage (val) {
      this.pager.page = val
      this.getHuoCheOrder()
    },
    getHuoCheOrder (Mode) {
      let Page = this.pager.page
      let Code = this.searchForm.code
      serverHttp.GetListOrder({Page, Code, Mode}).then(res => {
        this.pager.total = res.data.Count
        this.allData = res.data.List
      })
    }
  },
  mounted () {
    this.getHuoCheOrder()
  }
}
</script>

<style lang="scss">
  @import "../scss/common";
</style>
