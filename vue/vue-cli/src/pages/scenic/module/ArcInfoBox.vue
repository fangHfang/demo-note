<template>
  <div class="ArcInfoBox">
<!--    标题-->
    <div class="TourTitle">
      <h1>{{allData.Name}}<span>{{allData.JQGrade}}景区</span></h1>
      <p class="description">{{allData.JQTeSe}}</p>
    </div>
<!--    轮播图-->
    <div class="TourBoxLeft">
      <div class="tourImg">
        <el-carousel :interval="5000" arrow="always">
          <el-carousel-item v-for="(item, index) in allData.JQPicture" :key="index">
            <img :src="item.PicturUrl" alt="" onerror="this.src = '/static/default.gif'">
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
<!--    景区信息-->
    <div class="TourBoxRight">
      <div class="info1">
        <div class="item"><label>景区编号：</label>{{allData.CPCode}}</div>
        <div class="item"><label>景区类型：</label>{{allData.JQType}}</div>
      </div>
      <div class="info2 clearfix">
        <div class="price"><strong>{{allData.Price===0?'请咨询':allData.Price}}</strong></div>
      </div>
      <div class="info3 info34 clearfix">
        <dl>
          <dt>供应商：</dt>
          <dd>{{allData.GongYingShang.JiGou}}</dd>
        </dl>
        <dl>
          <dt>景区地址：</dt>
          <dd>{{allData.RegionName.Name}} <span><i class="el-icon-location-outline"></i>查看地图</span></dd>
        </dl>
        <dl>
          <dt>开放时间：</dt>
          <dd>{{allData.JQPlayTime}}</dd>
        </dl>
        <dl>
          <dt>景区主题：</dt>
          <dd><i v-for="(item, index) in allData.Attributes" :key="index" v-if="item.ZiDian_TypeKey === 'jingqu_zhuti'">{{item.Name}}、</i></dd>
        </dl>
        <dl>
          <dt>适宜人群：</dt>
          <dd><i v-for="(item, index) in allData.Attributes" :key="index" v-if="item.ZiDian_TypeKey === 'jingqu_renqun'">{{item.Name}}、</i></dd>
        </dl>
      </div>
      <div class="info5 clearfix">
        <div class="Btninfo">
          <el-button type="warning" plain icon="el-icon-star-off">收藏景区</el-button>
          <el-button type="warning" icon="el-icon-position" @click="handleOrder">立即预定</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ArcInfoBox',
  props: {
    allData: {
      type: Object
    }
  },
  methods: {
    handleOrder (index, row) {
      this.$router.push({name: 'ScenicOrder'})
    }
  }
}
</script>
<style lang="scss" scoped>
  .ArcInfoBox {
    position: relative;
    padding: 20px;
    margin: 0 0 20px;
    background: #fff;
    border: 1px solid #e5e5e5;
    overflow: hidden;

    .TourTitle {
      line-height: 33px;
      margin-bottom: 20px;

      h1 {
        font-size: 24px;
        font-weight: normal;
        span{
          margin-left: 10px;
          color: #ff5704;
          font-size: 16px;
          font-weight: normal;
        }
      }
      .description{
        color: #999;
        font-size: 14px;
      }
    }

    .TourBoxLeft {
      width: 540px;
      float: left;

      .tourImg {
        width: 100%;

        .el-carousel__item img {
          width: 100%;
        }

        .el-carousel__item:nth-child(2n) {
          background-color: #99a9bf;
        }

        .el-carousel__item:nth-child(2n+1) {
          background-color: #d3dce6;
        }
      }

      .tourDateBox {
        margin-top: 15px;
      }
    }

    .TourBoxRight {
      width: 600px;
      float: right;

      .info1 {
        padding: 0 8px;
        height: 35px;
        color: #8c8c8c;
        border-bottom: 1px dotted #ddd;

        .item {
          position: relative;
          float: left;
          line-height: 20px;
          font-size: 14px;
          padding-left: 30px;
          margin-left: 30px;
          border-left: 1px solid #ddd;
        }
        .item:first-child{
          border:none;
          padding: 0;
          margin: 0;
        }

        .bdsharebuttonbox {
          float: right;
          margin-left: 30px;
          padding-left: 30px;

          .router-link-active {
            color: #8c8c8c;

            i {
              color: #8cc06e;
            }
          }
        }
      }

      .info2 {
        position: relative;
        margin-top: 10px;
        padding-left: 20px;
        background: #fcf9ee;
        overflow: hidden;
        color: #999;

        .price {
          float: left;
          height: 75px;
          line-height: 75px;

          em {
            color: #f60;
            font-size: 23px;
          }

          strong {
            margin: 0 6px;
            color: #f60;
            font-size: 36px;
            font-weight: 500;
          }
        }
      }

      .info3 {
        overflow: hidden;
        margin-top: 10px;
        padding: 15px 10px 15px 20px;
        background: #f6f6f6;
        color: #999;

        .w290 {
          float: left;
          width: 290px;
        }

        dl {
          line-height: 38px;

          dt {
            float: left;
            color: #666;
          }

          dd {
            display: inline-block;
            color: #999;
            font-size: 14px;

            em {
              margin: 0 2px 0 0;
              color: #ff5308;
              font-weight: 700;
            }

            span{
              display: inline-block;
              margin-left: 10px;
              width: 90px;
              height: 22px;
              line-height: 22px;
              text-align: center;
              background: #fff;
              color: #333;
              font-size: 12px;
              border: 1px solid #e0e0e0;
              border-radius: 14px;
              cursor: pointer;
              .el-icon-location-outline{
                color: #2e9900;
                font-size: 16px;
                vertical-align: middle;
                margin-left: -3px;
                margin-top: -3px;
              }
              &:hover{
                border-color: #2e9900;
              }
            }
          }
        }
      }

      .info5 {
        position: relative;
        margin-top: 10px;
        padding: 20px;
        overflow: hidden;

        label {
          float: left;
          padding-right: 10px;
          width: 70px;
          line-height: 35px;
          text-align: right;
          color: #666;
          font-size: 14px;
        }

        .formbox {
          position: relative;
          float: left;
          line-height: 35px;
          font-weight: bold;
          font-size: 16px;
        }

        .trip {
          margin-left: 20px;
          line-height: 32px;
          font-size: 12px;
          color: #f60;
        }

        .Btninfo {
          width: 100%;
          text-align: center;

          .el-button--warning {
            position: relative;
            margin: 0 10px 0;
            width: 160px;
            height: 43px;
            line-height: 43px;
            color: #fff;
            font-size: 20px;
            border: none;
            cursor: pointer;
            background: #ff5704;
          }
          .is-plain{
            background: #ffe4d0;
            border: 1px solid #f0cab6;
            color: #e5511d;
          }
        }
      }
    }
  }
</style>
