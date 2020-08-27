<template>
    <div class="MainLeft">
        <div class="MainItemHead room"><span><i class="myIcon"></i></span><em>房型价格</em></div>
        <div class="MainItemBox">
            <div class="roomBox">
                <div class="roomList">
                    <div class="roomdetail" v-for="(item, index) in detail.Rooms" :key="index">
                        <h3>{{item.Name}}</h3>
                        <div class="listInfo">
                            <span><label>所在楼层：</label>{{item.Floor}}</span>
                            <span><label>房间床型：</label>{{item.BedType}}</span>
                            <span class="line"><label>房间设施：</label>{{item.Description}}</span>
                        </div>
                        <div class="price">¥<i>{{item.RatePlans[0].AverageRate}}</i><em>起</em></div>
                        <el-collapse>
                            <el-collapse-item :title="'共'+chinaNum[item.RatePlans.length - 1]+'条数据'">
                                <el-table :data="item.RatePlans" style="width: 100%">
                                    <el-table-column label="产品名称">
                                      <template slot-scope="scope">
                                        <span style="margin-left: 10px">{{ scope.row.RatePlanName }}</span>
                                      </template>
                                    </el-table-column>
                                    <el-table-column label="供应商" width="130">
                                    <template slot-scope="scope">
                                      {{ scope.row.SuffixName }}
                                    </template>
                                    </el-table-column>
                                    <el-table-column label="早餐" width="130">
                                    <template slot-scope="scope">
                                      {{ scope.row.isZaoCan===true?'有':'无' }}
                                    </template>
                                    </el-table-column>
                                    <el-table-column label="产品政策" width="130">
                                    <template slot-scope="scope">
                                    </template>
                                    </el-table-column>
                                    <el-table-column label="日均价" width="150">
                                    <template slot-scope="scope">
                                      ￥<span style="color: #f55; font-size: 18px">{{scope.row.AverageRate}}</span>
                                    </template>
                                    </el-table-column>
                                    <el-table-column label=""  width="100">
                                    <template slot-scope="scope">
                                        <div class="strBox"
                                        @click="handleOrder(scope.$index, scope.row)">
                                            <div class="topStr">预定</div>
                                            <div class="bottomStr">在线付</div>
                                        </div>
                                    </template>
                                    </el-table-column>
                                </el-table>
                            </el-collapse-item>
                        </el-collapse>
                        <ul class="image">
                            <li v-for="i in 3" :key="i">
                                <img :src="item.ImageUrl" alt="">
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="MainItemHead jieshao"><span><i class="myIcon"></i></span><em>酒店介绍</em></div>
        <div class="MainItemBox boxcon">
            {{detail.Detail?detail.Detail.GeneralAmenities?detail.Detail.GeneralAmenities:'':''}}
        </div>
      <div class="MainItemHead jieshao"><span><i class="myIcon"></i></span><em>交通指南</em></div>
      <div class="MainItemBox boxcon">
        {{detail.Detail.Traffic}}
      </div>
      <div class="MainItemHead jieshao"><span><i class="myIcon"></i></span><em>预定须知</em></div>
      <div class="MainItemBox boxcon">
        {{detail.PrepayRules[0].Description}}
      </div>
        <div class="MainItemHead tupian"><span><i class="myIcon"></i></span><em>酒店图片</em></div>
        <div class="MainItemBox hotelimg">
            <ul>
                <li v-for="(item, index) in detail.imgArr" :key="index" @click="showImg(index)"><img :src=item alt=""></li>
            </ul>
        </div>
      <imgDialog :list="detail.imgArr" :index="imgIndex" :show="showDialog" @close="showDialog = false" @next="next" @previous="previous"></imgDialog>
    </div>
