<template>
  <div class="orderHetong1">
    <el-form ref="form" label-position="left" :data="orderData" label-width="100px">
      <el-form-item label="线路名称">
        <label>系统自动生成</label>
        <el-button size="mini" type="primary" @click="dialogVisible = true">选择</el-button>
      </el-form-item>
    </el-form>
    <el-form ref="form" label-position="left" :data="orderData" label-width="100px">
      <el-form-item label="名称描述">
        <el-input type="text" size="small" v-model="orderData.desc"></el-input>
      </el-form-item>
      <el-form-item label="出发地区">
        <el-select v-model="orderData.region" size="small" placeholder="请选择出发地区">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="旅游天数">
        <el-input type="number" v-model="orderData.desc" size="small" style="width:60px"></el-input> 天
        <el-input type="number" v-model="orderData.desc" size="small" style="width:60px;height:32px"></el-input> 夜
      </el-form-item>
      <el-form-item label="国内目的地">
        <el-button size="mini" type="primary">增加目的地</el-button>
      </el-form-item>
      <el-form-item label="国际目的地">
        <el-button size="mini" type="primary">增加目的地</el-button>
      </el-form-item>
      <el-form-item label="出发交通">
        <el-radio-group v-model="orderData.resource">
          <el-radio size="small" label="火车" value="0"></el-radio>
          <el-radio size="small" label="飞机" value="1"></el-radio>
          <el-radio size="small" label="汽车" value="1"></el-radio>
          <el-radio size="small" label="轮船" value="1"></el-radio>
          <el-radio size="small" label="硬卧" value="1"></el-radio>
          <el-radio size="small" label="软卧" value="1"></el-radio>
          <el-radio size="small" label="硬座" value="1"></el-radio>
          <el-radio size="small" label="动车" value="1"></el-radio>
          <el-radio size="small" label="交通自理" value="1"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="返回交通">
        <el-radio-group v-model="orderData.resource">
          <el-radio size="small" label="火车" value="0"></el-radio>
          <el-radio size="small" label="飞机" value="1"></el-radio>
          <el-radio size="small" label="汽车" value="1"></el-radio>
          <el-radio size="small" label="轮船" value="1"></el-radio>
          <el-radio size="small" label="硬卧" value="1"></el-radio>
          <el-radio size="small" label="软卧" value="1"></el-radio>
          <el-radio size="small" label="硬座" value="1"></el-radio>
          <el-radio size="small" label="动车" value="1"></el-radio>
          <el-radio size="small" label="交通自理" value="1"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="购物点">
        <label>0 个购物点</label>
      </el-form-item>
      <el-form-item label="自费点">
        <label>0 个自费点</label>
      </el-form-item>
      <el-form-item label="参考价">
        游客参考价 <el-input type="text" size="small" style="width:120px;height:32px"></el-input>，
        同行参考价 <el-input type="text" size="small" style="width:120px;height:32px"></el-input>
      </el-form-item>
      <el-form-item label="线路类型">
        <el-radio-group v-model="orderData.resource">
          <el-radio size="small" label="周边游" value="0"></el-radio>
          <el-radio size="small" label="国内游" value="1"></el-radio>
          <el-radio size="small" label="处境游" value="1"></el-radio>
          <el-radio size="small" label="港澳" value="1"></el-radio>
          <el-radio size="small" label="台湾" value="1"></el-radio>
          <el-radio size="small" label="边境游" value="1"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="产品主题">
        <el-checkbox-group v-model="orderData.type">
          <el-checkbox label="邮轮旅游"></el-checkbox>
          <el-checkbox label="海岛"></el-checkbox>
          <el-checkbox label="常规旅游"></el-checkbox>
          <el-checkbox label="蜜月游"></el-checkbox>
          <el-checkbox label="爸爸放心游"></el-checkbox>
          <el-checkbox label="海岛"></el-checkbox>
          <el-checkbox label="常规旅游"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="订单负责人">
        <el-button size="mini" type="primary">选择</el-button>
      </el-form-item>
      <el-form-item label="预定限制">
        至少提前 <el-input type="text" size="small" style="width:120px;height:32px"></el-input>
        天预定 （0为不限制）截止时间
        <el-time-picker placeholder="选择时间" v-model="orderData.date2" size="small" style="width: 150px;"></el-time-picker>
      </el-form-item>
      <el-form-item label="合同模板">
        <el-select v-model="orderData.region" placeholder="请选择合同模板">
          <el-option label="国内旅游合通" value="shanghai"></el-option>
          <el-option label="境外旅游合通" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="行程内容">
        <el-input type="textarea" v-model="orderData.desc"></el-input>
      </el-form-item>
      <el-form-item label="属性">
        <el-checkbox label="常规旅游"></el-checkbox>
        <el-checkbox label="蜜月游"></el-checkbox>
        <el-checkbox label="爸爸放心游"></el-checkbox>
        <el-checkbox label="海岛"></el-checkbox>
        <el-checkbox label="常规旅游"></el-checkbox>
      </el-form-item>
    </el-form>
    <div class="next">
      <el-button type="warning" @click="next">下一步</el-button>
    </div>

    <el-dialog
    title="充值"
    :visible.sync="dialogVisible"
    width="70%" @close="handleCance">
      <div class="add-content">
        <div class="add-item"><em>关键字</em><el-input style="width: 200px" placeholder="关键字" type="text"></el-input></div>
      </div>
      <div class="searchBtn">
        <el-button type="primary" size="small">搜索路线</el-button>
      </div>
      <table border style="width: 100%">
        <thead>
          <tr>
            <th width="10">序</th>
            <th>产品信息</th>
            <th width="40">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>
              <p>【周边游】杭州-1天0夜-杭州一人游+LY7-029</p>
              <p>往返交通：火车-火车</p>
              <p>旅游天数：1天0晚</p>
            </td>
            <td class="groupOperation">
              <p @click="toDetail">选择</p>
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>
              <p>【周边游】杭州-1天0夜-杭州一人游+LY7-029</p>
              <p>往返交通：火车-火车</p>
              <p>旅游天数：1天0晚</p>
            </td>
            <td class="groupOperation">
              <p @click="toDetail">选择</p>
            </td>
          </tr>
        </tbody>
      </table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'OrderHetong1',
  data () {
    return {
      orderData: {},
      dialogVisible: false
    }
  },
  methods: {
    handleCance () {},
    toDetail () {
      this.dialogVisible = false
    },
    next () {
      this.$router.push({name: 'tourOrderHetong2', query: {current: 1}})
    }
  }
}
</script>

