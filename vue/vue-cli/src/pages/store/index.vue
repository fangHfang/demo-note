<template>
  <div class="store">
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
      <div class="content">
        <el-row :gutter="20">
          <el-col :span="17">
            <ul class="content-left">
              <li v-for="(item, index) in listData" :key="index">
                <section><img src="/static/default.gif" alt=""></section>
                <div class="infomation">
                  <p>{{item.title}}</p>
                  <p><i>负责人</i> {{item.person}}  <i style="margin-left: 15px;">成立时间</i> {{item.time}}</p>
                  <p><i>邮箱</i> {{item.person}} <i style="margin-left: 15px;">电话</i> {{item.phone}}</p>
                  <p><i>地址</i> {{item.address}}</p>
                </div>
              </li>
            </ul>
            <pager :pager="pager" @changePage="changePage"></pager>
          </el-col>
          <el-col :span="7">
            <div class="notice">
              <p class="title">推荐</p>
              <ul>
                <li>
                  <img src="/static/default.gif" alt="">
                  <section>
                    <p class="text-over-hidden">qweqw</p>
                    <p class="text-over-hidden">山西省太原市小店区迎泽公园</p>
                  </section>
                </li>
              </ul>
            </div>
            <div class="notice">
              <p class="title">最新</p>
              <ul>
                <li>
                  <p class="text-over-hidden info-new">qwewe</p>
                  <p class="text-over-hidden info-new">负责人: 张三 成立时间: 2019-02-07</p>
                  <p class="text-over-hidden info-new">地址: 山西省太原市小店区迎泽公园</p>
                </li>
              </ul>
            </div>
            <div class="map">
              <div class="title">
                <span><i class="el-icon-location-outline"></i>地图预览</span></div>
              <div class="map-info">
                <addressShow></addressShow>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
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
        {title: '邮轮公司', time: '2019-02-04', phone: '13333333333', address: '国内 山西省 太原市 小店区 平阳路', person: '王某', type: '邮轮'},
        {title: 'qweqw', time: '2019-02-04', phone: '13333333333', address: '国内 山西省 太原市 小店区 平阳路', person: '王某', type: '邮轮'}
      ],
      pager: {
        pageSize: 10,
        page: 1,
        total: 888
      }
    }
  },
  methods: {
    changePage (val) {
      this.pager.page = val
    }
  }
}
</script>

<style lang="scss">
  .store{
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
        overflow: hidden;
        .content-left{
          li{
            margin-bottom: 15px;
            border: 1px solid #e5e5e5;
            background: #fff;
            height: 150px;
            padding: 15px;
            box-sizing: border-box;
            section{
              width: 180px;
              height: 100%;
              background: #cccccc;
              float: left;
              overflow: hidden;
              img{
                width: 100%;
                height: 100%;
              }
            }
            .infomation{
              float: left;
              padding: 0 20px;
              p{
                font-size: 14px;
                color: #a1a8ac;
                line-height: 28px;
                i{
                  margin-right: 6px;
                }
              }
              p:first-child{
                color: #222;
                font-weight: 700;
                font-size: 18px;
                margin-bottom: 6px;
              }
            }
            &:hover{
              background: #fafafa;
              box-shadow: 0 0 10px 2px rgba(0,0,0,.05);
              .infomation{
                p:first-child{
                  color: #128bed;
                }
              }
              section{
                img{
                  transform: scale(1.1,1.1);
                }
              }
            }
          }
        }
        .notice{
          background: #fff;
          margin-bottom: 20px;
          .title{
            padding: 10px 15px;
            font-size: 16px;
            border-bottom: 1px solid #eee;
          }
          ul{
            li{
              padding: 10px;
              /*overflow: hidden;*/
              height: 67px;
              img{
                width: 100px;
                height: 100%;
                float: left;
              }
              section{
                width: calc(100% - 110px);
                font-size: 14px;
                float: right;
                p{
                  border-bottom: none;
                  color: #666;
                  font-size: 12px;
                  line-height: 28px;
                }
                p:first-child{
                  color: #222222;
                  font-size: 14px;
                }
              }

              .info-new{
                line-height: 26px;
                font-size: 12px;
              }
              .info-new:last-of-type{
                color: #666;
              }
              .info-new:first-of-type{
                font-size: 14px;
              }
              &:hover{
                background: #f1f9fe;
                .info-new:first-of-type{
                  color: #128bed;
                }
                section{
                  p:first-child{
                    color: #128bed;
                  }
                }
              }
            }
          }
        }
        .map{
          background: #fff;
          margin-bottom: 20px;
          .title{
            span{
              display: inline-block;
              padding: 10px 20px;
              background: #029a3c;
              color: #fff;
              font-size: 14px;
            }
          }
          .map-info{
            width: 100%;
            height: 430px;
            overflow: hidden;
            /*z-index: 9;*/
          }
        }
      }
    }
  }
</style>
