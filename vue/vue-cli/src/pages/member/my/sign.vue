<template>
  <div class="myInfo">
    <div class="breadcrumb-title">签名信息</div>
    <div style="padding: 20px 10px;">
      <el-form ref="form" label-width="80px">
        <el-form-item label="在线签名:">
          <img src="" onerror="this.src = '/static/default.gif'" style="width: 165px;height: 165px;" alt="">
        </el-form-item>
        <el-form-item label="签名状态:">
          <p style="color: #06c;cursor: pointer" @click="getList()">更新签名</p>
          <div><img :src="listData" alt="" style="height: 60px"></div>
        </el-form-item>
        <el-form-item label="">
          <el-button type="warning" @click="onSubmit">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import serverHttp from '@/assets/common/order'
export default {
  name: 'myInfo',
  data () {
    return {
      listData: ''
    }
  },
  created () {
    this.getList()
  },
  methods: {
    getList () {
      serverHttp.GetSign().then(res => {
        if (res.code === 0) {
          this.listData = res.data
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    onSubmit () {
      serverHttp.UpdatePass(this.data).then(res => {
        if (res.code === 0) {
          this.$message.success(res.msg)
        } else {
          this.$message.error(res.msg)
        }
      }).catch(err => {
        console.log(err)
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
    }

    .el-form-item {
      margin-bottom: 10px;
      overflow: hidden;
      .el-form-item__content{
        max-height: 300px;
      }

      .el-button--warning{
        background-color: #f60;
        border-color: #f60;
        padding: 10px 50px;
      }

      .el-input__inner {
        height: 30px;
      }

      .el-input {
        width: 248px;
      }

      .el-select {
        width: 116px;

        .el-input {
          width: 100%;
        }
      }
    }
    .el-form-item__label{
      color: #333;
    }
    .address-item{
      .el-select{
        margin-right: 10px;
      }
      .el-radio{
        padding: 10px 0;
      }
    }

    .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409EFF;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
  }
</style>
