<template>
  <div class="search">
    <div class="city">
      <city-list @changeItem="changeItem"></city-list>
      <i class="el-icon-location"></i>
      <div class="input-box-right">
        <!-- <span>出发</span> -->
      </div>
    </div>
    <div class="input-box">
      <input type="text" v-model="data.input" placeholder="请输入内容">
    </div>
    <div class="button" @click="search">
      <button type="warning"><i class="el-icon-search"></i> 搜索</button>
    </div>
  </div>
</template>
<script>
import cityList from '@/components/cityList'
export default {
  name: 'Search',
  components: {cityList},
  data () {
    return {
      data: {
        input: '',
        ChuFaId: ''
      }
    }
  },
  methods: {
    changeItem (item) {
      this.data.ChuFaId = item.Id
      this.search()
    },
    search () {
      this.$emit('search', this.data)
    }
  }
}
</script>
<style lang="scss" scoped>
  .search {
    margin: 20px 0;
    height: 40px;
    width: 850px;
    border: 3px solid #ff7800;

    .city {
      float: left;
      position: relative;
      width: 170px;
      height: 40px;
      border-right: 2px solid #ff7800;

      .city-components {
        position: absolute;
        top: 50px;
        width: 400px;
        height: 200px;
        box-shadow: 0 0 4px 0 rgba(117, 117, 117, 0.5);
        border-radius: 2px;
        padding: 20px 21px;
        background: #ffffff;
        z-index: 10000;
      }

      .el-icon-location {
        position: absolute;
        right: 30px;
        top: 5px;
        color: #ff7800;
        font-size: 30px;
      }

      input {
        position: absolute;
        left: 40px;
        top: 0;
        width: 130px;
        height: 40px;
        border: 0;
        opacity: 0;
      }

      .input-box-right {
        position: absolute;
        right: 5px;
        top: 12px;
        color: #888888;
        font-size: 14px;
        cursor: pointer;
      }
    }

    .input-box {
      width: 550px;
      float: left;

      input {
        width: 100%;
        height: 40px;
        border: 0;
        outline: none;
        padding-left: 20px;
      }
    }

    .button {
      float: right;
      border: 0;
      border-radius: 0;

      button {
        background: #f60;
        width: 110px;
        line-height: 40px;
        border: 0;
        cursor: pointer;
        color: #ffffff;
        font-size: 16px;
      }

      button:active, button:focus {
        border: 0;
        outline: none;
      }
    }
  }
</style>
