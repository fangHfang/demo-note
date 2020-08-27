<template>
    <div class="hetong index" v-loading="loading">
        <ul>
            <li v-for="(item, index) in heTongData" :key="index">
                <div class="left">
                    <div class="title">{{item.ContractTypeName}}</div>
                    <!--<div class="price">
                        <span class="info">合同价格：</span>
                        <span class="prices">
                            <span class="num">{{item.Price}}元</span>/份
                        </span>
                    </div>-->
                </div>
                <div class="right">
                  <button class="buy el-button warning-btn search-btn el-button--warning" @click="toDetail(item)">合同申领</button>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import serverHttp from '@/assets/common/hetong'
export default {
  data () {
    return {
      heTongData: [],
      loading: true
    }
  },
  methods: {
    getHeTongList () {
      let that = this
      that.loading = true
      serverHttp.GetHeTongListPage({}).then(res => {
        that.loading = false
        that.heTongData = res.data
      })
    },
    toDetail (item) {
      this.$router.push({name: 'contractOrder', query: {id: item.ContractTypeId}})
    }
  },
  mounted () {
    this.getHeTongList()
  }
}
</script>

<style lang="scss">
.hetong.index{
    min-height: 500px;
    ul{
        width: 1200px;
        margin: 10px auto;
        cursor: pointer;
        li{
            width: 100%;
            height: 102px;
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
                /*margin-top: 20px;*/
            }
        }
        li:hover{
            box-shadow: 0 0 10px 2px rgba(0,0,0,0.05);
        }
    }
}
</style>
