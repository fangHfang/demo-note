<template>
  <div class="hotelHome">
    <el-form :inline="true" :model="search" class="demo-form-inline">
      <el-form-item label="关键字">
        <el-input v-model="search.keyword" size="small" placeholder="发票项目"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getFaPiaoList()">搜索</el-button>
      </el-form-item>
    </el-form>

    <div class="content" v-loading="loading">
      <div class="card">
        <ul>
            <li v-for="(item, index) in faPiaoData" :key="index">
                <div class="left">
                    <div class="title">{{item.Name}}</div>
                </div>
                <div class="right">
                    <button class="buy el-button warning-btn search-btn el-button--warning" @click="toDetail(item)">申请发票</button>
                </div>
            </li>
        </ul>
      </div>
      <div class="list"></div>
    </div>
  </div>
</template>

<script>
import serverHttp from '@/assets/common/fapiao'
export default {
  data () {
    return {
      search: {keyword: ''},
      faPiaoData: [],
      loading: true
    }
  },
  methods: {
    getFaPiaoList () {
      this.loading = true
      let that = this
      let Name = that.search.keyword
      serverHttp.GetFaPiaoListPage({Name}).then(res => {
        that.loading = false
        that.faPiaoData = res.data
      })
    },
    toDetail (data) {
      this.$router.push({name: 'InvoiceOrder', query: {id: data.Id}})
    }
  },
  mounted () {
    this.getFaPiaoList()
  }
}
</script>

<style lang="scss">
  .hotelHome {
    width: 1200px;
    margin: 0 auto;
    .demo-form-inline {
      margin: 20px 0;
      padding: 10px 20px;
      height: 35px;
      background: #fbf0e3;
      border: 1px solid #f9dab8;

      .el-form-item__label {
        line-height: 35px;
      }

      .el-form-item__content {
        line-height: 35px;

        .el-input__inner {
          height: 31px;
          line-height: 31px;
        }
      }

      .pad .el-input__inner {
        padding: 0 5px;
      }

      .el-input__icon {
        line-height: 31px;
      }

      .el-button {
        line-height: 0.7;
        width: 100px;
        height: 31px;
        background: #f68b33;
        color: #fff;
        font-size: 14px;
        border: none;
        border-radius: 3px;
        cursor: pointer;
      }
    }
    .content{
      min-height: 500px;
      .card{
        ul{
          margin: 10px auto;
          cursor: pointer;
          li{
            width: 100%;
            height: 140px;
            padding: 30px;
            box-sizing: border-box;
            background-color: #fff;
            margin-bottom: 15px;
            border: 1px solid #e5e5e5;
            .left{
              float: left;
              .title{
                font-size: 24px;
                color: #000;
                font-weight: 500;
              }
              .price{
                margin-top: 20px;
                font-size: 13px;
                color: #aaa;
                margin-right: 6px;
                .info{
                    font-size: 12px;
                    color: #666666;
                    line-height: 28px;
                }
                .num{
                    color: #f60;
                }
              }
            }
            .right{
              float: right;
            }
            .buy{
              margin-top: 20px;
            }
          }
          li:hover{
            box-shadow: 0 0 10px 2px rgba(0,0,0,0.05);
          }
        }
      }
      .list{
        width: 300px;
        float: right;
      }
    }
  }
</style>
