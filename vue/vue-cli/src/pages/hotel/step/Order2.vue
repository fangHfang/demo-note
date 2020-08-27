<template>
  <div>
    <div class="order-info">
      <div class="panel">
        <div class="panel-title"><i class="chanpin"></i>基本信息</div>
        <div class="panel-content">
          <div class="panel-group">
            <label>订单编号：</label>
            <span>DD123123123</span>
          </div>
          <div class="panel-group">
            <label>酒店名称：</label>
            <span>酒店名称</span>
          </div>
          <div class="panel-group">
            <label>房间类型：</label>
            <span>单人间（5间）</span>
          </div>
          <div class="panel-group">
            <label>入住日期：</label>
            <span>2018-05-15 至 2018-05-15</span>
          </div>
          <div class="panel-group">
            <label>预定客户：</label>
            <span>姓名，手机号码</span>
          </div>
        </div>
      </div>
      <div class="panel">
        <div class="panel-title"><i class="user"></i>入住名单</div>
        <div class="panel-content">
          <el-table :data="listData" style="width: 100%" border>
            <el-table-column label="姓名" align="center" width="200" prop="XingMing">
              <el-input placeholder="姓名"></el-input>
            </el-table-column>
            <el-table-column label="证件号码" prop="ShenFenZhengNum">
              <el-input placeholder="证件号码"></el-input>
            </el-table-column>
            <el-table-column label="操作" width="120" align="center">
              <template v-slot="scope">
                <p style="color: #06c" class="operate" @click="personDialog = true">选择</p>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="panel panel-btn">
        <el-button type="warning" @click="submitOrder(0)">上一步</el-button>
        <el-button type="warning" @click="submitOrder(2)">下一步</el-button>
      </div>
    </div>
    <!--常旅客选择-->
    <personList title="选择常旅客" :personDialog="personDialog" @cancel="cancel" @confirm="cancel"></personList>
  </div>
</template>

