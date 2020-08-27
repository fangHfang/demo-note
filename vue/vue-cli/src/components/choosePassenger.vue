<template>
<!--  常旅客-->
  <div class="allPassenger">
    <el-dialog :title="title" :visible.sync="dialogChoose" width="1000px" @close="handleCancel">
      <div class="chooseType">
        <div style="color: #16a085;" @click="chooseType('1')"><p><i class="el-icon-user-solid"></i></p><p>个人游客</p></div>
        <div style="color: #8e44ad;" @click="chooseType('2')"><p><i class="el-icon-user-solid"></i></p><p>旅游同行</p></div>
        <div style="color: #2980b9;" @click="chooseType('4')"><p><i class="el-icon-user-solid"></i></p><p>企业客户</p></div>
      </div>
    </el-dialog>
    <el-dialog :title="title" :visible.sync="dialogVisible" width="1000px" @close="handleCancel">
      <div v-if="type === '1'">
        <div class="header">
          <span>关键字:</span>
          <el-input style="width: 220px" placeholder="游客姓名/联系电话" v-model="Keyword"></el-input>
          <el-button style="margin-left: 15px" type="warning" @click="search">立即搜索</el-button>
          <el-button style="margin-left: 15px" type="warning" @click="dialogCustomers = true">添加</el-button>
          <el-button style="margin-left: 15px" type="warning" @click="selectBack">返回</el-button>
        </div>
        <el-table :data="list" border style="width: 100%;margin-top: 20px" tooltip-effect="dark">
          <el-table-column prop="Name" label="姓名" align="center"></el-table-column>
          <el-table-column prop="Telephone" label="手机号码" align="center"></el-table-column>
          <el-table-column label="操作" align="center" width="170" v-slot="scope">
            <p style="cursor: pointer;color: #06C" @click="choose(scope.row)">选择</p>
          </el-table-column>
        </el-table>
      </div>
      <div v-else-if="type === '2'">
        <div class="header">
          <span>关键字:</span>
          <el-input style="width: 220px" placeholder="企业名称/法人姓名/联系电话" v-model="Keyword"></el-input>
          <el-button style="margin-left: 15px" type="warning" @click="search">立即搜索</el-button>
          <el-button style="margin-left: 15px" type="warning" @click="selectBack">返回</el-button>
        </div>
        <el-table :data="list" border style="width: 100%;margin-top: 20px" tooltip-effect="dark">
          <el-table-column prop="index" width="50" label="序" align="center"></el-table-column>
          <el-table-column prop="JiGou" label="企业名称" align="center"></el-table-column>
          <el-table-column prop="UserName" label="法人姓名" align="center"></el-table-column>
          <el-table-column prop="Telephone" label="联系电话" align="center"></el-table-column>
          <el-table-column label="操作" align="center" width="170" v-slot="scope">
            <p style="cursor: pointer;color: #06C" @click="choose(scope.row)">选择</p>
          </el-table-column>
        </el-table>
      </div>
      <div v-else>
        <div class="header">
          <span>关键字:</span>
          <el-input style="width: 220px" placeholder="企业名称/法人姓名/联系电话" v-model="Keyword"></el-input>
          <el-button style="margin-left: 15px" type="warning" @click="search">立即搜索</el-button>
          <el-button style="margin-left: 15px" type="warning" @click="selectBack">返回</el-button>
        </div>
        <el-table :data="list" border style="width: 100%;margin-top: 20px" tooltip-effect="dark">
          <el-table-column prop="index" label="序" width="50" align="center"></el-table-column>
          <el-table-column prop="JiGou" label="企业名称" align="center"></el-table-column>
          <el-table-column prop="UserName" label="法人姓名" align="center"></el-table-column>
          <el-table-column prop="Telephone" label="联系电话" align="center"></el-table-column>
          <el-table-column label="操作" align="center" width="170" v-slot="scope">
            <p style="cursor: pointer;color: #06C" @click="choose(scope.row)">选择</p>
          </el-table-column>
        </el-table>
      </div>
      <pager :pager="pager" @changePage="changePage"></pager>
    </el-dialog>
    <el-dialog
    title="选择客户"
    :visible.sync="dialogCustomers"
    width="70%" @close="dialogCustomers = false">
      <div class="add-content">
        <div class="add-item"><em>姓名</em><el-input style="width: 180px" placeholder="姓名" type="text" v-model="customersInfo.Name"></el-input></div>
        <div class="add-item"><em>手机号码</em><el-input style="width: 180px" placeholder="手机号码" type="text" v-model="customersInfo.Telephone"></el-input></div>
        <div class="add-item"><em>单位名称</em><el-input style="width: 180px" placeholder="单位名称" type="text"></el-input></div>
        <!--<div class="add-item"><em>身份证</em><el-input style="width: 180px" placeholder="证件号码" type="text" v-model="customersInfo.ShenFenZheng"></el-input></div>
        <div class="add-item"><em>护照</em><el-input style="width: 180px" placeholder="证件号码" type="text" v-model="customersInfo.HuZhao"></el-input></div>
        <div class="add-item"><em>其他证件</em><el-input style="width: 180px" placeholder="证件号码" type="text" v-model="customersInfo.QiTaZhengJian"></el-input></div>
        <div class="add-item"><em>籍贯地址</em>
          <el-select v-model="customersInfo.OneId" placeholder="地区" @change="changeOne">
            <el-option :label="item.Name" v-for="(item) in one" :key="item.Id" :value="item.Id"></el-option>
          </el-select>
          <el-select v-model="customersInfo.TwoId" placeholder="省份" @change="changeTwo">
            <el-option :label="item.Name" v-for="(item) in two" :key="item.Id" :value="item.Id"></el-option>
          </el-select>
          <el-select v-model="customersInfo.ThreeId" placeholder="城市" @change="changeThree">
            <el-option :label="item.Name" v-for="(item) in three" :key="item.Id" :value="item.Id"></el-option>
          </el-select>
          <el-select v-model="customersInfo.FourId" placeholder="县级" v-if="four.length > 0">
            <el-option :label="item.Name" v-for="(item) in four" :key="item.Id" :value="item.Id"></el-option>
          </el-select>
        </div>
        <div class="add-item"><em>出生日期</em><el-date-picker
          v-model="customersInfo.Birthday"
          type="date"
          placeholder="出生日期">
        </el-date-picker></div>
        <div class="add-item"><em>性别</em>
          <el-select v-model="customersInfo.Sex" placeholder="性别">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </div>
        <div class="add-item"><em>名族</em>
          <el-select v-model="customersInfo.MinZuTypeId" placeholder="请选择">
            <el-option :label="item.Name" :value="item.Id" v-for="item in minZu" :key="item.Id"></el-option>
          </el-select>
        </div>
        <div class="add-item"><em>QQ号码</em><el-input style="width: 180px" placeholder="QQ号码" type="text" v-model="customersInfo.QQ"></el-input></div>
        <div class="add-item"><em>微信号码</em><el-input style="width: 180px" placeholder="微信号码" type="text" v-model="customersInfo.WeiXin"></el-input></div>
        <div class="add-item"><em>邮箱地址</em><el-input style="width: 180px" placeholder="邮箱地址" type="text" v-model="customersInfo.Email"></el-input></div>-->
      </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="AddYuanGong">确 定</el-button>
          <el-button @click="dialogCustomers = false">取 消</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