<style lang="scss">
.orderHetong1{
  min-height: 300px;
  padding: 25px 0;
  .add-content{
    .add-item{
      overflow: hidden;
      line-height: 30px;
      border: 1px solid #ddd;
      margin-bottom: 10px;
      border-radius: 10px;
      em{
        width: 80px;
        padding: 10px;
        display: block;
        float: left;
        background: #e2e2e2;
        text-align: right;
      }
      .el-radio{
        margin: 17px 0 0 30px;
      }
      .demandMoney{
        padding: 10px;
        line-height: 30px;
        display: inline-block;
      }
    }
    .el-input{
      margin-top: 10px;
      padding: 0 10px;
      .el-input__inner{
        height: 30px;
        line-height: 30px;
      }
    }
    .el-select{
      height: 30px;
      .el-input__suffix{
        right: 10px;
      }
      .el-input__icon{
        line-height: 30px;
      }
    }
    .dialog-title{
      font-size: 16px;
      margin: 30px 0 20px;
      padding-left: 8px;
      border-left: 2px solid #f60;
    }
  }
  .el-dialog__footer{
    text-align: center;
  }
  .searchBtn{
    text-align: center;
    margin-bottom: 15px;
  }
  table{
    border: 1px solid #ddd;
    text-align: center;
    thead{
      tr{
        th{
          background: #f0f0f0;
        }
      }
    }
    tr{
      td, th{
        padding: 6px 15px;
        line-height: 20px;
        p{
          margin-top: 10px;
          .name{
            color: blue;
          }
        }
      }
      td, th p:first-child{
        margin-top: 0;
      }
      .zuoFei{
        color: red;
        font-weight: bold;
      }
      .serial{
        width: 30px;
      }
      .make{
        width: 50px;
        p{
          cursor: pointer;
        }
        p:hover{
          color: #f60;
        }
      }
      .operation p{
        cursor: pointer;
      }
      .groupOperation p{
        cursor: pointer;
      }
      .operation p:hover{
        text-decoration: underline;
      }
      .groupOperation p:hover{
        color: #f60;
      }
    }
    tr td:nth-child(2){
      text-align: left;
    }
  }
  .next{
    text-align: center;
  }
}
</style>
