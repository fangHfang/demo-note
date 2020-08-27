<template>
  <div class="updateContract">
    <el-dialog :title="title" :visible.sync="dialogVisible" width="1000px" @click="handleCancel">
    <div class="title">第七章: 协议条款</div>
    <div class="li">
      <div class="li-title">第二十三条: 成团人数与不成团的约定</div>
      <div class="li-con">
        <label class="left-title">成团人数: </label>
        <div class="right-con">成团的最低人数 <input type="number" v-model="submitData.RenShu"
                                              style="width: 50px;display: inline-block;"/>人
        </div>
      </div>
      <div class="li-con">
        <label class="left-title">不成团约定: </label>
        <div>
          <div class="right-con special">1、同意旅行社委托其他旅行社履行合同;</div>
          <div class="right-con special">2、
            <el-radio-group v-model="submitData.Delay">
              <el-radio v-for="(item) in radios" :key="item.value" :label="item.value">{{item.name}}</el-radio>
            </el-radio-group>
          </div>
          <div class="right-con special">3、
            <el-radio-group v-model="submitData.ChangeLine">
              <el-radio v-for="(item) in radios1" :key="item.value" :label="item.value">{{item.name}}</el-radio>
            </el-radio-group>
          </div>
          <div class="right-con special">4、
            <el-radio-group v-model="submitData.Relieve">
              <el-radio v-for="(item) in radios2" :key="item.value" :label="item.value">{{item.name}}</el-radio>
            </el-radio-group>
          </div>
        </div>
      </div>
    </div>
    <div class="li" v-if="IsTaiWanYou == false">
      <div class="li-title">第二十四条: 拼团约定</div>
      <div class="li-con">
        <label class="left-title">拼团约定: </label>
        <div class="right-con special special1">
          <div>
            <el-radio-group v-model="submitData.PinTuan">
              <el-radio v-for="(item) in radios3" :key="item.value" :label="item.value">{{item.name}}</el-radio>
            </el-radio-group>
          </div>
        </div>
      </div>
    </div>
    <div class="li">
      <div class="li-title">附加条款</div>
      <div class="li-con">
        <label class="left-title">附加条款: </label>
        <div class="right-con special">
          <div>
            <el-radio-group v-model="submitData.HasFuJiaTiaoKuan">
              <el-radio v-for="(item) in radios4" :key="item.value" :label="item.value">{{item.name}}</el-radio>
            </el-radio-group>
          </div>
        </div>
      </div>
      <div v-if="submitData.HasFuJiaTiaoKuan === 1">
        <el-input type="textarea" style="width: 85%;height: 60px" v-model="submitData.FuJiaTiaoKuanBody" placeholder="附加条款"></el-input>
      </div>
    </div>
    <div class="li">
      <div class="li-title">供应商</div>
      <div class="li-con">
        <label class="left-title">供应商: </label>
        <div class="right-con special">
          <div>
            <el-radio-group v-model="submitData.IsShowMy">
              <el-radio v-for="(item) in radios5" :key="item.value" :label="item.value">{{item.name}}</el-radio>
            </el-radio-group>
          </div>
        </div>
      </div>
    </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="success" @click="handleConfirm">保 存</el-button>
        <el-button type="success" plain @click="handleCancel">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import serverHttp from '@/assets/common/tour.js'

export default {
  props: {
    dialog: {
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
      IsTaiWanYou: false,
      radios: [
        {
          value: 0,
          name: '不同意'
        },
        {
          value: 1,
          name: '同意 延期出团'
        }
      ],
      radios1: [
        {
          value: 0,
          name: '不同意'
        },
        {
          value: 1,
          name: '同意 改变其他线路出团'
        }
      ],
      radios2: [
        {
          value: 0,
          name: '不同意'
        },
        {
          value: 1,
          name: '同意 解除合同'
        }
      ],
      radios3: [
        {
          value: 0,
          name: '旅游者不同意'
        },
        {
          value: 1,
          name: '旅游者同意 采用拼团方式拼至供应商旅行社成团'
        }
      ],
      radios4: [
        {
          value: 0,
          name: '无附加条款'
        },
        {
          value: 1,
          name: '有附加条款'
        }
      ],
      radios5: [
        {
          value: 1,
          name: '显示自己'
        },
        {
          value: 0,
          name: '显示供应商'
        }
      ],
      submitData: {
        RenShu: 0,
        Delay: 0,
        ChangeLine: 0,
        Relieve: 0,
        PinTuan: 0,
        HasFuJiaTiaoKuan: 0,
        IsShowMy: 0,
        FuJiaTiaoKuanBody: ''
      },
      allData: '',
      OrderId: ''
    }
  },
  created () {
    this.OrderId = this.$route.query.OrderId
  },
  watch: {
    'dialog' (val) {
      this.dialogVisible = val
      if (val) {
        this.getList()
      }
    }
  },
  methods: {
    getList () {
      serverHttp.getEditContractInfo({
        OrderId: this.$route.query.OrderId
      }).then(res => {
        if (res.code === 0) {
          this.submitData = res.data.HtEdit
          this.allData = res.data
          this.IsTaiWanYou = res.data.IsTaiWanYou
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 取消
    handleCancel () {
      this.$emit('cancel')
    },
    // 确认
    handleConfirm () {
      serverHttp.saveEditContractInfo({
        HeTongId: this.allData.HeTongId,
        OrderId: this.$route.query.OrderId,
        ...this.submitData
      }).then(res => {
        if (res.code === 0) {
          this.$message.success('修改成功')
          this.$emit('confirm')
        } else {
          this.$message.error(res.msg)
        }
      })
    }
  }
}
</script>

<style lang="scss">
  .updateContract {
    background: #fff;
    padding-left: 15px;
    overflow-y: scroll;

    #editor {
      width: 100%;
      height: 300px;
      background-color: #CCCCCC;
    }

    .title {
      padding: 0 30px 50px 30px;
      text-align: center;
      font-size: 23px;
      font-weight: 600;
    }

    .li {
      margin-bottom: 15px;

      .li-title {
        font-size: 17px;
        font-weight: 600;
        margin-bottom: 8px;
      }

      .li-con {
        font-size: 14px;
        margin-bottom: 8px;

        .left-title {
          width: 25%;
          display: inline-block;
          line-height: 28px;
        }

        .right-con {
          width: 75%;
          display: inline-block;
          margin-top: 10px;

          input {
            vertical-align: middle;
            border: 1px solid #ddd;
            margin: 0 4px;
            text-align: center;
          }

          /*uni-radio-group {*/
          /*  display: inline-block;*/

          /*  .uni-list-cell-pd {*/
          /*    margin-right: 8px;*/

          /*    div {*/
          /*      display: inline-block;*/
          /*    }*/
          /*  }*/
          /*}*/
        }

        .special {
          width: 100%;
          margin-top: 10px;
          box-sizing: border-box;
          padding-left: 20 upx;
        }

        .special1 {
          /*uni-radio-group {*/
          /*  .uni-list-cell-pd {*/
          /*    // width: 100%;*/
          /*    display: block;*/
          /*    overflow: hidden;*/

          /*    div {*/
          /*      display: inline-block;*/
          /*    }*/
          /*  }*/
          /*}*/
        }

        text {
          display: block;
          padding-left: 15px;
        }

        radio {
          transform: scale(0.7, 0.7)
        }
      }
    }
  }
</style>