import serverHttp from '@/assets/common/tour'
import orderHttp from '@/assets/common/order'
export default {
  name: 'personList',
  props: {
    personDialog: {
      type: Boolean,
      defaults: false
    },
    title: {
      defaults: '提示'
    }
  },
  data () {
    return {
      dialogVisible: false,
      dialogCustomers: false,
      customersInfo: {FourId: ''},
      list: [],
      Keyword: '',
      pager: {
        page: 1,
        pageSize: 10,
        total: 0
      },
      region: [],
      one: [],
      two: [],
      three: [],
      four: [],
      dialogChoose: false,
      type: '',
      minZu: []
    }
  },
  created () {
    this.GetRegion()
    this.GetMinZu()
  },
  watch: {
    personDialog (val) {
      if (!val) {
        this.dialogVisible = val
      }
      this.dialogChoose = val
      this.Keyword = ''
    }
  },
  methods: {
    // 取消
    handleCancel () {
      this.$emit('cancel')
    },
    // 确认
    handleConfirm () {
      this.$emit('confirm')
    },
    async getLists () {
      // 不同类型请求数据
      if (this.type === '1') {
        serverHttp.GetKeHuByMyGeRen({
          Keyword: this.Keyword,
          Index: this.pager.page
        }).then(res => {
          if (res.code === 0) {
            let list = res.data.List
            this.list = list
            this.pager.total = res.data.Count
            this.pager.page = res.data.Index
          } else {
            this.$message.error(res.msg)
          }
        })
      } else if (this.type === '2') {
        serverHttp.GetKeHuByTongHang({
          Keyword: this.Keyword,
          Index: this.pager.page
        }).then(res => {
          if (res.code === 0) {
            let list = res.data.List
            list.forEach((item, index) => {
              item.index = index + 1
            })
            this.list = list
            this.pager.total = res.data.Count
            this.pager.page = res.data.Index
          } else {
            this.$message.error(res.msg)
          }
        })
      } else {
        serverHttp.GetKeHuByFeiTongHang({
          Keyword: this.Keyword,
          Index: this.pager.page
        }).then(res => {
          if (res.code === 0) {
            let list = res.data.List
            list.forEach((item, index) => {
              item.index = index + 1
            })
            this.list = list
            this.pager.total = res.data.Count
            this.pager.page = res.data.Index
          } else {
            this.$message.error(res.msg)
          }
        })
      }
    },
    choose (item) {
      let obj = {}
      obj = {
        ...item,
        type: this.type
      }
      this.$emit('change', obj)
    },
    /**
     * 分页
     */
    changePage (e) {
      this.pager.page = e
      this.getLists()
    },
    // 搜索
    search () {
      this.pager.page = 1
      this.getLists()
    },
    chooseType (type) {
      this.type = type
      this.Keyword = ''
      this.dialogVisible = true
      this.getLists()
    },
    // 改变一级  更新二级数据
    changeOne (val) {
      this.customersInfo.TwoId = ''
      this.customersInfo.ThreeId = ''
      this.customersInfo.FourId = ''
      this.two = this.region.filter(v => v.Pid === val)
    },
    // 改变二级  更新三级数据
    changeTwo (val) {
      this.customersInfo.ThreeId = ''
      this.customersInfo.FourId = ''
      this.three = this.region.filter(v => v.Pid === val)
    },
    // 改变三级  更新四级数据
    changeThree (val) {
      this.customersInfo.FourId = ''
      this.four = this.region.filter(v => v.Pid === val)
    },
    // 获取籍贯
    GetRegion () {
      orderHttp.GetRegion().then(res => {
        if (res.code === 0) {
          this.region = res.data
          this.one = this.region.filter(v => v.Pid === '0')
          this.two = this.region.filter(v => v.Pid === this.customersInfo.OneId)
          this.three = this.region.filter(v => v.Pid === this.customersInfo.TwoId)
          this.four = this.region.filter(v => v.Pid === this.customersInfo.ThreeId)
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 获取民族
    GetMinZu () {
      orderHttp.GetMinZu().then(res => {
        if (res.code === 0) {
          this.minZu = res.data
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 添加游客
    AddYuanGong () {
      orderHttp.AddYuanGong(this.customersInfo).then(res => {
        if (res.code === 0) {
          this.$message.success('添加成功')
          this.dialogCustomers = false
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    selectBack () {
      this.dialogVisible = false
      setTimeout(() => {
        this.dialogChoose = true
      }, 1)
    }
  }
}
</script>

<style lang="scss">
.allPassenger{
  .chooseType{
    display: flex;
    height: 400px;
    div{
      display: inline-block;
      flex: 1;
      text-align: center;
      vertical-align: middle;
      padding: 100px;
      p{
        font-size: 20px;
        cursor: pointer;
        i{
          font-size: 60px;
        }
      }
      p:last-child{
        line-height: 70px;
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
      .el-input__icon{
        line-height: 29px;
        margin: 0 10px;
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
}
</style>
