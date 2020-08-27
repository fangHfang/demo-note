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
      <el-form-item label="合同编号">
        <el-input v-model="input" placeholder="合同编号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="onSubmit">搜索</el-button>
      </el-form-item>
    </el-form>
    <el-tabs v-model="activeName">
      <el-tab-pane :name="item.type" v-for="(item, index) in statusGroup" :key="index">
        <span slot="label">{{item.name}} <i style="color: #f60;">{{item.num}}</i></span>
      </el-tab-pane>
    </el-tabs>
    <el-table :data="allData" row-class-name="orderTable">
      <el-table-column label="合同信息">
        <p class="itemRow title">国内旅游合同</p>
        <p class="itemRow">合同编号：HT001002003</p>
        <p class="itemRow">销售员工：王加盟 13520215487 加盟店，2019-06-17 16:15:20</p>
      </el-table-column>
      <el-table-column label="合同状态" align="center" width="130">
        <strong>已使用</strong>
      </el-table-column>
      <el-table-column label="操作" align="center" width="130">
        <p class="itemRow toLink" @click="toTour()">使用</p>
        <p class="itemRow toLink" @click="dayin()">打印</p>
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
export default {
  name: 'memberTourHeTongInfo',
  data () {
    return {
      statusGroup: [
        {name: '全部', num: 88, type: 'all'},
        {name: '已使用', num: 28, type: '0'},
        {name: '未使用', num: 33, type: '1'}
      ],
      searchForm: {
        jurisdiction: '',
        state: '',
        stateXian: ''
      },
      allData: [{}, {}],
      pager: {
        pageSize: 10,
        page: 1,
        total: 888
      },
      loading: false
    }
  },
  methods: {
    toTour () {
      this.$router.push({name: 'LuRuDingDan1'})
    },
    dayin () {
      this.$router.push({name: 'LuRuDingDan5'})
    }
  }
}
</script>

<style lang="scss">
  @import "../scss/common";
</style>