<script>
import serverHttp from '@/assets/common/tour'
import axios from 'axios'
export default {
  name: 'Order2',
  data () {
    return {
      // 订单信息
      yuDingInfo: {},
      personDialog: false,
      dialogFormVisible: false,
      dialog2: false,
      personList: [],
      sexList: [{value: '1', label: '男'}, {value: '2', label: '女'}],
      cards: [{value: '1', label: '身份证'}, {value: '2', label: '护照号'}, {value: '3', label: '其他证件'}],
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() > Date.now()
        }
      },
      fileList: [],
      listData: [{
        XingMing: '王小虎',
        ShenFenZhengNum: '12345678913246578'
      }, {
        XingMing: '王小虎',
        ShenFenZhengNum: '12345678913246578'
      }, {
        XingMing: '',
        ShenFenZhengNum: ''
      }],
      OrderId: '',
      data: '',
      // 修改
      updateDialog: false,
      // 只能导入
      textarea: '',
      oneMinDan: {},
      url: ''
    }
  },
  created () {
    this.url = process.env.BASE_URL + '/B2B/Tour/PC/Order/DaoRuMingDans'
    this.OrderId = this.$route.query.OrderId
    if (this.OrderId) {
      this.getYuDingInfo()
      this.GetMingDans()
    }
  },
  methods: {
    // 获取下单成功后的预定信息
    getYuDingInfo () {
      serverHttp.GetYuDingInfo({
        OrderId: this.OrderId
      }).then(res => {
        if (res.code === 0) {
          this.yuDingInfo = res.data
          this.yuDingInfo.number = 0
          let arr = this.yuDingInfo.RenYuans
          arr.forEach(item => {
            this.yuDingInfo.number += item.Num
          })
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    GetMingDans () {
      this.personList = []
      serverHttp.GetMingDans({
        OrderId: this.OrderId
      }).then(res => {
        if (res.code === 0) {
          this.listData = res.data
          if (res.data.length > 0) {
            res.data.forEach(row => {
              this.personList.push({
                Name: row.XingMing,
                ShenFenZheng: row.ShenFenZhengNum,
                HuZhao: row.HuZhaoHaoMa,
                QiTaZhengJian: row.QiTaHaoMa,
                Telephone: row.Telephone,
                Birthday: row.BirthDate,
                Sex: row.Sex
              })
            })
          }
          this.data = res.data
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 保存名单
    saveMinDan () {
      let str = 0
      if ((this.personList.length + this.data.AddedNum) <= this.data.Num) {
        str = 0
      } else {
        str = 1
      }
      serverHttp.AddMingDans({
        OrderId: this.OrderId,
        MingDans: this.personList,
        IsOverride: str
      }).then(res => {
        if (res.code === 0) {
          this.$message.success('添加成功')
          this.dialog2 = false
          this.GetMingDans()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 删除所有名单
    clearPerson () {
      this.$confirm('此操作将删除所有名单, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        serverHttp.ClearMingDan({
          OrderId: this.OrderId
        }).then(res => {
          if (res.code === 0) {
            this.GetMingDans()
          } else {
            this.$message.error('清空失败,请重试!')
          }
        })
      })
    },
    // 上一步/下一步
    submitOrder (type) {
      if (type === 0) {
        this.$router.push({name: 'HotelOrder1'})
      } else {
        this.$router.push({name: 'HotelOrder3'})
      }
    },
    // 删除名单
    deletePerson (index) {
      this.personList.splice(index, 1)
    },
    addPerson () {
      this.personList.push({Name: '', ShenFenZheng: '', HuZhao: '', QiTaZhengJian: '', Telephone: '', Birthday: '', Sex: ''})
    },
    // 乘客名单和投保信息删除
    deleteList (id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        serverHttp.RemoveMingDan({
          OrderId: this.OrderId,
          MingDanId: id
        }).then(res => {
          if (res.code === 0) {
            this.$message.success('删除成功')
            this.GetMingDans()
          } else {
            this.$message.error(res.msg)
          }
        })
      })
    },
    // 修改名单
    updateMinDan (row) {
      this.oneMinDan = {
        Name: row.XingMing,
        ShenFenZheng: row.ShenFenZhengNum,
        HuZhao: row.HuZhaoHaoMa,
        QiTaZhengJian: row.QiTaHaoMa,
        Telephone: row.Telephone,
        Birthday: row.BirthDate,
        Sex: row.Sex,
        MingDanId: row.Id,
        OrderId: this.OrderId
      }
      this.updateDialog = true
    },
    // 修改名单
    updateSaveMinDan () {
      serverHttp.EditMingDan(this.oneMinDan).then(res => {
        if (res.code === 0) {
          this.$message.success('修改成功')
          this.updateDialog = false
          this.GetMingDans()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 取消/确定 渲染列表数据
    cancel () {
      this.personDialog = false
      this.GetMingDans()
    },
    /**
     * 模板下载
     */
    downDemo () {
      let name = process.env.DOWN_URL + 'templet/游客名单（标准格式）.xls'
      window.open(name, '_blank')
    },
    uploadFile (e) {
      let file = e.target.files[0]
      let param = new FormData()
      param.append('OrderId', this.OrderId)
      param.append('file', file)
      axios.config = {
        headers: {'Content-Type': 'multipart/form-data'},
        token: localStorage.getItem('token')
      }
      axios.post('/B2B/Tour/PC/Order/DaoRuMingDans', param).then(res => {
        if (res.data.code === 0) {
          this.$message.success('上传成功')
          this.GetMingDans()
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    quickAdd () {
      let arr = []
      let str = this.textarea.split('\n')
      if (str.length > 0) {
        str.forEach(v => {
          let strOne = v.trim().split(/\s+/)
          arr.push({
            Name: strOne[0],
            ShenFenZheng: strOne[1]
          })
        })
      }
      if (arr.length > 0) {
        serverHttp.AddQuickMingDans({
          OrderId: this.OrderId,
          MingDans: arr
        }).then(res => {
          if (res.code === 0) {
            this.$message.success('添加成功')
            this.dialogFormVisible = false
            this.textarea = ''
            this.GetMingDans()
          } else {
            this.$message.error(res.msg)
          }
        })
      }
    }
  }
}
</script>

<style lang="scss">

</style>
