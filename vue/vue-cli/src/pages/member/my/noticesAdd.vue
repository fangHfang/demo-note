<template>
<div class="myNoticeAdd">
  <p class="title">添加通知</p>
  <el-form ref="form" label-width="80px">
    <el-form-item label="内容标题:">
      <el-input v-model="submit.EmailTitle" placeholder="内容标题" style="width: 220px"></el-input>
    </el-form-item>
    <el-form-item label="通知类别:">
      <el-radio-group v-model="submit.NoticeType">
        <el-radio v-for="item in noticeType" :key="item.Id" :label="item.Id">{{item.Name}}</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="通知级别:">
      <el-radio-group v-model="submit.NoticeLevel">
        <el-radio v-for="item in noticeLevel" :key="item.Id" :label="item.Id">{{item.Name}}</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="通知对象:">
      <p style="color: #06c;cursor: pointer" @click="dialogVisible = true">[选择]</p>
      <p>{{submit.nameStr}}</p>
    </el-form-item>
    <el-form-item label="详细内容:">
      <el-input v-model="submit.EmailContent" placeholder="详细内容" type="textarea" style="width: 800px"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="warning" @click="handleSubmit">确定</el-button>
    </el-form-item>
  </el-form>
  <el-dialog title="选择通知对象" :visible.sync="dialogVisible" width="1000px" @close="dialogVisible = false">
    <div style="border-bottom: 1px solid #ddd;">
      <div v-for="(item, index) in personList" :key="index" class="notice-list">
        <label class="left-notice"><el-checkbox v-model="item.partChecked" @change="changePart(item, index)">{{item.Name}}</el-checkbox></label>
        <span class="right-notice"><el-checkbox v-model="item.headChecked">{{item.HeadUserName}}</el-checkbox></span>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="handleConfirm">确 定</el-button>
      <el-button @click="dialogVisible = false">取 消</el-button>
  </span>
  </el-dialog>

</div>
</template>

<script>
import serverHttp from '@/assets/common/order'
export default {
  name: 'notices',
  data () {
    return {
      noticeType: [],
      noticeLevel: [],
      submit: {
        EmailTitle: '',
        EmailContent: '',
        NoticeLevel: '',
        NoticeType: '',
        ToUser: '',
        nameStr: ''
      },
      dialogVisible: false,
      personList: []
    }
  },
  created () {
    this.getBaseData()
  },
  watch: {
    dialogVisible (val) {
      if (val) {
        this.getLists()
      }
    }
  },
  methods: {
    /**
     * 获取基础数据
     */
    getBaseData () {
      serverHttp.GetNoticeType().then(res => {
        if (res.code === 0) {
          this.noticeType = res.data
        } else {
          this.$message.error(res.msg)
        }
      })
      serverHttp.GetNoticeLevel().then(res => {
        if (res.code === 0) {
          this.noticeLevel = res.data
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    /**
     * 提交
     */
    handleSubmit () {
      if (!this.submit.EmailTitle || !this.submit.NoticeLevel || !this.submit.NoticeType || !this.submit.ToUser.length) {
        this.$message.warning('请完善通知信息')
        return
      }
      serverHttp.AddFaJian(this.submit).then(res => {
        if (res.code === 0) {
          this.$message.success('添加成功')
          this.$router.push({name: 'MemberMyNotice'})
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    handleConfirm () {
      let str = ''
      let arr = []
      if (this.personList.length > 0) {
        this.personList.forEach(v => {
          if (v.headChecked) {
            str += (v.HeadUserName + ',')
            arr.push(v.HeadUserId)
          }
        })
      }
      this.submit.nameStr = str.substr(0, str.length - 1)
      this.submit.ToUser = arr
      this.dialogVisible = false
    },
    /**
     * 获取通知对象
     */
    getLists () {
      serverHttp.GetNoticeUser().then(res => {
        if (res.code === 0) {
          this.personList = res.data
          if (this.personList.length > 0) {
            this.personList.forEach(v => {
              this.$set(v, 'headChecked', false)
              this.$set(v, 'partChecked', false)
            })
          }
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    /**
     * 选择部门
     */
    changePart (item, index) {
      this.$set(this.personList[index], 'headChecked', item.partChecked)
    }
  }
}
</script>

<style lang="scss">
.myNoticeAdd{
  overflow: hidden;
  .title{
    font-size: 16px;
    line-height: 40px;
    border-bottom: 1px solid #ddd;
    margin-bottom: 20px;
  }
  .el-form-item__content{
    height: auto;
    .el-input__inner{
      height: 30px;
    }
  }
  .el-form-item__label{
    color: #000;
  }
  .notice-list{
    border: 1px solid #e2e2e2;
    border-bottom: none;
    line-height: 50px;
    .left-notice{
      width: 130px;
      background: #f5f5f5;
      padding-right: 20px;
      display: inline-block;
      text-align: right;
      border-right: 1px solid #ddd;
    }
    .el-checkbox__label{
      color: #000;
    }
    .el-checkbox__inner{
      transform: scale(1.2, 1.2);
    }
    .right-notice{
      padding: 0 10px;
    }
  }
  .notice-list:nth-child(2n+2){
    background: #fcfcfc;
  }
}
</style>
