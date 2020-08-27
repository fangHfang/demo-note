<template>
<div class="myInfo">
  <div class="breadcrumb-title">微店信息</div>
  <el-table :data="listData" row-class-name="orderTable" v-if="listData.length>0">
    <el-table-column label="微店信息">
      <p class="itemRow">{{allData.Name}}</p>
      <p class="itemRow">微店热线：{{allData.Hotline}}</p>
      <p class="itemRow">我的位置：{{allData.Region.Name}}</p>
      <p class="itemRow">微店地址：{{allData.Address}}</p>
    </el-table-column>
    <el-table-column label="操作" align="center" width="130" v-slot="scope">
      <p class="itemRow toLink" @click="updateBank(scope.row.Id)">修改</p>
    </el-table-column>
  </el-table>

  <div style="padding: 20px 0">
    <p style="font-size: 16px;border-left: 2px solid #f60;padding-left: 8px;line-height: 20px;color: #333;margin: 10px 0 20px;">分享我的二维码（直接进入我的微店）</p>
    <img :src="allData.Url" alt="" style="width: 150px;height: 150px;" onerror="this.src = '/static/default.gif'">
  </div>
  <el-dialog title="修改微店信息" :visible.sync="dialogVisible" width="1000px" @close="handleCancel">
    <div class="add-content">
      <div class="add-item"><em>微店名称：</em><el-input placeholder="开户名" style="width: 220px" type="text" v-model="submit.Name"></el-input></div>
      <div class="add-item"><em>联系热线：</em><el-input placeholder="开户名" style="width: 220px" type="text" v-model="submit.Hotline"></el-input></div>
      <div class="add-item">
        <em>我的位置</em>
        <el-select v-model="submit.OneId" placeholder="地区" @change="changeOne">
          <el-option :label="item.Name" v-for="(item) in one" :key="item.Id" :value="item.Id"></el-option>
        </el-select>
        <el-select v-model="submit.TwoId" placeholder="省份" @change="changeTwo">
          <el-option :label="item.Name" v-for="(item) in two" :key="item.Id" :value="item.Id"></el-option>
        </el-select>
        <el-select v-model="submit.ThreeId" placeholder="城市" @change="changeThree">
          <el-option :label="item.Name" v-for="(item) in three" :key="item.Id" :value="item.Id"></el-option>
        </el-select>
        <el-select v-model="submit.FourId" placeholder="县级" v-if="four.length > 0">
          <el-option :label="item.Name" v-for="(item) in four" :key="item.Id" :value="item.Id"></el-option>
        </el-select>
      </div>
      <div class="add-item"><em style="padding: 20px 10px">地址：</em><el-input placeholder="开户行" style="width: 800px;padding: 10px" type="textarea" v-model="submit.Address"></el-input></div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="handleConfirm">确 定</el-button>
      <el-button @click="handleCancel">取 消</el-button>
  </span>
  </el-dialog>
</div>
</template>

<script>
import serverHttp from '@/assets/common/order'
export default {
  name: 'bankCard',
  data () {
    return {
      dialogVisible: false,
      submit: {
        WeChatShopId: '',
        SaleUserId: '',
        ParentId: '',
        Name: '',
        Hotline: '',
        OneId: '',
        TwoId: '',
        ThreeId: '',
        FourId: '',
        Address: '',
        RegionId: ''
      },
      listData: [{}],
      allData: {},
      loading: false,
      region: [],
      one: [],
      two: [],
      three: [],
      four: []
    }
  },
  created () {
    this.getLists()
    this.GetRegion()
  },
  computed: {
  },
  methods: {
    // 获取列表数据
    getLists () {
      this.loading = true
      serverHttp.GetWeChatShop({}).then(res => {
        this.loading = false
        if (res.code === 0) {
          this.allData = res.data
        } else {
          this.$message.error(res.msg)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    updateBank (id) {
      this.dialogVisible = true
      this.submit = {
        ...this.submit,
        ...this.allData
      }
      this.submit.WeChatShopId = this.submit.Id
    },
    handleCancel () {
      this.dialogVisible = false
    },
    handleConfirm () {
      if (!this.submit.Name || !this.submit.Hotline || !this.submit.Address) {
        this.$message.warning('请完善微店信息')
        return
      }
      this.submit.RegionId = this.submit.FourId || this.submit.ThreeId || this.submit.TwoId || this.submit.OneId
      serverHttp.EditMyWeChatShop(this.submit).then(res => {
        if (res.code === 0) {
          this.$message.success('微店信息保存成功!')
          this.handleCancel()
          this.getLists()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 改变一级  更新二级数据
    changeOne (val) {
      this.submit.TwoId = ''
      this.submit.ThreeId = ''
      this.submit.FourId = ''
      this.two = this.region.filter(v => v.Pid === val)
    },
    // 改变二级  更新三级数据
    changeTwo (val) {
      this.submit.ThreeId = ''
      this.submit.FourId = ''
      this.three = this.region.filter(v => v.Pid === val)
    },
    // 改变三级  更新四级数据
    changeThree (val) {
      this.submit.FourId = ''
      this.four = this.region.filter(v => v.Pid === val)
    },
    GetRegion () {
      serverHttp.GetRegion().then(res => {
        if (res.code === 0) {
          this.region = res.data
          this.one = this.region.filter(v => v.Pid === '0')
          this.two = this.region.filter(v => v.Pid === this.submit.OneId)
          this.three = this.region.filter(v => v.Pid === this.submit.TwoId)
          this.four = this.region.filter(v => v.Pid === this.submit.ThreeId)
        } else {
          this.$message.error(res.msg)
        }
      })
    }
  }
}
</script>

<style lang="scss">
  .myInfo {
    .breadcrumb-title {
      padding-bottom: 13px;
      border-bottom: 2px solid #e5e5e5;
      margin-bottom: 10px;
      font-size: 18px;
      font-weight: 500;
      color: #666;
      i{
        display: block;
        float: right;
        font-size: 14px;
        color: #fff;
        background: #f60;
        width: 120px;
        height: 28px;
        text-align: center;
        line-height: 28px;
        border-radius: 4px;
        cursor: pointer;
      }
    }
    .el-table{
      thead{
        tr{
          th{
            background: #F2F2F2;
          }
        }
      }
      .operate{
        cursor: pointer;
        color: #06c;
      }
      .storeInfo{
        label{
          width: 60px;
          display: inline-block;
          text-align: justify;
          vertical-align: top;
          &::after {
            display: inline-block;
            width: 100%;
            height: 0;
            content: '';
          }
        }
        span{
          vertical-align: top;
          display: inline-block;
          margin-left: 20px;
          color: #333;
          width: calc(100% - 90px);
        }
      }
    }
    .add-content{
      .add-item{
        overflow: hidden;
        line-height: 30px;
        border: 1px solid #ddd;
        margin-bottom: 10px;
        border-radius: 10px;
        .el-select {
          width: 116px;

          .el-input {
            width: 100%;
          }
        }
        em{
          width: 100px;
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
        border-left: 2px solid #ddd;
      }
    }
  }
</style>
