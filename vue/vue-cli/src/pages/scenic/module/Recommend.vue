<template>
  <div class="detailMainRight">
    <div class="MainRightItem">
        <h3>周边推荐</h3>
        <ul class="want">
          <li v-for="(item, index) in recList" :key="index">
            <router-link :to="'/jiudian/detail?id='+item.Id+'&siteLanMuId=e37265adb2cd413aad6ee61ead857ff5'" target="_blank">
              <img :src=item.BasePicture onerror="this.src = '/static/default.gif'" alt="">
            </router-link>
            <div class="name">
              <router-link :to="'/jiudian/detail?id='+item.Id+'&siteLanMuId=e37265adb2cd413aad6ee61ead857ff5'" target="_blank" :title=item.Name>{{item.Name}}</router-link>
            </div>
            <div class="info">
              <span><em>¥<i>{{item.Price}}</i></em>起</span>
              <router-link :to="'/jiudian/detail?id='+item.Id+'&siteLanMuId=e37265adb2cd413aad6ee61ead857ff5'" target="_blank" title="太原富力万达文华酒店">去看看</router-link>
            </div>
          </li>
        </ul>
    </div>
    <div class="MainRightItem">
      <h3>附近酒店</h3>
      <ul class="hotel">
        <li v-for="(item, index) in fujinHotel" :key="index">
          <img :src=item.BasePicture onerror="this.src = '/static/default.gif'" alt="">
          <div>
            <p class="text-over-hidden">{{item.Name}}</p>
            <p class="text-over-hidden"><span><i>￥<strong>{{item.Price}}</strong></i> 起</span></p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Recommend',
  props: {
    recList: {
      type: Array
    },
    fujinHotel: {
      type: Array
    }
  }
}
</script>
<style lang="scss" scoped>
  .detailMainRight {
    width: 280px;
    float: right;

    .MainRightItem {
      margin-bottom: 20px;
      background-color: #fff;
      border: 1px solid #eee;

      h3 {
        padding-left: 15px;
        height: 36px;
        line-height: 50px;
        font-size: 16px;
        font-weight: 500;
      }

      .want {
        padding: 10px 10px 0;
        overflow: hidden;

        li {
          position: relative;
          padding: 10px 0;
          border-top: 1px solid #e5e5e5;
        }

        a {
          display: block;
          width: 258px;
          height: 170px;
          overflow: hidden;

          img {
            width: 258px;
            height: 170px;
          }
        }

        .name {
          margin-top: 10px;
          height: 40px;
          line-height: 20px;
          overflow: hidden;
          color: #666;
          font-size: 14px;

          a {
            color: #333;
            text-decoration: none;
          }
        }

        .info {
          position: relative;
          height: 30px;
          color: #999;
          font-size: 12px;

          span {
            position: absolute;
            bottom: 5px;
            left: 0;
            font-size: 14px;

            em {
              margin-right: 3px;
              color: #f63;
              font-size: 16px;
            }
          }

          a {
            position: absolute;
            right: 0;
            bottom: 0;
            width: 80px;
            height: 25px;
            line-height: 25px;
            text-align: center;
            background: #f60;
            color: #fff;
            border-radius: 3px;
          }
        }
      }

      .hotel{
          padding: 13px;
          overflow: hidden;

          li{
            margin-top: 13px;
            padding: 0 5px;
            overflow: hidden;
            color: #333333;

            img {
              width: 80px;
              height: 61px;
              margin-right: 10px;
              float: left;
            }

            div {
              float: left;
              width: calc(100% - 90px);

              p:first-child {
                font-size: 14px;
                line-height: 18px;
              }

              p:last-child {
                margin-top: 20px;
                color: #666;
                span{
                  display: inline-block;
                  width: 50%;
                  i {
                    color: #f60;

                    strong {
                      font-size: 16px;
                    }
                  }
                }
                span:last-child{
                  text-align: right;
                }
              }
            }
          }
      }
    }
  }
</style>
