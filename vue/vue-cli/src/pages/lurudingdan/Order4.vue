<template>
  <div class="order-content">
    <div class="wrapper">
      <step :current="current" :list="list"></step>
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
            <i class="baoxian"></i>投保信息
            <div class="add-box">
              <span class="add" @click="dialogOpen">立即投保</span>
            </div>
          </div>
          <div class="panel-content">
            <el-table :data="listData" style="width: 100%" border>
              <el-table-column label="保险方案" prop="ResourceName"></el-table-column>
              <el-table-column label="参保日期" prop="TimeDesc" v-slot="scope">
                {{scope.row.StartDate}}至{{scope.row.EndDate}}
              </el-table-column>
              <el-table-column label="参保人数" prop="Num" v-slot="scope">
                {{scope.row.Num}}人, 名单: {{scope.row.MingDans}}
              </el-table-column>
              <el-table-column label="保单号" prop="Code"></el-table-column>
              <el-table-column label="投保时间" prop="TimeDesc"></el-table-column>
              <el-table-column label="保单金额" prop="Amount" v-slot="scope">
                {{scope.row.Amount}} <span v-if="scope.row.IsHan === 1">(门店承担)</span>
              </el-table-column>
              <el-table-column label="结算信息" prop="number" v-slot="scope">
                应付{{scope.row.YingFu}}, 已结算{{scope.row.YiJieSuan}}, 未结算{{scope.row.WeiJieSuan}}
              </el-table-column>
              <el-table-column label="操作" width="100" align="center">
                <template v-slot="scope">
                  <p class="operate" v-if="scope.row.OrderStatus === 2" @click="deleteList(scope.row.Id)">退保</p>
                  <p class="operate">下载保单</p>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <div class="panel panel-btn">
          <el-button @click="prev">上一步</el-button>
          <el-button @click="next">下一步</el-button>
        </div>
      </div>
    </div>
    <!--    立即投保弹窗-->
    <el-dialog title="投保" width="1000px" :visible.sync="dialog" class="dialog1" @close="dialog = false;baoXianData.id = ''">
      <div class="choose-title">选择保险方案</div>
      <div class="title3">
        <span class="small-title">线路名称:</span>
        <span class="right-con">{{yuDingInfo.ResourceName}}</span>
      </div>
      <div class="title3">
        <span class="small-title">发团日期:</span>
        <span class="right-con">{{yuDingInfo.StartDate}} 至 {{yuDingInfo.EndDate}}</span>
      </div>
      <div class="title3">
        <span class="small-title">保险方案:</span>
        <span class="right-con">
        <el-select v-model="baoXianData.id" placeholder="请选择" @change="chooseBaoXian">
          <el-option
            v-for="item in baoXian"
            :key="item.ResourceId"
            :label="item.ResourceName"
            :value="item.ResourceId">
          </el-option>
        </el-select>
        </span>
      </div>
      <div v-if="baoXianData.id">
        <div class="title3">
          <span class="small-title">供应商:</span>
          <span style="color: #06c" class="right-con">{{baoXianData.GysName}}</span>
        </div>
        <div class="title3">
          <span class="small-title">单价:</span>
          <span class="right-con">
          {{baoXianData.PriceInfo}} <span style="color: #06c;cursor: pointer" @click="viewDetail('')">(查看详情)</span></span>
        </div>
        <div class="title3">
          <span class="small-title">保费合计:</span>
          <span class="right-con">{{baoXianData.PriceUp}}元 (总社承担)</span>
        </div>
      </div>
      <p class="choose-title" style="margin-top: 20px">选择名单</p>
      <el-table :data="personList" style="width: 100%;margin-top: 10px" border tooltip-effect="dark" ref="multipleTable" @selection-change="handleSelectionChange">
        <el-table-column label="姓名" prop="XingMing"></el-table-column>
        <el-table-column label="身份证号" prop="ShenFenZhengNum" width="200px;"></el-table-column>
        <el-table-column label="护照号码" prop="HuZhaoHaoMa"></el-table-column>
        <el-table-column label="其他号码" prop="QiTaHaoMa"></el-table-column>
        <el-table-column label="出生日期" prop="BirthDate"></el-table-column>
        <el-table-column label="手机号码" prop="Telephone"></el-table-column>
        <el-table-column label="性别" prop="Sex"></el-table-column>
        <el-table-column type="selection" width="55"></el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitData">立即投保</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import step from '@/components/step'
