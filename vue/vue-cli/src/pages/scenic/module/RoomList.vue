<template>
  <div class="detailMainLeft">
    <el-timeline>
      <el-timeline-item size="large" icon="el-icon-document" timestamp="2018/4/12" placement="top" :hide-timestamp="true" color="#029a3c">
        <el-card>
          <h6>景区门票</h6>
          <el-table
            border
            :data="allData.Prices"
            style="width: 100%">
            <el-table-column
              prop="ModeDesc"
              label="门票类型">
            </el-table-column>
            <el-table-column
              prop="Price"
              label="价格"
              width="180">
            </el-table-column>
          </el-table>
        </el-card>
      </el-timeline-item>
      <el-timeline-item size="large" icon="el-icon-document" timestamp="2018/4/3" placement="top" :hide-timestamp="true" color="#029a3c">
        <el-card>
          <h6>景区介绍</h6>
          <p>{{allData.JQDetailInfo}}</p>
        </el-card>
      </el-timeline-item>
      <el-timeline-item size="large" icon="el-icon-document" timestamp="2018/4/2" placement="top" :hide-timestamp="true" color="#029a3c">
        <el-card>
          <h6>交通指南</h6>
          <p>{{allData.JQTrafficInfo}}</p>
        </el-card>
      </el-timeline-item>
      <el-timeline-item size="large" icon="el-icon-document" timestamp="2018/4/2" placement="top" :hide-timestamp="true" color="#029a3c">
        <el-card>
          <h6>预定须知</h6>
          <p>{{allData.JQBookInfo}}</p>
        </el-card>
      </el-timeline-item>
      <el-timeline-item size="large" icon="el-icon-picture-outline" timestamp="2018/4/2" placement="top" :hide-timestamp="true" color="#029a3c">
        <el-card>
          <h6>景区图片</h6>
          <img :src="item.PicturUrl" onerror="this.src = '/static/default.gif'" alt="" v-for="(item, index) in allData.JQPicture" :key="index">
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>
<script>
export default {
  props: {
    allData: {
      type: Object
    }
  },
  data () {
    return {
      tableData: [{
        date: '成人票',
        name: '180'
      }, {
        date: '成人票',
        name: '180'
      }, {
        date: '成人票',
        name: '180'
      }, {
        date: '成人票',
        name: '180'
      }]
    }
  },
  methods: {

    /* handleEdit (index, row) {
      console.log(index, row)
      this.$router.push({path: '/hotel/yuding'})
    } */
  }
}
</script>
<style lang="scss">
  .detailMainLeft {
    padding: 30px!important;
    float: left;
    width: 910px;
    background: #fff;
    box-sizing: border-box;
    margin-bottom: 20px!important;
    .el-timeline-item__node--large{
      width: 33px;
      height: 33px;
      left: -12px;
      background: #eceff2!important;
      .el-timeline-item__icon{
        color: #2e9900;
        font-size: 18px;
        line-height: 33px;
        text-align: center;
      }
    }
    .el-card.is-always-shadow{
      box-shadow: none;
      border: none;
      .el-card__body{
        padding: 0 20px;
      }
      h6{
        line-height: 48px;
        color: #029a3c;
        font-size: 18px;
        font-weight: normal;
        border-bottom: 1px dashed #ddd;
        margin-bottom: 20px;
      }
      .el-button--warning{
        color: #fff;
        background: #ff8400;
        border-color: #ff8400;
        padding: 8px 25px;
      }

      .el-table{
        thead{
          tr{
            th{
              text-align: center;
              background: #f3f3f3;
            }
          }
        }
        tbody{
          tr{
            td{
              padding: 5px 0;
              text-align: center;
            }
          }
        }
      }
      .el-table--enable-row-hover .el-table__body tr:hover>td{
        background: #fff4d9;
      }
    }
  }
</style>
