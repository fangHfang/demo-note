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
        <el-button type="success" @click="getOrder">搜索</el-button>
      </el-form-item>
    </el-form>
    <el-tabs v-model="activeName">
      <el-tab-pane :name="item.type" v-for="(item, index) in statusGroup" :key="index">
        <span slot="label" @click="getOrder(item.type)">{{item.name}} <i style="color: #f60;">{{item.num}}</i></span>
      </el-tab-pane>
    </el-tabs>
    <el-table :data="allData" row-class-name="orderTable">
      <el-table-column label="机票信息">
        <template slot-scope="scope">
          <p class="itemRow toLink title">{{scope.row.ResourceName}}</p>
          <p class="itemRow">出发日期：{{scope.row.OrderStartDate}}</p>
          <p class="itemRow">返回日期：{{scope.row.OrderEndDate?scope.row.OrderEndDate:scope.row.OrderStartDate}}</p>
          <p class="itemRow" v-if="scope.row.KeHu">乘客信息：{{scope.row.KeHu.Desc}}</p>
        </template>
      </el-table-column>
      <el-table-column label="订单编号" align="center" width="205">
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
import serverHttp from '@/assets/common/jipiao'
export default {
  name: 'memberJiPiaoOrder',
  data () {
    return {
      statusGroup: [
        {name: '全部', num: 88, type: '0'},
        {name: '待支付', num: 28, type: '1'},
        {name: '待出票', num: 33, type: '2'},
        {name: '已出票', num: 11, type: '44'},
        {name: '已取消', num: 11, type: '11'}
      ],
      searchForm: {
        jurisdiction: '',
        state: '',
        stateXian: ''
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
      this.$router.push({name: 'memberJiPiaoDetail', query: {id}})
    },
    orderQuXiao (id) {
      this.$confirm('此操作将取消订单, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        serverHttp.CanCelOrder({OrderId: id}).then(res => {
          this.$message({
            type: 'success',
            message: res.msg
          })
          this.getOrder()
        })
      })
    },
    getOrder (Mode) {
      let Page = this.pager.page
      let Code = this.searchForm.code
      serverHttp.GetList({Page, Code, Mode}).then(res => {
        console.log(res)
        this.allData = res.data.List
        this.pager.total = res.data.Count
      })
    },
    changePage (val) {
      this.pager.page = val
      this.getOrder()
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