import serverHttp from '@/assets/common/tour'
export default {
  name: 'Order2',
  components: {step},
  data () {
    return {
      list: ['第一步: 产品', '第二步: 预订', '第三步: 名单', '第四步: 保险', '第五步: 合同', '第六步: 交团'],
      current: 3,
      // 投保信息
      baoXian: [{time: '08: 20', address: '山西省太原市小店区研发技术部', type: '1'}, {time: '20: 00', address: '山西省太原市小店区技术部，ddddd', type: '2'}],
      baoXianData: {
        id: ''
      },
      dialog: false,
      multipleSelection: [],
      listData: [],
      OrderId: '',
      // 供应商id
      GysId: '',
      // 预定信息
      yuDingInfo: '',
      personList: []
    }
  },
  created () {
    this.OrderId = this.$route.query.OrderId
    if (this.OrderId) {
      this.getYuDingInfo()
      this.getList()
      this.GetBaoXianResources()
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
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 或者保险列表
    getList () {
      serverHttp.GetBaoDanOrders({
        OrderId: this.OrderId
      }).then(res => {
        if (res.code === 0) {
          this.listData = res.data
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    GetBaoXianResources () {
      serverHttp.GetBaoXianResources().then(res => {
        if (res.code === 0) {
          this.baoXian = res.data
        } else {
          this.$message.error(res.msg)
        }
      })
      serverHttp.GetMingDans({
        OrderId: this.OrderId
      }).then(res => {
        if (res.code === 0) {
          this.personList = res.data
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 多选
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    // 价格详情
    viewDetail () {
      window.open('#/xianlu/baoXian?OrderId=' + this.OrderId + '&BaoXianOrderId=' + this.baoXianData.id + '&GysId=' + this.GysId, '_bank')
    },
    dialogOpen () {
      this.dialog = true
      this.$nextTick(() => {
        for (let i = 0; i < this.personList.length; i++) {
          this.$refs.multipleTable.toggleRowSelection(this.personList[i], true)
        }
      })
    },
    chooseBaoXian () {
      let str = ''
      if (this.baoXianData.id) {
        str = this.baoXian.find(v => v.ResourceId === this.baoXianData.id).GysId
      }
      this.GysId = str
      serverHttp.GetBaoXianInfo({
        GysId: str,
        OrderId: this.OrderId,
        ResourceId: this.baoXianData.id
      }).then(res => {
        if (res.code === 0) {
          this.baoXianData = {
            ...res.data,
            ...this.baoXianData
          }
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 立即投保
    submitData () {
      let arr = []
      if (this.multipleSelection.length > 0) {
        this.multipleSelection.forEach(v => {
          arr.push(v.Id)
        })
      }
      serverHttp.AddBaoXianOrder({
        GysId: this.GysId,
        ResourceId: this.baoXianData.id,
        OrderId: this.OrderId,
        MingDanIds: arr
      }).then(res => {
        if (res.code === 0) {
          this.$message.error('投保成功')
          this.dialog = false
          this.getList()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 上一步/下一步
    prev () {
      this.$router.push({name: 'LuRuDingDan3'})
    },
    next () {
      this.$router.push({name: 'LuRuDingDan5'})
    },
    // 乘客名单和投保信息删除
    deleteList (id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        serverHttp.CancelBaoXianOrder({
          OrderId: this.OrderId,
          BaoXianOrderId: id
        }).then(res => {
          if (res.code === 0) {
            this.$message.success('退保成功')
            this.getList()
          } else {
            this.$message.error(res.msg)
          }
        })
      })
    }
  }
}
</script>

<style lang="scss">

</style>
