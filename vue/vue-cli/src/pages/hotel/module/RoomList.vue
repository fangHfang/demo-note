<template>
    <div class="MainLeft">
        <div class="MainItemHead room"><span><i class="myIcon"></i></span><em>房型价格</em></div>
        <div class="MainItemBox">
          <table width="100%">
            <thead>
              <tr>
                <th style="text-align: left">房型</th>
                <th style="width: 100px;text-align: center">价格</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in detailData.RoomJiaGe" :key="index">
                <td style="text-align: left">{{item.RoomClass}}</td>
                <td style="width: 100px;text-align: center"><i>￥<em>{{item.Price}}</em></i></td>
                <!--<td style="width: 100px;text-align: center;cursor: pointer" @click="handleOrder"><span>预定</span></td>-->
              </tr>
            </tbody>
          </table>
        </div>
        <div class="MainItemHead jieshao"><span><i class="myIcon"></i></span><em>酒店介绍</em></div>
        <div class="MainItemBox boxcon">
            {{detailData.JiuDianJieShao}}
        </div>
      <div class="MainItemHead jieshao"><span><i class="myIcon"></i></span><em>交通指南</em></div>
      <div class="MainItemBox boxcon">
        {{detailData.JiaoTongZhiNan}}
      </div>
      <div class="MainItemHead jieshao"><span><i class="myIcon"></i></span><em>预定须知</em></div>
      <div class="MainItemBox boxcon">
        {{detailData.YuDingXuZhi}}
      </div>
        <div class="MainItemHead tupian"><span><i class="myIcon"></i></span><em>酒店图片</em></div>
        <div class="MainItemBox hotelimg">
            <ul>
                <li v-for="(item, index) in detailData.imgList" :key="index" @click="showImg(index)"><img :src=item alt=""></li>
            </ul>
        </div>
      <imgDialog :list="detailData.imgList" :index="imgIndex" :show="showDialog" @close="showDialog = false" @next="next" @previous="previous"></imgDialog>
    </div>
</template>
<script>
import imgDialog from '@/components/imgDialog'
export default {
  components: {imgDialog},
  props: ['detailData'],
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
      imgIndex: 0
    }
  },
  methods: {
    handleOrder (index, row) {
      // this.$message.warning('该功能暂未开放,敬请期待!')
      this.$router.push({name: 'HotelOrder'})
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
      if (this.imgIndex === (this.detailData.imgList.length - 1)) {
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
      table{
        border: 1px solid #dfdfdf;
        tbody{
          tr{
            border-top: 1px solid #dfdfdf;
          }
        }
        thead{
          color: #999;
          background: #f3f3f3;
        }
        tbody{
          color: #666;
        }
        tr th, tr td{
          padding: 8px 10px;
          line-height: 20px;
          span{
            display: inline-block;
            width: 80px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            background: #ff8400;
            color: #fff;
            border-radius: 2px;
            box-shadow: 0 1px 1px #ccc;
          }
          i{
            color: #f60;
            font-size: 14px;
            em{
              font-size: 18px;
            }
          }
        }
      }
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
    }
</style>
