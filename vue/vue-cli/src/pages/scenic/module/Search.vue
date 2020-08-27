<template>
  <div class="search">
    <ul class="header">
      <li>
        <label>所在地区</label>
        <cityList></cityList>
      </li>
      <li>
        <label>关键字</label>
        <el-input style="width: 235px" v-model="input" placeholder="景区名称"></el-input>
      </li>
      <li>
        <el-button type="warning" class="warning-btn search-btn">搜索</el-button>
      </li>
    </ul>
  </div>
</template>
<script>
import cityList from '@/components/cityList'
export default {
  name: 'Search',
  components: {cityList},
  data () {
    return {
      input: ''
    }
  }
}
</script>
<style lang="scss">
  .search {
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
  }
</style>