</template>
<script>
import imgDialog from '@/components/imgDialog'
export default {
  components: {imgDialog},
  props: ['detail'],
  data () {
    return {
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      value2: '',
      showDialog: false,
      imgIndex: 0,
      chinaNum: ['一', '两', '三', '四', '五', '六', '七', '八', '九']
    }
  },
  methods: {
    handleOrder (index, row) {
      this.$router.push({path: '/jiudiansanfang/yuding'})
    },
    showImg (index) {
      this.imgIndex = index
      this.showDialog = true
    },
    previous () {
      if (this.imgIndex === 0) {
        return
      }
      this.imgIndex = this.imgIndex - 1
    },
    next () {
      if (this.imgIndex === (this.hotelimg.length - 1)) {
        return
      }
      this.imgIndex = this.imgIndex + 1
    }
  }
}
</script>
<style lang="scss" scope>
    .MainLeft{
        float: left;
        width: 910px;
        .MainItemHead.jieshao i{
            top: 17px;
            left: -21px;
            width: 25px;
            height: 25px;
            background-position: -140px -75px;
        }
        .MainItemHead.room i{
            top: 19px;
            left: -17px;
            width: 21px;
            height: 25px;
            background-position: -175px -75px;
        }
        .MainItemHead.tupian i{
            top: 19px;
            left: -28px;
            width: 32px;
            height: 25px;
            background-position: -269px -75px;
    }
        .MainItemHead{
            position: relative;
            margin-bottom: 10px;
            padding-left: 26px;
            height: 48px;
            text-align: center;
            border-bottom: 2px solid #029a3c;
            span {
                position: relative;
                margin-right: 10px;
                display: inline-block;
                vertical-align: middle;
            }
            em {
                display: inline-block;
                vertical-align: middle;
                font-size: 22px;
            }
        }
        .boxcon{
            padding-bottom: 20px;
            color: #666;
            font-size: 14px;
            line-height: 23px;
        }
        .hotelimg ul{
            overflow: hidden;
            li{
                float: left;
                width: 165px;
                height: 106px;
                margin: 0 4px 10px;
                img{
                    width: 165px;
                    height: 106px;
                    cursor: pointer;
                }
            }
        }
    }
    .MainItemBox{
        position: relative;
        margin-bottom: 20px;
        padding: 20px 20px 10px;
        background: #fff;
        .roomData{
            margin-bottom: 10px;
        }
        .roomBox .roomList{
            .roomdetail {
                position: relative;
                border-top: 1px solid #ddd;
                overflow: hidden;
                padding: 20px 0;
                h3{
                    margin-bottom: 5px;
                    color: #333;
                    font-size: 18px;
                    font-weight: normal;
                }
                .listInfo{
                    overflow: hidden;
                    line-height: 25px;
                    color: #333;
                    span{
                        float: left;
                        width: 229px;
                        label{
                            display: inline-block;
                            width: 60px;
                            text-align: right;
                        }
                    }
                    .line{
                        width: 708px;
                    }
                }
                .price{
                    position: absolute;
                    right: 10px;
                    top: 20px;
                    color: #f60;
                    font-size: 18px;
                    z-index: 2;
                    i {
                        font-size: 28px;
                        margin: 0 2px;
                    }
                    em {
                        color: #999;
                        font-size: 12px;
                    }
                }
                .el-collapse{
                    border: 0;
                    .strBox{
                        border: 1px solid #ff8e00;
                        border-radius: 5px;
                        overflow: hidden;
                        display: block;
                        width: 60px;
                        cursor: pointer;
                    }
                    .topStr{
                        color: #fff;
                        font-size: 15px;
                        height: 30px;
                        line-height: 30px;
                        background: #f55;
                        text-align: center;
                    }
                    .bottomStr {
                        font-size: 11px;
                        color: #ff8e00;
                        height: 20px;
                        line-height: 20px;
                        background: #ffefef;
                        text-align: center;
                    }
                }
                .el-collapse-item__header{
                    position: absolute;
                    right: 10px;
                    top: 68px;
                    width: 100px;
                    text-align: right;
                    line-height: 25px;
                    height: 25px;
                    border: 0;
                    z-index: 1000;
                    justify-content: flex-end;
                    .el-collapse-item__arrow{
                      margin: 0 2px 0 5px;
                    }
                }
                .el-collapse-item__header:hover{
                    color: #37d;
                }
                .el-table{
                    margin-top: 30px;
                  th{
                    height: 30px;
                    padding: 2px 0;
                    box-sizing: border-box;
                    color: #999;
                    font-weight: normal;
                    font-size: 12px;
                  }
                  td{
                    color: #333;
                    font-size: 12px;
                  }
                }
                .el-table th, .el-table thead tr{
                    background: #f5f5f5;
                }
                .image{
                    margin-top: 10px;
                    overflow: hidden;
                    li{
                        float: left;
                        width: 136px;
                        height: 90px;
                        margin-right: 10px;
                        img{
                            width: 136px;
                            height: 90px;
                        }
                    }
                }
            }
        }
    }
</style>
