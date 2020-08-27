<template>
<div class="business">
  <div class="index">
    <ul class="header">
      <li>
        <label>所在地区</label>
        <cityList></cityList>
      </li>
      <li>
        <label>企业类型</label>
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </li>
      <li>
        <label>关键字</label>
        <el-input style="width: 235px" v-model="input" placeholder="企业名称关键字"></el-input>
      </li>
      <li>
        <el-button type="warning" size="small" class="warning-btn search-btn">查询</el-button>
      </li>
    </ul>
    <ul class="content">
      <li v-for="(item, index) in listData" :key="index" @click="toDetail(item)">
        <img src="/static/default.gif" alt="">
        <div class="infomation">
          <p>{{item.title}}</p>
          <p><i>所在地址</i> {{item.address}}</p>
          <p><i>企业法人</i> {{item.person}}</p>
          <p><i>经营范围</i> {{item.type}}</p>
        </div>
      </li>
    </ul>
    <pager :pager="pager" @changePage="changePage"></pager>
  </div>
</div>
</template>

<script>
import cityList from '@/components/cityList'
export default {
  name: 'index',
  components: {cityList},
  data () {
    return {
      options: [{
        value: '1',
        label: '按航班号'
      }, {
        value: '2',
        label: '按起降地'
      }],
      value: '1',
      value1: '',
      input: '',
      listData: [
        {title: '邮轮公司', address: '国内 山西省 太原市 小店区 平阳路', person: '王某', type: '邮轮'},
        {title: '邮轮公司', address: '国内 山西省 太原市 小店区 平阳路', person: '王某', type: '邮轮'},
        {title: '邮轮公司', address: '国内 山西省 太原市 小店区 平阳路', person: '王某', type: '邮轮'},
        {title: '邮轮公司', address: '国内 山西省 太原市 小店区 平阳路', person: '王某', type: '邮轮'},
        {title: '邮轮公司', address: '国内 山西省 太原市 小店区 平阳路', person: '王某', type: '邮轮'},
        {title: '邮轮公司', address: '国内 山西省 太原市 小店区 平阳路', person: '王某', type: '邮轮'},
        {title: '邮轮公司', address: '国内 山西省 太原市 小店区 平阳路', person: '王某', type: '邮轮'},
        {title: '邮轮公司', address: '国内 山西省 太原市 小店区 平阳路', person: '王某', type: '邮轮'},
        {title: '邮轮公司', address: '国内 山西省 太原市 小店区 平阳路', person: '王某', type: '邮轮'},
        {title: '邮轮公司', address: '国内 山西省 太原市 小店区 平阳路', person: '王某', type: '邮轮'},
        {title: '邮轮公司', address: '国内 山西省 太原市 小店区 平阳路', person: '王某', type: '邮轮'}
      ],
      pager: {
        pageSize: 10,
        page: 1,
        total: 888
      }
    }
  },
  methods: {
    /**
     * 分页
     * @param val
     */
    changePage (val) {
      this.pager.page = val
    },
    toDetail (item) {
      window.open('#/minglu/detail', '_blank')
    }
  }
}
</script>

<style lang="scss">
.business{
  .index{
    width: 1200px;
    margin: 0 auto;
    .header {
      padding: 10px 20px;
      height: 55px;
      margin: 10px 0;
      line-height: 35px;
      background: #fbf0e3;
      border: 1px solid #f9dab8;
      box-sizing: border-box;
      li{
        float: left;
        margin-right: 30px;
        .change-image{
          position: relative;
          display: inline-block;
          text-align: center;
          float: left;
          width: 52px;
          height: 30px;
          margin: 2.5px 20px;
          padding: 0;
          overflow: hidden;
          cursor: pointer;
          background: url("/static/ticket.png") no-repeat;
          background-position: 0 0;
          &:hover{
            background-position: 0 -44px;
          }
        }
        .el-select {
          width: 122px;
          height: 31px;
          margin-left: 10px;

          .el-input__inner {
            height: 31px;
            &:focus{
              border-color: #3aa400;
            }
          }

          .el-input__icon {
            height: 31px;
            line-height: 31px;
          }

        }

        .el-input{
          width: 122px;
          height: 31px;
          margin-left: 10px;
          .el-input__inner {
            height: 31px;
            &:focus{
              border-color: #3aa400;
            }
          }
        }
        .el-date-editor{
          width: 150px;
          height: 31px;
          margin-left: 10px;
          .el-input__inner{
            height: 31px;
          }
          .el-input__icon{
            line-height: 31px;
          }
        }

        .search-btn{
          padding: 6px 15px;
        }
      }
    }
    .content{
      cursor: pointer;
      li{
        margin-bottom: 15px;
        border: 1px solid #e5e5e5;
        background: #fff;
        height: 140px;
        img{
          width: 210px;
          height: 100%;
          background: #cccccc;
          float: left;
        }
        .infomation{
          float: left;
          padding: 10px 20px;
          p{
            font-size: 12px;
            color: #666666;
            line-height: 28px;
            i{
              color: #aaa;
              margin-right: 6px;
            }
          }
          p:first-child{
            color: #333;
            font-weight: 500;
            font-size: 20px;
            margin-bottom: 6px;
            cursor: pointer;
            &:hover{
              color: #F60;
            }
          }
        }
        &:hover{
          box-shadow: 0 0 10px 2px rgba(0,0,0,.05);
        }
      }
    }
  }
}
</style>
