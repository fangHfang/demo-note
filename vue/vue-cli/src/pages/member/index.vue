<template>
    <div class="member-index">
      <div class="header">
        <section class="member_box_pic">
          <img :src="userInfo.Photo" onerror="this.src = '/static/default.gif'" alt="">
          <p class="text-over-hidden">{{userInfo.Name}}</p>
          <p class="text-over-hidden">{{userInfo.Telephone}}</p>
        </section>
        <ul class="member_box_pic order-list-show">
          <li v-for="(item, index) in list" :key="index">
            <i :class="item.icon"></i>
            <span>{{item.name}} <em>{{item.num}}</em> </span>
          </li>
        </ul>
        <section class="member_box_pic member-money">
          我的余额: <i>{{data.YuE}}</i>
        </section>
      </div>
      <div class="orderList">
        <p class="title">最新订单</p>
        <el-table :data="allData" row-class-name="orderTable">
          <el-table-column label="产品信息" v-slot="scope">
            <p class="itemRow toLink text-over-hidden" @click="orderDetail(scope.row)" :title="scope.row.Name">三亚蜈支洲岛、槟榔谷、呀诺达热带雨林、南山、天涯海角双飞5日跟团游(3天行程，1</p>
            <p class="itemRow">发团日期：2018-05-15</p>
            <p class="itemRow">出游人数：1</p>
          </el-table-column>
          <el-table-column align="center" label="订单编号" width="190">LY20190827-14-019-003</el-table-column>
          <el-table-column label="订单金额" align="center" width="130">
            <span class="price"><em>¥</em>100</span>
          </el-table-column>
          <el-table-column label="订单状态" align="center" width="130">
            <strong>未审核</strong>
          </el-table-column>
          <el-table-column label="操作" align="center" width="130">
            <p class="itemRow toLink">订单详情</p>
            <p class="itemRow toLink">取消订单</p>
          </el-table-column>
        </el-table>
      </div>
      <div class="orderList">
        <p class="title">推荐产品</p>
        <ul class="list-tuijian">
            <li class="list-left-item" v-for="(item,index) in tourData.slice(0, 4)" :key="index">
<!--              <el-tag type="success">{{item.type}}</el-tag>-->
              <div class="image"><img src="/static/default.gif" alt=""></div>
              <p class="typeName">【{{item.type}}】{{item.Name}}</p>
              <p class="info">
                <span>{{item.depart}}出发</span>
                <span><i>￥{{item.price}}</i>起</span>
              </p>
            </li>
          </ul>
      </div>
    </div>
</template>

<script>
import serverHttp from '@/assets/common/order'
export default {
  name: 'index',
  data () {
    return {
      list: [
        {name: '全部订单', icon: 'icon0', num: 12},
        {name: '待审核', icon: 'icon1', num: 12},
        {name: '待支付', icon: 'icon2', num: 12},
        {name: '待出行', icon: 'icon3', num: 12}
      ],
      allData: [{}, {}, {}],
      tourData: [
        {type: '周边游', Name: '太原+阳泉-1天1夜-测试线路-0507+LY14-017-0507+LY14-017', depart: '太原市', price: '1500'},
        {type: '周边游', Name: '太原+阳泉-1天1夜-测试线路-0507+LY14-017-0507+LY14-017', depart: '太原市', price: '1500'},
        {type: '周边游', Name: '太原+阳泉-1天1夜-测试线路-0507+LY14-017-0507+LY14-017', depart: '太原市', price: '1500'},
        {type: '周边游', Name: '太原+阳泉-1天1夜-测试线路-0507+LY14-017-0507+LY14-017', depart: '太原市', price: '1500'},
        {type: '周边游', Name: '太原+阳泉-1天1夜-测试线路-0507+LY14-017-0507+LY14-017', depart: '太原市', price: '1500'},
        {type: '周边游', Name: '太原+阳泉-1天1夜-测试线路-0507+LY14-017-0507+LY14-017', depart: '太原市', price: '1500'},
        {type: '周边游', Name: '太原+阳泉-1天1夜-测试线路-0507+LY14-017-0507+LY14-017', depart: '太原市', price: '1500'},
        {type: '周边游', Name: '太原+阳泉-1天1夜-测试线路-0507+LY14-017-0507+LY14-017', depart: '太原市', price: '1500'},
        {type: '周边游', Name: '太原+阳泉-1天1夜-测试线路-0507+LY14-017-0507+LY14-017', depart: '太原市', price: '1500'}
      ],
      data: {}
    }
  },
  created () {
    this.getList()
  },
  methods: {
    getList () {
      serverHttp.GetUserMoney().then(res => {
        if (res.code === 0) {
          this.data = res.data
        } else {
          this.$message.error(res.msg)
        }
      })
    }
  },
  computed: {
    userInfo () {
      console.log(this.$store.state.userInfo)
      return this.$store.state.userInfo
    }
  }
}
</script>

<style lang="scss">
  @import "./scss/common";
.member-index{
  .header{
    padding: 20px 15px;
    background: #f7f7f7;
    overflow: hidden;
    .member_box_pic{
      width: 300px;
      /*box-sizing: border-box;*/
      padding: 15px 0 15px 20px;
      border-right: 1px dashed #ddd;
      float: left;
      img{
        width: 85px;
        height: 85px;
        border-radius: 50%;
        float: left;
        display: inline-block;
        margin-right: 15px;
      }
      p{
        line-height: 30px;
        margin-left: 100px;
      }
      p:nth-child(2){
        max-width: 200px;
        color: #666;
        font-size: 18px;
        font-weight: 700;
      }
    }
    .order-list-show{
      width: 430px;
      display: flex;
      li{
        flex: 1;
        i{
          display: block;
          margin: 0 auto;
          margin-bottom: 15px;
          width: 52px;
          height: 52px;
          background: url("/static/icon/member.png") no-repeat;
          cursor: pointer;
        }
        .icon0{
          background-position: 0 -24px;
          &:hover{
            background-position: -53px -24px;
          }
        }
        .icon1{
          background-position: 0 -77px;
          &:hover{
            background-position: -53px -77px;
          }
        }
        .icon2{
          background-position: 0 -130px;
          &:hover{
            background-position: -53px -130px;
          }
        }
        .icon3{
          background-position: 0 -183px;
          &:hover{
            background-position: -53px -183px;
          }
        }
        span{
          display: block;
          text-align: center;
          font-size: 14px;
          color: #666;
          em{
            color: #f60;
            font-weight: 700;
            margin-left: 3px;
          }
        }
      }
    }
    .member-money{
      width: 178px;
      line-height: 30px;
      font-size: 14px;
      color: #333;
      border-right: none;
      i{
        color: #f60;
        font-weight: 700;
      }
    }
  }
  .orderList{
    margin-top: 30px;
    .title{
      margin-bottom: 15px;
      font-size: 18px;
      padding-left: 8px;
      border-left: 3px solid #20a832;
    }
  }
  .list-tuijian{
    padding: 25px;
    margin-top: 20px;
    border: 1px solid #eee;
    overflow: hidden;
    .list-left-item{
      width: 222px;
      height: 240px;
      float: left;
      position: relative;
      margin: 0 20px 20px 0;
      background: #fff;
      cursor: pointer;
      .el-tag.el-tag--success{
        position: absolute;
        left: 0;
        top: 0;
        border-radius: 0;
        background-color: #2fc7b0;
        color: #fff;
        border-color: #2fc7b0;
        height: 25px;
        line-height: 25px;
        z-index: 15;
      }
      .image{
        width: 100%;
        height: 148px;
        overflow: hidden;
        img{
          width: 100%;
          height: 100%;
        }
      }
      p{
        padding: 0 8px;
        line-height: 22px;
        color: #333;
        font-size: 15px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      p:last-child{
        line-height: 20px;
        margin-top: 10px;
        color: #999;
        font-size: 12px;
        span:last-child{
          float: right;
          i{
            color: #ff5346;
            margin-right: 2px;
            font-size: 20px;
          }
        }
      }
    }
    .list-left-item:hover{
      transition: all .2s ease-in-out;
      box-shadow: 0 1px 15px rgba(0,0,0,.13);
      .image{
        img{
          transform: scale(1.1, 1.1);
        }
      }
    }
    .list-left-item:last-child{
      margin-right: 0;
    }
  }
}
</style>
