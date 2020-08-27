<template>
  <div>
    <div class="order-info">
      <div class="panel">
        <div class="panel-title"><i class="chanpin"></i>基本信息</div>
        <div class="panel-content">
          <div class="panel-group">
            <label>订单编号：</label>
            <span>{{yuDingInfo.OrderCode}}</span>
          </div>
          <div class="panel-group">
            <label>线路名称：</label>
            <span>{{yuDingInfo.ResourceName}} (发团日期{{yuDingInfo.StartDate}}至{{yuDingInfo.EndDate}})</span>
          </div>
          <div class="panel-group">
            <label>预定客户：</label>
            <span>{{yuDingInfo.CustomerInfo}}</span>
          </div>
        </div>
      </div>
      <div class="panel">
        <div class="panel-title">
          <i class="chanpin"></i>游客名单
          <div class="add-box">
            <span class="add" @click="dialogFormVisible = true;textarea = ''">快捷添加</span>
            <span class="add">上传文件</span>
            <!--<span class="a-upload">
              <form enctype="multipart/form-data" :action="url" method="post" id="up" style="font-size: 15px">
                &lt;!&ndash;                支持xls,xlsx文件&ndash;&gt;
                <input type="file" name="file" id="txt_file" @change="uploadFile" accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"/>
                上传文件
              </form>
            </span>-->
            <span class="add" @click="downDemo">模板下载</span>
            <span class="add" @click="dialog2 = true">手动添加</span>
            <span class="add" @click="personDialog = true">从常旅客选择</span>
            <span class="add" @click="clearPerson">清空全部名单</span>
          </div>
        </div>
        <div class="panel-content">
          <el-table :data="listData" style="width: 100%" border>
            <el-table-column label="游客姓名" prop="XingMing"></el-table-column>
            <el-table-column label="联系电话" prop="Telephone"></el-table-column>
            <el-table-column label="身份证号" prop="ShenFenZhengNum"></el-table-column>
            <el-table-column label="护照号码" prop="HuZhaoHaoMa"></el-table-column>
            <el-table-column label="其他号码" prop="QiTaHaoMa"></el-table-column>
            <el-table-column label="性别" prop="Sex"></el-table-column>
            <el-table-column label="出生日期" prop="BirthDate"></el-table-column>
            <el-table-column label="操作" width="120" align="center">
              <template v-slot="scope">
                <p style="color: #06c" class="operate" @click="updateMinDan(scope.row)">修改</p>
                <p style="color: #06c" class="operate" @click="deleteList(scope.row.Id)">删除</p>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="panel panel-btn">
        <el-button @click="submitOrder(0)">上一步</el-button>
        <el-button @click="submitOrder(2)">下一步</el-button>
      </div>
    </div>
    <!--<div class="content">
      <div class="con-left">
        <ul>
          <li class="lf-con-item">
            <section class="item-header">
              <i class="base-info base-icon1"></i>
              <span>基本信息</span>
            </section>
            <section class="base-allInfo">
              <p><span class="base-all-item">订单编号:</span><span class="base-all-item">{{yuDingInfo.OrderCode}}</span></p>
              <p><span class="base-all-item">线路名称:</span><span class="base-all-item">{{yuDingInfo.ResourceName}} (发团日期{{yuDingInfo.StartDate}}至{{yuDingInfo.EndDate}})</span></p>
              <p><span class="base-all-item">预定客户:</span><span class="base-all-item">{{yuDingInfo.CustomerInfo}}</span></p>
            </section>
          </li>
          <li class="lf-con-item">
            <span style="margin-right: 10px;">操作</span>
            <el-button type="warning" @click="dialogFormVisible = true;textarea = ''">快捷添加</el-button>
            <div class="a-upload">
              <form enctype="multipart/form-data" :action="url" method="post" id="up" style="width: 100px;display: block">
&lt;!&ndash;                支持xls,xlsx文件&ndash;&gt;
                <input type="file" name="file" id="txt_file" @change="uploadFile" accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"/>
                上传文件
              </form>
            </div>
            <el-button type="warning" @click="downDemo">模板下载</el-button>
            <el-button type="warning" @click="dialog2 = true">手动添加</el-button>
            <el-button type="warning" @click="personDialog = true">从常旅客选择</el-button>
            <el-button type="warning" @click="clearPerson">清空全部名单</el-button>
          </li>
          <li class="lf-con-item">
            <section class="item-header">
              <i class="base-info base-icon5"></i>
              <span>乘客信息</span>
            </section>
            <section>
              <el-table :data="listData" style="width: 100%" border>
                <el-table-column label="游客姓名" prop="XingMing"></el-table-column>
                <el-table-column label="联系电话" prop="Telephone"></el-table-column>
                <el-table-column label="身份证号" prop="ShenFenZhengNum"></el-table-column>
                <el-table-column label="护照号码" prop="HuZhaoHaoMa"></el-table-column>
                <el-table-column label="其他号码" prop="QiTaHaoMa"></el-table-column>
                <el-table-column label="性别" prop="Sex"></el-table-column>
                <el-table-column label="出生日期" prop="BirthDate"></el-table-column>
                <el-table-column label="操作" width="120" align="center">
                  <template v-slot="scope">
                    <p style="color: #06c" class="operate" @click="updateMinDan(scope.row)">修改</p>
                    <p style="color: #06c" class="operate" @click="deleteList(scope.row.Id)">删除</p>
                  </template>
                </el-table-column>
              </el-table>
            </section>
          </li>
          <li style="padding: 10px;margin-bottom: 20px; text-align: center">
            <el-button type="warning" @click="submitOrder(0)">上一步</el-button>
            <el-button type="warning" @click="submitOrder(2)">下一步</el-button>
          </li>
        </ul>
      </div>
    </div>-->
    <!--    名单弹窗-->
    <el-dialog title="快捷添加" width="1000px" :visible.sync="dialogFormVisible" class="dialog1" @close="dialogFormVisible = false;textarea = ''">
      <p class="title1">最多可以添加100人，超过100人请选择Excel导入名单</p>
      <p class="title2">名单示例: 姓名+空格+身份证号;多个名单换行</p>
      <el-input v-model="textarea" placeholder="智能导入" type="textarea"></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="quickAdd">确 定</el-button>
        <el-button @click="dialogFormVisible = false;;textarea = ''">取 消</el-button>
      </div>
    </el-dialog>
    <el-dialog title="手动添加" width="1000px" :visible.sync="dialog2" class="dialog1" @close="dialog2 = false">
      <p class="title2">名单信息: <i style="color: red">共{{yuDingInfo.number}}人(已添加{{data.length}}人)</i> <el-button class="fn-right" size="mini" type="warning" @click="addPerson">添加</el-button></p>
      <section v-for="(item, index) in personList" :key="index" class="person-item" v-if="personList.length>0">
        <div class="person-num">
          <p>第 <i>{{index + 1}}</i> 位</p>
<!--          <p>{{item.type}}</p>-->
        </div>
        <div class="form-person">
          <el-form ref="form" label-width="90px">
            <el-form-item label="姓名:">
              <el-input v-model="item.Name" placeholder="姓名" style="width: 218px;"></el-input>
              <span class="person-choose" @click="deletePerson(index)">删除</span>
            </el-form-item>
            <el-form-item label="性别:">
              <el-select v-model="item.Sex" placeholder="请选择" style="width: 218px;">
                <el-option
                  v-for="item in sexList"
                  :key="item.label"
                  :label="item.label"
                  :value="item.label">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="证件号码:">
              <el-input v-model="item.ShenFenZheng" placeholder="证件号码" style="width: 218px;"></el-input>
            </el-form-item>
            <el-form-item label="护照号码:">
              <el-input v-model="item.HuZhao" placeholder="护照号码" style="width: 218px;"></el-input>
            </el-form-item>
            <el-form-item label="其他号码:">
              <el-input v-model="item.QiTaZhengJian" placeholder="其他号码" style="width: 218px;"></el-input>
            </el-form-item>
            <el-form-item label="手机号码:">
              <el-input v-model="item.Telephone" placeholder="手机号码" type="number" style="width: 218px;"></el-input>
            </el-form-item>
            <el-form-item label="出生日期:">
              <el-date-picker
                v-model="item.Birthday"
                type="date"
                value-format="yyyy-MM-dd"
                :picker-options="pickerOptions"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-form>
        </div>
      </section>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveMinDan">确定保存名单</el-button>
      </div>
    </el-dialog>
    <el-dialog title="修改名单" width="1000px" :visible.sync="updateDialog" class="dialog1" @close="updateDialog = false">
      <section class="person-item">
        <div class="form-person">
          <el-form ref="form" label-width="90px">
            <el-form-item label="姓名:">
              <el-input v-model="oneMinDan.Name" placeholder="联系人" style="width: 218px;"></el-input>
            </el-form-item>
            <el-form-item label="性别:">
              <el-select v-model="oneMinDan.Sex" placeholder="请选择" style="width: 218px;">
                <el-option
                  v-for="item in sexList"
                  :key="item.label"
                  :label="item.label"
                  :value="item.label">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="证件号码:">
              <el-input v-model="oneMinDan.ShenFenZheng" placeholder="证件号码" style="width: 218px;"></el-input>
            </el-form-item>
            <el-form-item label="护照号码:">
              <el-input v-model="oneMinDan.HuZhao" placeholder="护照号码" style="width: 218px;"></el-input>
            </el-form-item>
            <el-form-item label="其他号码:">
              <el-input v-model="oneMinDan.QiTaZhengJian" placeholder="其他号码" style="width: 218px;"></el-input>
            </el-form-item>
            <el-form-item label="手机号码:">
              <el-input v-model="oneMinDan.Telephone" placeholder="手机号码" type="number" style="width: 218px;"></el-input>
            </el-form-item>
            <el-form-item label="出生日期:">
              <el-date-picker
                v-model="oneMinDan.Birthday"
                type="date"
                value-format="yyyy-MM-dd"
                :picker-options="pickerOptions"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-form>
        </div>
      </section>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="updateSaveMinDan">确定保存名单</el-button>
      </div>
    </el-dialog>
    <!--    常旅客选择-->
    <personList title="选择常旅客" :personDialog="personDialog" @cancel="cancel" @confirm="cancel"></personList>
  </div>
<!--  http://192.168.253.246:8080/#/xianlu/order2?date=2019-08-03&id=8abd1ce9a7d2452f927b0489d46605e8&Imid=87ebeead660944c1a5b3b8a3873bb6f5&current=1&OrderId=3277f9ce38294fb493d87c3f58b89728-->
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
      listData: [],
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
        this.$router.push({name: 'tourOrder1', query: {...this.$route.query, current: type}})
      } else {
        this.$router.push({name: 'tourOrder3', query: {...this.$route.query, current: type}})
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
  .a-upload {
    text-align: center;
    position: relative;
    cursor: pointer;
    padding-right: 15px;
    color: #06c;
    overflow: hidden;
    display: inline-block;
    *display: inline;
    *zoom: 1
  }

  .a-upload  input {
    position: absolute;
    font-size: 100px;
    right: 0;
    top: 0;
    opacity: 0;
    filter: alpha(opacity=0);
    cursor: pointer
  }
</style>
